import { getAllPosts } from "@/lib/api";
import { site } from "@/lib/site";

const escape = (s: string) => s.replace(/[<>&'"]/g, (c) => `&#${c.charCodeAt(0)};`);

export async function GET() {
  const posts = await getAllPosts();
  const items = posts
    .map(
      (p) => `<item>
  <title>${escape(p.title)}</title>
  <link>${site.url}/blog/${p.slug}</link>
  <guid isPermaLink="true">${site.url}/blog/${p.slug}</guid>
  <description>${escape(p.excerpt)}</description>
  ${p.publishedAt ? `<pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>` : ""}
  ${p.tags.map((t) => `<category>${escape(t)}</category>`).join("")}
</item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Blog — ${escape(site.name)}</title>
  <link>${site.url}/blog</link>
  <description>${escape(site.description)}</description>
  <language>fr-FR</language>
  <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
</channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
