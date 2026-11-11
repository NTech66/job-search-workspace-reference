# Mawj — Job Search Workspace

Mawj is an open-source foundation for a bilingual job-search workspace. Its goal is to bring job listings from reviewed in-app extensions into one searchable place, help people keep their career materials organized, and reduce repetitive application work while keeping users in control.

The first release is an **interface and architecture preview**. It is not a production job aggregator or an application-submission service yet.

## What is in this release

- Arabic and English interface with right-to-left layout support.
- Overview, job search, applications, extensions, profile, preferences, and help screens.
- Search filters for role, chosen local region, workplace (remote, on-site, or hybrid), level, employment type, posting date, and minimum salary/currency. Filters are URL-backed; profile details are not put in the URL.
- Versioned TypeScript contracts for job-source and answer-template extensions.
- An intentionally empty approved-extension catalog. Community extensions and answer templates must be reviewed before use; templates are data, not executable code.
- Product requirements, user journeys, safety decisions, architecture, and a phased build plan in the linked project notes.

## Current limitations

This preview does not yet connect to job boards, show live listings, create or authenticate accounts, store profiles or uploaded files, use an AI provider, or submit applications. The related screens show these limitations instead of inventing job listings, metrics, or successful submissions.

Automatic application work is not enabled. The planned behavior is to match a user's explicit rules and profile facts, pause when required information is missing or unclear, and prevent duplicate submissions. A source that does not explicitly support submission will remain a manual link-out.

## Run locally

Requirements: Node.js 20.9 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. The search form updates the URL, but results remain empty until reviewed job-source extensions are implemented and enabled.

To create an optimized production build:

```sh
pnpm run build
```

No environment variables are needed to view this preview. `.env.example` documents placeholders for a possible Supabase setup; do not add production secrets, real CVs, or personal profile data to this repository.

## Technology and project layout

- Next.js 16 App Router, TypeScript, and React.
- `app/` contains the application routes and visual foundation.
- `components/` contains shared navigation, language support, and search UI.
- `lib/extensions/` contains the initial extension interfaces and empty reviewed catalog.
- The root Markdown notes describe the approved product design and future implementation phases; `References/` records source and policy research.

## Privacy and launch gate

The product plan is Egypt-focused and requires Arabic-first consent, an Arabic and English interface, and a legal/provider review before real user data or live applications are enabled. The plan notes that the proposed storage provider has no Egypt region. Do not treat this preview as approved for storing CVs or processing applications. Resolve the documented Egypt-specific legal and data-location gate before connecting real user data.

## Extension safety principles

Extensions must declare their version, capabilities, and permitted hosts. Submissions stay inactive until automated checks and maintainer safety review pass. Users opt into approved extensions. The extension runtime still needs to be implemented with strict isolation and least-privilege access before third-party source code can run. A TypeScript interface alone is not a security boundary.

## Product reference

Start with [00 - Start Here](00%20-%20Start%20Here.md), then follow its links through the product design, requirements, UI direction, architecture, extension system, application safety, Egypt privacy, roadmap, and implementation plan. The source compatibility matrix intentionally lists no integrations until each platform's official rules and permitted methods have been checked.

## License and attribution

Original code and documentation in this repository are licensed under the [Apache License 2.0](LICENSE). Keep the license and the original attribution in [NOTICE](NOTICE) when redistributing this work, and identify files you modify, as required by the license. Third-party platforms, trademarks, linked references, and external content remain under their respective terms.
