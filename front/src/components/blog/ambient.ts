// Nappe sonore douce générée avec la Web Audio API : pas de fichier à charger, pas de droits d'auteur.
// Quatre accords (Am7 – Fmaj7 – Cmaj7 – G6) qui se fondent lentement les uns dans les autres.
const CHORDS = [
  [220, 261.63, 329.63, 392],
  [174.61, 220, 261.63, 329.63],
  [130.81, 196, 246.94, 329.63],
  [196, 246.94, 293.66, 329.63],
];
const CHORD_SECONDS = 8;
const VOLUME = 0.05;

export class Ambient {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private step = 0;

  // À appeler depuis un geste utilisateur (clic), sinon le navigateur bloque l'audio
  start() {
    if (this.ctx) return;
    const ctx = new AudioContext();
    const master = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + 3);
    master.connect(filter).connect(ctx.destination);
    this.ctx = ctx;
    this.master = master;
    this.step = 0;
    this.playChord();
    this.timer = setInterval(() => this.playChord(), CHORD_SECONDS * 1000);
  }

  stop() {
    const { ctx, master } = this;
    if (!ctx || !master) return;
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    setTimeout(() => ctx.close(), 1500);
    this.ctx = null;
    this.master = null;
  }

  private playChord() {
    const { ctx, master } = this;
    if (!ctx || !master) return;
    const t = ctx.currentTime;
    const end = t + CHORD_SECONDS + 3; // chevauchement avec l'accord suivant
    for (const freq of CHORDS[this.step % CHORDS.length]) {
      for (const [type, detune] of [["sine", -4], ["triangle", 5]] as const) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        osc.detune.value = detune;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.18, t + 2.5);
        gain.gain.setValueAtTime(0.18, end - 3);
        gain.gain.linearRampToValueAtTime(0, end);
        osc.connect(gain).connect(master);
        osc.start(t);
        osc.stop(end);
      }
    }
    this.step++;
  }
}
