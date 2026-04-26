"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/Container";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Lab", href: "/lab" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white">
      <Container className="py-0">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="shrink-0 text-lg font-bold tracking-tight text-slate-900">
            Kanato Space
          </Link>

          <div className="flex min-w-0 items-center gap-2">
            <nav aria-label="Primary navigation" className="hidden items-center gap-8 md:flex">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative whitespace-nowrap text-sm font-medium transition-colors ${
                      isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
