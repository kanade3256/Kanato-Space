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
  const posts = getPostsByType("Lab");

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug("Lab", slug);

  if (!post) {
    return {
      title: "記事が見つかりません | Kanato Space",
      alternates: {
        canonical: `${siteUrl}/lab/${slug}`,
      },
    };
  }

  return {
    title: `${post.title} | Kanato Space`,
    description: post.summary,
    alternates: {
      canonical: `/lab/${post.slug}`,
    },
  };
}

export default async function LabDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug("Lab", slug);

  if (!post) {
    notFound();
  }

  return <PostDetail post={post} backHref="/lab" backLabel="Lab" />;
}
