import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/blog-index";
import { getPosts, getTags } from "@/lib/api";

export async function generateStaticParams() {
  const tags = await getTags();
  // Cache Components impose au moins un paramètre ; le tag fictif renvoie une 404
  return tags.length ? tags.map((t) => ({ tag: t.name })) : [{ tag: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/tag/[tag]">): Promise<Metadata> {
  const tag = decodeURIComponent((await params).tag);
  return {
    title: `Articles #${tag}`,
    description: `Tous les articles du blog de Parfait Kom sur le sujet « ${tag} ».`,
    alternates: { canonical: `/blog/tag/${encodeURIComponent(tag)}` },
  };
}

export default async function TagPage({ params }: PageProps<"/blog/tag/[tag]">) {
  const tag = decodeURIComponent((await params).tag);
  const [posts, tags] = await Promise.all([getPosts({ tag, limit: 100 }), getTags()]);
  if (!posts.items.length) notFound();
  return <BlogIndex posts={posts.items} tags={tags} activeTag={tag} />;
}
