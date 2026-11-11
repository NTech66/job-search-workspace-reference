---
title: Job Search Workspace — Roadmap and Acceptance
created: 2026-11-11
status: proposed roadmap
aliases: [Roadmap and Acceptance]
tags: [job-search, roadmap, acceptance]
---

# Roadmap and Acceptance

## Milestone 0 — Feasibility and legal gates

Deliver source compatibility research, extension safety model, data-flow map, and Egypt legal/provider review. Use synthetic data only; no live submissions.

**Accept when:** every initial source has official evidence and a capability decision; the provider/data route is approved or the production gate stays closed; owner review steps are documented.

## Milestone 1 — Accounts and materials

Deliver sign-up/sign-in, bilingual onboarding, profile editing, private file management, verified profile facts, and account isolation.

**Accept when:** account A cannot read account B's profile/files; file links expire; file replacement preserves versions; Arabic and English profile flows work.

## Milestone 2 — Extensions and unified search

Deliver versioned manifests, staged submissions, automated checks, owner approval, user install/permissions, fixture extension, normalized listing view, filters, URL state, dedupe, freshness, and source errors.

**Accept when:** unapproved/revoked extensions never execute; local-region and global-remote filters work; duplicates retain source links; counts reflect actual results; source outages are visible.

## Milestone 3 — Application preparation and automation

Deliver user rules, source capability checks, approved templates, AI adapter, background queue, pause questions, idempotency, and history.

**Accept when:** only matching jobs are queued; missing answers pause before outbound submission; retries cannot duplicate; unsupported sources are manual links; extension and file versions are recorded.

## Milestone 4 — Community catalog and operational readiness

Deliver contributor submission, review feedback, publication, user opt-in, update/revoke/rollback, notifications, monitoring, and accessibility review.

**Accept when:** submitted packages remain inert until approved and signed; permission changes renew user choice; failed submissions do not appear successful; Egypt legal and data-location gate passes before live use.

## Measures

Track actual freshness, source error rate, duplicate rate, paused applications, submission outcomes, queue age, and review backlog. Do not invent target metrics before a pilot baseline exists. Keep early beta opt-in and use synthetic accounts/listings for end-to-end tests.

