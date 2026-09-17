"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { birthdayContent, isUnset } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";
import { useHaptics } from "@/hooks/useHaptics";

const FORWARD_KEYS = [" ", "ArrowDown", "ArrowRight", "Enter"];

export function RecognitionChapter() {
  const { markReady, advance, reducedMotion } = useExperience();
  const haptic = useHaptics();
  const items = birthdayContent.recognition.qualities;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [seenAll, setSeenAll] = useState(items.length <= 1);
  const current = items[index];
  const last = index >= items.length - 1;

  // The continue control stays hidden until the final line has been reached, so
  // the chapter cannot be skipped past before it has been read.
  useEffect(() => {
    if (!seenAll) return;
    const t = window.setTimeout(() => markReady(), reducedMotion ? 0 : 700);
    return () => window.clearTimeout(t);
  }, [markReady, reducedMotion, seenAll]);

  const show = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(items.length - 1, next));
      setDirection(clamped >= index ? 1 : -1);
      setIndex(clamped);
      if (clamped >= items.length - 1) setSeenAll(true);
    },
    [index, items.length],
  );

  const onTap = () => {
    if (last) {
      advance();
      return;
    }
    haptic(8);
    show(index + 1);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        show(index - 1);
        return;
      }
      // Once every line has been seen these keys belong to the global control,
      // which moves on to the next chapter.
      if (seenAll) return;
      if (FORWARD_KEYS.includes(e.key)) {
        e.preventDefault();
        show(index + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, seenAll, show]);

  return (
    <section className="relative z-10 flex min-h-dvh flex-col justify-center safe-pad">
      <p className="kicker text-gold">{birthdayContent.recognition.kicker}</p>
      <h2 className="mt-4 max-w-xl font-serif text-2xl text-ivory sm:text-4xl">
        {birthdayContent.recognition.title}
      </h2>

      <button
        type="button"
        onClick={onTap}
        className="mt-12 block w-full cursor-pointer text-left"
      >
        <div className="flex min-h-[38vh] flex-col justify-start">
          <AnimatePresence mode="wait" initial={false}>
            {current ? (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: reducedMotion ? 0 : direction * 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : direction * -12 }}
                transition={{ duration: reducedMotion ? 0.15 : 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="font-serif text-lg text-gold">{current.n}</p>
                <p className="mt-4 max-w-2xl font-serif text-2xl leading-snug text-ivory sm:text-4xl">
                  {isUnset(current.text)
                    ? "A line is waiting for you in birthday.ts."
                    : current.text}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <span className="sr-only">{last ? "Continue" : "Show the next line"}</span>
      </button>

      <div className="mt-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {items.map((item, i) => (
            <button
              key={item.n}
              type="button"
              onClick={() => show(i)}
              aria-label={`Line ${i + 1} of ${items.length}`}
              aria-current={i === index}
              className="group flex h-8 w-5 items-center justify-center"
            >
              <span
                className={`block h-[3px] rounded-full transition-all duration-500 ${
                  i === index
                    ? "w-5 bg-gold"
                    : i < index
                      ? "w-2 bg-gold/40"
                      : "w-2 bg-ivory/20 group-hover:bg-ivory/40"
                }`}
              />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!last ? (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: reducedMotion ? 0 : 1.6 }}
              className="kicker text-ivory/30"
            >
              Tap for the next one
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
