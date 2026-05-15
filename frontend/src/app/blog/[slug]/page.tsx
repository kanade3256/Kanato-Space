import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostDetail } from "@/components/posts/PostDetail";
import { getPostBySlug, getPostsByType } from "@/features/posts/posts";
import { siteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const posts = getPostsByType("Blog");

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug("Blog", slug);

  if (!post) {
    return {
      title: "記事が見つかりません | Kanato Space",
      alternates: {
        canonical: `${siteUrl}/blog/${slug}`,
      },
    };
  }

  return {
    title: `${post.title} | Kanato Space`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug("Blog", slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} backHref="/blog" backLabel="Blog" />;
}
