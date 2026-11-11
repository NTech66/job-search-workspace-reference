import { JobSearchPage } from "@/components/job-search-page";

type SearchValue = string | string[] | undefined;
type SearchParams = Record<string, SearchValue>;

export default async function JobsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const value = (key: string) => typeof params[key] === "string" ? params[key] as string : "";
  return <JobSearchPage initial={{ role: value("role"), region: value("region"), workplace: value("workplace"), level: value("level"), type: value("type"), posted: value("posted"), salary: value("salary"), currency: value("currency") }} />;
}
