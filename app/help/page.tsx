"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { NoticeCard } from "@/components/notice-card";

export default function HelpPage() {
  const { t } = useLanguage();
  return <div className="page-stack"><div className="page-heading"><div><span className="eyebrow">{t.help}</span><h1>{t.helpTitle}</h1><p>{t.helpBody}</p></div></div><NoticeCard icon={ShieldCheck} title={t.privacyGate}>{t.helpBody2}</NoticeCard><Link className="button button-secondary" href="/extensions">{t.reviewSources}<ArrowUpRight size={14} /></Link></div>;
}
