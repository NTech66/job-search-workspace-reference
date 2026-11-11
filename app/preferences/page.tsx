"use client";

import { Languages, MapPinned } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function PreferencesPage() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="page-stack">
      <div className="page-heading"><div><span className="eyebrow">{t.account}</span><h1>{t.preferences}</h1><p>{t.preferencesBody}</p></div></div>
      <section className="surface-card preference-row">
        <span className="card-icon soft-indigo"><Languages size={18} /></span>
        <div className="preference-copy"><h2>{t.language}</h2><p>{t.footer}</p></div>
        <div className="segmented" role="group" aria-label={t.language}>
          <button type="button" className={language === "en" ? "selected" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>{t.english}</button>
          <button type="button" className={language === "ar" ? "selected" : ""} onClick={() => setLanguage("ar")} aria-pressed={language === "ar"}>{t.arabic}</button>
        </div>
      </section>
      <section className="surface-card preference-row">
        <span className="card-icon soft-sand"><MapPinned size={18} /></span>
        <div className="preference-copy"><h2>{t.regionLabel}</h2><p>{t.privacyBody}</p></div>
        <span className="status-pill status-paused"><span />{t.preview}</span>
      </section>
    </div>
  );
}
