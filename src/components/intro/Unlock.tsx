"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { birthdayContent } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";
import { useHaptics } from "@/hooks/useHaptics";

export function Unlock() {
  const { completeUnlock, burstRef, reducedMotion } = useExperience();
  const haptic = useHaptics();
  const required = birthdayContent.unlock.tapsRequired;
  const [count, setCount] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const progress = Math.min(1, count / required);
  const radius = 54;
  const circ = 2 * Math.PI * radius;

  const tap = (clientX: number, clientY: number) => {
    if (finishing) return;
    burstRef.current?.(clientX, clientY, 14);
    haptic(10);
    setCount((c) => {
      const next = Math.min(required, c + 1);
      if (next >= required) {
        setFinishing(true);
        haptic([18, 40, 22]);
        window.setTimeout(() => completeUnlock(), reducedMotion ? 400 : 2800);
      }
      return next;
    });
  };

  return (
    <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center safe-pad text-center">
      <p className="mb-5 kicker text-gold/80">
        {birthdayContent.unlock.kicker}
      </p>
      <h1 className="max-w-md font-serif text-3xl font-medium leading-tight text-ivory sm:text-5xl">
        {birthdayContent.unlock.title}
      </h1>

      <button
        type="button"
        disabled={finishing}
        aria-label={`${birthdayContent.unlock.action}. ${count} of ${required}`}
        onPointerDown={(e) => {
          e.preventDefault();
          tap(e.clientX, e.clientY);
        }}
        className="relative mt-16 flex h-36 w-36 items-center justify-center rounded-full select-none"
      >
        <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
          <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(244,238,227,0.12)" strokeWidth="1.25" />
          <motion.circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#d4b483"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            animate={{ strokeDashoffset: circ * (1 - progress) }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </svg>
        <span className="kicker text-ivory/80">
          {finishing ? "Open" : birthdayContent.unlock.action}
        </span>
      </button>

      <p className="mt-8 min-h-6 text-sm text-ivory-dim" aria-live="polite">
        {finishing ? (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.15 : 0.5 }}
            className="inline-block"
          >
            {birthdayContent.unlock.completeLine}
          </motion.span>
        ) : null}
      </p>
    </section>
  );
}
