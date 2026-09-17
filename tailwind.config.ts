import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0908",
          50: "#141210",
          100: "#1c1916",
        },
        ivory: {
          DEFAULT: "#f4eee3",
          dim: "#c9c0b0",
          mute: "#8a8276",
        },
        gold: {
          DEFAULT: "#d4b483",
          dim: "#8a7354",
          bright: "#f0d9a8",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wideish: "0.18em",
      },
      transitionTimingFunction: {
        cinema: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
