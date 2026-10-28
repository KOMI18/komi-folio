import type { CookieOptions, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env, isProd } from "../env.js";

export const AUTH_COOKIE = "komi_admin";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export const authCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax",
  path: "/",
  maxAge: MAX_AGE_MS,
};

export function signToken(adminId: string): string {
  return jwt.sign({ sub: adminId }, env.JWT_SECRET, { expiresIn: "7d" });
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[AUTH_COOKIE] ?? req.headers.authorization?.replace(/^Bearer /, "");
  if (!token) return res.status(401).json({ error: "Non authentifié" });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    res.locals.adminId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: "Session expirée" });
  }
}
