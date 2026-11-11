---
title: Job Search Workspace — Start Here
created: 2026-11-11
status: plan plus local preview implementation
aliases: [Job Search Platform]
tags: [job-search, product, start-here]
---

# Job Search Workspace

A bilingual job-search and application workspace for people who want to search across supported job sites once, keep professional materials organized, and reduce repetitive application work.

## Read in this order

1. [[01 - Product Design]] — approved product intent, scope, and decisions.
2. [[02 - Requirements and Journeys]] — user needs and end-to-end flows.
3. [[03 - UI and Hallmark Direction]] — visual and interaction rules.
4. [[04 - Technical Architecture]] — stack, data boundaries, and system map.
5. [[05 - Extension System]] — community modules, review, and permissions.
6. [[06 - AI Applications and Safety]] — eligibility, answer preparation, and safeguards.
7. [[07 - Egypt Privacy and Localization]] — Egypt launch review and bilingual consent.
8. [[08 - Roadmap and Acceptance]] — delivery stages and product checks.
9. [[09 - Implementation Plan]] — future build plan.
10. [[10 - Source Adapters and Result Fields]] — implemented provider behavior and field availability.
11. [[References/Source Compatibility Matrix]] and [[Glossary]] — source research and shared terms.

## Decisions already made

- The initial service jurisdiction is Egypt. The product supports Arabic and English.
- Each user chooses a country or region for local roles. Remote results can come from any region supported by enabled extensions.
- Profiles, private files, search, applications, and extensions live in one independent web app.
- Extensions are in-app modules, not browser add-ons. Community members may submit source integrations and answer-template packs; the product owner reviews each contribution before publication.
- Users opt in to approved extensions and their requested capabilities.
- Auto-apply follows the user's rules and profile. It pauses when a required answer is missing or unclear.
- Unsupported sources remain link-out/manual. The product does not promise every known site can be integrated or bypass source restrictions.

## Current status

This repository contains a local app preview with configurable server-side Adzuna and employer-board search adapters for Greenhouse, Lever, and Ashby. LinkedIn and Indeed open manual search pages. Live results require API keys and/or board IDs. Accounts, private profile/file storage, community extension execution, AI, and job application submission are not implemented. See [[10 - Source Adapters and Result Fields]].

## Launch gate

Before production CVs or live applications are used, complete Egypt-specific legal review of the provider, data location, processing, consent, retention, and operator obligations. See [[07 - Egypt Privacy and Localization]].

## Maintenance

Re-check official source policies and APIs before adding or updating extensions. Update the source matrix, extension version, and decision notes together. Keep Graphify outputs, if generated, under graphify-out/ in this folder.
