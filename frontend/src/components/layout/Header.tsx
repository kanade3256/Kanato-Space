import Link from "next/link";

import { Container } from "@/components/ui/Container";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Lab", href: "/lab" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container className="h-full">
        <div className="flex h-full items-center justify-between gap-3">
          <Link href="/" className="shrink-0 text-lg font-semibold tracking-tight text-primary">
            Kanato Space
          </Link>

          <div className="flex min-w-0 items-center gap-2">
            <nav aria-label="Primary navigation" className="hidden items-center gap-5 text-sm text-secondary md:flex">
              {navigationItems.map((item) => (
                <Link key={item.label} href={item.href} className="whitespace-nowrap hover:text-primary hover:underline">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
