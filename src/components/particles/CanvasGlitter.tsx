"use client";

import { useCallback, useEffect, useRef } from "react";
import { useExperience } from "@/components/experience/ExperienceProvider";
import type { ParticleIntensity } from "@/lib/types";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  g: number;
};

function budget(intensity: ParticleIntensity, mobile: boolean): number {
  const base = mobile ? 28 : 55;
  if (intensity === "hush") return Math.floor(base * 0.25);
  if (intensity === "tap") return Math.floor(base * 0.8);
  if (intensity === "bloom") return mobile ? 90 : 140;
  return base;
}

export function CanvasGlitter() {
  const { particleIntensity, burstRef, reducedMotion } = useExperience();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const intensityRef = useRef(particleIntensity);
  const raf = useRef<number>(0);
  const visible = useRef(true);

  intensityRef.current = particleIntensity;

  const spawn = useCallback((x: number, y: number, count: number, burst: boolean) => {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = burst ? 0.6 + Math.random() * 2.4 : 0.15 + Math.random() * 0.45;
      particles.current.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - (burst ? 0.4 : 0.15),
        life: 1,
        max: burst ? 50 + Math.random() * 40 : 90 + Math.random() * 80,
        size: burst ? 1.2 + Math.random() * 1.8 : 0.6 + Math.random() * 1.4,
        g: 0.55 + Math.random() * 0.45,
      });
    }
  }, []);

  useEffect(() => {
    burstRef.current = (x, y, count = 18) => spawn(x, y, count, true);
    return () => {
      burstRef.current = null;
    };
  }, [burstRef, spawn]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onVis = () => {
      visible.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    let last = performance.now();

    const tick = (now: number) => {
      raf.current = requestAnimationFrame(tick);
      if (!visible.current) return;
      const dt = Math.min(32, now - last);
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      if (reducedMotion) return;

      const cap = budget(intensityRef.current, mobile);
      if (particles.current.length < cap && Math.random() < (intensityRef.current === "hush" ? 0.08 : 0.35)) {
        spawn(Math.random() * w, Math.random() * h, 1, false);
      }
      if (particles.current.length > cap + 20) {
        particles.current.splice(0, particles.current.length - cap);
      }

      ctx.fillStyle = "#f0d9a8";
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        p.vy += 0.004;
        p.life -= dt / (p.max * 16);
        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(0, p.life) * p.g * (intensityRef.current === "hush" ? 0.35 : 0.7);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion, spawn]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  );
}
