"use client";

import { useEffect } from "react";
import { birthdayContent } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";
import { CinematicVideo } from "@/components/media/CinematicVideo";

export function VoiceChapter() {
  const { markReady, reducedMotion } = useExperience();

  useEffect(() => {
    const t = window.setTimeout(() => markReady(), reducedMotion ? 0 : 1200);
    return () => window.clearTimeout(t);
  }, [markReady, reducedMotion]);

  const video = birthdayContent.voice.video;

  return (
    <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center safe-pad text-center">
      <p className="kicker text-gold">
        {birthdayContent.voice.kicker}
      </p>
      <h2 className="mt-4 max-w-lg font-serif text-3xl text-ivory sm:text-4xl">
        {birthdayContent.voice.title}
      </h2>
      <p className="mt-4 max-w-md text-sm text-ivory-dim">{birthdayContent.voice.body}</p>
      <div className="mt-10 w-full max-w-2xl">
        <CinematicVideo
          src={video.src}
          poster={video.poster}
          caption={video.caption}
          fallbackLabel="The recording isn't loading right now."
        />
      </div>
    </section>
  );
}
