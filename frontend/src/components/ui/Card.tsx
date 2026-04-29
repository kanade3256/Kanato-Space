import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-[16px] border-2 border-slate-300 bg-white/60 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:shadow-xl ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
