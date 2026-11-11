---
title: Job Search Workspace — Technical Architecture
created: 2026-11-11
status: proposed architecture
aliases: [Technical Architecture]
tags: [job-search, architecture, security]
---

# Technical Architecture

## Recommended stack

- Web app: Next.js 16, TypeScript, App Router.
- Account/data foundation: Supabase Auth and Postgres with row-level security (RLS).
- User files: private Supabase Storage buckets with per-user policies and short-lived signed links.
- Background tasks: Supabase Queues and a separate worker for source refresh and application work.
- AI: an AiAnswerProvider adapter. Select the production provider only after Egypt privacy, retention, and data-transfer review; use a fake provider in tests.

Official references: [Next.js support policy](https://nextjs.org/support-policy), [Supabase Auth](https://supabase.com/docs/guides/auth), [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [private storage buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals), [Queues](https://supabase.com/docs/guides/queues).

## Region constraint

Supabase's current [region list](https://supabase.com/docs/guides/platform/regions) does not list Egypt. Region selection controls data location but is not itself proof of legal compliance. Do not store production CVs or submit live applications until Egypt-specific counsel approves the provider, region, processors, and transfer arrangement. Keep database, storage, auth, AI, and queue behind adapters so a rejected provider can be replaced.

## System boundaries

1. **Web app:** authentication, profile, files, search, rules, extension catalog, applications.
2. **Postgres:** profile, preferences, normalized listings, source links, extension metadata/review state, applications, consent records, queue metadata.
3. **Private object storage:** CVs, certificates, and portfolio files. Store private object keys, never public URLs.
4. **Extension runtime:** isolated workers with declared capabilities and host allowlists; no direct database access.
5. **AI provider adapter:** receives only fields needed for one application answer; output is checked against known user facts.
6. **Background queue:** deduplicated refresh/application work with retry limits, idempotency, and observable outcomes.

## Data ownership

Every user-owned row has a user_id and is protected by RLS. Service/admin operations use separate server-only credentials and role checks. Never expose service keys or job-board credentials in browser code. Encrypt transport and storage; operational logs retain identifiers and outcomes, not full CVs or answer contents.

## Main data concepts

- **ProfileFact:** verified value, origin (user-entered/file), verification time, optional expiry.
- **UserFile:** owner, private object key, type, filename, version, upload time, deletion state.
- **JobPosting:** source ID, external ID, title, company, locations, workplace mode, employment type, seniority, canonical URL, posted and refreshed times, and permitted source reference.
- **Extension:** manifest, version, submitter, review state, allowed hosts, capabilities, check results, release signature.
- **Application:** owner, normalized job, selected file version, state, idempotency key, missing questions, source reference, timestamps, safe error code.

## Reliability and observability

Each extension call has a timeout and bounded retries. Source failures update extension health and freshness but do not silently erase previously verified listings. Metrics must come from actual records; never hard-code sample counts. Track queue depth, source failures, pauses, and outcomes without retaining unnecessary application content.
