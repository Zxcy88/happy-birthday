export type SceneId =
  | "dedication"
  | "origin"
  | "becoming"
  | "see"
  | "windows"
  | "horizon"
  | "letter"
  | "voice"
  | "finale";

export type Phase = "gate" | "unlock" | "experience";

export type TransitionKind =
  | "dust-bloom"
  | "through-black"
  | "photo-wipe"
  | "warmth"
  | "windows-assemble"
  | "night-horizon"
  | "still"
  | "chrome-exit"
  | "sparkle-fall"
  | "slow-gold";

export type ParticleIntensity = "ambient" | "tap" | "bloom" | "hush";

export const STORAGE = {
  gate: "birthday.gate",
  unlock: "birthday.unlock",
  mute: "birthday.mute",
} as const;
