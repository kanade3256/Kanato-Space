import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { homeSectionCards } from "@/features/home/home-data";

export function SectionCards() {
  return (
    <section className="py-20" id="latest-updates">
      <Container>
        <div className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-slate-900">Explore</h2>
            <p className="text-lg text-slate-600">プロジェクト、知見、実験の記録</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homeSectionCards.map((card) => (
              <Card key={card.title} className="flex h-full flex-col justify-between group">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
                  <p className="mt-4 text-base text-slate-600 leading-relaxed">{card.description}</p>
                </div>
                <Link
                  href={card.href}
                  className="mt-8 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:gap-2 gap-1 transition-all"
                >
                  {card.title}へ
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
