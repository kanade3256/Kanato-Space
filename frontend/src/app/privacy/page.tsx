import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { privacySections } from "@/features/contact/contact-data";

export const metadata: Metadata = {
  title: "Privacy Policy | Kanato Space",
  description: "Kanato Space における個人情報の取り扱いについて。",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-5xl font-bold tracking-[-0.02em] text-primary md:text-6xl">Privacy Policy</h1>
            <p className="max-w-3xl text-base leading-7 text-secondary">Kanato Space における個人情報の取り扱いについて。</p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {privacySections.map((section) => (
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
