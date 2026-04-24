import Link from "next/link";

import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold tracking-[-0.02em] text-primary md:text-6xl">Kanato Space.</h1>
            <p className="max-w-xl text-base text-secondary">
              技術で人の課題を解決するための試行錯誤と改善の記録
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:opacity-90"
              >
                About
              </Link>
              <Link
                href="/lab"
                className="inline-flex h-10 items-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-primary transition hover:bg-gray-50"
              >
                Labを見る
              </Link>
              <Link href="#latest-updates" className="text-sm font-medium text-primary hover:underline">
                最新の更新
              </Link>
            </div>
          </div>

          <div aria-hidden="true" className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6">
            <svg viewBox="0 0 420 280" className="h-full w-full text-gray-400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="24" y="24" width="372" height="232" rx="16" stroke="currentColor" strokeOpacity="0.35" />
              <path d="M80 210L160 70L250 190L330 80" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
              <path d="M80 80H340M80 120H340M80 160H340M80 200H340" stroke="currentColor" strokeOpacity="0.18" />
              <path d="M100 60L180 40L260 60L260 140L180 160L100 140Z" stroke="currentColor" strokeOpacity="0.5" />
              <circle cx="112" cy="210" r="22" stroke="currentColor" strokeOpacity="0.45" />
              <circle cx="112" cy="210" r="38" stroke="currentColor" strokeOpacity="0.22" />
              <circle cx="312" cy="188" r="12" stroke="currentColor" strokeOpacity="0.45" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}
