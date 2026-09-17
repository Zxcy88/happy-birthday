import type { SceneId, TransitionKind } from "@/lib/types";

export const SCENE_ORDER: SceneId[] = [
  "dedication",
  "origin",
  "becoming",
  "see",
  "windows",
  "horizon",
  "letter",
  "voice",
  "finale",
];

export const TRANSITIONS: Record<string, TransitionKind> = {
  "unlock->dedication": "dust-bloom",
  "dedication->origin": "through-black",
  "origin->becoming": "photo-wipe",
  "becoming->see": "warmth",
  "see->windows": "windows-assemble",
  "windows->horizon": "night-horizon",
  "horizon->letter": "still",
  "letter->voice": "sparkle-fall",
  "voice->finale": "slow-gold",
};

export function transitionBetween(
  from: SceneId | "unlock" | "gate",
  to: SceneId,
): TransitionKind {
  return TRANSITIONS[`${from}->${to}`] ?? "through-black";
}

export function nextScene(current: SceneId): SceneId | null {
  const i = SCENE_ORDER.indexOf(current);
  if (i < 0 || i === SCENE_ORDER.length - 1) return null;
  return SCENE_ORDER[i + 1];
}

export function prevScene(current: SceneId): SceneId | null {
  const i = SCENE_ORDER.indexOf(current);
  if (i <= 0) return null;
  return SCENE_ORDER[i - 1];
}
