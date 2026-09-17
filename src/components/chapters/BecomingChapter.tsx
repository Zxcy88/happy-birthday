"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { birthdayContent, isUnset } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";
import { PhotoCrossfade } from "@/components/media/PhotoCrossfade";
import { PhotoFrame } from "@/components/media/PhotoFrame";

const WIPE_MS = 1500;
const BEAT_MS = 4200;

export function BecomingChapter() {
  const { markReady, reducedMotion } = useExperience();
  const { becoming } = birthdayContent;
  const gallery = becoming.nowGallery;
  const [now, setNow] = useState(reducedMotion);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      markReady();
      return;
    }
    const a = window.setTimeout(() => setNow(true), WIPE_MS);
    const b = window.setTimeout(() => markReady(), WIPE_MS + 1700);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [markReady, reducedMotion]);

  useEffect(() => {
    if (!now || reducedMotion || gallery.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % gallery.length),
      BEAT_MS,
    );
    return () => window.clearInterval(id);
  }, [gallery.length, now, reducedMotion]);

  const current = gallery[index % gallery.length];

  return (
    <section className="relative z-10 flex h-dvh flex-col overflow-hidden lg:grid lg:grid-cols-[1.15fr_0.85fr]">
      <div className="relative min-h-0 flex-1 px-4 pt-6 lg:px-0 lg:pt-0">
        <div className="relative h-full w-full overflow-hidden">
          <PhotoFrame src={becoming.thenPhoto.src} alt={becoming.thenPhoto.alt} eager />
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ clipPath: now ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhotoCrossfade photo={current} drift={!reducedMotion} />
          </motion.div>
          <p className="absolute left-4 top-4 kicker text-gold">
            {now ? becoming.nowLabel : becoming.thenLabel}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex shrink-0 flex-col justify-center safe-pad pb-24 lg:pb-24 lg:pl-10">
        <p className="kicker text-gold">
          {becoming.kicker}
        </p>
        <h2 className="mt-4 max-w-md font-serif text-2xl leading-snug text-ivory sm:text-4xl">
          {becoming.thesis}
        </h2>
        {!isUnset(current.caption) ? (
          <p className="mt-5 text-sm text-ivory-dim">{current.caption}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-2">
          {gallery.map((p, i) => (
            <button
              key={p.src}
              type="button"
              aria-label={`Show photograph ${i + 1} of ${gallery.length}`}
              aria-current={i === index}
              onClick={() => {
                setNow(true);
                setIndex(i);
              }}
              className="h-11 w-6 shrink-0"
            >
              <span
                className={`block h-1 w-full rounded-full transition-colors ${
                  i === index && now ? "bg-gold" : "bg-ivory/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
