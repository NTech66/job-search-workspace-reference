---
title: Job Search Workspace — Extension System
created: 2026-11-11
status: proposed contract
aliases: [Extension System]
tags: [job-search, extensions, marketplace, security]
---

# Extension System

## Purpose and capabilities

Extensions are modules inside the product, not browser add-ons. They let the platform add job sources and features without changing core search for each source.

- jobs.search — find and normalize listings.
- jobs.refresh — refresh source status/details.
- applications.submit — submit through a source-permitted method.
- answers.templates — provide reusable answer templates as data.

A source may provide search without submission. The app never assumes one capability implies another.

## Initial TypeScript contract

~~~ts
type ExtensionCapability =
  | "jobs.search"
  | "jobs.refresh"
  | "applications.submit"
  | "answers.templates";

interface ExtensionManifest {
  id: string;
  version: string;
  capabilities: ExtensionCapability[];
  permittedHosts: string[];
  reviewState: "submitted" | "approved" | "rejected" | "revoked";
}

interface JobSourceExtension {
  search(input: SearchQuery): Promise<JobPosting[]>;
  refresh?(input: RefreshQuery): Promise<JobPosting[]>;
  submit?(input: ApplicationPayload): Promise<SubmissionResult>;
}

interface AnswerTemplateExtension {
  listTemplates(input: TemplateQuery): Promise<AnswerTemplate[]>;
}

type SubmissionResult =
  | { status: "submitted"; externalReference?: string }
  | { status: "needs_user_input"; missingQuestions: string[] }
  | { status: "failed"; reasonCode: string };
~~~

The core app owns the canonical definitions of SearchQuery, JobPosting, RefreshQuery, ApplicationPayload, TemplateQuery, and AnswerTemplate. Validate each package against the matching SDK version before review or execution.

## Submission and review lifecycle

draft → submitted → automated checks → owner review → approved/rejected → published → update/re-review → revoked or rolled back.

- Community contributors can submit source code packages or data-only answer templates.
- Staged submissions are inert. Automated checks cover schema, dependencies/license, secrets, static checks, and fixture tests.
- Owner review checks source permission, host scope, requested capabilities, data exposure, and user-facing claims.
- Approved code is signed and released through controlled deployment. Never evaluate arbitrary submitted code in the web app process.
- Each user installs an approved extension and grants its declared capabilities. Permission changes require a new reviewed version and renewed user choice.
- Revocation disables new work; rollback restores a prior approved version and records the event.

## Runtime boundary

- Run code in an isolated worker with outbound host allowlists and resource/time limits.
- Provide a narrow typed context, not raw database clients, service credentials, all profile data, or filesystem access.
- Pass only the selected source credential and minimum job/application data required for the capability.
- Treat templates, job descriptions, and extension output as untrusted content. They cannot override app rules or establish personal facts.
- No CAPTCHA solving or access-control bypass. A source without approved submission remains link-out/manual.

## Compatibility

Each release declares a minimum core SDK version and migration note. Older enabled versions are supported during a documented window or disabled with a clear reason. Application history retains the extension version used.

