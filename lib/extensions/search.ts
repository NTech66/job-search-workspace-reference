import type { JobPosting, SearchQuery, SearchSourceStatus } from "./contracts";
import { isAdzunaConfigured, searchAdzuna } from "./adapters/adzuna";
import { getAshbyBoards, isAshbyConfigured, searchAshby } from "./adapters/ashby";
import { getGreenhouseBoards, isGreenhouseConfigured, searchGreenhouse } from "./adapters/greenhouse";
import { getLeverSites, isLeverConfigured, searchLever } from "./adapters/lever";

export interface UnifiedSearchResult { jobs: JobPosting[]; sources: SearchSourceStatus[] }

export async function searchJobSources(query: SearchQuery): Promise<UnifiedSearchResult> {
  const descriptors = [
    { id: "adzuna", name: "Adzuna", configured: isAdzunaConfigured(), access: "api" as const, search: searchAdzuna },
    { id: "greenhouse", name: "Greenhouse", configured: isGreenhouseConfigured(), access: "configured_board" as const, search: searchGreenhouse },
    { id: "lever", name: "Lever", configured: isLeverConfigured(), access: "configured_board" as const, search: searchLever },
    { id: "ashby", name: "Ashby", configured: isAshbyConfigured(), access: "configured_board" as const, search: searchAshby },
  ];

  const results = await Promise.all(descriptors.map(async (source) => {
    if (!source.configured) {
      return { jobs: [] as JobPosting[], status: {
        id: source.id, name: source.name, access: source.access, configured: false,
        status: "needs_setup" as const, resultCount: 0,
      } };
    }
    try {
      const jobs = await source.search(query);
      return { jobs, status: {
        id: source.id, name: source.name, access: source.access, configured: true,
        status: "ready" as const, resultCount: jobs.length,
      } };
    } catch {
      return { jobs: [] as JobPosting[], status: {
        id: source.id, name: source.name, access: source.access, configured: true,
        status: "error" as const, resultCount: 0,
      } };
    }
  }));

  const searchedJobs = results.flatMap((result) => result.jobs);
  const jobs = mergeDuplicatePostings(searchedJobs);
  const searchUrl = buildManualSearchUrl(query);
  const sources: SearchSourceStatus[] = [
    ...results.map(({ status }) => status),
    { id: "linkedin", name: "LinkedIn", access: "link_out", configured: false, status: "manual_only", resultCount: 0, searchUrl: searchUrl.linkedin },
    { id: "indeed", name: "Indeed", access: "link_out", configured: false, status: "manual_only", resultCount: 0, searchUrl: searchUrl.indeed },
  ];
  return { jobs, sources };
}

export function configuredBoardSummary() {
  return {
    greenhouse: getGreenhouseBoards().length,
    lever: getLeverSites().length,
    ashby: getAshbyBoards().length,
    adzuna: isAdzunaConfigured(),
  };
}

function mergeDuplicatePostings(postings: JobPosting[]): JobPosting[] {
  const byKey = new Map<string, JobPosting>();
  for (const posting of postings) {
    const key = [posting.title, posting.company, posting.region ?? ""].map((value) => value.trim().toLowerCase()).join("|");
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, posting);
      continue;
    }
    const links = [...existing.sourceLinks, ...posting.sourceLinks];
    const uniqueLinks = [...new Map(links.map((link) => [`${link.id}|${link.jobUrl}`, link])).values()];
    const first = Date.parse(existing.postedAt ?? "") || 0;
    const second = Date.parse(posting.postedAt ?? "") || 0;
    const fresher = second > first ? posting : existing;
    byKey.set(key, {
      ...fresher,
      sourceLinks: uniqueLinks,
      description: (fresher.description.length >= existing.description.length ? fresher.description : existing.description),
      descriptionCompleteness: existing.descriptionCompleteness === "full" || posting.descriptionCompleteness === "full" ? "full" : fresher.descriptionCompleteness,
      refreshedAt: [existing.refreshedAt, posting.refreshedAt].sort().at(-1) ?? fresher.refreshedAt,
      applicationEmail: existing.applicationEmail ?? posting.applicationEmail,
      hiringContact: existing.hiringContact ?? posting.hiringContact,
    });
  }
  return [...byKey.values()].sort((a, b) => (Date.parse(b.postedAt ?? "") || 0) - (Date.parse(a.postedAt ?? "") || 0));
}

function buildManualSearchUrl(query: SearchQuery) {
  const keywords = [query.role, query.workplace === "remote" ? "remote" : ""].filter(Boolean).join(" ");
  const location = query.workplace === "remote" ? "" : query.region ?? "";
  const linkedin = new URL("https://www.linkedin.com/jobs/search/");
  const indeed = new URL("https://www.indeed.com/jobs");
  if (keywords) {
    linkedin.searchParams.set("keywords", keywords);
    indeed.searchParams.set("q", keywords);
  }
  if (location) {
    linkedin.searchParams.set("location", location);
    indeed.searchParams.set("l", location);
  }
  return { linkedin: linkedin.toString(), indeed: indeed.toString() };
}
