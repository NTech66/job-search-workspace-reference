---
title: Job Search Workspace — Requirements and Journeys
created: 2026-11-11
status: product requirements
aliases: [Requirements and Journeys]
tags: [job-search, requirements, journeys]
---

# Requirements and Journeys

## Account and profile

- Sign up, sign in, sign out, recover access, and manage account preferences.
- Edit contact details, role history, skills, education, qualifications, links, verified facts, and job preferences.
- Keep user-provided facts distinguishable from AI-written wording; do not silently rewrite the source facts.

## Private file manager

- Upload, view, rename, organize, replace, and remove CVs, certificates, portfolio links, and related materials.
- Keep files private to the account. An application records which file and version it used.
- Include export and deletion flows in the account lifecycle plan.

## Job discovery

- Let users choose one or more countries or regions for local roles.
- Include remote roles from every region returned by enabled source extensions.
- Filter by role/title; workplace mode (remote, on-site, hybrid); employment type (full-time, part-time, contract, internship, temporary where supplied); seniority (internship, entry-level, mid-level, senior/advanced); posting date; and salary when available.
- Store search/filter state in the URL, excluding private profile data.
- Show source, original listing link, last refresh time, and a clear match explanation.

## Applications

- Users define auto-apply rules from roles, locations, workplace mode, employment type, seniority, exclusions, and supported preferences.
- Auto-apply is opt-in and can be paused or disabled at any time.
- Use profile facts, the user-selected CV/materials, and owner-approved answer templates.
- Pause with the exact missing question when a required answer is absent or unclear.
- Record queued, submitted, needs-user-input, manual-link, and failed outcomes with source and timestamps.

## Primary journeys

1. **Set up:** create account → choose language → choose target regions and role preferences → enter profile facts → upload/select CV → review privacy choices.
2. **Discover:** search → refine filters → compare matched jobs → save/exclude a listing → open the original source.
3. **Enable a source:** inspect capabilities and permissions → connect a source account if needed → enable accepted capabilities.
4. **Enable auto-apply:** define filters → choose sources and materials → review what may be submitted → opt in → track results.
5. **Resolve a gap:** application pauses → inspect missing question → update a profile fact or answer → resume only when required information exists.
6. **Submit a contribution:** send extension/template → remain staged → automated checks and owner review → approve or reject with reason → publish approved version.

## Listing states

Listings may be current, stale, closed, or source-unavailable. Preserve source attribution. Do not present missing source data as verified. If sources disagree, retain source-specific values and make the difference visible.

## Application states

queued → submitting → submitted, needs_user_input, or failed. Unsupported sources use manual_link and must never appear as submitted. Queue retries use idempotency and cannot create duplicate submissions.
