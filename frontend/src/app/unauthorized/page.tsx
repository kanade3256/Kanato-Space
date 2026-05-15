import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function UnauthorizedPage() {
  return (
    <Container>
      <div className="my-20 text-center">
        <h1 className="mb-4 text-3xl font-bold">アクセス拒否</h1>
        <p className="mb-8 text-gray-600">このページにアクセスする権限がありません。</p>
        <Link href="/" className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
          ホームに戻る
        </Link>
      </div>
    </Container>
  );
}