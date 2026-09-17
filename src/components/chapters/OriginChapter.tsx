"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { birthdayContent, isUnset } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";
import { PhotoCrossfade } from "@/components/media/PhotoCrossfade";

const INTRO_MS = 2600;
const BEAT_MS = 3800;

export function OriginChapter() {
  const { markReady, reducedMotion } = useExperience();
  const photos = birthdayContent.origin.photos;
  const [beat, setBeat] = useState(0);
  const [introDone, setIntroDone] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setIntroDone(true);
      markReady();
      return;
    }
    const t = window.setTimeout(() => setIntroDone(true), INTRO_MS);
    return () => window.clearTimeout(t);
  }, [markReady, reducedMotion]);

  // Continue unlocks after a couple of photographs; the gallery keeps looping
  // so she can linger without being forced through all seven.
  useEffect(() => {
    if (!introDone || reducedMotion) return;
    const t = window.setTimeout(() => markReady(), BEAT_MS * 2);
    return () => window.clearTimeout(t);
  }, [introDone, markReady, reducedMotion]);

  useEffect(() => {
    if (!introDone || reducedMotion || photos.length < 2) return;
    const id = window.setInterval(
      () => setBeat((b) => (b + 1) % photos.length),
      BEAT_MS,
    );
    return () => window.clearInterval(id);
  }, [introDone, photos.length, reducedMotion]);

  const photo = photos[beat % photos.length];

  return (
    <section className="relative z-10 flex h-dvh flex-col overflow-hidden">
      <div className="safe-pad pb-0">
        <p className="kicker text-gold">
          {birthdayContent.origin.kicker}
        </p>
        {introDone ? (
          <h2 className="mt-3 max-w-lg font-serif text-2xl text-ivory sm:text-4xl">
            {birthdayContent.origin.title}
          </h2>
        ) : null}
      </div>

      {introDone ? (
        <>
          <div className="relative min-h-0 flex-1 px-4 py-4 sm:px-8">
            <PhotoCrossfade photo={photo} drift={!reducedMotion} />
            <div className="grain" />
          </div>

          <div className="safe-pad pb-24 pt-0">
            {!isUnset(photo.eraLabel) ? (
              <p className="kicker text-ivory-mute">
                {photo.eraLabel}
              </p>
            ) : null}
            {!isUnset(photo.caption) ? (
              <p className="mt-2 max-w-md text-sm text-ivory-dim">{photo.caption}</p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {photos.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  aria-label={`Show photograph ${i + 1} of ${photos.length}`}
                  aria-current={i === beat}
                  onClick={() => setBeat(i)}
                  className="h-11 w-6 shrink-0"
                >
                  <span
                    className={`block h-1 w-full rounded-full transition-colors ${
                      i === beat ? "bg-gold" : "bg-ivory/20"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col justify-center safe-pad">
          <div className="max-w-lg space-y-3">
            {birthdayContent.origin.intro.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.55, duration: 0.8 }}
                className="font-serif text-2xl text-ivory sm:text-3xl"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
