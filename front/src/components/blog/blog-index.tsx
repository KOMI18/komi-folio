import Link from "next/link";
import type { PostSummary, Tag } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Newsletter } from "../site/newsletter";
import { Reveal } from "../site/reveal";
import { PostCard } from "./post-card";

export function BlogIndex({ posts, tags, activeTag }: { posts: PostSummary[]; tags: Tag[]; activeTag?: string }) {
  const [first, ...rest] = posts;
  const showFeatured = !activeTag && first;
  const grid = showFeatured ? rest : posts;

  return (
    <div className="container-page pt-36 pb-12 md:pt-44">
      <header className="max-w-3xl">
        <h1 className="text-5xl font-semibold tracking-tight text-balance md:text-6xl">
          {activeTag ? (
            <>
              Articles <span className="accent">#{activeTag}</span>
            </>
          ) : (
            <>
              Notes de <span className="accent">terrain</span>
            </>
          )}
        </h1>
        <p className="mt-5 text-lg text-muted">
          Ce que j&apos;apprends en construisant des produits : Flutter, Node.js, Next.js, automatisation, IA, et les
          coulisses de mes projets.
        </p>
      </header>

      {tags.length > 0 && (
        <nav aria-label="Filtrer par sujet" className="mt-10 flex flex-wrap gap-2">
          <Link href="/blog" className={cn("rounded-full border px-3.5 py-1.5 text-sm transition", !activeTag ? "bg-foreground text-background" : "bg-surface text-muted hover:text-foreground")}>
            Tous
          </Link>
          {tags.map((t) => (
            <Link
              key={t.name}
              href={`/blog/tag/${encodeURIComponent(t.name)}`}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition",
                activeTag === t.name ? "bg-foreground text-background" : "bg-surface text-muted hover:text-foreground",
              )}
            >
              #{t.name} <span className="opacity-60">{t.count}</span>
            </Link>
          ))}
        </nav>
      )}

      {posts.length === 0 ? (
        <div className="card mt-14 p-12 text-center">
          <p className="text-xl font-semibold">Les premiers articles arrivent très bientôt.</p>
          <p className="mt-2 text-muted">Inscrivez-vous à la newsletter pour être prévenu·e de leur sortie.</p>
        </div>
      ) : (
        <>
          {showFeatured && (
            <Reveal className="mt-14 border-b pb-14">
              <PostCard post={first} featured />
            </Reveal>
          )}
          <div className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {grid.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </>
      )}

      <Newsletter className="mt-24" />
    </div>
  );
}
