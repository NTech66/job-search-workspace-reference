"use client";

import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export default function SignInPage() {
  const { language, t } = useLanguage();
  return (
    <div className="page-stack auth-page">
      <Link href="/" className="text-link"><ArrowLeft size={14} />{t.backHome}</Link>
      <section className="surface-card auth-card">
        <span className="auth-icon"><LockKeyhole size={20} /></span>
        <span className="eyebrow">{t.account}</span>
        <h1>{t.signIn}</h1>
        <p>{t.accountNotReadyBody}</p>
        <div className="auth-disabled">{language === "ar" ? "لن نطلب بيانات الدخول في النسخة التجريبية." : "We won’t ask for sign-in details in this preview."}</div>
        <Link className="button button-secondary" href="/profile">{t.profile}</Link>
      </section>
    </div>
  );
}
