"use client";

import { BadgeCheck, Boxes, FileCheck2, Puzzle, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { EmptyState, NoticeCard } from "@/components/notice-card";

export default function ExtensionsPage() {
  const { t } = useLanguage();
  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="eyebrow">{t.extensions}</span><h1>{t.extensionTitle}</h1><p>{t.extensionIntro}</p></div><span className="status-pill status-review"><span />{t.preview}</span></div>
      <NoticeCard icon={ShieldCheck} title={t.reviewPolicy} tone="neutral">{t.reviewPolicyBody}</NoticeCard>
      <section className="surface-card results-card">
        <div className="section-heading compact"><div><span className="eyebrow">{t.sourceCoverage}</span><h2 className="section-title">{t.extensionTitle}</h2></div><span className="card-icon soft-indigo"><Puzzle size={17} /></span></div>
        <EmptyState icon={Boxes} title={t.noExtensions}>{t.noExtensionsBody}</EmptyState>
        <div className="capability-strip">
          <div><SearchMark /><span>jobs.search</span></div>
          <div><FileCheck2 size={15} /><span>answers.templates</span></div>
          <div><BadgeCheck size={15} /><span>{t.reviewPolicy}</span></div>
        </div>
      </section>
      <section className="surface-card template-card">
        <div className="card-topline"><span className="card-icon soft-sand"><FileCheck2 size={17} /></span><span className="card-kicker">{t.templateTitle}</span></div>
        <p>{t.templateBody}</p>
      </section>
    </div>
  );
}

function SearchMark() {
  return <span className="capability-search" aria-hidden="true">⌕</span>;
}
