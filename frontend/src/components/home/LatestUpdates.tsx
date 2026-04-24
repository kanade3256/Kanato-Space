import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { getLatestPosts } from "@/features/posts/posts";
import type { Post, PostType } from "@/types/post";

const tagClassByType: Record<PostType, string> = {
  Blog: "bg-green-50 text-green-700",
  Lab: "bg-blue-50 text-blue-700",
  Note: "bg-yellow-50 text-yellow-700",
};

type LatestPost = Post & {
  type: "Blog" | "Lab";
};

function getPostHref(post: LatestPost): string {
  if (post.type === "Blog") {
    return `/blog/${post.slug}`;
  }

  return `/lab/${post.slug}`;
}

export function LatestUpdates() {
  let posts: LatestPost[] = [];
  let hasError = false;

  try {
    posts = getLatestPosts()
      .filter((post): post is LatestPost => post.type === "Blog" || post.type === "Lab")
      .slice(0, 5);
  } catch (error) {
    console.error("[home] Failed to load latest updates.", error);
    hasError = true;
  }

  return (
    <section id="latest-updates" className="mt-20">
      <Container>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-primary">Latest Updates</h2>

          {hasError ? (
            <ErrorState message="現在、情報を取得できません。" description="時間をおいて再度お試しください。" />
          ) : posts.length === 0 ? (
            <EmptyState message="まだ更新記事はありません。" href="/blog" linkLabel="Blogを見る" />
          ) : (
            <ul className="divide-y divide-gray-200 border-y border-gray-200">
              {posts.map((post) => (
                <li key={`${post.type}-${post.slug}`}>
                  <div className="flex items-center justify-between gap-4 py-4">
                    <Link href={getPostHref(post)} className="flex min-w-0 items-center gap-3 hover:underline">
                      <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${tagClassByType[post.type]}`}>
                        {post.type}
                      </span>
                      <span className="truncate text-sm text-primary md:text-base">{post.title}</span>
                    </Link>
                    <time dateTime={post.date} className="shrink-0 text-sm text-secondary">
                      {post.date}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
