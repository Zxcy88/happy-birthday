"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { birthdayContent, isUnset } from "@/data/birthday";
import { useExperience } from "@/components/experience/ExperienceProvider";

export function Gate() {
  const { completeGate, reducedMotion } = useExperience();
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const phrase = birthdayContent.gate.passphrase.trim().toLowerCase();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isUnset(birthdayContent.gate.passphrase)) {
      completeGate();
      return;
    }
    if (value.trim().toLowerCase() === phrase) {
      completeGate();
      return;
    }
    setError(true);
  };

  return (
    <section className="relative z-10 flex min-h-dvh flex-col items-center justify-center safe-pad text-center">
      <motion.p
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 kicker text-gold/80"
      >
        Sealed
      </motion.p>
      <motion.h1
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.8 }}
        className="font-serif text-3xl font-medium text-ivory sm:text-4xl"
      >
        {birthdayContent.gate.prompt}
      </motion.h1>
      <form onSubmit={onSubmit} className="mt-12 w-full max-w-xs">
        <label className="sr-only" htmlFor="gate-word">
          Passphrase
        </label>
        <input
          id="gate-word"
          autoComplete="off"
          autoCapitalize="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          className="w-full border-b border-ivory/25 bg-transparent py-3 text-center font-serif text-xl tracking-wide text-ivory placeholder:text-ivory/25 focus:border-gold focus:outline-none"
          placeholder="· · ·"
        />
        {error ? (
          <p className="mt-4 text-sm text-gold/80" role="alert">
            Not that one.
          </p>
        ) : null}
        <button
          type="submit"
          className="mt-10 min-h-11 kicker px-6 text-gold"
        >
          Enter
        </button>
      </form>
    </section>
  );
}
