import type { Metadata } from "next";

import { PostListPage } from "@/components/posts/PostListPage";
import { getPostsByType } from "@/features/posts/posts";
import type { Post } from "@/types/post";

export const metadata: Metadata = {
  title: "Lab | Kanato Space",
  description: "開発・検証・改善の過程を記録する実験場です。",
  alternates: {
    canonical: "/lab",
  },
};

export default function LabPage() {
  let posts: Post[] = [];
  let hasError = false;

  try {
    posts = getPostsByType("Lab");
  } catch (error) {
    console.error("[lab] Failed to load posts.", error);
    hasError = true;
  }

  return (
    <PostListPage
      title="Lab"
      description="開発・検証・改善の過程を記録する実験場です。"
      posts={posts}
      hasError={hasError}
      emptyMessage="まだLab記事はありません。"
    />
  );
}
