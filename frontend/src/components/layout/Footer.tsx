import Link from "next/link";

import { Container } from "@/components/ui/Container";

const footerLinks = [
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Lab", href: "/lab" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold text-primary">Kanato Space</p>
            <p className="mt-2 text-sm leading-7 text-secondary">技術の実験場・ポートフォリオ・成長ログ</p>
            <p className="mt-6 text-sm text-secondary">© 2026 Kanato Space</p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-secondary">
            <a href="#" target="_blank" rel="noreferrer" className="hover:text-primary hover:underline">
              GitHub
            </a>
            {footerLinks.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-primary hover:underline">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
