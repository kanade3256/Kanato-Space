import { Container } from "@/components/ui/Container";

export function ContactHero() {
  return (
    <section className="py-20">
      <Container>
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">Contact</p>
          <h1 className="text-5xl font-bold tracking-[-0.02em] text-primary md:text-6xl">
            連絡はこちらから
          </h1>
          <p className="max-w-3xl text-base leading-7 text-secondary">内容を確認したうえで、必要に応じて返信します。</p>
        </div>
      </Container>
    </section>
  );
}
