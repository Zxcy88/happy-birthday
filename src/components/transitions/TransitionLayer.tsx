"use client";

import { AnimatePresence, motion } from "motion/react";
import { useExperience } from "@/components/experience/ExperienceProvider";
import type { TransitionKind } from "@/lib/types";

/** Fixed pseudo-random values so the server and client render the same sparkles. */
const SPARKLES = Array.from({ length: 30 }, (_, i) => {
  const rand = (salt: number) => {
    const v = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
    return v - Math.floor(v);
  };
  return {
    left: rand(1) * 100,
    delay: rand(2) * 0.4,
    fall: 1 + rand(3) * 0.55,
    size: 2 + rand(4) * 3.5,
    drift: (rand(5) - 0.5) * 48,
  };
});

function SparkleFall() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(212,180,131,0.16),_#0a0908_62%)]"
    >
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          className="absolute top-0 block rounded-full bg-gold-bright shadow-[0_0_8px_rgba(212,180,131,0.9)]"
          style={{ left: `${s.left}%`, width: s.size, height: s.size }}
          initial={{ y: "-6vh", x: 0, opacity: 0 }}
          animate={{ y: "106vh", x: s.drift, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: s.fall,
            delay: s.delay,
            ease: "easeIn",
            opacity: { times: [0, 0.12, 0.7, 1], duration: s.fall, delay: s.delay },
          }}
        />
      ))}
    </motion.div>
  );
}

function Overlay({ kind }: { kind: TransitionKind }) {
  const shared = {
    className: "absolute inset-0",
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  };

  switch (kind) {
    case "dust-bloom":
      return (
        <motion.div
          {...shared}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(240,217,168,0.45),_transparent_55%),#0a0908]"
        />
      );
    case "photo-wipe":
      return (
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-ink"
        />
      );
    case "warmth":
      return (
        <motion.div
          {...shared}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,180,131,0.18),_#0a0908_70%)]"
        />
      );
    case "windows-assemble":
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-ink"
        />
      );
    case "night-horizon":
      return (
        <motion.div
          {...shared}
          className="absolute inset-0 bg-gradient-to-b from-black via-ink to-[#16120c]"
        />
      );
    case "still":
      return <motion.div {...shared} className="absolute inset-0 bg-black" />;
    case "chrome-exit":
      return <motion.div {...shared} className="absolute inset-0 bg-black" />;
    case "sparkle-fall":
      return <SparkleFall />;
    case "slow-gold":
      return (
        <motion.div
          {...shared}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_rgba(212,180,131,0.2),_transparent_50%),#0a0908]"
        />
      );
    case "through-black":
    default:
      return <motion.div {...shared} className="absolute inset-0 bg-black" />;
  }
}

export function TransitionLayer() {
  const { transitioning, transition } = useExperience();
  return (
    <AnimatePresence>
      {transitioning ? (
        <div className="pointer-events-none fixed inset-0 z-40">
          <Overlay kind={transition} />
        </div>
      ) : null}
    </AnimatePresence>
  );
}
