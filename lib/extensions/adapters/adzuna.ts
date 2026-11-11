import type { JobPosting, SearchQuery } from "../contracts";
import { parseAdzunaMarkets } from "./config";
import { cleanText, fetchJson, inferApplicationEmail, inferLevel, inferWorkplace, matchesSearchQuery, safeHttpsUrl } from "./shared";

interface AdzunaResponse { results?: Array<Record<string, unknown>> }

export function isAdzunaConfigured() {
  return Boolean(process.env.ADZUNA_APP_ID && process.env.ADZUNA_APP_KEY && parseAdzunaMarkets(process.env.ADZUNA_MARKETS).length);
}

export async function searchAdzuna(query: SearchQuery): Promise<JobPosting[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  const markets = parseAdzunaMarkets(process.env.ADZUNA_MARKETS);
  if (!appId || !appKey || markets.length === 0) return [];

  const results = await Promise.all(markets.map(async ({ country, currency }) => {
    const url = new URL(`https://api.adzuna.com/v1/api/jobs/${country}/search/1`);
    url.searchParams.set("app_id", appId);
    url.searchParams.set("app_key", appKey);
    url.searchParams.set("content-type", "application/json");
    url.searchParams.set("results_per_page", "20");
    if (query.role) url.searchParams.set("what", query.workplace === "remote" ? `${query.role} remote` : query.role);
    if (query.region && query.workplace !== "remote") url.searchParams.set("where", query.region);
    if (query.minimumSalary !== undefined && (!query.currency || query.currency === currency)) url.searchParams.set("salary_min", String(query.minimumSalary));
    if (query.employmentType === "full-time") url.searchParams.set("full_time", "1");
    if (query.employmentType === "part-time") url.searchParams.set("part_time", "1");
    if (query.postedWithin) url.searchParams.set("max_days_old", query.postedWithin === "day" ? "1" : query.postedWithin === "week" ? "7" : "30");
    const data = await fetchJson<AdzunaResponse>(url.toString());
    return (data.results ?? []).map((item): JobPosting | null => {
      const description = cleanText(item.description);
      const title = cleanText(item.title);
      const sourceUrl = safeHttpsUrl(item.redirect_url);
      if (!sourceUrl || !title) return null;
      const id = String(item.id ?? sourceUrl);
      const workplace = inferWorkplace(`${title} ${description}`);
      return {
        sourceId: "adzuna",
        sourceName: "Adzuna",
        externalId: `${country}:${id}`,
        title,
        company: cleanText((item.company as Record<string, unknown> | undefined)?.display_name),
        region: cleanText((item.location as Record<string, unknown> | undefined)?.display_name),
        workplace,
        employmentType: normalizeAdzunaEmployment(item.contract_time, item.contract_type),
        level: inferLevel(title),
        description,
        descriptionCompleteness: description ? "snippet" : "missing",
        sourceUrl,
        applicationEmail: inferApplicationEmail(description),
        postedAt: typeof item.created === "string" ? item.created : undefined,
        refreshedAt: new Date().toISOString(),
        salary: typeof item.salary_min === "number" || typeof item.salary_max === "number"
          ? { minimum: numeric(item.salary_min), maximum: numeric(item.salary_max), currency }
          : undefined,
        sourceLinks: [{ id: `adzuna:${country}`, name: "Adzuna", jobUrl: sourceUrl, attributionUrl: new URL(sourceUrl).origin }],
      };
    }).filter((job): job is JobPosting => job !== null && matchesSearchQuery(job, query));
  }));
  return results.flat();
}

function normalizeAdzunaEmployment(time: unknown, type: unknown): JobPosting["employmentType"] {
  const normalized = `${String(time ?? "")} ${String(type ?? "")}`.toLowerCase();
  if (normalized.includes("part_time")) return "part-time";
  if (normalized.includes("full_time")) return "full-time";
  if (normalized.includes("contract")) return "contract";
  if (normalized.includes("temporary")) return "temporary";
  return undefined;
}

function numeric(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}
