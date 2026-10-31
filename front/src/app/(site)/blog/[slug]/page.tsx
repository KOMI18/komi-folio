import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Markdown } from "@/components/blog/markdown";
import { PostCard } from "@/components/blog/post-card";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { Share } from "@/components/blog/share";
import { Toc } from "@/components/blog/toc";
import { ViewTracker } from "@/components/blog/view-tracker";
import { JsonLd } from "@/components/site/json-ld";
import { Newsletter } from "@/components/site/newsletter";
import { getAllPosts, getPost } from "@/lib/api";
import { extractHeadings } from "@/lib/markdown";
import { postOgImage } from "@/lib/seo";
import { site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  // Cache Components impose au moins un paramètre ; le slug fictif renvoie une 404
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return { title: "Article introuvable", robots: { index: false } };
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `/blog/${post.slug}`;
  const image = postOgImage(post);
  return {
    title,
    description,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      authors: [site.name],
      tags: post.tags,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const url = `${site.url}/blog/${post.slug}`;
  const headings = extractHeadings(post.content);

  return (
    <>
      <ReadingProgress />
      <ViewTracker slug={post.slug} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.seoDescription || post.excerpt,
          image: [new URL(postOgImage(post).url, site.url).toString()],
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          keywords: post.tags.join(", "),
          inLanguage: "fr-FR",
          mainEntityOfPage: url,
          author: { "@type": "Person", name: site.name, url: site.url },
          publisher: { "@type": "Person", name: site.name, url: site.url },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }}
      />

      <article className="container-page pt-32 md:pt-40">
        <header className="mx-auto max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-foreground">
            <ArrowLeft className="size-4" /> Tous les articles
          </Link>
          {post.tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <li key={t}>
                  <Link href={`/blog/tag/${encodeURIComponent(t)}`} className="chip hover:text-foreground">
                    #{t}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance md:text-6xl">{post.title}</h1>
          <p className="mt-5 text-xl text-pretty text-muted">{post.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y py-4">
            <div className="flex items-center gap-3">
              <Image src="/projects/parfaitkom.jpeg" alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
              <div className="text-sm">
                <p className="font-medium">{site.name}</p>
                <p className="flex items-center gap-2 text-muted">
                  <time dateTime={post.publishedAt ?? undefined}>{formatDate(post.publishedAt)}</time>
                  <span aria-hidden>·</span>
                  <Clock className="size-3.5" /> {post.readingMinutes} min
                </p>
              </div>
            </div>
            <Share url={url} title={post.title} />
          </div>
        </header>

        {post.coverImage && (
          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl border">
            <Image src={post.coverImage} alt="" fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        )}

        <div className="mx-auto mt-14 grid max-w-6xl gap-12 lg:grid-cols-[1fr_minmax(0,48rem)_1fr]">
          <div className="hidden lg:block" />
          <div className="prose prose-neutral dark:prose-invert prose-article min-w-0">
            <Markdown content={post.content} />
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Toc headings={headings} />
            </div>
          </aside>
        </div>

        <footer className="mx-auto mt-16 max-w-3xl space-y-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
            <p className="text-sm text-muted">Mis à jour le {formatDate(post.updatedAt)}</p>
            <Share url={url} title={post.title} />
          </div>
          <Newsletter compact />
        </footer>
      </article>

      {post.related.length > 0 && (
        <section className="container-page mt-24">
          <h2 className="text-2xl font-semibold tracking-tight">À lire ensuite</h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {post.related.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
