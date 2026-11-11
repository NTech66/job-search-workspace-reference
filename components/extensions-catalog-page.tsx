"use client";

import { BadgeCheck, Boxes, FileCheck2, Puzzle, ShieldCheck, ExternalLink } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { NoticeCard } from "@/components/notice-card";

type Config = { adzuna: boolean; greenhouse: number; lever: number; ashby: number };

export function ExtensionsCatalogPage({ configured }: { configured: Config }) {
  const { t } = useLanguage();
  const providers = [
    { id: "adzuna", name: "Adzuna", configured: configured.adzuna, kind: t.sourceSearchOnly, url: "https://developer.adzuna.com/overview", state: configured.adzuna ? t.sourceAPIReady : t.sourceConfigureMe },
    { id: "greenhouse", name: "Greenhouse", configured: configured.greenhouse > 0, kind: t.sourceBoardSearch, url: "https://docs.greenhouse.io/job-board.html", state: configured.greenhouse ? `${configured.greenhouse} ${t.sourceBoardsReady}` : t.sourceConfigureMe },
    { id: "lever", name: "Lever", configured: configured.lever > 0, kind: t.sourceBoardSearch, url: "https://hire.lever.co/developer/documentation", state: configured.lever ? `${configured.lever} ${t.sourceBoardsReady}` : t.sourceConfigureMe },
    { id: "ashby", name: "Ashby", configured: configured.ashby > 0, kind: t.sourceBoardSearch, url: "https://developers.ashbyhq.com/docs/public-job-posting-api", state: configured.ashby ? `${configured.ashby} ${t.sourceBoardsReady}` : t.sourceConfigureMe },
    { id: "linkedin", name: "LinkedIn", configured: false, kind: t.sourceLinkOnly, url: "https://www.linkedin.com/jobs/", state: t.sourcePartnerApproval },
    { id: "indeed", name: "Indeed", configured: false, kind: t.sourceLinkOnly, url: "https://www.indeed.com/", state: t.sourcePartnerApproval },
  ];

  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="eyebrow">{t.extensions}</span><h1>{t.extensionTitle}</h1><p>{t.extensionIntro}</p></div><span className="status-pill status-review"><span />{t.preview}</span></div>
      <NoticeCard icon={ShieldCheck} title={t.reviewPolicy} tone="neutral">{t.reviewPolicyBody}</NoticeCard>
      <section className="surface-card extension-catalog">
        <div className="section-heading compact"><div><span className="eyebrow">{t.sourceCoverage}</span><h2 className="section-title">{t.extensionFirstParty}</h2></div><span className="card-icon soft-indigo"><Puzzle size={17} /></span></div>
        <p className="extension-intro">{t.extensionFirstPartyBody}</p>
        <div className="extension-source-list">
          {providers.map((provider) => <article className="extension-source-row" key={provider.id}>
            <div><h3>{provider.name}</h3><p>{provider.kind}</p><small>{provider.state}</small></div>
            <a href={provider.url} target="_blank" rel="noreferrer" aria-label={`${provider.name} developer information`}><ExternalLink size={15} /></a>
          </article>)}
        </div>
        <div className="capability-strip">
          <div><SearchMark /><span>jobs.search</span></div>
          <div><FileCheck2 size={15} /><span>answers.templates</span></div>
          <div><BadgeCheck size={15} /><span>{t.reviewPolicy}</span></div>
        </div>
      </section>
      <section className="surface-card template-card">
        <div className="card-topline"><span className="card-icon soft-sand"><FileCheck2 size={17} /></span><span className="card-kicker">{t.templateTitle}</span></div>
        <p>{t.templateBody}</p>
        <div className="inline-status"><Boxes size={15} /><span className="small-muted">{t.sourceSetupHelp}</span></div>
      </section>
    </div>
  );
}

function SearchMark() {
  return <span className="capability-search" aria-hidden="true">⌕</span>;
}
