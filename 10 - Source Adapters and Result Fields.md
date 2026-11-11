---
title: Job Search Workspace — Source Adapters and Result Fields
created: 2026-11-11
status: implemented preview scope
aliases: [Source Adapters, Result Fields]
tags: [job-search, providers, extensions, listings]
---

# Source Adapters and Result Fields

This note records the first provider implementation in `lib/extensions/adapters/` and the source boundaries that govern what the app may show. The compatibility matrix in [[References/Source Compatibility Matrix]] holds the official evidence.

## Source types in the preview

| Source | Adapter behavior | Configuration | Result behavior |
|---|---|---|---|
| Adzuna | Server-side API search by configured country markets | `ADZUNA_APP_ID`, `ADZUNA_APP_KEY`, `ADZUNA_MARKETS` | Uses the provider's title, employer, location, description snippet, posting date, salary where available, and redirect URL. The result retains Adzuna attribution. |
| Greenhouse | Server-side public job-board GET for each configured company board | `GREENHOUSE_BOARDS=slug:Company Label,...` | Uses public job title, board/company name, location, description, publication date, and hosted posting URL. Search only covers configured employers. |
| Lever | Server-side public Postings API for each configured company site | `LEVER_SITES=slug:Company Label,...` | Uses published postings, description, location, workplace/type fields when exposed, posting date, salary if structured, and hosted/apply URLs. |
| Ashby | Server-side public job-board API for each configured organization | `ASHBY_BOARDS=slug:Company Label,...` | Uses listed published postings, workplace/employment metadata, description, optional compensation, and the job/apply URLs supplied by the board. |
| LinkedIn | Manual search link with the current role/region terms | No app credential | Opens LinkedIn Jobs directly. The app does not scrape, parse authenticated pages, or claim to have imported LinkedIn listings. |
| Indeed | Manual search link with the current role/region terms | No app credential | Opens Indeed directly. The app does not scrape, replicate the results, or use Indeed APIs without the relevant partner approval. |

## Configuration

Only the site operator adds credentials or board identifiers to the server environment. Secrets are not sent to the browser and must never be put in `NEXT_PUBLIC_*` variables. Board configuration is a list of public employer board slugs; it is not a directory of all employers using that ATS. Adzuna market codes must be verified against the API account; Egypt market availability is not assumed.

Each source fails independently. The server returns a status per source, and a provider outage does not hide results from working sources. User search values are encoded by URL and never used to construct an arbitrary API hostname.

## Unified listing fields

- **Role and employer:** provider title and company/board identity when present.
- **Hirer name and hirer email:** structured fields only. Display “Not provided in this listing” when absent. Never derive a person from a company or guess an email address.
- **Description:** preserve the source text as escaped/plain text; mark full content, snippet, or missing. Adzuna currently documents snippet descriptions, so the card labels that limitation.
- **Job ad URL:** the provider's canonical/redirect listing URL, with source links retained during deduplication.
- **Application destination:** provider-supplied application URL when present. Link-out is not a successful application and does not enable auto-submission.
- **Application email:** shown only if the description explicitly includes an application instruction and address. It is not treated as the hirer’s personal email.
- **Other fields:** location, workplace, employment type, job level from title indicators, posting date, salary/currency if usable, department/team, source identity, and refresh time.

When sources disagree on fields, the merged card preserves every source URL. A duplicate's fresher posting date is shown, and the longest available description is retained. Do not imply a value is verified when it came from a title-based level classification.

## Known limitations and next gates

- No universal job-board API exists in this preview. Adzuna markets and employer-owned ATS boards form the current API coverage; new companies need board identifiers.
- LinkedIn and Indeed remain manual-only pending official authorization for this specific aggregator use case.
- Public source APIs do not provide the hirer name or a dedicated hiring email in their documented search responses. The UI therefore leaves those fields explicitly unavailable.
- Auto-apply, profile storage, account management, and file storage remain disabled. Add any submission adapter as a separately approved capability with source-specific permission and duplicate prevention.
- Extension code upload/execution is not implemented. These are first-party, server-side adapters; community submissions remain inert until the reviewed runtime and publication flow are built.

See [[05 - Extension System]], [[06 - AI Applications and Safety]], [[08 - Roadmap and Acceptance]], and [[09 - Implementation Plan]].
