"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useExperience } from "@/components/experience/ExperienceProvider";
import { Gate } from "@/components/intro/Gate";
import { Unlock } from "@/components/intro/Unlock";
import { DedicationChapter } from "@/components/chapters/DedicationChapter";
import { OriginChapter } from "@/components/chapters/OriginChapter";
import { BecomingChapter } from "@/components/chapters/BecomingChapter";
import { RecognitionChapter } from "@/components/chapters/RecognitionChapter";
import { PresenceChapter } from "@/components/chapters/PresenceChapter";
import { HorizonChapter } from "@/components/chapters/HorizonChapter";
import { LetterChapter } from "@/components/chapters/LetterChapter";
import { VoiceChapter } from "@/components/chapters/VoiceChapter";
import { FinaleChapter } from "@/components/chapters/FinaleChapter";
import { ContinueSigil } from "@/components/experience/ContinueSigil";
import { InteractionController } from "@/components/experience/InteractionController";
import { AudioHook } from "@/components/experience/AudioHook";
import { CanvasGlitter } from "@/components/particles/CanvasGlitter";
import { TransitionLayer } from "@/components/transitions/TransitionLayer";
import { EasterLayer } from "@/components/easter/EasterLayer";
import { ExperienceProvider } from "@/components/experience/ExperienceProvider";
import type { SceneId } from "@/lib/types";

function SceneSwitch() {
  const { phase, scene } = useExperience();
  if (phase === "gate") return <Gate />;
  if (phase === "unlock") return <Unlock />;

  const map: Record<SceneId, ReactNode> = {
    dedication: <DedicationChapter />,
    origin: <OriginChapter />,
    becoming: <BecomingChapter />,
    see: <RecognitionChapter />,
    windows: <PresenceChapter />,
    horizon: <HorizonChapter />,
    letter: <LetterChapter />,
    voice: <VoiceChapter />,
    finale: <FinaleChapter />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 min-h-dvh"
      >
        {map[scene]}
      </motion.div>
    </AnimatePresence>
  );
}

function Shell() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-ink">
      <CanvasGlitter />
      <SceneSwitch />
      <ContinueSigil />
      <InteractionController />
      <TransitionLayer />
      <AudioHook />
      <EasterLayer />
    </div>
  );
}

export function Experience() {
  return (
    <ExperienceProvider>
      <Shell />
    </ExperienceProvider>
  );
}
