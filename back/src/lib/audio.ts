import { createHash } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { Mp3Encoder } from "@breezystack/lamejs";
import { Prisma } from "@prisma/client";
import { env } from "../env.js";
import { prisma } from "./prisma.js";
import { revalidate } from "./revalidate.js";
import { toSpeechSegments, type SpeechSegment } from "./speech.js";

// Version du format audio : l'incrémenter force la régénération de tous les articles
const AUDIO_VERSION = 1;
const MP3_KBPS = 48;

export interface AudioTimeline {
  version: number;
  duration: number;
  segments: (SpeechSegment & { start: number; end: number })[];
}

export const ttsEnabled = () => Boolean(env.TTS_URL);

// Empreinte de ce qui sera prononcé : si elle ne change pas, l'audio existant reste valable
export function audioHash(content: string) {
  const segments = toSpeechSegments(content);
  return createHash("sha256")
    .update(JSON.stringify({ v: AUDIO_VERSION, voice: env.TTS_VOICE, segments }))
    .digest("hex")
    .slice(0, 16);
}

// Silence après chaque type de ligne, pour un rythme de lecture naturel
const pauseAfter = (kind: SpeechSegment["kind"]) => (kind === "heading" || kind === "note" ? 0.7 : 0.35);

interface Pcm {
  samples: Int16Array;
  sampleRate: number;
}

// Extrait les échantillons d'un WAV 16 bits mono (format renvoyé par Kokoro)
function parseWav(buf: Buffer): Pcm {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WAVE") throw new Error("Réponse TTS : WAV invalide");
  let offset = 12;
  let sampleRate = 24000;
  while (offset + 8 <= buf.length) {
    const id = buf.toString("ascii", offset, offset + 4);
    const size = buf.readUInt32LE(offset + 4);
    if (id === "fmt ") {
      const channels = buf.readUInt16LE(offset + 10);
      const bits = buf.readUInt16LE(offset + 22);
      if (channels !== 1 || bits !== 16) throw new Error(`Réponse TTS : ${channels} canaux / ${bits} bits non gérés`);
      sampleRate = buf.readUInt32LE(offset + 12);
    } else if (id === "data") {
      // En streaming la taille peut être inconnue (0 ou 0xFFFFFFFF) : on prend tout le reste
      const end = size === 0 || size === 0xffffffff ? buf.length : Math.min(buf.length, offset + 8 + size);
      const bytes = buf.subarray(offset + 8, end - ((end - offset - 8) % 2));
      const samples = new Int16Array(bytes.length / 2);
      for (let i = 0; i < samples.length; i++) samples[i] = bytes.readInt16LE(i * 2);
      return { samples, sampleRate };
    }
    offset += 8 + size + (size % 2);
  }
  throw new Error("Réponse TTS : pas de données audio");
}

async function synthesize(text: string): Promise<Pcm> {
  const res = await fetch(`${env.TTS_URL}/v1/audio/speech`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "kokoro", input: text, voice: env.TTS_VOICE, response_format: "wav", speed: 1, stream: false }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!res.ok) throw new Error(`TTS ${res.status} : ${(await res.text()).slice(0, 200)}`);
  return parseWav(Buffer.from(await res.arrayBuffer()));
}

