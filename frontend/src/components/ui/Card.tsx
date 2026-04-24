import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
