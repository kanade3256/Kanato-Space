import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function NotFoundPage() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <div className="space-y-4 rounded-xl border border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-primary">ページが見つかりませんでした。</h1>
          <p className="text-sm text-secondary">指定されたページは削除されたか、URL が変更された可能性があります。</p>
          <Link href="/" className="inline-flex text-sm font-medium text-primary hover:underline">
            Homeに戻る
          </Link>
        </div>
      </Container>
    </section>
  );
}
