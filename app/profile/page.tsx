"use client";

import Link from "next/link";
import { ArrowUpRight, FileLock2, FolderOpen, UserRound } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { NoticeCard } from "@/components/notice-card";

export default function ProfilePage() {
  const { t } = useLanguage();
  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="eyebrow">{t.account}</span><h1>{t.profileTitle}</h1><p>{t.profileIntro}</p></div></div>
      <NoticeCard icon={FileLock2} title={t.accountNotReady} tone="warm">{t.accountNotReadyBody}</NoticeCard>
      <div className="dashboard-grid">
        <section className="surface-card profile-block">
          <div className="card-topline"><span className="card-icon soft-indigo"><UserRound size={17} /></span><span className="card-kicker">{t.factsTitle}</span></div>
          <p>{t.factsBody}</p>
          <Link className="text-link" href="/sign-in">{t.signIn}<ArrowUpRight size={14} /></Link>
        </section>
        <section className="surface-card profile-block">
          <div className="card-topline"><span className="card-icon soft-green"><FolderOpen size={17} /></span><span className="card-kicker">{t.filesTitle}</span></div>
          <p>{t.filesBody}</p>
          <span className="status-pill status-paused"><span />{t.paused}</span>
        </section>
      </div>
    </div>
  );
}
