"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

export default function NotFound() {
  const { t } = useLanguage();
  return <div className="not-found"><h1>404</h1><p>{t.pageNotFound}</p><Link className="button button-primary" href="/">{t.backHome}</Link></div>;
}
