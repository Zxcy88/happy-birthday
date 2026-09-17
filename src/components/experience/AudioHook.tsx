"use client";

import { useEffect, useRef } from "react";
import { birthdayContent, isUnset } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";

export function AudioHook() {
  const { audioMuted, toggleAudio } = useExperience();
  const ref = useRef<HTMLAudioElement>(null);
  const src = birthdayContent.audio.src;

  useEffect(() => {
    const el = ref.current;
    if (!el || isUnset(src)) return;
    el.muted = audioMuted;
    if (!audioMuted) {
      el.play().catch(() => undefined);
    } else {
      el.pause();
    }
  }, [audioMuted, src]);

  if (isUnset(src)) return null;

  return (
    <>
      <audio ref={ref} src={src} loop preload="none" />
      <button
        type="button"
        onClick={toggleAudio}
        aria-pressed={!audioMuted}
        className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-30 min-h-11 px-3 kicker text-ivory-mute"
      >
        {audioMuted ? "Sound off" : "Sound on"}
      </button>
    </>
  );
}
