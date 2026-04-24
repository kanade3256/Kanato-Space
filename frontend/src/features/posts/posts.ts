import fs from "fs";
import path from "path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import type { Post, PostType } from "@/types/post";

const POST_TYPES = ["Blog", "Lab", "Note"] as const satisfies readonly PostType[];

const TYPE_TO_DIRECTORY: Record<PostType, string> = {
  Blog: "blog",
  Lab: "lab",
  Note: "note",
};

const CONTENT_ROOT = path.join(process.cwd(), "..", "content");

function isPostType(value: unknown): value is PostType {
  return typeof value === "string" && (POST_TYPES as readonly string[]).includes(value);
}

function isValidDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  return !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function buildPostFromFile(filePath: string, expectedType: PostType, includeContent = false): Post | null {
  const fileContents = fs.readFileSync(filePath, "utf8");

  let parsed;
  try {
    parsed = matter(fileContents);
  } catch (error) {
    console.warn(`[posts] Failed to parse frontmatter: ${filePath}`, error);
    return null;
  }

  const { data, content } = parsed;
  const slug = path.basename(path.dirname(filePath));

  if (
    typeof data.title !== "string" ||
    !isValidDate(data.date) ||
    !isPostType(data.type) ||
    typeof data.slug !== "string" ||
    typeof data.draft !== "boolean" ||
    typeof data.summary !== "string"
  ) {
    console.warn(`[posts] Missing required frontmatter fields: ${filePath}`);
    return null;
  }

  if (data.type !== expectedType) {
    console.warn(`[posts] Unexpected type in ${filePath}: expected ${expectedType}, got ${data.type}`);
    return null;
  }

  if (data.slug !== slug) {
    console.warn(`[posts] Slug mismatch in ${filePath}: expected ${slug}, got ${data.slug}`);
    return null;
  }

  const post: Post = {
    title: data.title,
    type: data.type,
    date: data.date,
    slug: data.slug,
    summary: data.summary,
    draft: data.draft,
    tags: isStringArray(data.tags) ? data.tags : undefined,
    cover: typeof data.cover === "string" ? data.cover : undefined,
    updatedAt: typeof data.updatedAt === "string" && isValidDate(data.updatedAt) ? data.updatedAt : undefined,
    content: includeContent ? content : undefined,
  };

  return post;
}

function getPostTypeDirectory(type: PostType): string {
  return path.join(CONTENT_ROOT, TYPE_TO_DIRECTORY[type]);
}

function readPostsFromDirectory(type: PostType): Post[] {
  const directory = getPostTypeDirectory(type);

  if (!fs.existsSync(directory)) {
    return [];
  }

  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const filePath = path.join(directory, entry.name, "text.md");

      if (!fs.existsSync(filePath)) {
        console.warn(`[posts] Missing text.md: ${filePath}`);
        return null;
      }

      const post = buildPostFromFile(filePath, type);

      if (!post || post.draft) {
        return null;
      }

      return post;
    })
    .filter((post): post is Post => post !== null)
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function getAllPosts(): Post[] {
  return POST_TYPES.flatMap((type) => readPostsFromDirectory(type)).sort((left, right) => right.date.localeCompare(left.date));
}

export function getPostsByType(type: PostType): Post[] {
  return readPostsFromDirectory(type);
}

export function getLatestPosts(limit?: number): Post[] {
  const posts = getAllPosts();

  if (typeof limit === "number") {
    return posts.slice(0, limit);
  }

  return posts;
}

export async function getPostBySlug(type: PostType, slug: string): Promise<Post | null> {
  const filePath = path.join(getPostTypeDirectory(type), slug, "text.md");

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const post = buildPostFromFile(filePath, type, true);

  if (!post || post.draft) {
    return null;
  }

  const result = await remark().use(remarkHtml, { sanitize: true }).process(post.content ?? "");

  return {
    ...post,
    content: String(result),
  };
}
