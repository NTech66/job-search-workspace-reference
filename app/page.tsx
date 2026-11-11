"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Search, Puzzle, ClipboardList, Sparkles } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { NoticeCard } from "@/components/notice-card";

export default function OverviewPage() {
  const { t } = useLanguage();

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-text">
          <div className="eyebrow"><span className="eyebrow-mark"><Sparkles size={13} /></span>{t.preview}</div>
          <h1>{t.welcome}</h1>
          <p>{t.welcomeBody}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/jobs"><Search size={16} />{t.searchJobs}<ArrowUpRight size={15} /></Link>
            <Link className="button button-secondary" href="/extensions"><Puzzle size={16} />{t.browseExtensions}</Link>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun-disc" />
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="orbit-node node-one" /><div className="orbit-node node-two" /><div className="orbit-node node-three" />
          <div className="art-center"><Sparkles size={25} strokeWidth={1.4} /></div>
        </div>
      </section>

      <div className="section-heading"><div><span className="eyebrow">{t.workspace}</span><h2 className="section-title">{t.yourSearch}</h2></div><Link className="text-link" href="/jobs">{t.searchJobs}<ArrowUpRight size={14} /></Link></div>

      <div className="dashboard-grid">
        <section className="surface-card source-card">
          <div className="card-topline"><span className="card-icon soft-indigo"><Puzzle size={17} /></span><span className="card-kicker">{t.sourceCoverage}</span></div>
          <h2>{t.noSources}</h2>
          <p>{t.noSourcesBody}</p>
          <Link className="text-link" href="/extensions">{t.reviewSources}<ArrowUpRight size={14} /></Link>
        </section>
        <section className="surface-card applications-card">
          <div className="card-topline"><span className="card-icon soft-green"><ClipboardList size={17} /></span><span className="card-kicker">{t.applicationFlow}</span></div>
          <h2>{t.applicationReady}</h2>
          <p>{t.applicationBody}</p>
          <Link className="text-link" href="/applications">{t.viewApplications}<ArrowUpRight size={14} /></Link>
        </section>
      </div>

      <div className="lower-grid">
        <section className="surface-card saved-search-card">
          <div className="section-heading compact"><div><span className="eyebrow">{t.yourSearch}</span><h2 className="section-title">{t.savedFilters}</h2></div><span className="card-icon soft-sand"><Search size={16} /></span></div>
          <div className="quiet-empty"><span className="quiet-line" /><p>{t.noFilters}</p></div>
        </section>
        <NoticeCard icon={ShieldCheck} title={t.privacyGate} tone="warm">{t.privacyBody}</NoticeCard>
      </div>
    </div>
  );
}
