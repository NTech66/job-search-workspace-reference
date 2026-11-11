import type { JobPosting, SearchQuery } from "../contracts";
import { parseBoards } from "./config";
import { cleanText, fetchJson, inferApplicationEmail, inferLevel, inferWorkplace, matchesSearchQuery, normalizeEmploymentType, safeHttpsUrl } from "./shared";

interface GreenhouseBoard { name?: string; jobs?: Array<Record<string, unknown>> }

export function getGreenhouseBoards() { return parseBoards(process.env.GREENHOUSE_BOARDS); }
export function isGreenhouseConfigured() { return getGreenhouseBoards().length > 0; }

export async function searchGreenhouse(query: SearchQuery): Promise<JobPosting[]> {
  const boards = getGreenhouseBoards();
  const batches = await Promise.all(boards.map(async ({ slug, label }) => {
    const board = await fetchJson<GreenhouseBoard>(`https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(slug)}/jobs?content=true`);
    const company = cleanText(board.name) || label;
    return (board.jobs ?? []).map((item): JobPosting | null => {
      const title = cleanText(item.title);
      const description = cleanText(item.content);
      const sourceUrl = safeHttpsUrl(item.absolute_url);
      if (!title || !sourceUrl) return null;
      const location = cleanText((item.location as Record<string, unknown> | undefined)?.name);
      const metadata = Array.isArray(item.metadata) ? item.metadata as Array<Record<string, unknown>> : [];
      const type = metadata.find((entry) => /employment|commitment|job type/i.test(String(entry.name ?? "")))?.value;
      return {
        sourceId: `greenhouse:${slug}`,
        sourceName: `Greenhouse · ${company}`,
        externalId: String(item.id ?? sourceUrl),
        title,
        company: cleanText(item.company_name) || company,
        region: location,
        workplace: inferWorkplace(`${title} ${description} ${location}`),
        employmentType: normalizeEmploymentType(type),
        level: inferLevel(title),
        description,
        descriptionCompleteness: description ? "full" : "missing",
        sourceUrl,
        applyUrl: sourceUrl,
        applicationEmail: inferApplicationEmail(description),
        postedAt: typeof item.first_published === "string" ? item.first_published : undefined,
        refreshedAt: new Date().toISOString(),
        department: cleanText((item.departments as Array<Record<string, unknown>> | undefined)?.map((part) => part.name).filter(Boolean).join(", ")) || undefined,
        sourceLinks: [{ id: `greenhouse:${slug}`, name: "Greenhouse", jobUrl: sourceUrl, applyUrl: sourceUrl }],
      };
    }).filter((job): job is JobPosting => job !== null && matchesSearchQuery(job, query));
  }));
  return batches.flat();
}
