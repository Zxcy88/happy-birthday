"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { authorName, birthdayContent, displayName } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";

export function FinaleChapter() {
  const { markReady, replay, reducedMotion, setParticleIntensity } = useExperience();
  const name = displayName();
  const author = authorName();

  useEffect(() => {
    setParticleIntensity("ambient");
    const t = window.setTimeout(() => markReady(), reducedMotion ? 0 : 1800);
    return () => window.clearTimeout(t);
  }, [markReady, reducedMotion, setParticleIntensity]);

  return (
    <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center safe-pad text-center">
      <p className="kicker text-gold">
        {birthdayContent.finale.status}
      </p>
      <h2 className="mt-8 font-serif text-4xl text-ivory sm:text-6xl">
        {birthdayContent.finale.signOff}
      </h2>
      <p className="mt-3 font-serif text-2xl capitalize text-ivory-dim">{name}</p>
      <div className="mt-10 space-y-2 text-sm text-ivory-mute">
        {birthdayContent.finale.lines.map((line) => (
          <motion.p
            key={line}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {line}
          </motion.p>
        ))}
      </div>
      {author ? <p className="mt-10 font-serif text-ivory-dim">— {author}</p> : null}
      <p className="mt-6 text-xs tracking-[0.3em] text-gold/70">
        {birthdayContent.weddingDateDisplay}
      </p>
      <button
        type="button"
        onClick={replay}
        className="mt-14 min-h-11 kicker text-gold"
      >
        Begin again
      </button>
    </section>
  );
}
