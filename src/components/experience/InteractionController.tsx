"use client";

import { useEffect, useRef } from "react";
import { useExperience } from "@/components/experience/ExperienceProvider";

export function InteractionController() {
  const { advance, back, phase } = useExperience();
  const startY = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== "experience") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === " " || e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        advance();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        back();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, back, phase]);

  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      startY.current = e.touches[0]?.clientY ?? null;
    };
    const ignore = (t: EventTarget | null) => {
      if (!(t instanceof HTMLElement)) return false;
      return Boolean(t.closest("video, input, textarea, button, [data-scrollable]"));
    };
    const onEnd = (e: TouchEvent) => {
      if (startY.current == null) return;
      const y = e.changedTouches[0]?.clientY ?? startY.current;
      const dy = y - startY.current;
      startY.current = null;
      if (phase !== "experience") return;
      if (ignore(e.target)) return;
      if (dy < -64) advance();
      if (dy > 72) back();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [advance, back, phase]);

  return null;
}
