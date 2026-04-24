import Link from "next/link";

import { Card } from "@/components/ui/Card";
import type { Post, PostType } from "@/types/post";

const tagClassByType: Record<PostType, string> = {
  Blog: "bg-green-50 text-green-700",
  Lab: "bg-blue-50 text-blue-700",
  Note: "bg-yellow-50 text-yellow-700",
};

function getPostHref(post: Post): string {
  if (post.type === "Blog") {
    return `/blog/${post.slug}`;
  }

  if (post.type === "Lab") {
    return `/lab/${post.slug}`;
  }

  return `/blog`;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-center gap-3 text-sm">
        <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${tagClassByType[post.type]}`}>{post.type}</span>
        <time dateTime={post.date} className="text-secondary">
          {post.date}
        </time>
      </div>

      <h2 className="mt-4 text-xl font-semibold text-primary">{post.title}</h2>
      <p className="mt-3 text-sm text-secondary">{post.summary}</p>

      {post.tags && post.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="タグ">
          {post.tags.map((tag) => (
            <li key={tag} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-secondary">
              #{tag}
            </li>
          ))}
        </ul>
      ) : null}

      {post.updatedAt ? (
        <p className="mt-4 text-xs text-secondary">
          Updated: <time dateTime={post.updatedAt}>{post.updatedAt}</time>
        </p>
      ) : null}

      <Link href={getPostHref(post)} className="mt-6 inline-flex text-sm font-medium text-primary hover:underline">
        「{post.title}」を読む
      </Link>
    </Card>
  );
}
