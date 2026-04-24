import type { MetadataRoute } from "next";

import { getPostsByType } from "@/features/posts/posts";
import { siteUrl } from "@/lib/site";

const staticPaths = ["/", "/about", "/blog", "/lab", "/contact", "/privacy", "/terms"] as const;

function toDate(value: string): Date {
  return new Date(`${value}T00:00:00Z`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = [...getPostsByType("Blog"), ...getPostsByType("Lab")];

  const staticEntries = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/${post.type.toLowerCase()}/${post.slug}`,
    lastModified: post.updatedAt ? toDate(post.updatedAt) : toDate(post.date),
  }));

  return [...staticEntries, ...postEntries];
}
