// Synthesizes soothing Zen temple bell / Tibetan singing bowl tones using Web Audio API
class ZenAudioPlayer {
  private audioCtx: AudioContext | null = null;
  public soundEnabled: boolean = true;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  // Plays a rich meditative chime (fundamental + warm calming harmonics)
  public playSingingBowl(type: 'start' | 'halfway' | 'complete' | 'tick'): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      if (type === 'tick') {
        // Very subtle wooden temple block tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
        return;
      }

      // Harmonic frequencies for Zen bowl (F#4 ~ 370Hz / A4 ~ 432Hz / 528Hz Solfeggio)
      let baseFreq = 432; // Calming frequency
      let duration = 3.5;
      let masterGainVal = 0.18;

      if (type === 'halfway') {
        baseFreq = 528; // Uplifting clarity tone for mindfulness check
        duration = 4.5;
        masterGainVal = 0.22;
      } else if (type === 'complete') {
        baseFreq = 340; // Deep grounding completion gong
        duration = 5.5;
        masterGainVal = 0.25;
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, now);
      masterGain.gain.linearRampToValueAtTime(masterGainVal, now + 0.08);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      masterGain.connect(ctx.destination);

      // 4 Harmonic overtones that simulate bronze bell resonance
      const harmonics = [
        { mult: 1.0, gain: 0.6 },
        { mult: 2.02, gain: 0.25 },
        { mult: 2.76, gain: 0.15 },
        { mult: 4.15, gain: 0.08 }
      ];

      harmonics.forEach(({ mult, gain: harmonicGain }) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * mult, now);
        // Add subtle vibrato/shimmer
        osc.frequency.linearRampToValueAtTime(baseFreq * mult * 0.998, now + duration);

        g.gain.setValueAtTime(harmonicGain, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(g);
        g.connect(masterGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });

      // For halfway mark, add a second resonant chime 0.4s later
      if (type === 'halfway') {
        const chime2Time = now + 0.45;
        const chime2Gain = ctx.createGain();
        chime2Gain.gain.setValueAtTime(0.001, chime2Time);
        chime2Gain.gain.linearRampToValueAtTime(0.18, chime2Time + 0.08);
        chime2Gain.gain.exponentialRampToValueAtTime(0.0001, chime2Time + 4.0);
        chime2Gain.connect(ctx.destination);

        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(660, chime2Time);
        osc2.connect(chime2Gain);
        osc2.start(chime2Time);
        osc2.stop(chime2Time + 4.1);
      }
    } catch {
      // Audio playback fails gracefully if user hasn't interacted yet
    }
  }
}

export const zenAudio = new ZenAudioPlayer();
