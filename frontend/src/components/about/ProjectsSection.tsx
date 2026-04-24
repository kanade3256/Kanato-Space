import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { aboutProjects } from "@/features/about/about-data";

export function ProjectsSection() {
  return (
    <section className="mt-20">
      <Container>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {aboutProjects.map((project) => (
              <Card key={project.title} className="flex h-full flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary">{project.title}</h3>
                  <p className="text-base leading-7 text-secondary">{project.description}</p>
                </div>
                <Link href={project.href} className="mt-6 inline-flex text-sm font-medium text-primary hover:underline">
                  {project.linkLabel}
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
