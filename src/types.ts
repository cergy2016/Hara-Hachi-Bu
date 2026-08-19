export type TimerPhase = 'setup' | 'phase1' | 'halfway_pause' | 'phase2' | 'completed';

export interface MealPreset {
  id: string;
  name: string;
  totalMinutes: number;
  halfwayMinutes: number;
  tagline: string;
  recommendedFor: string;
}

export interface MindfulnessPrompt {
  id: string;
  quote: string;
  context: string;
}

export interface MealSessionRecord {
  id: string;
  timestamp: number;
  durationMinutes: number;
  actualSeconds: number;
  fullnessRating: number; // 1 to 10 scale
  completedFully: boolean;
  presetName: string;
}
