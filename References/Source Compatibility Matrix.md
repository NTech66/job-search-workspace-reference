---
title: Job Search Workspace — Source Compatibility Matrix
created: 2026-11-11
status: reviewed for preview implementation
aliases: [Source Compatibility Matrix]
tags: [job-search, sources, research]
---

# Source Compatibility Matrix

Checked against official documentation on 2026-11-11. This is a preview capability decision, not legal advice or a guarantee that a provider will approve a production integration. Re-check terms and API access before deployment.

| Source | Official documentation | Search | Refresh | Apply | Configuration / limits | Preview decision |
|---|---|---|---|---|---|---|
| Adzuna | [API overview](https://developer.adzuna.com/overview), [search endpoint](https://developer.adzuna.com/docs/search), [terms](https://developer.adzuna.com/docs/terms_of_service) | Yes, by configured country market with `app_id` and `app_key` | A new search retrieves current results; no separate refresh endpoint used | No; retain Adzuna redirect and manual application route | Country code, API keys, rate/plan limits; descriptions may be snippets; displayed ads require an Adzuna attribution link at least 116×23 px. Commercial use beyond a 14-day validation period or revenue/lead product requires a license agreement. | Implement server-side search adapter. Never expose credentials. Confirm country market and intended product usage with Adzuna; no Egypt-market support is assumed. |
| Greenhouse | [Job Board API](https://docs.greenhouse.io/job-board.html), [application endpoint](https://docs.greenhouse.io/job-board) | Yes, for employer board tokens explicitly configured by the operator. Public GET endpoints return jobs; `content=true` includes description. | Repeat GET of configured board | Manual link-out only in this app. The application POST uses an employer API key and the API docs warn it must be proxied server-side; it is not a general job-seeker credential. | Per-employer board token; no global discovery API in the documented Job Board API. Contact fields are not part of the documented job fields. | Implement configured employer-board search. Do not use an employer's submission credential or imply automated application support. |
| Lever | [Public Postings API overview](https://hire.lever.co/developer/support), [API docs](https://hire.lever.co/developer/documentation) | Yes, for explicitly configured public company sites through the Postings API | Repeat public Postings API search | Manual link-out to the posting's hosted/apply URL | Employer site name (slug); public Postings API is distinct from the authenticated Lever Data API. No cross-company directory is documented. Hirer name/email are not public posting fields in the documented search response. | Implement configured public postings only. No employer API keys or confidential data. |
| Ashby | [Public Job Postings API](https://developers.ashbyhq.com/docs/public-job-posting-api) | Yes, for configured organization board names; only published, listed posts | Repeat board request | Manual link-out using the provided job/apply URL | Public board name; compensation is optional. Workplace and employment type are provided when the employer has supplied them. Contact names/emails are not documented fields. | Implement configured public boards. Keep application submission off. |
| LinkedIn | [API access overview](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access), [Job Posting API overview](https://learn.microsoft.com/en-us/linkedin/talent/job-postings/api/overview) | No generally available job-seeker search API identified. The documented Job Posting API is for authorized partners to publish jobs, not search for them. LinkedIn says it is not accepting new Job Posting API partnerships. | None | None | Partner provisioning and agreements apply to the documented Talent job APIs. | Provide manual search links only. No scraping, session-cookie reuse, or listing replication. Revisit only with written approval for a relevant search integration. |
| Indeed | [Indeed developer docs](https://docs.indeed.com/), [developer agreement](https://docs.indeed.com/legal-terms/developer-agreement), [additional API terms](https://docs.indeed.com/legal-terms/additional-api-terms-and-guidelines) | Partner APIs exist for approved integration use cases. No generic search API available to this independent multi-source app has been established. The developer agreement restricts use to an approved purpose and contains a restriction on building/providing a competing product/service. | Depends on approved partner integration | Approved ATS/employer workflows only; not authorized for this app by default | Partner Console credentials, explicit permission and approved scope required; credentials cannot be shared as an app-wide key. | Manual search links only pending written approval that explicitly covers this product and its use. No scraping or API use to mirror Indeed listings. |

## Data returned and missing fields

Adapters normalize only provider-published values. The result shape includes role, company label, description with a full/snippet marker, source advertisement URL, application URL when supplied, workplace, employment type, inferred title level (clearly derived from the role title), posted date, salary when the source provides a usable value/currency, department/team, and all merged source links.

The current sources do not publish a structured hiring contact name or email in the documented public job-search responses. Those fields display “Not provided in this listing.” An application email is shown only when the provider's description explicitly includes one in an application instruction; it is identified as being found in the description. The app must not guess a person's name or email from the employer name, domain, job title, or unrelated websites.

## Configuration and rollout

- `ADZUNA_MARKETS` is an explicit allowlist of `country-code:currency` entries. Country codes must be checked against the developer account; Egypt availability is not assumed.
- `GREENHOUSE_BOARDS`, `LEVER_SITES`, and `ASHBY_BOARDS` contain operator-selected public employer boards. They do not discover all employers on those platforms.
- Credentials remain server-side. A failed source is reported separately while successful sources still return results.
- LinkedIn and Indeed are link-out only until written approval is received. Other platforms stay unimplemented or link-out until their official policies and permitted data methods are verified.
- A link to a posting is not an application submission. Automatic application needs a source-specific, approved submission capability and a separate safety review.

See [[05 - Extension System]], [[06 - AI Applications and Safety]], and [[08 - Roadmap and Acceptance]].
