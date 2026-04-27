import { Lightbulb, RefreshCw, Wrench } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { whyBuildItems, type WhyBuildIconKey } from "@/features/home/home-data";

function renderIcon(icon: WhyBuildIconKey) {
  const commonClassName = "text-gray-500";

  if (icon === "purpose") {
    return <Lightbulb size={22} className={commonClassName} aria-hidden="true" />;
  }

  if (icon === "design") {
    return <Wrench size={22} className={commonClassName} aria-hidden="true" />;
  }

  return <RefreshCw size={22} className={commonClassName} aria-hidden="true" />;
}

export function WhyBuild() {
  return (
    <section className="mt-20 pb-20">
      <Container>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Why I build</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyBuildItems.map((item) => (
              <article key={item.title} className="rounded-xl border-2 border-slate-300 bg-white/60 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  {renderIcon(item.icon)}
                  <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-secondary">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
