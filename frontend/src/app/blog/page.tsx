import type { Metadata } from "next";

import { PostListPage } from "@/components/posts/PostListPage";
import { getPostsByType } from "@/features/posts/posts";
import type { Post } from "@/types/post";

export const metadata: Metadata = {
  title: "Blog | Kanato Space",
  description: "日々の気づき、振り返り、学びを残すログです。",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  let posts: Post[] = [];
  let hasError = false;

  try {
    posts = getPostsByType("Blog");
  } catch (error) {
    console.error("[blog] Failed to load posts.", error);
    hasError = true;
  }

  return (
    <PostListPage
      title="Blog"
      description="日々の気づき、振り返り、学びを残すログです。"
      posts={posts}
      hasError={hasError}
      emptyMessage="まだBlog記事はありません。"
    />
  );
}
