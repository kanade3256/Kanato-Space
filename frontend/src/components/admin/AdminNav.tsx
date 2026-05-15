"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LayoutDashboard } from "lucide-react";

type AdminNavProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export function AdminNav({ orientation = "horizontal", className = "" }: AdminNavProps) {
  const pathname = usePathname();
  const isVertical = orientation === "vertical";

  const isNavItemActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      aria-label="Admin navigation"
      className={`flex ${isVertical ? "flex-col" : "flex-wrap items-center"} gap-2 ${className}`.trim()}
    >
      {adminNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = isNavItemActive(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "border-violet-200 bg-violet-100 text-violet-700 shadow-sm"
                : "border-transparent text-slate-600 hover:border-violet-100 hover:bg-violet-50 hover:text-violet-700"
            }`.trim()}
          >
            <Icon size={16} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}