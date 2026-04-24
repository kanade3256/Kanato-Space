import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export function AboutLinksSection() {
  return (
    <section className="mt-20 pb-20">
      <Container>
        <Card>
          <div className="space-y-5">
            <p className="text-base leading-7 text-secondary">
              開発や研究の詳細は Lab に、日々の気づきや振り返りは Blog に記録しています。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/lab" className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition hover:opacity-90">
                Labを見る
              </Link>
              <Link href="/blog" className="inline-flex h-10 items-center rounded-lg border border-gray-200 px-4 text-sm font-medium text-primary transition hover:bg-gray-50">
                Blogを見る
              </Link>
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
