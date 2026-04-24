import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { termsSections } from "@/features/contact/contact-data";

export const metadata: Metadata = {
  title: "Terms | Kanato Space",
  description: "Kanato Space の利用条件と免責事項について。",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-5xl font-bold tracking-[-0.02em] text-primary md:text-6xl">Terms</h1>
            <p className="max-w-3xl text-base leading-7 text-secondary">Kanato Space の利用条件と免責事項について。</p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {termsSections.map((section) => (
              <Card key={section.title}>
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold text-primary">{section.title}</h2>
                  <p className="text-sm leading-7 text-secondary">{section.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
