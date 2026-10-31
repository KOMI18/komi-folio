import { env } from "./env.js";
import { app } from "./app.js";
import { prisma } from "./lib/prisma.js";
import { ensureAdmin } from "./lib/bootstrap.js";
import { resumeAudioQueue } from "./lib/audio.js";

await ensureAdmin();

const server = app.listen(env.PORT, () => {
  console.log(`API prête sur le port ${env.PORT}`);
  // Laisse au service de synthèse vocale le temps de démarrer (chargement du modèle)
  setTimeout(() => void resumeAudioQueue().catch((err) => console.error("Reprise audio :", err)), 60_000).unref();
});

const shutdown = () => {
  server.close(() => {
    prisma.$disconnect().finally(() => process.exit(0));
  });
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