// Génère le MP3 d'un article phrase par phrase : on connaît ainsi le début et la fin exacts de chaque phrase
async function generate(postId: string) {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) return;
  const hash = audioHash(post.content);
  const segments = toSpeechSegments(post.content);
  if (segments.length === 0) {
    await prisma.post.update({ where: { id: postId }, data: { audioStatus: "NONE", audioUrl: null, audioTimeline: Prisma.DbNull, audioHash: hash } });
    return;
  }

  const started = Date.now();
  let encoder: Mp3Encoder | null = null;
  let sampleRate = 0;
  const chunks: Uint8Array[] = [];
  const timeline: AudioTimeline["segments"] = [];
  let samplesWritten = 0;

  for (const seg of segments) {
    const pcm = await synthesize(seg.speak ?? seg.text);
    if (!encoder) {
      sampleRate = pcm.sampleRate;
      encoder = new Mp3Encoder(1, sampleRate, MP3_KBPS);
    }
    const start = samplesWritten / sampleRate;
    const silence = new Int16Array(Math.round(pauseAfter(seg.kind) * sampleRate));
    for (const block of [pcm.samples, silence]) {
      // L'encodeur travaille par blocs de 1152 échantillons
      for (let i = 0; i < block.length; i += 1152 * 32) chunks.push(encoder.encodeBuffer(block.subarray(i, i + 1152 * 32)));
    }
    samplesWritten += pcm.samples.length + silence.length;
    timeline.push({ ...seg, start, end: start + pcm.samples.length / sampleRate });
  }
  chunks.push(encoder!.flush());

  const dir = path.join(path.resolve(env.UPLOAD_DIR), "audio");
  await mkdir(dir, { recursive: true });
  const file = `${post.slug}-${hash.slice(0, 8)}.mp3`;
  // lamejs renvoie en réalité des Int8Array : on les relit comme des octets
  await writeFile(path.join(dir, file), Buffer.concat(chunks.map((c) => Buffer.from(c.buffer, c.byteOffset, c.byteLength))));

  // Le contenu a pu changer pendant la génération (une nouvelle génération est alors déjà en file) : on vérifie que le contenu est toujours le même
  const fresh = await prisma.post.findUnique({ where: { id: postId }, select: { content: true, audioUrl: true } });
  if (!fresh || audioHash(fresh.content) !== hash) {
    await unlink(path.join(dir, file)).catch(() => {});
    return;
  }
  const audioUrl = `${env.PUBLIC_URL}/uploads/audio/${file}`;
  await prisma.post.update({
    where: { id: postId },
    data: {
      audioStatus: "READY",
      audioUrl,
      audioHash: hash,
      audioError: null,
      audioTimeline: { version: AUDIO_VERSION, duration: samplesWritten / sampleRate, segments: timeline } satisfies AudioTimeline as unknown as Prisma.InputJsonValue,
    },
  });
  if (fresh.audioUrl !== audioUrl) await removeAudioFile(fresh.audioUrl);
  revalidate(["posts"]);
  console.log(`Audio généré pour « ${post.slug} » : ${segments.length} phrases en ${Math.round((Date.now() - started) / 1000)} s`);
}

export async function removeAudioFile(url: string | null) {
  const name = url?.split("/uploads/audio/")[1];
  if (name && !name.includes("/")) await unlink(path.join(path.resolve(env.UPLOAD_DIR), "audio", name)).catch(() => {});
}

// File d'attente en mémoire : une génération à la fois pour ne pas saturer le CPU du serveur
const queue: string[] = [];
let running = false;

export function enqueueAudio(postId: string) {
  if (!ttsEnabled() || queue.includes(postId)) return;
  queue.push(postId);
  void prisma.post.update({ where: { id: postId }, data: { audioStatus: "PENDING", audioError: null } }).catch(() => {});
  void drain();
}

async function drain() {
  if (running) return;
  running = true;
  while (queue.length) {
    const id = queue.shift()!;
    try {
      await generate(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Génération audio échouée (${id}) :`, message);
      await prisma.post.update({ where: { id }, data: { audioStatus: "FAILED", audioError: message.slice(0, 500) } }).catch(() => {});
    }
  }
  running = false;
}

// À appeler après une modification : relance la génération si le texte prononcé a changé
export function refreshAudio(post: { id: string; status: string; content: string; audioHash: string | null; audioStatus: string }) {
  if (post.status !== "PUBLISHED") return;
  if (post.audioStatus === "READY" && post.audioHash === audioHash(post.content)) return;
  enqueueAudio(post.id);
}

// Au démarrage : rattrape les articles publiés sans audio à jour (nouvelle fonctionnalité, redémarrage pendant une génération, échec)
export async function resumeAudioQueue() {
  if (!ttsEnabled()) return;
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { id: true, status: true, content: true, audioHash: true, audioStatus: true },
  });
  for (const p of posts) refreshAudio(p);
}

// Données du mode écoute envoyées au front : l'audio n'est proposé que s'il correspond au contenu actuel
export function speechPayload(post: { content: string; audioStatus: string; audioUrl: string | null; audioHash: string | null; audioTimeline: unknown }) {
  const timeline = post.audioTimeline as AudioTimeline | null;
  if (post.audioStatus === "READY" && post.audioUrl && timeline?.version === AUDIO_VERSION && post.audioHash === audioHash(post.content)) {
    return { segments: timeline.segments, audio: { url: post.audioUrl, duration: timeline.duration } };
  }
  return { segments: toSpeechSegments(post.content), audio: null };
}
