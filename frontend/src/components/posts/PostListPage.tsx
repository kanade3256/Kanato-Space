import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import type { Post } from "@/types/post";

import { PostCard } from "./PostCard";

type PostListPageProps = {
  title: string;
  description: string;
  posts: Post[];
  emptyMessage: string;
  hasError?: boolean;
};

export function PostListPage({ title, description, posts, emptyMessage, hasError = false }: PostListPageProps) {
  return (
    <section className="py-20">
      <Container>
        <div className="space-y-8">
          <header className="space-y-3">
            <h1 className="text-5xl font-bold tracking-[-0.02em] text-primary md:text-6xl">{title}</h1>
            <p className="max-w-2xl text-base text-secondary">{description}</p>
          </header>

          {hasError ? (
            <ErrorState message="現在、情報を取得できません。" description="時間をおいて再度お試しください。" />
          ) : posts.length === 0 ? (
            <EmptyState message={emptyMessage} href="/" linkLabel="Homeに戻る" />
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label={`${title}の記事一覧`}>
              {posts.map((post) => (
                <li key={`${post.type}-${post.slug}`}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
