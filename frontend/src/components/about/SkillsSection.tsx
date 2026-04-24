import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { aboutSkills } from "@/features/about/about-data";

export function SkillsSection() {
  return (
    <section className="mt-20">
      <Container>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Skills</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aboutSkills.map((skillGroup) => (
              <Card key={skillGroup.category} className="h-full">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-primary">{skillGroup.category}</h3>
                  <ul className="flex flex-wrap gap-2" aria-label={skillGroup.category}>
                    {skillGroup.items.map((item) => (
                      <li key={item} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-secondary">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
