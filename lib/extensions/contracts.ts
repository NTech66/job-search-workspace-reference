export type ExtensionCapability = "jobs.search" | "jobs.refresh" | "applications.submit" | "answers.templates";

export interface ExtensionManifest {
  id: string;
  version: string;
  capabilities: ExtensionCapability[];
  permittedHosts: string[];
  reviewState: "submitted" | "approved" | "rejected" | "revoked";
}

export interface SearchQuery {
  role?: string;
  region?: string;
  remoteWorldwide?: boolean;
  workplace?: "remote" | "onsite" | "hybrid";
  level?: "internship" | "entry" | "mid" | "advanced";
  employmentType?: "full-time" | "part-time" | "contract" | "temporary" | "internship";
  postedWithin?: "day" | "week" | "month";
  minimumSalary?: number;
  currency?: string;
}

export interface JobPosting {
  sourceId: string;
  sourceName: string;
  externalId: string;
  title: string;
  company: string;
  region?: string;
  workplace?: "remote" | "onsite" | "hybrid";
  employmentType?: SearchQuery["employmentType"];
  level?: SearchQuery["level"];
  description: string;
  descriptionCompleteness: "full" | "snippet" | "missing";
  sourceUrl: string;
  applyUrl?: string;
  applicationEmail?: string;
  hiringContact?: { name?: string; email?: string };
  postedAt?: string;
  refreshedAt: string;
  salary?: { minimum?: number; maximum?: number; currency?: string; summary?: string };
  department?: string;
  team?: string;
  sourceLinks: JobSourceReference[];
}

export interface JobSourceReference {
  id: string;
  name: string;
  jobUrl: string;
  applyUrl?: string;
  attributionUrl?: string;
}

export interface SearchSourceStatus {
  id: string;
  name: string;
  access: "api" | "configured_board" | "link_out";
  configured: boolean;
  status: "ready" | "needs_setup" | "manual_only" | "error";
  resultCount: number;
  message?: string;
  searchUrl?: string;
}

export interface RefreshQuery { externalIds: string[] }
export interface ApplicationPayload { job: JobPosting; profileFacts: Record<string, unknown>; idempotencyKey: string }
export type SubmissionResult =
  | { status: "submitted"; externalReference?: string }
  | { status: "needs_user_input"; missingQuestions: string[] }
  | { status: "failed"; reasonCode: string };

export interface AnswerTemplate { id: string; questionPattern: string; answerText: string; locale: "en" | "ar"; reviewed: boolean }
export interface TemplateQuery { locale?: "en" | "ar"; question?: string }

export interface JobSourceExtension {
  search(input: SearchQuery): Promise<JobPosting[]>;
  refresh?(input: RefreshQuery): Promise<JobPosting[]>;
  submit?(input: ApplicationPayload): Promise<SubmissionResult>;
}

export interface AnswerTemplateExtension {
  listTemplates(input: TemplateQuery): Promise<AnswerTemplate[]>;
}
