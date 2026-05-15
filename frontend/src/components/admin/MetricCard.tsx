import type { ReactNode } from "react";

type MetricCardProps = {
  label: string;
  value: string;
  icon: ReactNode;
  description?: string;
};

export function MetricCard({ label, value, icon, description }: MetricCardProps) {
  return (
    <section className="rounded-[24px] border border-[#ece8ff] bg-white p-5 shadow-[0_4px_20px_rgba(124,58,237,0.08)] transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
          {description ? <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p> : null}
        </div>
      </div>
    </section>
  );
}