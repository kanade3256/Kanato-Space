import { getLatestPosts } from "@/features/posts/posts";

export default function DevPostsPage() {
  const posts = getLatestPosts();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-6 text-2xl font-semibold text-primary">Dev Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={`${post.type}-${post.slug}`} className="rounded-lg border border-border p-4">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-secondary">
              <span>{post.type}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.slug}</span>
            </div>
            <h2 className="mb-2 text-lg font-semibold text-primary">{post.title}</h2>
            <p className="text-sm leading-6 text-secondary">{post.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
