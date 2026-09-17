"use client";

import { useEffect, useState } from "react";

export function useSceneReady(delayMs: number, reducedMotion: boolean) {
  const [ready, setReady] = useState(reducedMotion || delayMs <= 0);

  useEffect(() => {
    if (reducedMotion || delayMs <= 0) {
      setReady(true);
      return;
    }
    setReady(false);
    const t = window.setTimeout(() => setReady(true), delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs, reducedMotion]);

  return ready;
}
