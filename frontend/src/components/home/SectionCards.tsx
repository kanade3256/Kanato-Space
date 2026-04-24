import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { homeSectionCards } from "@/features/home/home-data";

export function SectionCards() {
  return (
    <section className="mt-16">
      <Container>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Explore</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homeSectionCards.map((card) => (
              <Card key={card.title} className="flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-primary">{card.title}</h3>
                  <p className="mt-3 text-sm text-secondary">{card.description}</p>
                </div>
                <Link href={card.href} className="mt-6 inline-flex text-sm font-medium text-primary hover:underline">
                  {card.title}へ
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
