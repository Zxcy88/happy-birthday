"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { birthdayContent } from "@/data/birthday";
import { SCENE_ORDER } from "@/lib/scenes";
import { useExperience } from "@/components/experience/ExperienceProvider";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterLayer() {
  const { goTo, setKonamiUnlocked, konamiUnlocked, devMode } = useExperience();
  const [noteOpen, setNoteOpen] = useState(false);
  const seq = useRef<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNoteOpen(false);
      seq.current.push(e.key);
      if (seq.current.length > KONAMI.length) seq.current.shift();
      if (KONAMI.every((k, i) => seq.current[i]?.toLowerCase() === k.toLowerCase())) {
        setKonamiUnlocked(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setKonamiUnlocked]);

  return (
    <>
      <AnimatePresence>
        {noteOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-6"
            onClick={() => setNoteOpen(false)}
          >
            <motion.p
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-sm text-center font-serif text-2xl leading-relaxed text-ivory"
            >
              {birthdayContent.easter.note}
            </motion.p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setNoteOpen((v) => !v)}
        aria-label="A small hidden note"
        className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] z-20 min-h-11 min-w-11 text-sm text-ivory/20 transition-colors hover:text-gold"
      >
        ✦
      </button>

      {devMode ? (
        <div className="kicker fixed left-2 top-2 z-50 max-w-[90vw] overflow-x-auto text-gold/80">
          {SCENE_ORDER.map((id) => (
            <button key={id} type="button" className="mr-2 underline" onClick={() => goTo(id)}>
              {id}
            </button>
          ))}
        </div>
      ) : null}

      {konamiUnlocked ? <p className="sr-only">Secret sequence accepted.</p> : null}
    </>
  );
}
