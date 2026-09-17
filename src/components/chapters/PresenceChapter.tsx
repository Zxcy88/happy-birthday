"use client";

import { useEffect, useState } from "react";
import { birthdayContent, isUnset } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";
import { CinematicVideo } from "@/components/media/CinematicVideo";

export function PresenceChapter() {
  const { markReady, reducedMotion } = useExperience();
  const videos = birthdayContent.presence.videos;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => markReady(), reducedMotion ? 0 : 1600);
    return () => window.clearTimeout(t);
  }, [markReady, reducedMotion]);

  const clip = videos[index];
  const soundtrack = birthdayContent.presence.soundtrack;

  return (
    <section className="relative z-10 flex min-h-dvh flex-col justify-center safe-pad pb-24">
      <p className="kicker text-gold">
        {birthdayContent.presence.kicker}
      </p>
      <h2 className="mt-3 max-w-lg font-serif text-2xl text-ivory sm:text-4xl">
        {birthdayContent.presence.title}
      </h2>
      <p className="mt-3 max-w-md text-sm text-ivory-dim">{birthdayContent.presence.body}</p>

      {clip ? (
        <div className="mx-auto mt-8 w-full max-w-md">
          <CinematicVideo
            src={clip.src}
            poster={clip.poster}
            caption={clip.caption}
            portrait={clip.portrait}
            segments={clip.segments}
            fallbackLabel="A window from a call — drop an mp4 in public/media/video-calls"
            soundtrackSrc={soundtrack?.src}
            soundtrackStartSec={soundtrack?.startAtSec}
            soundtrackLabel={soundtrack?.label}
          />
          {!isUnset(clip.caption) ? (
            <p className="mt-3 text-center text-sm text-ivory-mute">{clip.caption}</p>
          ) : null}
        </div>
      ) : null}

      {videos.length > 1 ? (
        <div className="mt-6 flex justify-center gap-3">
          {videos.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show clip ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${i === index ? "bg-gold" : "bg-ivory/25"}`}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
