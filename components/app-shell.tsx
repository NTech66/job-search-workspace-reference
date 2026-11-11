"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  Compass,
  FileUser,
  LayoutDashboard,
  Puzzle,
  Settings2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/components/language-provider";

const nav = [
  { href: "/", key: "overview", icon: LayoutDashboard },
  { href: "/jobs", key: "discover", icon: Compass },
  { href: "/applications", key: "applications", icon: BriefcaseBusiness },
  { href: "/extensions", key: "extensions", icon: Puzzle },
  { href: "/profile", key: "profile", icon: FileUser },
  { href: "/preferences", key: "settings", icon: Settings2 },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="app-frame">
      <aside className="sidebar" aria-label={t.workspace}>
        <Link className="brand-lockup" href="/" aria-label={`${t.brand} ${t.tagline}`}>
          <span className="brand-mark"><Sparkles size={18} strokeWidth={1.8} /></span>
          <span className="brand-copy"><strong>{t.brand}</strong><small>{t.tagline}</small></span>
        </Link>

        <div className="nav-label">{t.workspace}</div>
        <nav className="side-nav">
          {nav.slice(0, 4).map(({ href, key, icon: Icon }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link className={`nav-item${active ? " active" : ""}`} href={href} key={href} aria-current={active ? "page" : undefined}>
                <Icon size={17} strokeWidth={1.8} aria-hidden="true" /><span>{t[key]}</span>
              </Link>
            );
          })}
        </nav>

        <div className="nav-label account-nav-label">{t.account}</div>
        <nav className="side-nav">
          {nav.slice(4).map(({ href, key, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link className={`nav-item${active ? " active" : ""}`} href={href} key={href} aria-current={active ? "page" : undefined}>
                <Icon size={17} strokeWidth={1.8} aria-hidden="true" /><span>{t[key]}</span>
              </Link>
            );
          })}
          <Link className={`nav-item${pathname.startsWith("/help") ? " active" : ""}`} href="/help"><span>{t.help}</span></Link>
        </nav>

        <div className="sidebar-bottom">
          <div className="preview-card">
            <span className="preview-dot" />
            <span><strong>{t.preview}</strong><small>{t.egypt}</small></span>
          </div>
          <Link className="account-chip" href="/profile">
            <span className="avatar">م</span>
            <span><strong>{t.planName}</strong><small>{t.planStatus}</small></span>
          </Link>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark"><Sparkles size={17} /></span><strong>{t.brand}</strong></div>
          <div className="topbar-spacer" />
          <span className="topbar-note"><span className="status-dot" />{t.preview}</span>
          <button className="language-switch" type="button" onClick={() => setLanguage(language === "en" ? "ar" : "en")} aria-label={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}>
            {language === "en" ? "عربي" : "English"}
          </button>
          <Link className="topbar-link" href="/sign-in">{t.signIn}</Link>
        </header>
        <main className="main-content">{children}</main>
        <footer className="app-footer">{t.footer}<span>© 2026 Mawj</span></footer>
      </div>
    </div>
  );
}
