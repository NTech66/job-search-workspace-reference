"use client";

import Link from "next/link";
import { ArrowUpRight, CirclePause, ClipboardList, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { EmptyState, NoticeCard } from "@/components/notice-card";

export default function ApplicationsPage() {
  const { t } = useLanguage();
  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="eyebrow">{t.applications}</span><h1>{t.applicationsTitle}</h1><p>{t.applicationsIntro}</p></div></div>
      <NoticeCard icon={CirclePause} title={`${t.autoApply} · ${t.paused}`} tone="warm">
        <p>{t.autoApplyBody}</p>
        <div className="inline-status"><span className="status-pill status-paused"><span />{t.paused}</span><span className="small-muted">{t.preview}</span></div>
      </NoticeCard>
      <section className="surface-card results-card">
        <div className="section-heading compact"><div><span className="eyebrow">{t.history}</span><h2 className="section-title">{t.applicationsTitle}</h2></div><span className="card-icon soft-green"><ClipboardList size={17} /></span></div>
        <EmptyState icon={ClipboardList} title={t.noApplications}>{t.noApplicationsBody}</EmptyState>
        <Link className="text-link" href="/extensions">{t.browseExtensions}<ArrowUpRight size={14} /></Link>
      </section>
      <div className="notice-footnote"><ShieldCheck size={16} /><span>{t.applicationBody}</span></div>
    </div>
  );
}
