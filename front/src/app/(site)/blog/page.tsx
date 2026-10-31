import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/blog-index";
import { getPosts, getTags } from "@/lib/api";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles sur le développement web et mobile (Flutter, Next.js, Node.js), l'automatisation, l'IA et l'entrepreneuriat tech au Cameroun.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: "Blog — Parfait Kom", images: [defaultOgImage] },
};

export default async function BlogPage() {
  const [posts, tags] = await Promise.all([getPosts({ limit: 100 }), getTags()]);
  return <BlogIndex posts={posts.items} tags={tags} />;
}
