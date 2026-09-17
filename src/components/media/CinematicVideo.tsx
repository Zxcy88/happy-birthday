"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { isUnset, type VideoSegment } from "@/data/birthday";

/**
 * A call recording framed as a window. An optional soundtrack can replace its
 * original audio: it starts at a given offset when she presses play and follows
 * the montage's pause, seek, cut, and end state.
 */
export function CinematicVideo({
  src,
  poster,
  caption,
  fallbackLabel,
  portrait,
  soundtrackSrc,
  soundtrackStartSec = 0,
  soundtrackLabel,
  segments,
}: {
  src: string;
  poster: string;
  caption?: string;
  fallbackLabel: string;
  portrait?: boolean;
  soundtrackSrc?: string;
  soundtrackStartSec?: number;
  soundtrackLabel?: string;
  segments?: VideoSegment[];
}) {
  const [failed, setFailed] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const segmentIndexRef = useRef(0);
  const [segmentIndex, setSegmentIndex] = useState(0);
  const [montageTime, setMontageTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [complete, setComplete] = useState(false);
  const desiredAudioTimeRef = useRef(soundtrackStartSec);
  const missing = isUnset(src) || failed;
  const hasMusic = !isUnset(soundtrackSrc ?? "");
  const isMontage = Boolean(segments?.length);
  const timeline = useMemo(() => {
    let offset = 0;
    return (segments ?? []).map((segment) => {
      const duration = segment.end - segment.start;
      const entry = { ...segment, offset, duration };
      offset += duration;
      return entry;
    });
  }, [segments]);
  const montageDuration = timeline.reduce((sum, segment) => sum + segment.duration, 0);

  const selectSegment = useCallback((index: number) => {
    segmentIndexRef.current = index;
    setSegmentIndex(index);
  }, []);

  const currentMontageTime = useCallback(() => {
    const video = videoRef.current;
    const segment = timeline[segmentIndexRef.current];
    if (!video || !segment) return 0;
    return segment.offset + Math.max(0, Math.min(segment.duration, video.currentTime - segment.start));
  }, [timeline]);

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
  }, []);

  // Keep the soundtrack aligned with the video's own timeline so a seek or a
  // replay does not leave the music stranded mid-song.
  const syncMusicToVideo = useCallback(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio || !video) return;
    const target = soundtrackStartSec + (isMontage ? currentMontageTime() : video.currentTime);
    desiredAudioTimeRef.current = target;
    if (Number.isFinite(audio.duration) && target >= audio.duration) return;
    if (audio.readyState > 0 && Math.abs(audio.currentTime - target) > 0.35) {
      try {
        audio.currentTime = target;
      } catch {
        // loadedmetadata will apply the pending offset.
      }
    }
  }, [currentMontageTime, isMontage, soundtrackStartSec]);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !musicOn) return;
    syncMusicToVideo();
    audio.play().catch(() => undefined);
  }, [musicOn, syncMusicToVideo]);

  // Never let music outlive the chapter.
  useEffect(() => stopMusic, [stopMusic]);

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef.current;
    if (!audio) return;
    if (!musicOn) {
      audio.pause();
      return;
    }
    if (video && !video.paused && !video.ended) startMusic();
  }, [musicOn, startMusic]);

  useEffect(() => {
    selectSegment(0);
    setMontageTime(0);
    setComplete(false);
  }, [selectSegment, src, timeline]);

  const seekMontage = useCallback((target: number) => {
    const video = videoRef.current;
    if (!video || timeline.length === 0) return;
    const clamped = Math.max(0, Math.min(montageDuration, target));
    const index = Math.min(
      timeline.length - 1,
      timeline.findIndex((entry) => clamped < entry.offset + entry.duration) === -1
        ? timeline.length - 1
        : timeline.findIndex((entry) => clamped < entry.offset + entry.duration),
    );
    const entry = timeline[index];
    const within = Math.min(entry.duration, Math.max(0, clamped - entry.offset));
    selectSegment(index);
    setMontageTime(clamped);
    setComplete(clamped >= montageDuration);
    video.currentTime = entry.start + within;
    const audio = audioRef.current;
    desiredAudioTimeRef.current = soundtrackStartSec + clamped;
    if (audio?.readyState) {
      try {
        audio.currentTime = desiredAudioTimeRef.current;
      } catch {
        // loadedmetadata will apply the pending offset.
      }
    }
  }, [montageDuration, selectSegment, soundtrackStartSec, timeline]);

  const handleLoadedMetadata = useCallback(() => {
    if (timeline.length > 0) seekMontage(0);
  }, [seekMontage, timeline.length]);

  const handleTimeUpdate = useCallback(() => {
    if (timeline.length === 0) return;
    const video = videoRef.current;
    const entry = timeline[segmentIndexRef.current];
    if (!video || !entry) return;

    const elapsed = currentMontageTime();
    setMontageTime(elapsed);

    if (video.currentTime < entry.end - 0.08) return;
    const nextIndex = segmentIndexRef.current + 1;
    if (nextIndex < timeline.length) {
      const next = timeline[nextIndex];
      selectSegment(nextIndex);
      setMontageTime(next.offset);
      video.currentTime = next.start;
      return;
    }

    video.pause();
    stopMusic();
    setPlaying(false);
    setComplete(true);
    setMontageTime(montageDuration);
  }, [
    currentMontageTime,
    montageDuration,
    selectSegment,
    stopMusic,
    timeline,
  ]);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      return;
    }
    if (complete) seekMontage(0);
    // Both play calls originate from this click, satisfying mobile autoplay
    // rules for the separate soundtrack element.
    video.play().catch(() => undefined);
    if (musicOn) startMusic();
  }, [complete, musicOn, seekMontage, startMusic]);

  const formatTime = (seconds: number) => {
    const whole = Math.max(0, Math.floor(seconds));
    return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
  };

  if (missing) {
    return (
      <div
        className={`relative overflow-hidden rounded-sm border border-ivory/15 bg-ink-50 ${
          portrait ? "aspect-[3/4]" : "aspect-video"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="" className="h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <p className="max-w-sm kicker text-ivory-dim">
            {fallbackLabel}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <figure className="overflow-hidden rounded-sm border border-ivory/15 bg-black">
        <video
          ref={videoRef}
          className={`w-full object-contain ${portrait ? "max-h-[54dvh]" : "max-h-[58dvh]"}`}
          controls={!isMontage}
          muted={isMontage}
          playsInline
          preload="metadata"
          poster={isUnset(poster) ? undefined : poster}
          onError={() => setFailed(true)}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={startMusic}
          onPlaying={() => {
            setPlaying(true);
            startMusic();
          }}
          onSeeked={syncMusicToVideo}
          onPause={() => {
            setPlaying(false);
            stopMusic();
          }}
          onEnded={stopMusic}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={src} />
        </video>
        {caption ? <figcaption className="sr-only">{caption}</figcaption> : null}
      </figure>

      {isMontage ? (
        <div className="mt-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              className="min-h-11 min-w-14 kicker text-gold"
              aria-label={playing ? "Pause montage" : complete ? "Replay montage" : "Play montage"}
            >
              {playing ? "Pause" : complete ? "Replay" : "Play"}
            </button>
            <input
              type="range"
              min={0}
              max={montageDuration}
              step={0.1}
              value={montageTime}
              onChange={(event) => seekMontage(Number(event.target.value))}
              aria-label="Montage progress"
              className="h-11 min-w-0 flex-1 accent-gold"
            />
            <span className="shrink-0 text-[10px] tabular-nums tracking-wider text-ivory-mute">
              {formatTime(montageTime)} / {formatTime(montageDuration)}
            </span>
          </div>
          <p className="kicker text-center text-ivory/35">
            Moment {segmentIndex + 1} of {timeline.length}
          </p>
        </div>
      ) : null}

      {hasMusic ? (
        <>
          <audio
            ref={audioRef}
            src={soundtrackSrc}
            preload="metadata"
            onLoadedMetadata={() => {
              const audio = audioRef.current;
              if (!audio) return;
              audio.currentTime = Math.min(
                desiredAudioTimeRef.current,
                Math.max(0, audio.duration - 0.1),
              );
            }}
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="kicker text-ivory-mute">
              {soundtrackLabel || "Background music"}
            </p>
            <button
              type="button"
              onClick={() => setMusicOn((m) => !m)}
              aria-pressed={musicOn}
              className="min-h-11 shrink-0 kicker text-gold"
            >
              {musicOn ? "Music on" : "Music off"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
