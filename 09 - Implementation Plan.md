---
title: Job Search Workspace — Implementation Plan
created: 2026-11-11
status: phased plan with search preview implemented
aliases: [Implementation Plan]
tags: [job-search, implementation-plan]
---

# Job Search Workspace Implementation Plan

> This remains the build plan for the full service. A local preview and first-party search adapters are now implemented; accounts, profile storage, community extension execution, AI, and submissions remain planned.

## Implemented preview slice

- Next.js bilingual interface and URL-backed job filters.
- Server-side adapters for Adzuna (configured markets) and configured public Greenhouse, Lever, and Ashby employer boards.
- Manual search link-outs for LinkedIn and Indeed pending appropriate partner authorization.
- Unified listing cards that show the job description (and whether it is a snippet), employer, source and application links, posted date, workplace/type/level/salary when available, and explicit unavailable contact fields.
- Source-specific errors, source link retention on deduplicated listings, and server-only API credential configuration.

See [[10 - Source Adapters and Result Fields]] and [[References/Source Compatibility Matrix]].

## Goal and architecture

Build a bilingual, independently hosted job-search workspace with private profiles/files, a reviewed in-app extension catalog, unified listings, and rule-based AI-assisted auto-apply that pauses rather than guesses.

Recommended foundation: Next.js 16 + TypeScript App Router; Supabase Auth and Postgres/RLS; private Storage; Queues with a separate worker. Keep storage, AI, email, and source integrations behind adapters. Production provider/region is an Egypt legal gate because the current Supabase list does not include Egypt. See [[04 - Technical Architecture]] and [[07 - Egypt Privacy and Localization]].

## Global constraints

- No production CVs or live applications until Egypt counsel approves the provider and data flow.
- Every user-owned row and file is private; authorize server-side and in RLS.
- Extensions are approved, versioned, signed, capability-limited, and host-allowlisted.
- Search and submit are independent capabilities; never infer submission support.
- AI answers use profile facts and approved templates; missing/unclear answers pause.
- No CAPTCHA solving, access-control bypass, fabricated source data, or fabricated metrics.
- Support Arabic/English, RTL/LTR, keyboard navigation, and loading/empty/error/full states.

## Build tasks

### Task 1 — Scaffold and readiness boundary

Create the Next.js app, local/dev configuration, database migrations, environment validation, typed provider interfaces, and a production feature flag that blocks real data/submissions until legal approval. Add the data-flow note and source compatibility template.

**Check:** synthetic fixtures run locally; production mode refuses uploads/submissions unless the launch gate is approved.

### Task 2 — Accounts, profile, and private files

Implement email sign-up/sign-in/recovery, profile facts, file metadata/versioning, private upload/download/delete, and RLS. Keep file contents out of logs. Create Arabic and English onboarding/profile screens.

**Check:** cross-account access fails closed; signed links expire; profile edits/file replacement persist in both languages.

### Task 3 — Extension SDK, catalog, and review lifecycle

Implement ExtensionManifest, JobSourceExtension, and AnswerTemplateExtension from [[05 - Extension System]]. Add staged submission, validation/scanning, owner review, signed release, per-user enablement, grants, revoke, and rollback. Submitted code remains inert.

**Check:** only approved signed versions execute; hosts outside manifest are blocked; revocation blocks new calls; templates cannot grant code capabilities.

### Task 4 — Listing ingestion and unified search

Extend the preview adapters with additional officially permitted sources, source policy review, canonical links and freshness rules. Preserve every source URL when duplicates merge. Treat unknown contact, workplace, salary, level, or employment data as unavailable instead of guessing. Keep local-region and worldwide-remote behavior distinct.

**Check:** fixtures cover local region, worldwide remote, all workplace modes, missing optional salary, cross-source duplicates, stale/closed entries, and partial outages.

### Task 5 — Rules, AI, and application queue

Implement application state machine, eligibility re-check immediately before submission, queue/idempotency, source capability gate, AI provider adapter, evidence mapping, pause reasons, and history. Send only fields needed for the specific answer.

**Check:** nonmatching jobs never queue; missing required question returns needs_user_input with zero outbound submit calls; retry does not double-submit; unsupported sources are manual_link; success requires source confirmation.

### Task 6 — Bilingual UI, accessibility, and operations

Build discover, details, profile/files, applications, extension catalog, and owner review screens using Hallmark app-screen guidance. Add Arabic RTL, English LTR, consent choices, keyboard/focus states, loading/empty/error/full UI, notifications, safe errors, and measured operations views.

**Check:** critical workflows pass keyboard-only review; Arabic/English layouts work; no placeholder metrics appear as real; labels expose filters, application states, and extension permissions.

### Task 7 — Staged rollout

Run security review, source policy review, Egypt legal/provider sign-off, and synthetic end-to-end tests. Start with an opt-in beta; enable live auto-apply only for individually approved sources and opted-in users. Monitor source failures, queue age, pauses, duplicates, outcomes, and revocations.

**Check:** rollback restores prior approved extension version; outage/retry drills do not create false success or duplicates; launch gates are signed before enabling real data.

## Core contract

~~~ts
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

Use [[05 - Extension System]] as the contract source of truth.

## Review focus

- Cross-account access through direct URLs, server actions, signed links, and background jobs.
- Malicious extension/template content, prompt injection, and host-scope changes.
- Duplicate/stale listings when sources disagree or a retry occurs.
- Missing hirer contact or application-email data; the UI must show it as not provided rather than infer it.
- Submission accepted by a source but not acknowledged to the worker.
- Arabic RTL in filters, consent, statuses, and missing-question flows.
