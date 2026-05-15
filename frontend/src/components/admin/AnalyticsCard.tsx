import type { ReactNode } from "react";

type AnalyticsCardProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AnalyticsCard({ title, icon, children, className = "" }: AnalyticsCardProps) {
  return (
    <section
      className={`rounded-[24px] border border-[#ece8ff] bg-white p-6 shadow-[0_4px_20px_rgba(124,58,237,0.08)] transition-transform duration-200 hover:-translate-y-1 ${className}`.trim()}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
          {icon}
        </span>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}