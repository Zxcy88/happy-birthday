"use client";

import { AnimatePresence, motion } from "motion/react";
import { useExperience } from "@/components/experience/ExperienceProvider";

export function ContinueSigil() {
  const { phase, sceneReady, advance, scene } = useExperience();
  const show = phase === "experience" && sceneReady && scene !== "finale";

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          aria-label="Continue to next chapter"
          onClick={advance}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[max(1.75rem,env(safe-area-inset-bottom))] left-1/2 z-30 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full"
        >
          <span className="absolute inset-0 rounded-full border border-gold/50" />
          <motion.span
            className="absolute inset-1 rounded-full border border-gold/30"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="block h-1.5 w-1.5 rounded-full bg-gold" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
