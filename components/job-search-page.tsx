"use client";

import { ArrowUpRight, BriefcaseBusiness, Search, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import { EmptyState } from "@/components/notice-card";
import type { JobPosting, SearchSourceStatus } from "@/lib/extensions/contracts";

type Filters = { role: string; region: string; workplace: string; level: string; type: string; posted: string; salary: string; currency: string };

export function JobSearchPage({ initial, jobs, sources, hasSearched }: {
  initial: Filters;
  jobs: JobPosting[];
  sources: SearchSourceStatus[];
  hasSearched: boolean;
}) {
  const { language, t } = useLanguage();
  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="eyebrow">{t.discover}</span><h1>{t.searchTitle}</h1><p>{t.searchIntro}</p></div></div>

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

      <div className="results-toolbar"><span className="eyebrow">{t.results}</span>{hasSearched && <span className="result-hint">{jobs.length} {t.listingCount}</span>}</div>
      {!hasSearched ? <section className="surface-card results-card"><EmptyState icon={BriefcaseBusiness} title={t.searchTitle}>{t.searchBeforeResults}</EmptyState></section> : (
        <div className="jobs-layout">
          <div className="job-results">
            {jobs.length ? jobs.map((job) => <JobCard key={`${job.sourceId}:${job.externalId}`} job={job} language={language} t={t} />) : (
              <section className="surface-card results-card"><EmptyState icon={BriefcaseBusiness} title={t.noMatchingListings}>{t.sourceRequiredBody}</EmptyState></section>
            )}
          </div>
          <aside className="sources-panel surface-card">
            <span className="eyebrow">{t.availableSources}</span>
            <div className="source-list">
              {sources.map((source) => <SourceRow key={source.id} source={source} t={t} />)}
            </div>
            <p className="source-setup-help">{t.sourceSetupHelp}</p>
          </aside>
        </div>
      )}
    </div>
  );
}

function JobCard({ job, language, t }: { job: JobPosting; language: "en" | "ar"; t: Record<string, string> }) {
  const date = job.postedAt ? new Intl.DateTimeFormat(language === "ar" ? "ar-EG" : "en", { dateStyle: "medium" }).format(new Date(job.postedAt)) : t.notPublished;
  const salary = job.salary?.summary || formatSalary(job.salary, language) || t.salaryUnknown;
  return (
    <article className="surface-card job-card">
      <div className="job-card-header">
        <div className="job-title-block"><h2>{job.title}</h2><p>{job.company || t.notPublished}{job.region ? ` · ${job.region}` : ""}</p></div>
        <span className="job-posted">{date === t.notPublished ? t.notPublished : `${t.postedAt} ${date}`}</span>
      </div>
      <div className="job-tags">
        {job.workplace ? <span>{workplaceText(job.workplace, t)}</span> : <span>{t.workplaceUnknown}</span>}
        {job.level && <span>{levelText(job.level, t)} · {t.levelFromTitle}</span>}
        {job.employmentType ? <span>{employmentText(job.employmentType, t)}</span> : <span>{t.employmentUnknown}</span>}
        <span>{salary}</span>
      </div>
      <details className="job-description"><summary>{job.descriptionCompleteness === "snippet" ? t.descriptionSnippet : t.jobDescription}</summary><p>{job.description || t.descriptionMissing}</p></details>
      <dl className="contact-grid">
        <div><dt>{t.hiringContactName}</dt><dd>{job.hiringContact?.name || t.notPublished}</dd></div>
        <div><dt>{t.hiringContactEmail}</dt><dd>{job.hiringContact?.email || t.notPublished}</dd></div>
        <div><dt>{t.applicationEmail}</dt><dd>{job.applicationEmail ? <a href={`mailto:${job.applicationEmail}`}>{job.applicationEmail}</a> : t.notPublished}</dd></div>
      </dl>
      <div className="job-card-footer">
        <div className="job-source-links">{job.sourceLinks.map((source) => <a className={source.id.startsWith("adzuna:") ? "source-attribution-adzuna" : "job-source-link"} key={`${source.id}:${source.jobUrl}`} href={source.attributionUrl ?? source.jobUrl} target="_blank" rel="noreferrer">{source.name}</a>)}</div>
        <div className="job-actions">
          <a className="text-link" href={job.sourceUrl} target="_blank" rel="noreferrer">{t.jobPosting}<ArrowUpRight size={14} /></a>
          {job.applyUrl && <a className="button button-primary" href={job.applyUrl} target="_blank" rel="noreferrer">{t.applicationPage}<ArrowUpRight size={14} /></a>}
        </div>
      </div>
    </article>
  );
}

function SourceRow({ source, t }: { source: SearchSourceStatus; t: Record<string, string> }) {
  const state = source.status === "ready" ? `${source.resultCount} ${t.listingCount}` : source.status === "error" ? t.sourceError : source.status === "manual_only" ? t.sourceManualOnly : t.sourceNeedsSetup;
  return (
    <div className="source-row">
      <div><strong>{source.name}</strong><small>{source.status === "ready" ? t.sourceRefresh : source.access === "link_out" ? t.sourceNotApproved : ""}</small></div>
      {source.searchUrl ? <a className="source-open-link" href={source.searchUrl} target="_blank" rel="noreferrer">{t.sourceSearchIn}<ArrowUpRight size={13} /></a> : <span className={`source-state state-${source.status}`}>{state}</span>}
    </div>
  );
}

function formatSalary(salary: JobPosting["salary"], language: "en" | "ar") {
  if (!salary) return "";
  if (salary.minimum !== undefined && salary.maximum !== undefined) return `${salary.currency ? `${salary.currency} ` : ""}${new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en").format(salary.minimum)}–${new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en").format(salary.maximum)}`;
  if (salary.minimum !== undefined) return `${salary.currency ? `${salary.currency} ` : ""}${new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en").format(salary.minimum)}+`;
  if (salary.maximum !== undefined) return `${salary.currency ? `${salary.currency} ` : ""}≤ ${new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en").format(salary.maximum)}`;
  return "";
}

function workplaceText(value: NonNullable<JobPosting["workplace"]>, t: Record<string, string>) { return value === "remote" ? t.remote : value === "hybrid" ? t.hybrid : t.onsite; }
function levelText(value: NonNullable<JobPosting["level"]>, t: Record<string, string>) { return value === "internship" ? t.internship : value === "entry" ? t.entry : value === "mid" ? t.mid : t.advanced; }
function employmentText(value: NonNullable<JobPosting["employmentType"]>, t: Record<string, string>) {
  return value === "full-time" ? t.fullTime : value === "part-time" ? t.partTime : value === "contract" ? t.contract : value === "temporary" ? t.temporary : t.internship;
}
