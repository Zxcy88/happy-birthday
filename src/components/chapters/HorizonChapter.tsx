"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { birthdayContent } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";

export function HorizonChapter() {
  const { markReady, reducedMotion, konamiUnlocked } = useExperience();

  useEffect(() => {
    const t = window.setTimeout(() => markReady(), reducedMotion ? 0 : 2200);
    return () => window.clearTimeout(t);
  }, [markReady, reducedMotion]);

  return (
    <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center overflow-hidden safe-pad text-center">
      <div className="pointer-events-none absolute inset-x-0 bottom-[28%] h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#16120c] to-transparent" />
      <p className="kicker text-gold">
        {birthdayContent.horizon.kicker}
      </p>
      <div className="mt-8 max-w-md space-y-4">
        {birthdayContent.horizon.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.4 * i, duration: 0.9 }}
            className="font-serif text-2xl text-ivory sm:text-3xl"
          >
            {line}
          </motion.p>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 1.4, duration: 1.4 }}
        className="mt-14 text-lg tracking-[0.35em] text-gold"
      >
        {birthdayContent.weddingDateDisplay}
      </motion.p>
      {konamiUnlocked ? (
        <p className="mt-8 max-w-xs text-sm text-ivory-mute">{birthdayContent.easter.hidden}</p>
      ) : null}
    </section>
  );
}
