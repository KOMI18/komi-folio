import { Router } from "express";
import multer from "multer";
import { randomBytes } from "node:crypto";
import { mkdirSync } from "node:fs";
import { readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { env } from "../../env.js";
import { asyncHandler, HttpError } from "../../lib/http.js";

export const uploadDir = path.resolve(env.UPLOAD_DIR);
mkdirSync(uploadDir, { recursive: true });

const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml", "image/avif"]);

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase().replace(/[^.a-z0-9]/g, "");
      cb(null, `${Date.now()}-${randomBytes(4).toString("hex")}${ext}`);
    },
  }),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, ALLOWED.has(file.mimetype)),
});

const publicUrl = (name: string) => `${env.PUBLIC_URL}/uploads/${name}`;

export const uploadsRouter = Router();

uploadsRouter.post("/", upload.single("file"), (req, res) => {
  if (!req.file) throw new HttpError(400, "Fichier manquant ou format non supporté");
  res.status(201).json({ url: publicUrl(req.file.filename), name: req.file.filename });
});

uploadsRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const names = await readdir(uploadDir);
    const files = await Promise.all(
      names.map(async (name) => {
        const s = await stat(path.join(uploadDir, name));
        return { name, url: publicUrl(name), size: s.size, createdAt: s.mtime };
      }),
    );
    res.json(files.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  }),
);

uploadsRouter.delete(
  "/:name",
  asyncHandler(async (req, res) => {
    const name = path.basename(String(req.params.name));
    await unlink(path.join(uploadDir, name)).catch(() => {
      throw new HttpError(404, "Fichier introuvable");
    });
    res.status(204).end();
  }),
);
