import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler, HttpError, parse } from "../../lib/http.js";
import { readingMinutes, slugify } from "../../lib/text.js";
import { revalidate } from "../../lib/revalidate.js";
import { enqueueAudio, refreshAudio, removeAudioFile, ttsEnabled } from "../../lib/audio.js";
import { postSchema } from "./schemas.js";

export const postsRouter = Router();

postsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    res.json(
      await prisma.post.findMany({
        orderBy: { updatedAt: "desc" },
        omit: { content: true, audioTimeline: true },
      }),
    );
  }),
);

postsRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    res.json(await prisma.post.findUniqueOrThrow({ where: { id: String(req.params.id) } }));
  }),
);

postsRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = parse(postSchema, req.body);
    const post = await prisma.post.create({
      data: {
        ...data,
        slug: slugify(data.slug || data.title),
        readingMinutes: readingMinutes(data.content),
        publishedAt: data.status === "PUBLISHED" ? (data.publishedAt ?? new Date()) : data.publishedAt,
      },
    });
    revalidate(["posts"]);
    refreshAudio(post);
    res.status(201).json(post);
  }),
);

postsRouter.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    const data = parse(postSchema.partial(), req.body);
    const current = await prisma.post.findUniqueOrThrow({ where: { id: String(req.params.id) } });
    const post = await prisma.post.update({
      where: { id: current.id },
      data: {
        ...data,
        ...(data.slug !== undefined ? { slug: slugify(data.slug || data.title || current.title) } : {}),
        ...(data.content !== undefined ? { readingMinutes: readingMinutes(data.content) } : {}),
        // Première publication : on fixe la date si elle n'a pas été choisie
        ...(data.status === "PUBLISHED" && !current.publishedAt && !data.publishedAt ? { publishedAt: new Date() } : {}),
      },
    });
    revalidate(["posts"]);
    refreshAudio(post);
    res.json(post);
  }),
);

// Relance manuelle de la génération audio (aussi possible sur un brouillon, pour l'écouter avant de publier)
postsRouter.post(
  "/:id/audio",
  asyncHandler(async (req, res) => {
    if (!ttsEnabled()) throw new HttpError(503, "Synthèse vocale non configurée (TTS_URL)");
    const post = await prisma.post.findUniqueOrThrow({ where: { id: String(req.params.id) }, select: { id: true } });
    enqueueAudio(post.id);
    res.status(202).json({ audioStatus: "PENDING" });
  }),
);

postsRouter.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = await prisma.post.delete({ where: { id: String(req.params.id) } });
    await removeAudioFile(post.audioUrl);
    revalidate(["posts"]);
    res.status(204).end();
  }),
);
