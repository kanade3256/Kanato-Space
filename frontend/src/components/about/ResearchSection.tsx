import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { aboutResearchKeywords } from "@/features/about/about-data";

export function ResearchSection() {
  return (
    <section className="mt-20">
      <Container>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Research</h2>
          <Card>
            <div className="space-y-5">
              <p className="text-base leading-7 text-secondary">
                骨格時系列データを用いた歩容解析に取り組んでいます。動画から抽出したランドマーク情報をもとに、時系列クラスタリングや説明可能な分析を行い、歩き方の特徴を解釈可能な形で整理することを目指しています。
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="研究キーワード">
                {aboutResearchKeywords.map((keyword) => (
                  <li key={keyword} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-secondary">
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
