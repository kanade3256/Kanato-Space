import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { aboutProfileParagraphs } from "@/features/about/about-data";

export function ProfileSummary() {
  return (
    <section className="mt-20">
      <Container>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Profile Summary</h2>
          <Card>
            <div className="space-y-4">
              {aboutProfileParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-7 text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
