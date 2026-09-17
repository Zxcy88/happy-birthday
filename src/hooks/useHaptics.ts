"use client";

import { useCallback } from "react";

export function useHaptics() {
  return useCallback((pattern: number | number[] = 12) => {
    if (typeof navigator === "undefined") return;
    if (!("vibrate" in navigator)) return;
    try {
      navigator.vibrate(pattern);
    } catch {
      /* unsupported */
    }
  }, []);
}
