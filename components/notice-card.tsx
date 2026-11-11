import type { LucideIcon } from "lucide-react";

export function NoticeCard({ icon: Icon, title, children, tone = "neutral" }: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  tone?: "neutral" | "warm";
}) {
  return (
    <section className={`notice-card notice-${tone}`}>
      <span className="notice-icon"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
      <div className="notice-copy"><h2>{title}</h2><div>{children}</div></div>
    </section>
  );
}

export function EmptyState({ title, children, icon: Icon }: {
  title: string;
  children: React.ReactNode;
  icon: LucideIcon;
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><Icon size={21} strokeWidth={1.7} aria-hidden="true" /></span>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}
