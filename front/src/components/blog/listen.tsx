"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Code2, Headphones, Music, Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import type { PostSpeech } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Ambient } from "./ambient";

const RATES = [0.8, 1, 1.25, 1.5];

const noopSubscribe = () => () => {};
const useSpeechSupported = () =>
  useSyncExternalStore(
    noopSubscribe,
    () => "speechSynthesis" in window,
    () => false,
  );

// Meilleure voix française disponible : les voix « naturelles » (Edge, Safari) en priorité
function pickVoice(voices: SpeechSynthesisVoice[]) {
  const score = (v: SpeechSynthesisVoice) => {
    const name = v.name.toLowerCase();
    let s = v.lang.toLowerCase() === "fr-fr" ? 1 : 0;
    if (/natural|neural|online|premium|enhanced/.test(name)) s += 4;
    if (/google/.test(name)) s += 2;
    if (/amélie|amelie|audrey|thomas|denise|henri|vivienne|marie/.test(name)) s += 2;
    return s;
  };
  return voices.filter((v) => v.lang.toLowerCase().startsWith("fr")).sort((a, b) => score(b) - score(a))[0] ?? null;
}

// Phrase en cours, mot à mot : la partie déjà prononcée s'allume
function KaraokeLine({ text, spokenUpTo }: { text: string; spokenUpTo: number | null }) {
  if (spokenUpTo === null) return <>{text}</>;
  const tokens = Array.from(text.matchAll(/\S+|\s+/g), (m) => ({ token: m[0], start: m.index }));
  return (
    <>
      {tokens.map(({ token, start }) => (
        <span key={start} className={cn("transition-colors duration-150", start < spokenUpTo ? "text-white" : "text-white/40")}>
          {token}
        </span>
      ))}
    </>
  );
}

const formatTime = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

