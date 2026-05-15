import type { ReactNode } from "react";

type CountBadgeProps = {
  children: ReactNode;
  className?: string;
};

export function CountBadge({ children, className = "" }: CountBadgeProps) {
  return (
    <span
      className={`inline-flex min-w-14 items-center justify-center rounded-full bg-violet-100 px-3 py-1.5 text-sm font-semibold text-violet-700 ${className}`.trim()}
    >
      {children}
    </span>
  );
}