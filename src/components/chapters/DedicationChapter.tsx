"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { birthdayContent, displayAge, displayName } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";

export function DedicationChapter() {
  const { markReady, reducedMotion } = useExperience();
  const name = displayName();
  const age = displayAge();

  useEffect(() => {
    const t = window.setTimeout(() => markReady(), reducedMotion ? 0 : 4200);
    return () => window.clearTimeout(t);
  }, [markReady, reducedMotion]);

  return (
    <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center safe-pad text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
        className="kicker text-gold"
      >
        {birthdayContent.dedication.lineOne}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: reducedMotion ? 0 : 1.1, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 font-serif text-5xl font-medium capitalize text-ivory sm:text-7xl"
      >
        {name}
      </motion.h1>
      {age ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: reducedMotion ? 0 : 2 }}
          className="mt-4 font-serif text-xl text-ivory-mute"
        >
          {age} today
        </motion.p>
      ) : null}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reducedMotion ? 0 : 2.6, duration: 1 }}
        className="mt-10 max-w-sm text-sm text-ivory-dim"
      >
        {birthdayContent.dedication.lineTwo}
        <span className="mt-2 block text-ivory-mute">{birthdayContent.dedication.audience}</span>
      </motion.p>
    </section>
  );
}
