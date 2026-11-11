import { JobSearchPage } from "@/components/job-search-page";
import { searchJobSources } from "@/lib/extensions/search";
import type { SearchQuery } from "@/lib/extensions/contracts";

type SearchValue = string | string[] | undefined;
type SearchParams = Record<string, SearchValue>;

export default async function JobsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  const initial = { role: value("role"), region: value("region"), workplace: value("workplace"), level: value("level"), type: value("type"), posted: value("posted"), salary: value("salary"), currency: value("currency") };
  const query: SearchQuery = {
    role: initial.role || undefined,
    region: initial.region || undefined,
    workplace: isWorkplace(initial.workplace) ? initial.workplace : undefined,
    level: isLevel(initial.level) ? initial.level : undefined,
    employmentType: isEmploymentType(initial.type) ? initial.type : undefined,
    postedWithin: isPostedWindow(initial.posted) ? initial.posted : undefined,
    minimumSalary: initial.salary && Number.isFinite(Number(initial.salary)) ? Number(initial.salary) : undefined,
    currency: initial.salary && initial.currency ? initial.currency : undefined,
    remoteWorldwide: initial.workplace === "remote",
  };
  const hasSearch = Object.values(query).some((item) => item !== undefined && item !== false);
  const results = hasSearch ? await searchJobSources(query) : { jobs: [], sources: [] };
  return <JobSearchPage initial={initial} jobs={results.jobs} sources={results.sources} hasSearched={hasSearch} />;
}

function isWorkplace(value: string): value is NonNullable<SearchQuery["workplace"]> { return ["remote", "onsite", "hybrid"].includes(value); }
function isLevel(value: string): value is NonNullable<SearchQuery["level"]> { return ["internship", "entry", "mid", "advanced"].includes(value); }
function isEmploymentType(value: string): value is NonNullable<SearchQuery["employmentType"]> { return ["full-time", "part-time", "contract", "temporary", "internship"].includes(value); }
function isPostedWindow(value: string): value is NonNullable<SearchQuery["postedWithin"]> { return ["day", "week", "month"].includes(value); }
