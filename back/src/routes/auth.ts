import { Router } from "express";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { asyncHandler, HttpError, parse } from "../lib/http.js";
import { AUTH_COOKIE, authCookieOptions, requireAdmin, signToken } from "../middlewares/auth.js";

export const authRouter = Router();

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

authRouter.post(
  "/login",
  loginLimiter,
  asyncHandler(async (req, res) => {
    const { email, password } = parse(
      z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1) }),
      req.body,
    );
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      throw new HttpError(401, "Email ou mot de passe incorrect");
    }
    res.cookie(AUTH_COOKIE, signToken(admin.id), authCookieOptions);
    res.json({ id: admin.id, email: admin.email, name: admin.name });
  }),
);

authRouter.post("/logout", (_req, res) => {
  const { maxAge: _maxAge, ...opts } = authCookieOptions;
  res.clearCookie(AUTH_COOKIE, opts);
  res.status(204).end();
});

authRouter.get(
  "/me",
  requireAdmin,
  asyncHandler(async (_req, res) => {
    const admin = await prisma.adminUser.findUnique({
      where: { id: res.locals.adminId },
      select: { id: true, email: true, name: true },
    });
    if (!admin) throw new HttpError(401, "Compte introuvable");
    res.json(admin);
  }),
);

authRouter.post(
  "/password",
  requireAdmin,
  asyncHandler(async (req, res) => {
    const { current, next } = parse(z.object({ current: z.string(), next: z.string().min(10) }), req.body);
    const admin = await prisma.adminUser.findUniqueOrThrow({ where: { id: res.locals.adminId } });
    if (!(await bcrypt.compare(current, admin.passwordHash))) throw new HttpError(400, "Mot de passe actuel incorrect");
    await prisma.adminUser.update({ where: { id: admin.id }, data: { passwordHash: await bcrypt.hash(next, 12) } });
    res.status(204).end();
  }),
);
