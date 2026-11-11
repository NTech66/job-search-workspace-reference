---
title: Job Search Workspace — Egypt Privacy and Localization
created: 2026-11-11
status: mandatory pre-launch review
aliases: [Egypt Privacy and Localization]
tags: [job-search, egypt, privacy, localization, compliance]
---

# Egypt Privacy and Localization

> Product planning only, not legal advice. Obtain advice from Egypt-qualified counsel and confirm requirements with the appropriate authority before launch.

## Jurisdiction and references

The initial service jurisdiction is Egypt. The Personal Data Protection Law is Law No. 151 of 2020, with Executive Regulations issued by Decision No. 816 of 2025. Re-check official materials before implementation and launch.

The PDPC's [Data Subject Consent Guidelines](https://pdpc.gov.eg/assets/pdf-data/Guidelines/DSConsent.pdf) state consent requests should be in Arabic, intelligible, concise, affirmative, granular, separate, and prominent. The [DPO Guidelines](https://pdpc.gov.eg/assets/pdf-data/Guidelines/DPO.pdf) describe data-protection oversight, subject requests/complaints, and contact with the PDPC. Counsel must determine what obligations, permissions, registrations, licensing, retention periods, and transfer rules apply to this service.

## Data to map

Account/contact data; CVs and certificates; extracted profile facts; preferences and saved listings; applications; source tokens; AI provider requests; extension submissions; review/permission decisions; audit events.

For every category, document purpose, access, retention, deletion, processor, storage location, and transfer destination. Send only the minimum profile fields needed for a specific application to the AI provider and job source.

## Consent and user controls

- Make consent/privacy choices Arabic-first, with English available. Keep choices separate by purpose and processor/source where required.
- Explain what data goes to which recipient and why; use explicit, unchecked choices.
- Let users inspect, change, and withdraw permissions; record the choice and timestamp.
- Provide access, correction, export, and deletion flows.

## Provider and region gate

Supabase's official [region list](https://supabase.com/docs/guides/platform/regions) currently does not list Egypt. Region selection is a data-location setting, not proof of compliance. Counsel must approve database, storage, AI, email, logging, job-board processors, and any cross-border flow before CVs or live applications are processed. If not approved, replace the provider/region before production.

## Launch checklist

- [ ] Counsel confirms current PDPL/Executive Regulation obligations and business licensing/registration requirements.
- [ ] Determine whether a DPO or other responsible role is required and appoint/register if applicable.
- [ ] Confirm lawful bases and Arabic-first consent/notice wording for each processing purpose.
- [ ] Approve data location, processor agreements, and cross-border transfers.
- [ ] Set retention, deletion/export, and breach-response procedures.
- [ ] Verify provider access controls, encryption, backups, and incident contacts.
- [ ] Keep real-user data and live submissions disabled until gates are signed off.

See [References/Official References](References/Official%20References.md). Re-check publication/version dates at launch.

