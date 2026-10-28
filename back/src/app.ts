import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { corsOrigins, env, isProd } from "./env.js";
import { errorHandler } from "./lib/http.js";
import { publicRouter } from "./routes/public.js";
import { authRouter } from "./routes/auth.js";
import { adminRouter } from "./routes/admin/index.js";
import { uploadDir } from "./routes/admin/uploads.js";

export const app = express();

app.set("trust proxy", env.TRUST_PROXY_HOPS);
app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(morgan(isProd ? "combined" : "dev"));

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});
app.use("/uploads", express.static(uploadDir, { maxAge: "30d", immutable: true }));
app.use("/api", publicRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});
app.use(errorHandler);
