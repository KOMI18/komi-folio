import Image from "next/image";
import Link from "next/link";
import type { PostSummary } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

export function PostCard({ post, featured }: { post: PostSummary; featured?: boolean }) {
  return (
    <article className={cn("group relative flex flex-col", featured && "md:grid md:grid-cols-2 md:items-center md:gap-10")}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border bg-surface-2">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="glow bg-grid absolute inset-0 grid place-items-center">
            <span className="accent px-6 text-center text-3xl">{post.tags[0] ?? "Blog"}</span>
          </div>
        )}
      </div>
      <div className={cn("mt-5", featured && "md:mt-0")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min de lecture</span>
        </div>
        <h3 className={cn("mt-2 font-semibold tracking-tight text-balance transition group-hover:text-primary", featured ? "text-3xl md:text-4xl" : "text-xl")}>
          <Link href={`/blog/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-2 text-muted", featured ? "text-lg" : "line-clamp-2 text-sm")}>{post.excerpt}</p>
        {post.tags.length > 0 && (
          <ul className="relative z-10 mt-4 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <li key={t}>
                <Link href={`/blog/tag/${encodeURIComponent(t)}`} className="chip hover:text-foreground">
                  #{t}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
