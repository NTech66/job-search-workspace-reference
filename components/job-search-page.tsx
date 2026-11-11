"use client";

import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Search, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { EmptyState } from "@/components/notice-card";

type Filters = { role: string; region: string; workplace: string; level: string; type: string; posted: string; salary: string; currency: string };

export function JobSearchPage({ initial }: { initial: Filters }) {
  const { t } = useLanguage();
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div><span className="eyebrow">{t.discover}</span><h1>{t.searchTitle}</h1><p>{t.searchIntro}</p></div>
      </div>

      <section className="surface-card search-panel">
        <div className="filter-heading"><span className="card-icon soft-indigo"><SlidersHorizontal size={17} /></span><div><h2>{t.discover}</h2><p>{t.filterSummary}</p></div></div>
        <form action="/jobs" method="get" className="filter-grid">
          <label className="field field-wide"><span>{t.roleLabel}</span><input name="role" type="search" placeholder={t.rolePlaceholder} defaultValue={initial.role} /></label>
          <label className="field"><span>{t.regionLabel}</span><input name="region" type="text" placeholder={t.regionPlaceholder} defaultValue={initial.region} /></label>
          <label className="field"><span>{t.workplaceLabel}</span><select name="workplace" defaultValue={initial.workplace}><option value="">{t.workplaceAny}</option><option value="remote">{t.remote}</option><option value="onsite">{t.onsite}</option><option value="hybrid">{t.hybrid}</option></select></label>
          <label className="field"><span>{t.levelLabel}</span><select name="level" defaultValue={initial.level}><option value="">{t.anyLevel}</option><option value="internship">{t.internship}</option><option value="entry">{t.entry}</option><option value="mid">{t.mid}</option><option value="advanced">{t.advanced}</option></select></label>
          <label className="field"><span>{t.typeLabel}</span><select name="type" defaultValue={initial.type}><option value="">{t.anyType}</option><option value="full-time">{t.fullTime}</option><option value="part-time">{t.partTime}</option><option value="contract">{t.contract}</option><option value="temporary">{t.temporary}</option><option value="internship">{t.internship}</option></select></label>
          <label className="field"><span>{t.postedLabel}</span><select name="posted" defaultValue={initial.posted}><option value="">{t.anyDate}</option><option value="day">{t.lastDay}</option><option value="week">{t.lastWeek}</option><option value="month">{t.lastMonth}</option></select></label>
          <label className="field"><span>{t.salaryLabel}</span><input name="salary" type="number" min="0" placeholder={t.salaryPlaceholder} defaultValue={initial.salary} /></label>
          <label className="field"><span>{t.currencyLabel}</span><select name="currency" defaultValue={initial.currency}><option value="">—</option><option value="EGP">EGP</option><option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option></select></label>
          <div className="filter-submit"><button className="button button-primary" type="submit"><Search size={16} />{t.applyFilters}</button></div>
        </form>
      </section>

      <div className="results-toolbar"><span className="eyebrow">{t.results}</span><span className="result-hint">{t.filterSummary}</span></div>
      <section className="surface-card results-card">
        <EmptyState icon={BriefcaseBusiness} title={t.sourceRequired}>{t.sourceRequiredBody}</EmptyState>
        <Link className="button button-secondary" href="/extensions">{t.openExtensions}<ArrowUpRight size={14} /></Link>
      </section>
    </div>
  );
}
