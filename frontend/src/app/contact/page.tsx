import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactLinks } from "@/components/contact/ContactLinks";
import { ContactNotice } from "@/components/contact/ContactNotice";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact | Kanato Space",
  description: "Kanato Space へのお問い合わせページです。",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="mt-20 pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <ContactForm />

            <div className="space-y-6">
              <ContactLinks />

              <Card>
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-primary">Policies</h2>
                  <p className="text-sm leading-7 text-secondary">
                    お問い合わせ前に、個人情報の取り扱いと利用条件をご確認ください。
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="/privacy" className="inline-flex text-sm font-medium text-primary hover:underline">
                      Privacy Policy
                    </a>
                    <a href="/terms" className="inline-flex text-sm font-medium text-primary hover:underline">
                      Terms
                    </a>
                  </div>
                </div>
              </Card>

              <ContactNotice />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
