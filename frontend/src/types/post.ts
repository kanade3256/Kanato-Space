export type PostType = "Blog" | "Lab" | "Note";

export type Post = {
  title: string;
  type: PostType;
  date: string;
  slug: string;
  summary: string;
  tags?: string[];
  cover?: string;
  draft: boolean;
  updatedAt?: string;
  content?: string;
};
