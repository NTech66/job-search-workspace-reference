---
title: Job Search Workspace — Product Design
created: 2026-11-11
status: approved design
aliases: [Product Design]
tags: [job-search, product, design]
---

# Product Design

## Intent

Job seekers are tired of searching job sites one by one and repeating application work. This product brings supported listings into one searchable workspace and helps users apply using information they maintain in their profile and files.

## Audience

People managing an active job search across local and remote opportunities. The first service jurisdiction is Egypt; the interface supports Arabic and English. Each person chooses their target location, while remote searches can span any region covered by enabled sources.

## Product promise

Search once across enabled sources, set job rules once, and let the application workflow handle supported matches. Keep every application traceable, and stop rather than guess when a form asks for information the profile does not contain.

## Core areas

- **Discover:** a unified, deduplicated list with filters for roles, region, workplace mode, employment type, seniority, posting date, and salary when supplied. Show source, freshness, and original listing link.
- **Profile:** editable contact information, work history, skills, education, qualifications, links, and job preferences.
- **Files:** private CVs, certificates, portfolios, and other application materials, with replacement and organization.
- **Applications:** eligibility rules, application states, paused questions, and submission history.
- **Extensions:** a catalog of reviewed in-app modules for job sources, answer templates, and later features.

## Scope boundaries

The first product plan includes accounts, profile and file management, an extension review flow, supported-source aggregation, and opt-in automatic applications. A guarantee that every job site is supported is out of scope. Sources without an approved integration or permitted submission method may be link-out/manual only. The product does not solve CAPTCHA challenges or bypass access controls.

## Approaches considered

1. **Fixed integrations in the core app:** easiest to start, but every new source requires core-app changes and coordinated releases.
2. **Browser-page automation:** explicitly out of scope; it is also vulnerable to site changes and permission limits.
3. **Reviewed in-app extension catalog — selected:** keeps core search and application logic stable while allowing community contributions. You review each contribution before publication; users separately choose what to install and enable.

## Success criteria

- A user sets roles and filters and sees results from enabled sources in one place.
- Duplicate listings merge without losing source links or freshness.
- Users can update profile facts and private application files over time.
- Auto-apply begins only for a rule-matching job through an approved extension with submission capability.
- Missing or ambiguous required answers pause the application before submission.
- Retries do not submit the same application twice.
- Arabic and English users can complete the main search and application workflows.

## Assumptions

The service is multi-user and independently hosted, rather than a local-only personal tool. Provider and region selection is subject to the Egypt launch gate in [[07 - Egypt Privacy and Localization]].

