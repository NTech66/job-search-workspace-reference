---
title: Job Search Workspace — Source Compatibility Matrix
created: 2026-11-11
status: research template
aliases: [Source Compatibility Matrix]
tags: [job-search, sources, research]
---

# Source Compatibility Matrix

Use this note to evaluate a source before creating or approving an extension. Do not mark a capability supported without current official documentation or written authorization. Re-check at implementation because platform terms and APIs change.

| Source | Official API/partner docs | Search | Refresh | Apply | Auth method | Regions | Rate limits | Terms reviewed | Last checked | Decision/evidence |
|---|---|---:|---:|---:|---|---|---|---|---|---|
| Research required | | | | | | | | | | |

## Evidence checklist

- Official developer docs, partner documentation, or terms page.
- Whether search/retrieval and caching/retention are permitted.
- Whether automated form submission is permitted and supported.
- Authentication scope, token handling, and user permission requirements.
- Regions, languages, currencies, location/work-mode fields, and refresh limits.
- Attribution, canonical links, deletion behavior, and rate limits.
- Fixtures for listing variants, stale/closed cases, and errors.

## Approval rule

Decide separately for search, refresh, and submission. If there is no permitted submission path, mark manual_link. Never infer one capability from another. See [[05 - Extension System]] and [[08 - Roadmap and Acceptance]].

