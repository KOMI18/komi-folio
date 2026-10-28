import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { asyncHandler, HttpError, parse } from "../lib/http.js";
import { sendMail } from "../lib/mail.js";

export const publicRouter = Router();

const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

const postListSelect = {
  id: true,
  slug: true,
  title: true,
  excerpt: true,
  coverImage: true,
  tags: true,
  featured: true,
  readingMinutes: true,
  publishedAt: true,
  updatedAt: true,
} as const;

const listQuery = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
  tag: z.string().optional(),
  q: z.string().optional(),
});

publicRouter.get(
  "/posts",
  asyncHandler(async (req, res) => {
    const { page, limit, tag, q } = parse(listQuery, req.query);
    const where = {
      status: "PUBLISHED" as const,
      ...(tag ? { tags: { has: tag } } : {}),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" as const } },
              { excerpt: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };
    const [items, total] = await Promise.all([
      prisma.post.findMany({
        where,
        select: postListSelect,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  }),
);

publicRouter.get(
  "/posts/tags",
  asyncHandler(async (_req, res) => {
    const posts = await prisma.post.findMany({ where: { status: "PUBLISHED" }, select: { tags: true } });
    const counts = new Map<string, number>();
    for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    res.json([...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count));
  }),
);

publicRouter.get(
  "/posts/:slug",
  asyncHandler(async (req, res) => {
    const post = await prisma.post.findFirst({ where: { slug: String(req.params.slug), status: "PUBLISHED" } });
    if (!post) throw new HttpError(404, "Article introuvable");
    const related = await prisma.post.findMany({
      where: { status: "PUBLISHED", id: { not: post.id }, tags: { hasSome: post.tags } },
      select: postListSelect,
      orderBy: { publishedAt: "desc" },
      take: 3,
    });
    res.json({ ...post, related });
  }),
);

publicRouter.post(
  "/posts/:slug/view",
  asyncHandler(async (req, res) => {
    await prisma.post.updateMany({
      where: { slug: String(req.params.slug), status: "PUBLISHED" },
      data: { views: { increment: 1 } },
    });
    res.status(204).end();
  }),
);

publicRouter.get(
  "/portfolio",
  asyncHandler(async (_req, res) => {
    const visible = { where: { visible: true }, orderBy: { order: "asc" as const } };
    const [projects, experiences, skills, education] = await Promise.all([
      prisma.project.findMany(visible),
      prisma.experience.findMany({ where: { visible: true }, orderBy: [{ order: "asc" }, { startDate: "desc" }] }),
      prisma.skill.findMany(visible),
      prisma.education.findMany(visible),
    ]);
    res.json({ projects, experiences, skills, education });
  }),
);

publicRouter.get(
  "/events",
  asyncHandler(async (_req, res) => {
    res.json(await prisma.event.findMany({ where: { visible: true }, orderBy: { order: "asc" } }));
  }),
);

publicRouter.post(
  "/subscribers",
  formLimiter,
  asyncHandler(async (req, res) => {
    const { email } = parse(z.object({ email: z.string().trim().toLowerCase().email() }), req.body);
    await prisma.subscriber.upsert({ where: { email }, create: { email }, update: {} });
    res.status(201).json({ ok: true });
  }),
);

publicRouter.post(
  "/contact",
  formLimiter,
  asyncHandler(async (req, res) => {
    const data = parse(
      z.object({
        name: z.string().trim().min(1).max(120),
        email: z.string().trim().email(),
        message: z.string().trim().min(5).max(5000),
      }),
      req.body,
    );
    await prisma.contactMessage.create({ data });
    sendMail(`Nouveau message de ${data.name}`, `${data.message}\n\n— ${data.name} <${data.email}>`, data.email).catch(
      (err) => console.warn(err),
    );
    res.status(201).json({ ok: true });
  }),
);