// Deux moteurs : le MP3 généré par Kokoro sur le serveur quand il existe, sinon la voix du navigateur
export function Listen({ speech, title, cover }: { speech: PostSpeech; title: string; cover: string | null }) {
  const { segments, audio: audioFile } = speech;
  const speechSupported = useSpeechSupported();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [spokenUpTo, setSpokenUpTo] = useState<number | null>(null);
  const [time, setTime] = useState(0);
  const [rate, setRate] = useState(1);
  const [ambientOn, setAmbientOn] = useState(false);
  const [noFrenchVoice, setNoFrenchVoice] = useState(false);

  const gen = useRef(0); // invalide les événements des phrases annulées
  const rateRef = useRef(1);
  const voice = useRef<SpeechSynthesisVoice | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const ambient = useRef<Ambient | null>(null);
  const lines = useRef<(HTMLLIElement | null)[]>([]);

  const finished = index >= segments.length;

  // --- Moteur audio (MP3) : la position de lecture pilote la phrase et le mot affichés ---
  const syncToTime = (t: number) => {
    setTime(t);
    let i = segments.findIndex((s) => (s.start ?? 0) > t) - 1;
    if (i === -2) i = segments.length - 1;
    i = Math.max(i, 0);
    setIndex(i);
    const seg = segments[i];
    if (seg.kind === "note" || seg.start === undefined || seg.end === undefined) return setSpokenUpTo(null);
    // Pas de minutage par mot pour le français : on avance au prorata du texte, ce qui suit bien le débit de la voix
    const frac = Math.min(Math.max((t - seg.start) / Math.max(seg.end - seg.start, 0.01), 0), 1);
    setSpokenUpTo(Math.round(frac * seg.text.length));
  };

  const getAudio = () => {
    if (audio.current || !audioFile) return audio.current;
    const el = new Audio(audioFile.url);
    el.preload = "auto";
    el.addEventListener("play", () => setPlaying(true));
    el.addEventListener("pause", () => setPlaying(false));
    el.addEventListener("ended", () => {
      setPlaying(false);
      setSpokenUpTo(null);
      setIndex(segments.length);
    });
    audio.current = el;
    return el;
  };

  // --- Moteur navigateur (Web Speech API) ---
  const chooseVoice = () => {
    const v = pickVoice(window.speechSynthesis.getVoices());
    if (v) voice.current = v;
    setNoFrenchVoice(!voice.current && window.speechSynthesis.getVoices().length > 0);
  };

  function speakWithBrowser(i: number) {
    const synth = window.speechSynthesis;
    const current = ++gen.current;
    synth.cancel();
    setSpokenUpTo(null);
    setIndex(i);
    if (i >= segments.length) {
      setPlaying(false);
      return;
    }
    setPlaying(true);
    const seg = segments[i];
    const utterance = new SpeechSynthesisUtterance(seg.speak ?? seg.text);
    utterance.lang = "fr-FR";
    if (voice.current) utterance.voice = voice.current;
    utterance.rate = rateRef.current;
    utterance.onboundary = (e) => {
      if (current !== gen.current || e.name !== "word" || seg.speak) return;
      const len = e.charLength || (seg.text.slice(e.charIndex).match(/^\S+/)?.[0].length ?? 0);
      setSpokenUpTo(e.charIndex + len);
    };
    utterance.onend = () => {
      if (current === gen.current) speakWithBrowser(i + 1);
    };
    utterance.onerror = (e) => {
      if (current === gen.current && e.error !== "interrupted" && e.error !== "canceled") setPlaying(false);
    };
    synth.speak(utterance);
  }

  // --- Commandes communes ---
  function playFrom(i: number) {
    const el = getAudio();
    if (!el) return speakWithBrowser(i);
    el.currentTime = i >= segments.length ? 0 : (segments[i].start ?? 0);
    syncToTime(el.currentTime);
    void el.play().catch(() => setPlaying(false));
  }

  // Côté navigateur, pause = on coupe la phrase et on la reprend au début (pause/resume est peu fiable sur Android)
  function pause() {
    if (audio.current) return audio.current.pause();
    gen.current++;
    window.speechSynthesis?.cancel();
    setPlaying(false);
    setSpokenUpTo(null);
  }

  const toggle = () => {
    if (playing) return pause();
    if (audio.current && !finished) return void audio.current.play().catch(() => setPlaying(false));
    playFrom(finished ? 0 : index);
  };
  const go = (delta: number) => playFrom(Math.min(Math.max(index + delta, 0), segments.length - 1));

  const openPlayer = () => {
    if (!audioFile) chooseVoice();
    setOpen(true);
    if (audio.current && !finished) void audio.current.play().catch(() => setPlaying(false));
    else playFrom(finished ? 0 : index);
  };

  const close = () => {
    pause();
    ambient.current?.stop();
    setAmbientOn(false);
    setOpen(false);
  };

  const cycleRate = () => {
    const next = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
    rateRef.current = next;
    setRate(next);
    if (audio.current) audio.current.playbackRate = next;
    else if (playing) speakWithBrowser(index);
  };

  const toggleAmbient = () => {
    ambient.current ??= new Ambient();
    if (ambientOn) ambient.current.stop();
    else ambient.current.start();
    setAmbientOn(!ambientOn);
  };

  // Suivi fluide de la lecture audio (timeupdate n'arrive que ~4 fois par seconde)
  useEffect(() => {
    if (!playing || !audio.current) return;
    let frame = 0;
    const tick = () => {
      if (audio.current) syncToTime(audio.current.currentTime);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // syncToTime ne dépend que des segments, stables pendant la vie du composant
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  // Commandes de l'écran verrouillé / casque Bluetooth (lecture audio uniquement)
  useEffect(() => {
    if (!open || !audioFile || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: "Parfait Kom",
      album: "Blog",
      artwork: cover ? [{ src: cover }] : [{ src: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    });
    navigator.mediaSession.setActionHandler("play", () => document.getElementById("listen-toggle")?.click());
    navigator.mediaSession.setActionHandler("pause", () => document.getElementById("listen-toggle")?.click());
    navigator.mediaSession.setActionHandler("previoustrack", () => document.getElementById("listen-prev")?.click());
    navigator.mediaSession.setActionHandler("nexttrack", () => document.getElementById("listen-next")?.click());
    return () => {
      for (const action of ["play", "pause", "previoustrack", "nexttrack"] as const) navigator.mediaSession.setActionHandler(action, null);
    };
  }, [open, audioFile, title, cover]);

  // La liste des voix arrive parfois après coup (Chrome)
  useEffect(() => {
    if (!open || audioFile) return;
    const synth = window.speechSynthesis;
    const onVoices = () => {
      const v = pickVoice(synth.getVoices());
      if (v) voice.current = v;
    };
    synth.addEventListener("voiceschanged", onVoices);
    return () => synth.removeEventListener("voiceschanged", onVoices);
  }, [open, audioFile]);

  // Bloque le défilement de la page derrière le lecteur
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // La phrase en cours reste centrée, comme les paroles sur Spotify
  useEffect(() => {
    if (!open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lines.current[Math.min(index, segments.length)]?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, [index, open, segments.length]);

  // Coupe tout si on quitte la page
  useEffect(() => {
    const stop = () => {
      gen.current++;
      window.speechSynthesis?.cancel();
      audio.current?.pause();
      ambient.current?.stop();
    };
    window.addEventListener("pagehide", stop);
    return () => {
      window.removeEventListener("pagehide", stop);
      stop();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") document.getElementById("listen-close")?.click();
      else if (e.key === " " && !(e.target instanceof HTMLButtonElement)) {
        e.preventDefault();
        document.getElementById("listen-toggle")?.click();
      } else if (e.key === "ArrowRight") document.getElementById("listen-next")?.click();
      else if (e.key === "ArrowLeft") document.getElementById("listen-prev")?.click();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if ((!audioFile && !speechSupported) || segments.length === 0) return null;

  const progress = (audioFile ? (finished ? 1 : time / audioFile.duration) : Math.min(index / segments.length, 1)) * 100;
  const iconBtn = "grid size-11 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white";

  return (
    <>
      <button onClick={openPlayer} className="btn-ghost py-2 pl-3 pr-4">
        <Headphones className="size-4 text-primary" /> Écouter l&apos;article
      </button>

      {open &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-label={`Écoute : ${title}`} className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-[#0d0b1d] text-white">
            {cover && <Image src={cover} alt="" fill sizes="100vw" className="scale-125 object-cover opacity-25 blur-3xl" />}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgb(143_128_250/0.35),transparent_70%)]" />

            <header className="relative z-10 flex items-center justify-between gap-4 px-5 pt-5 sm:px-8">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Mode écoute</p>
                <p className="truncate text-sm font-medium text-white/90">{title}</p>
              </div>
              <button id="listen-close" onClick={close} className={iconBtn} aria-label="Fermer le mode écoute">
                <X className="size-5" />
              </button>
            </header>

            <div className="relative z-10 flex-1 overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent,#000_18%,#000_82%,transparent)] [scrollbar-width:none]">
              <ol className="mx-auto max-w-3xl px-6 py-[40vh] sm:px-10">
                {segments.map((seg, i) => {
                  const active = i === index && !finished;
                  return (
                    <li
                      key={i}
                      ref={(el) => {
                        lines.current[i] = el;
                      }}
                    >
                      <button
                        onClick={() => playFrom(i)}
                        className={cn(
                          "block w-full text-left transition-colors duration-500",
                          active ? "text-white" : "text-white/30 hover:text-white/60",
                          seg.kind === "heading" && "mt-12 mb-4 font-serif text-2xl italic text-[#b9aeff] md:text-3xl",
                          seg.kind === "note" && "my-6 inline-flex w-auto items-center gap-2 rounded-full border border-white/15 px-3 py-1 font-mono text-sm",
                          (seg.kind === "text" || seg.kind === "item" || seg.kind === "quote") && "py-2 text-2xl leading-snug font-semibold tracking-tight md:text-4xl",
                          seg.kind === "quote" && "italic",
                          seg.kind === "heading" && !active && "opacity-50",
                        )}
                      >
                        {seg.kind === "note" && <Code2 className="size-4" />}
                        {seg.kind === "item" && <span className="mr-3 text-[#b9aeff]">•</span>}
                        {active && seg.kind !== "note" ? <KaraokeLine text={seg.text} spokenUpTo={spokenUpTo} /> : seg.text}
                      </button>
                    </li>
                  );
                })}
                <li
                  ref={(el) => {
                    lines.current[segments.length] = el;
                  }}
                  className={cn("pt-12 font-serif text-2xl italic transition-colors", finished ? "text-white" : "text-white/20")}
                >
                  Fin de l&apos;article. Merci de votre écoute.
                </li>
              </ol>
            </div>

            <footer className="relative z-10 px-5 pb-6 sm:px-8">
              <div className="mx-auto max-w-3xl">
                <div className="h-1 overflow-hidden rounded-full bg-white/15">
                  <div className={cn("h-full rounded-full bg-white", !audioFile && "transition-[width] duration-500")} style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[11px] text-white/50">
                  <span>
                    {audioFile ? `${formatTime(finished ? audioFile.duration : time)} / ${formatTime(audioFile.duration)}` : `${Math.min(index + 1, segments.length)} / ${segments.length}`}
                  </span>
                  {noFrenchVoice && <span>Pas de voix française sur cet appareil</span>}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <button onClick={cycleRate} className={cn(iconBtn, "w-14 font-mono text-sm")} aria-label={`Vitesse de lecture : ${rate}×`}>
                    {rate}×
                  </button>
                  <div className="flex items-center gap-3">
                    <button id="listen-prev" onClick={() => go(-1)} className={iconBtn} aria-label="Phrase précédente">
                      <SkipBack className="size-5" />
                    </button>
                    <button
                      id="listen-toggle"
                      onClick={toggle}
                      className="grid size-16 place-items-center rounded-full bg-white text-[#0d0b1d] transition hover:scale-105"
                      aria-label={playing ? "Pause" : "Lecture"}
                    >
                      {playing ? <Pause className="size-6 fill-current" /> : <Play className="ml-0.5 size-6 fill-current" />}
                    </button>
                    <button id="listen-next" onClick={() => go(1)} className={iconBtn} aria-label="Phrase suivante">
                      <SkipForward className="size-5" />
                    </button>
                  </div>
                  <button
                    onClick={toggleAmbient}
                    className={cn(iconBtn, ambientOn && "bg-white/15 text-white")}
                    aria-pressed={ambientOn}
                    aria-label={ambientOn ? "Couper l'ambiance sonore" : "Activer l'ambiance sonore"}
                    title="Ambiance sonore"
                  >
                    <Music className="size-5" />
                  </button>
                </div>
              </div>
            </footer>
          </div>,
          document.body,
        )}
    </>
  );
}
