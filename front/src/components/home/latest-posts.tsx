import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostSummary } from "@/lib/types";
import { PostCard } from "../blog/post-card";
import { Reveal } from "../site/reveal";
import { SectionHeading } from "../site/section-heading";

export function LatestPosts({ posts }: { posts: PostSummary[] }) {
  if (!posts.length) return null;
  return (
    <section id="blog" className="py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            title={
              <>
                Derniers <span className="accent">articles</span>
              </>
            }
          />
          <Link href="/blog" className="btn-ghost mb-12">
            Tous les articles <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
