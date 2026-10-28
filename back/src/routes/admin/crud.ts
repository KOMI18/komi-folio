import { Router } from "express";
import type { ZodObject, ZodRawShape } from "zod";
import { asyncHandler, parse } from "../../lib/http.js";
import { revalidate, type CacheTag } from "../../lib/revalidate.js";

// Sous-ensemble commun des delegates Prisma utilisé par le CRUD générique
interface Delegate {
  findMany(args: object): Promise<unknown[]>;
  findUniqueOrThrow(args: object): Promise<unknown>;
  create(args: object): Promise<unknown>;
  update(args: object): Promise<unknown>;
  delete(args: object): Promise<unknown>;
}

export function crudRouter<T extends ZodRawShape>(opts: {
  model: Delegate;
  schema: ZodObject<T>;
  tag: CacheTag;
  orderBy?: object;
}): Router {
  const { model, schema, tag, orderBy = { order: "asc" } } = opts;
  const router = Router();

  router.get(
    "/",
    asyncHandler(async (_req, res) => {
      res.json(await model.findMany({ orderBy }));
    }),
  );

  router.get(
    "/:id",
    asyncHandler(async (req, res) => {
      res.json(await model.findUniqueOrThrow({ where: { id: String(req.params.id) } }));
    }),
  );

  router.post(
    "/",
    asyncHandler(async (req, res) => {
      const item = await model.create({ data: parse(schema, req.body) });
      revalidate([tag]);
      res.status(201).json(item);
    }),
  );

  router.patch(
    "/:id",
    asyncHandler(async (req, res) => {
      const item = await model.update({ where: { id: String(req.params.id) }, data: parse(schema.partial(), req.body) });
      revalidate([tag]);
      res.json(item);
    }),
  );

  router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
      await model.delete({ where: { id: String(req.params.id) } });
      revalidate([tag]);
      res.status(204).end();
    }),
  );

  return router;
}
