import { Container } from "@/components/ui/Container";

export function AboutHero() {
  return (
    <section className="py-20">
      <Container>
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-secondary">About</p>
            <h1 className="text-5xl font-bold tracking-[-0.02em] text-primary md:text-6xl">
              技術を使って、人の課題を解決するための設計・実装・改善を積み重ねています。
            </h1>
          </div>
          <p className="max-w-3xl text-base leading-7 text-secondary">
            Kanato Space は、これまでの実績だけでなく、試行錯誤や学びの過程も残すための場所です。
          </p>
        </div>
      </Container>
    </section>
  );
}
