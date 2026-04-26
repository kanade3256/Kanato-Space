import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-[16px] border border-gray-100/80 bg-white/50 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-200 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
