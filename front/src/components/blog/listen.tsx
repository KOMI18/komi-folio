"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Code2, Headphones, Music, Pause, Play, SkipBack, SkipForward, X } from "lucide-react";
import type { SpeechSegment } from "@/lib/speech";
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

// Phrase en cours, mot à mot : la partie déjà prononcée s'allume (quand le navigateur fournit la position)
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

export function Listen({ segments, title, cover }: { segments: SpeechSegment[]; title: string; cover: string | null }) {
  const supported = useSpeechSupported();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [spokenUpTo, setSpokenUpTo] = useState<number | null>(null);
  const [rate, setRate] = useState(1);
  const [ambientOn, setAmbientOn] = useState(false);
  const [noFrenchVoice, setNoFrenchVoice] = useState(false);

  const gen = useRef(0); // invalide les événements des phrases annulées
  const rateRef = useRef(1);
  const voice = useRef<SpeechSynthesisVoice | null>(null);
  const ambient = useRef<Ambient | null>(null);
  const lines = useRef<(HTMLLIElement | null)[]>([]);

  const finished = index >= segments.length;

  const chooseVoice = () => {
    const v = pickVoice(window.speechSynthesis.getVoices());
    if (v) voice.current = v;
    setNoFrenchVoice(!voice.current && window.speechSynthesis.getVoices().length > 0);
  };

  function speakFrom(i: number) {
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
      if (current === gen.current) speakFrom(i + 1);
    };
    utterance.onerror = (e) => {
      if (current === gen.current && e.error !== "interrupted" && e.error !== "canceled") setPlaying(false);
    };
    synth.speak(utterance);
  }

  // Pause = on coupe la phrase et on la reprend au début (pause/resume est peu fiable sur Android)
  function pause() {
    gen.current++;
    window.speechSynthesis.cancel();
    setPlaying(false);
    setSpokenUpTo(null);
  }

  const toggle = () => (playing ? pause() : speakFrom(finished ? 0 : index));
  const go = (delta: number) => speakFrom(Math.min(Math.max(index + delta, 0), segments.length - 1));

  const openPlayer = () => {
    chooseVoice();
    setOpen(true);
    speakFrom(finished ? 0 : index);
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
    if (playing) speakFrom(index);
  };

  const toggleAmbient = () => {
    ambient.current ??= new Ambient();
    if (ambientOn) ambient.current.stop();
    else ambient.current.start();
    setAmbientOn(!ambientOn);
  };

  // La liste des voix arrive parfois après coup (Chrome)
  useEffect(() => {
    if (!open) return;
    const synth = window.speechSynthesis;
    const onVoices = () => {
      const v = pickVoice(synth.getVoices());
      if (v) voice.current = v;
    };
    synth.addEventListener("voiceschanged", onVoices);
    return () => synth.removeEventListener("voiceschanged", onVoices);
  }, [open]);

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
    lines.current[Math.min(index, segments.length - 1)]?.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  }, [index, open, segments.length]);

  // Coupe tout si on quitte la page
  useEffect(() => {
    const stop = () => {
      gen.current++;
      window.speechSynthesis?.cancel();
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

  if (!supported || segments.length === 0) return null;

  const progress = Math.min(index / segments.length, 1) * 100;
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
                        onClick={() => speakFrom(i)}
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
                  <div className="h-full rounded-full bg-white transition-[width] duration-500" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[11px] text-white/50">
                  <span>
                    {Math.min(index + 1, segments.length)} / {segments.length}
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
