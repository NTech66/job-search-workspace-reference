---
title: Job Search Workspace — UI and Hallmark Direction
created: 2026-11-11
status: design guidance
aliases: [UI and Hallmark Direction]
tags: [job-search, ui, hallmark, accessibility]
---

# UI and Hallmark Direction

## Design source

The requested [Hallmark design skill](https://github.com/Nutlope/hallmark/blob/main/skills/hallmark/SKILL.md) is UI design guidance, not a hosting platform. Its app-screen guidance favors task-first screens, clear interaction states, restrained tokens, accessible controls, and honest data. Re-check the linked source when implementation begins.

## Direction

Infer a calm, utilitarian visual tone until a brand is chosen. The interface should make job search and application status easy to scan, rather than resemble a marketing landing page. Use real extension data in production. Prototype listings must be marked illustrative and must not imply live coverage or real match statistics.

## Screen map

- **Discover jobs:** search, region and remote scope, workplace/employment/seniority/date/salary filters, source/status controls, sortable results.
- **Job detail:** source link, normalized details, match explanation, save/exclude, supported application action.
- **Applications:** status queue, submitted history, paused questions, and retry-safe actions.
- **Profile and files:** editable profile facts and private material picker.
- **Extensions:** catalog details, capabilities, permissions, review status, installation, revocation, and version history.
- **Owner review:** staged submissions, automated check results, safety review, approval/rejection, and rollback.

## Interaction standards

- Every data-loading region has loading, empty, error, and populated states.
- Filters and tabs are keyboard accessible; focus indicators are visible.
- Put search state in the URL, not private profile content.
- Use English and Arabic strings from the start. Arabic layouts use right-to-left direction and do not truncate critical controls.
- Use plain labels. Avoid fake counts, placeholder metrics, fake logos, and invented job listings.
- Privacy choices must show balanced accept/decline options. Do not pre-check consent.

## Exploratory mockup

The first browser mockup was throwaway concept work. It used fictional companies, listings, counts, and match percentages to show hierarchy. Do not treat those values as evidence or copy them into the product. Rebuild the screen with clearly labeled fixture data only.

