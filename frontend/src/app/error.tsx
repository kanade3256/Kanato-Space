"use client";

import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("[app] Unexpected error", error);

  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <div className="space-y-4 rounded-xl border border-gray-200 p-6">
          <h1 className="text-2xl font-semibold text-primary">問題が発生しました。</h1>
          <p className="text-sm text-secondary">時間をおいて再度お試しください。</p>
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={reset} className="inline-flex text-sm font-medium text-primary hover:underline">
              再試行する
            </button>
            <Link href="/" className="inline-flex text-sm font-medium text-primary hover:underline">
              Homeに戻る
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
