import type { MetadataRoute } from "next";
import { getAllPosts, getTags } from "@/lib/api";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, tags] = await Promise.all([getAllPosts(), getTags()]);
  const lastPost = posts[0]?.updatedAt;
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/blog`, lastModified: lastPost, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/events`, changeFrequency: "yearly", priority: 0.5 },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...tags.map((t) => ({ url: `${site.url}/blog/tag/${encodeURIComponent(t.name)}`, changeFrequency: "weekly" as const, priority: 0.4 })),
  ];
}
