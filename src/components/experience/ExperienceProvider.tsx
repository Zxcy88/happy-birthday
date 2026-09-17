"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import type { ParticleIntensity, Phase, SceneId, TransitionKind } from "@/lib/types";
import { STORAGE } from "@/lib/types";
import { nextScene, prevScene, SCENE_ORDER, transitionBetween } from "@/lib/scenes";
import { readFlag, readMute, writeFlag, writeMute } from "@/lib/storage";
import { birthdayContent } from "@/data/birthday";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type BurstFn = (x: number, y: number, count?: number) => void;

type ExperienceContextValue = {
  phase: Phase;
  scene: SceneId;
  previousScene: SceneId | "unlock" | null;
  sceneReady: boolean;
  markReady: () => void;
  resetReady: () => void;
  advance: () => void;
  back: () => void;
  goTo: (id: SceneId) => void;
  completeGate: () => void;
  completeUnlock: () => void;
  replay: () => void;
  transition: TransitionKind;
  transitioning: boolean;
  particleIntensity: ParticleIntensity;
  setParticleIntensity: (i: ParticleIntensity) => void;
  burstRef: MutableRefObject<BurstFn | null>;
  reducedMotion: boolean;
  audioMuted: boolean;
  toggleAudio: () => void;
  devMode: boolean;
  konamiUnlocked: boolean;
  setKonamiUnlocked: (v: boolean) => void;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function useExperience() {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error("useExperience must be used within ExperienceProvider");
  return ctx;
}

function initialPhase(): Phase {
  if (typeof window === "undefined") {
    return birthdayContent.gate.enabled ? "gate" : "unlock";
  }
  const params = new URLSearchParams(window.location.search);
  if (params.get("dev") === "1") return "experience";
  if (birthdayContent.gate.enabled && !readFlag(STORAGE.gate)) return "gate";
  if (!readFlag(STORAGE.unlock)) return "unlock";
  return "experience";
}

function initialScene(): SceneId {
  if (typeof window === "undefined") return "dedication";
  const params = new URLSearchParams(window.location.search);
  const jump = params.get("scene") as SceneId | null;
  if (params.get("dev") === "1" && jump && SCENE_ORDER.includes(jump)) return jump;
  return "dedication";
}

export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("unlock");
  const [scene, setScene] = useState<SceneId>("dedication");
  const [previousScene, setPreviousScene] = useState<SceneId | "unlock" | null>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [transition, setTransition] = useState<TransitionKind>("through-black");
  const [transitioning, setTransitioning] = useState(false);
  const [particleIntensity, setParticleIntensity] = useState<ParticleIntensity>("ambient");
  const [audioMuted, setAudioMuted] = useState(true);
  const [devMode, setDevMode] = useState(false);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const burstRef = useRef<BurstFn | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    // ?reset=1 forgets the unlock so the tap screen can be seen again while testing.
    if (params.get("reset") === "1") {
      writeFlag(STORAGE.gate, false);
      writeFlag(STORAGE.unlock, false);
    }
    setPhase(initialPhase());
    setScene(initialScene());
    setAudioMuted(readMute());
    setDevMode(params.get("dev") === "1");
    setHydrated(true);
  }, []);

  const resetReady = useCallback(() => setSceneReady(false), []);
  const markReady = useCallback(() => setSceneReady(true), []);

  const runTransition = useCallback(
    (from: SceneId | "unlock", to: SceneId, then: () => void) => {
      const kind = transitionBetween(from, to);
      setTransition(kind);
      if (reducedMotion) {
        then();
        return;
      }
      setTransitioning(true);
      // The sparkle transition swaps the scene mid-fall and lingers, so the
      // last sparkles land over the chapter they were introducing.
      const swapAfter = kind === "sparkle-fall" ? 700 : 720;
      const clearAfter = kind === "sparkle-fall" ? 850 : 80;
      window.setTimeout(() => {
        then();
        window.setTimeout(() => setTransitioning(false), clearAfter);
      }, swapAfter);
    },
    [reducedMotion],
  );

  const completeGate = useCallback(() => {
    writeFlag(STORAGE.gate, true);
    setPhase("unlock");
  }, []);

  const completeUnlock = useCallback(() => {
    writeFlag(STORAGE.unlock, true);
    setParticleIntensity("bloom");
    runTransition("unlock", "dedication", () => {
      setPreviousScene("unlock");
      setScene("dedication");
      setPhase("experience");
      setSceneReady(false);
      window.setTimeout(() => setParticleIntensity("ambient"), 1800);
    });
  }, [runTransition]);

  const goTo = useCallback(
    (id: SceneId) => {
      setPreviousScene(scene);
      setSceneReady(false);
      runTransition(scene, id, () => setScene(id));
    },
    [runTransition, scene],
  );

  const advance = useCallback(() => {
    if (phase !== "experience" || !sceneReady || transitioning) return;
    const nxt = nextScene(scene);
    if (!nxt) return;
    goTo(nxt);
  }, [goTo, phase, scene, sceneReady, transitioning]);

  const back = useCallback(() => {
    if (phase !== "experience" || transitioning) return;
    const prev = prevScene(scene);
    if (!prev) return;
    goTo(prev);
  }, [goTo, phase, scene, transitioning]);

  const replay = useCallback(() => {
    setParticleIntensity("ambient");
    setPreviousScene(scene);
    setSceneReady(false);
    setScene("dedication");
    setPhase("experience");
  }, [scene]);

  const toggleAudio = useCallback(() => {
    setAudioMuted((m) => {
      writeMute(!m);
      return !m;
    });
  }, []);

  const value = useMemo(
    () => ({
      phase,
      scene,
      previousScene,
      sceneReady,
      markReady,
      resetReady,
      advance,
      back,
      goTo,
      completeGate,
      completeUnlock,
      replay,
      transition,
      transitioning,
      particleIntensity,
      setParticleIntensity,
      burstRef,
      reducedMotion,
      audioMuted,
      toggleAudio,
      devMode,
      konamiUnlocked,
      setKonamiUnlocked,
    }),
    [
      phase,
      scene,
      previousScene,
      sceneReady,
      markReady,
      resetReady,
      advance,
      back,
      goTo,
      completeGate,
      completeUnlock,
      replay,
      transition,
      transitioning,
      particleIntensity,
      reducedMotion,
      audioMuted,
      toggleAudio,
      devMode,
      konamiUnlocked,
    ],
  );

  if (!hydrated) {
    return <div className="min-h-dvh bg-ink" />;
  }

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}
