import { Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { asyncHandler } from "../../lib/http.js";
import { requireAdmin } from "../../middlewares/auth.js";
import { crudRouter } from "./crud.js";
import { postsRouter } from "./posts.js";
import { uploadsRouter } from "./uploads.js";
import { educationSchema, eventSchema, experienceSchema, projectSchema, skillSchema } from "./schemas.js";

export const adminRouter = Router();

adminRouter.use(requireAdmin);

adminRouter.get(
  "/stats",
  asyncHandler(async (_req, res) => {
    const [published, drafts, views, subscribers, unread, projects] = await Promise.all([
      prisma.post.count({ where: { status: "PUBLISHED" } }),
      prisma.post.count({ where: { status: "DRAFT" } }),
      prisma.post.aggregate({ _sum: { views: true } }),
      prisma.subscriber.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.project.count(),
    ]);
    const topPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { views: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, views: true },
    });
    res.json({ published, drafts, views: views._sum.views ?? 0, subscribers, unread, projects, topPosts });
  }),
);

adminRouter.use("/posts", postsRouter);
adminRouter.use("/uploads", uploadsRouter);
adminRouter.use("/projects", crudRouter({ model: prisma.project, schema: projectSchema, tag: "projects" }));
adminRouter.use(
  "/experiences",
  crudRouter({
    model: prisma.experience,
    schema: experienceSchema,
    tag: "experiences",
    orderBy: [{ order: "asc" }, { startDate: "desc" }],
  }),
);
adminRouter.use("/skills", crudRouter({ model: prisma.skill, schema: skillSchema, tag: "skills" }));
adminRouter.use("/education", crudRouter({ model: prisma.education, schema: educationSchema, tag: "education" }));
adminRouter.use("/events", crudRouter({ model: prisma.event, schema: eventSchema, tag: "events" }));

adminRouter.get(
  "/subscribers",
  asyncHandler(async (_req, res) => {
    res.json(await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } }));
  }),
);
adminRouter.delete(
  "/subscribers/:id",
  asyncHandler(async (req, res) => {
    await prisma.subscriber.delete({ where: { id: String(req.params.id) } });
    res.status(204).end();
  }),
);

adminRouter.get(
  "/messages",
  asyncHandler(async (_req, res) => {
    res.json(await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } }));
  }),
);
adminRouter.patch(
  "/messages/:id",
  asyncHandler(async (req, res) => {
    res.json(
      await prisma.contactMessage.update({ where: { id: String(req.params.id) }, data: { read: Boolean(req.body?.read) } }),
    );
  }),
);
adminRouter.delete(
  "/messages/:id",
  asyncHandler(async (req, res) => {
    await prisma.contactMessage.delete({ where: { id: String(req.params.id) } });
    res.status(204).end();
  }),
);
