import type { JobPosting, SearchQuery } from "../contracts";
import { parseBoards } from "./config";
import { cleanText, fetchJson, inferApplicationEmail, inferLevel, matchesSearchQuery, normalizeEmploymentType, safeHttpsUrl } from "./shared";

interface AshbyBoard { jobs?: Array<Record<string, unknown>> }

export function getAshbyBoards() { return parseBoards(process.env.ASHBY_BOARDS); }
export function isAshbyConfigured() { return getAshbyBoards().length > 0; }

export async function searchAshby(query: SearchQuery): Promise<JobPosting[]> {
  const boards = getAshbyBoards();
  const batches = await Promise.all(boards.map(async ({ slug, label }) => {
    const url = new URL(`https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(slug)}`);
    url.searchParams.set("includeCompensation", "true");
    const board = await fetchJson<AshbyBoard>(url.toString());
    return (board.jobs ?? []).filter((item) => item.isListed !== false).map((item): JobPosting | null => {
      const title = cleanText(item.title);
      const description = cleanText(item.descriptionPlain ?? item.descriptionHtml);
      const sourceUrl = safeHttpsUrl(item.jobUrl);
      const applyUrl = safeHttpsUrl(item.applyUrl);
      if (!title || !sourceUrl) return null;
      const address = item.address as Record<string, unknown> | undefined;
      const postalAddress = address?.postalAddress as Record<string, unknown> | undefined;
      const location = cleanText(item.location) || [postalAddress?.addressLocality, postalAddress?.addressRegion, postalAddress?.addressCountry].map(cleanText).filter(Boolean).join(", ");
      const workplace = normalizeWorkplace(item.workplaceType);
      const compensation = item.compensation as Record<string, unknown> | undefined;
      const salarySummary = compensation?.scrapeableCompensationSalarySummary;
      const salaryParts = Array.isArray(compensation?.summaryComponents) ? compensation.summaryComponents as Array<Record<string, unknown>> : [];
      const salaryPart = salaryParts.find((part) => part.compensationType === "Salary");
      const structuredSalary = salaryPart ? {
        minimum: typeof salaryPart.minValue === "number" ? salaryPart.minValue : undefined,
        maximum: typeof salaryPart.maxValue === "number" ? salaryPart.maxValue : undefined,
        currency: typeof salaryPart.currencyCode === "string" ? salaryPart.currencyCode : undefined,
        summary: typeof salarySummary === "string" ? salarySummary : undefined,
      } : undefined;
      return {
        sourceId: `ashby:${slug}`,
        sourceName: `Ashby · ${label}`,
        externalId: String(item.id ?? sourceUrl),
        title,
        company: label,
        region: location,
        workplace,
        employmentType: normalizeEmploymentType(item.employmentType),
        level: inferLevel(title),
        description,
        descriptionCompleteness: description ? "full" : "missing",
        sourceUrl,
        applyUrl,
        applicationEmail: inferApplicationEmail(description),
        postedAt: typeof item.publishedAt === "string" ? item.publishedAt : undefined,
        refreshedAt: new Date().toISOString(),
        department: cleanText(item.department),
        team: cleanText(item.team),
        salary: structuredSalary ?? (typeof salarySummary === "string" && salarySummary ? { summary: salarySummary } : undefined),
        sourceLinks: [{ id: `ashby:${slug}`, name: "Ashby", jobUrl: sourceUrl, applyUrl }],
      };
    }).filter((job): job is JobPosting => job !== null && matchesSearchQuery(job, query));
  }));
  return batches.flat();
}

function normalizeWorkplace(value: unknown): JobPosting["workplace"] {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized === "remote") return "remote";
  if (normalized === "hybrid") return "hybrid";
  if (normalized === "onsite" || normalized === "on-site") return "onsite";
  return undefined;
}
