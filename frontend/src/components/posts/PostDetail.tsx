import Link from "next/link";

import { Container } from "@/components/ui/Container";
import type { Post, PostType } from "@/types/post";

const tagClassByType: Record<PostType, string> = {
  Blog: "bg-green-50 text-green-700",
  Lab: "bg-blue-50 text-blue-700",
  Note: "bg-yellow-50 text-yellow-700",
};

type PostDetailProps = {
  post: Post;
  backHref: string;
  backLabel: string;
};

export function PostDetail({ post, backHref, backLabel }: PostDetailProps) {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <article className="space-y-8">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${tagClassByType[post.type]}`}>{post.type}</span>
              <time dateTime={post.date} className="text-secondary">
                {post.date}
              </time>
            </div>

            <h1 className="text-4xl font-bold tracking-[-0.02em] text-primary md:text-5xl">{post.title}</h1>
            <p className="text-base text-secondary">{post.summary}</p>

            {post.tags && post.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-2" aria-label="タグ">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-md bg-gray-100 px-2 py-1 text-xs text-secondary">
                    #{tag}
                  </li>
                ))}
              </ul>
            ) : null}

            {post.updatedAt ? (
              <p className="text-sm text-secondary">
                Updated: <time dateTime={post.updatedAt}>{post.updatedAt}</time>
              </p>
            ) : null}
          </header>

          <div
            className="space-y-4 leading-8 text-primary [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:text-base [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-gray-900 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:text-gray-100 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          />

          <Link href={backHref} className="inline-flex text-sm font-medium text-primary hover:underline">
            {`← ${backLabel}一覧へ戻る`}
          </Link>
        </article>
      </Container>
    </section>
  );
}
