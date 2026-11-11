import type { JobPosting, SearchQuery } from "../contracts";
import { parseBoards } from "./config";
import { cleanText, fetchJson, inferApplicationEmail, inferLevel, inferWorkplace, matchesSearchQuery, normalizeEmploymentType, safeHttpsUrl } from "./shared";

export function getLeverSites() { return parseBoards(process.env.LEVER_SITES); }
export function isLeverConfigured() { return getLeverSites().length > 0; }

export async function searchLever(query: SearchQuery): Promise<JobPosting[]> {
  const sites = getLeverSites();
  const batches = await Promise.all(sites.map(async ({ slug, label }) => {
    const postings = await fetchJson<Array<Record<string, unknown>>>(`https://api.lever.co/v0/postings/${encodeURIComponent(slug)}?mode=json`);
    return postings.map((item): JobPosting | null => {
      const title = cleanText(item.text);
      const description = cleanText(item.descriptionPlain ?? item.description);
      const sourceUrl = safeHttpsUrl(item.hostedUrl);
      const applyUrl = safeHttpsUrl(item.applyUrl);
      if (!title || !sourceUrl) return null;
      const categories = item.categories as Record<string, unknown> | undefined;
      const location = cleanText(categories?.location);
      const workplace = normalizeWorkplace(item.workplaceType) ?? inferWorkplace(`${title} ${description} ${location}`);
      const compensation = item.salaryRange as Record<string, unknown> | undefined;
      const salary = normalizeSalary(compensation);
      return {
        sourceId: `lever:${slug}`,
        sourceName: `Lever · ${label}`,
        externalId: String(item.id ?? sourceUrl),
        title,
        company: label,
        region: location,
        workplace,
        employmentType: normalizeEmploymentType(categories?.commitment),
        level: inferLevel(title),
        description,
        descriptionCompleteness: description ? "full" : "missing",
        sourceUrl,
        applyUrl,
        applicationEmail: inferApplicationEmail(description),
        postedAt: typeof item.createdAt === "number" ? new Date(item.createdAt).toISOString() : undefined,
        refreshedAt: new Date().toISOString(),
        department: cleanText(categories?.department),
        team: cleanText(categories?.team),
        salary,
        sourceLinks: [{ id: `lever:${slug}`, name: "Lever", jobUrl: sourceUrl, applyUrl }],
      };
    }).filter((job): job is JobPosting => job !== null && matchesSearchQuery(job, query));
  }));
  return batches.flat();
}

function normalizeWorkplace(value: unknown): JobPosting["workplace"] {
  const normalized = String(value ?? "").toLowerCase();
  if (normalized.includes("remote")) return "remote";
  if (normalized.includes("hybrid")) return "hybrid";
  if (normalized.includes("onsite") || normalized.includes("on-site")) return "onsite";
  return undefined;
}

function normalizeSalary(value: Record<string, unknown> | undefined): JobPosting["salary"] {
  const currency = typeof value?.currency === "string" ? value.currency : "";
  const min = typeof value?.min === "number" ? value.min : undefined;
  const max = typeof value?.max === "number" ? value.max : undefined;
  return currency && (min !== undefined || max !== undefined) ? { minimum: min, maximum: max, currency } : undefined;
}
