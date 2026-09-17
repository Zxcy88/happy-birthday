"use client";

import { STORAGE } from "@/lib/types";

export function readFlag(key: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

export function writeFlag(key: string, value: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (value) sessionStorage.setItem(key, "1");
    else sessionStorage.removeItem(key);
  } catch {
    /* private mode */
  }
}

export function readMute(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const v = localStorage.getItem(STORAGE.mute);
    if (v === null) return true;
    return v === "1";
  } catch {
    return true;
  }
}

export function writeMute(muted: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE.mute, muted ? "1" : "0");
  } catch {
    /* ignore */
  }
}
