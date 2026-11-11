import type { JobPosting, SearchQuery } from "../contracts";

export function cleanText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<\/(p|div|li|h[1-6]|br|section|article)>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s+/g, "\n")
    .trim();
}

export function safeHttpsUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function inferWorkplace(text: string): JobPosting["workplace"] {
  if (/\b(hybrid|partly remote|partially remote)\b/i.test(text)) return "hybrid";
  if (/\b(fully remote|remote[- ]first|remote (?:position|role|work)|work from (?:anywhere|home)|distributed team|\bwfh\b)\b/i.test(text)) return "remote";
  if (/\b(on[- ]?site|in[- ]office|office[- ]based|work from (?:the )?office)\b/i.test(text)) return "onsite";
  return undefined;
}

export function inferLevel(title: string): JobPosting["level"] {
  if (/\b(intern|internship|co[- ]?op)\b/i.test(title)) return "internship";
  if (/\b(entry[- ]level|junior|graduate|new grad|associate)\b/i.test(title)) return "entry";
  if (/\b(mid[- ]level|intermediate)\b/i.test(title)) return "mid";
  if (/\b(senior|sr\.?|staff|principal|lead|director|head of|chief)\b/i.test(title)) return "advanced";
  return undefined;
}

export function inferApplicationEmail(description: string): string | undefined {
  const cue = /(?:apply|send|email|submit)[^.!?\n]{0,90}\b(?:application|resume|résumé|cv|yourself|directly|email|mailto)\b[^.!?\n]{0,90}/gi;
  for (const match of description.matchAll(cue)) {
    const email = match[0].match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
    if (email) return email;
  }
  return undefined;
}

export function matchesSearchQuery(job: JobPosting, query: SearchQuery): boolean {
  if (query.workplace && job.workplace !== query.workplace) return false;
  if (query.level && job.level !== query.level) return false;
  if (query.employmentType && job.employmentType !== query.employmentType) return false;
  if (query.region && query.workplace !== "remote" && !job.region?.toLocaleLowerCase().includes(query.region.toLocaleLowerCase())) return false;
  if (query.minimumSalary !== undefined) {
    if (!job.salary || (query.currency && job.salary.currency !== query.currency)) return false;
    const maximumKnown = job.salary.maximum ?? job.salary.minimum;
    if (maximumKnown === undefined || maximumKnown < query.minimumSalary) return false;
  }
  if (query.postedWithin) {
    if (!job.postedAt) return false;
    const age = Date.now() - new Date(job.postedAt).getTime();
    const windowMs = query.postedWithin === "day" ? 86_400_000 : query.postedWithin === "week" ? 604_800_000 : 2_592_000_000;
    if (!Number.isFinite(age) || age < 0 || age > windowMs) return false;
  }
  if (query.role) {
    const haystack = `${job.title} ${job.company} ${job.description}`.toLocaleLowerCase();
    const terms = query.role.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.every((term) => haystack.includes(term))) return false;
  }
  return true;
}

export function normalizeEmploymentType(value: unknown): JobPosting["employmentType"] {
  const text = String(value ?? "").toLowerCase();
  if (/intern|co.?op/.test(text)) return "internship";
  if (/part.?time/.test(text)) return "part-time";
  if (/contract|freelance/.test(text)) return "contract";
  if (/temporary|temp/.test(text)) return "temporary";
  if (/full.?time|permanent/.test(text)) return "full-time";
  return undefined;
}

export async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(8_000) });
  if (!response.ok) throw new Error(`source_http_${response.status}`);
  return response.json() as Promise<T>;
}
