import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy name "dd-navy" kept for backward compatibility with
        // existing component classnames — now correctly points at the
        // primary accent instead of duplicating yellow/orange onto it.
        "dd-navy": "rgb(var(--dd-accent) / <alpha-value>)",
        "dd-yellow": "rgb(var(--dd-accent-3) / <alpha-value>)",
        "dd-orange": "rgb(var(--dd-accent-2) / <alpha-value>)",
        "dd-coral": "rgb(var(--dd-accent-2) / <alpha-value>)",
        "dd-signal": "rgb(var(--dd-accent-3) / <alpha-value>)",
        "dd-ink": "rgb(var(--dd-ink) / <alpha-value>)",
        "dd-offwhite": "rgb(var(--dd-paper) / <alpha-value>)",
        "dd-gray-600": "rgb(var(--dd-muted) / <alpha-value>)",
        "dd-gray-300": "rgb(var(--dd-line) / <alpha-value>)",
        "dd-gray-100": "rgb(var(--dd-soft) / <alpha-value>)",
      },
      backgroundImage: {
        "dd-gradient":
          "linear-gradient(115deg, rgb(var(--dd-accent)) 0%, rgb(var(--dd-accent-2)) 55%, rgb(var(--dd-accent-3)) 100%)",
        "dd-gradient-dark": "linear-gradient(135deg, #20211e, #11120f)",
        "dd-gradient-radial":
          "radial-gradient(circle at 30% 20%, rgb(var(--dd-accent) / 25%), transparent 60%)",
      },
      borderRadius: {
        "2xl": "1.375rem",
      },
      boxShadow: {
        "dd-card": "0 18px 55px rgba(25, 27, 24, 0.08)",
        "dd-card-hover": "0 24px 70px rgba(25, 27, 24, 0.13)",
      },
    },
  },
  plugins: [],
};

export default config;
