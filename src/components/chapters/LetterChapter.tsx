"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { birthdayContent } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";

/** Roughly how long the whole letter should take to appear, however long it is. */
const REVEAL_MS = 45000;
const TICK_MS = 18;

export function LetterChapter() {
  const { markReady, reducedMotion, setParticleIntensity } = useExperience();
  const full = birthdayContent.letter.body;
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(reducedMotion ? full.length : 0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const done = index >= full.length;

  // A long letter would otherwise take minutes one character at a time.
  const step = Math.max(1, Math.round(full.length / (REVEAL_MS / TICK_MS)));

  useEffect(() => {
    setParticleIntensity("hush");
    return () => setParticleIntensity("ambient");
  }, [setParticleIntensity]);

  useEffect(() => {
    if (reducedMotion) {
      markReady();
      return;
    }
    if (paused || done) {
      if (done) markReady();
      return;
    }
    const t = window.setTimeout(
      () => setIndex((i) => Math.min(full.length, i + step)),
      TICK_MS,
    );
    return () => window.clearTimeout(t);
  }, [done, full.length, markReady, paused, reducedMotion, index, step]);

  // Keep the newest words in view while they are being written.
  useEffect(() => {
    if (done) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [index, done]);

  const shown = useMemo(() => full.slice(0, index), [full, index]);

  const skip = () => {
    setIndex(full.length);
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = 0;
    });
  };

  return (
    <section className="relative z-10 flex h-dvh flex-col justify-center safe-pad">
      <p className="kicker text-gold">{birthdayContent.letter.kicker}</p>
      <h2 className="mt-4 max-w-lg font-serif text-2xl text-ivory sm:text-4xl">
        {birthdayContent.letter.title}
      </h2>

      {/* data-scrollable keeps a reading swipe from being read as "next chapter". */}
      <div
        ref={scrollRef}
        data-scrollable
        className="mt-8 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1"
      >
        <p className="max-w-xl whitespace-pre-wrap font-serif text-lg leading-relaxed text-ivory-dim sm:text-xl">
          {shown}
          {!done ? <span className="ml-0.5 inline-block w-px animate-pulse bg-gold"> </span> : null}
        </p>
      </div>

      <div className="mt-6 flex gap-6">
        {!done ? (
          <>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="min-h-11 kicker text-gold"
            >
              {paused ? "Resume" : "Pause"}
            </button>
            <button type="button" onClick={skip} className="min-h-11 kicker text-ivory-mute">
              Show it all
            </button>
          </>
        ) : (
          <p className="kicker min-h-11 text-ivory/30">Scroll to read it again</p>
        )}
      </div>
    </section>
  );
}
