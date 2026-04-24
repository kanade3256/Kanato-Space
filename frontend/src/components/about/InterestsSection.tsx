import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { aboutInterests } from "@/features/about/about-data";

export function InterestsSection() {
  return (
    <section className="mt-20">
      <Container>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Interests</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aboutInterests.map((interest) => (
              <Card key={interest}>
                <p className="text-base leading-7 text-secondary">{interest}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
