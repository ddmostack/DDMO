import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dd-blue": {
          50: "#EFF3FF",
          100: "#DBE5FE",
          200: "#BFCEFE",
          300: "#93ACFD",
          400: "#607FFB",
          500: "#2E52F2",
          600: "#0E2A85",
          700: "#0A1F6E",
          800: "#07154B",
          900: "#050E33",
        },
        "dd-teal": {
          50: "#E6FAFA",
          100: "#C3F3EF",
          200: "#8BE7DE",
          300: "#47D3C5",
          400: "#10D9AB",
          500: "#0EA897",
          600: "#0C8F80",
          700: "#0A7A6E",
          800: "#07564E",
          900: "#053A35",
        },
        "dd-yellow": {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE047",
          300: "#FEBD02",
          400: "#F5B000",
          500: "#E0A400",
          600: "#D99A00",
          700: "#B27B00",
          800: "#8C5E00",
          900: "#5F3F00",
        },
        "dd-red": {
          50: "#FFF2EE",
          100: "#FFE2D9",
          200: "#FFC0B0",
          300: "#FF8D70",
          400: "#FF4101",
          500: "#E83900",
          600: "#D93600",
          700: "#C93000",
          800: "#992200",
          900: "#6B1700",
        },
        // Primary brand aliases pointing to deepened 600 scale tokens
        "dd-navy": "#0E2A85",
        "dd-teal-primary": "#0C8F80",
        "dd-yellow-primary": "#D99A00",
        "dd-coral": "#D93600",
        "dd-signal": "#D99A00",
        "dd-ink": "rgb(var(--dd-ink) / <alpha-value>)",
        "dd-offwhite": "rgb(var(--dd-paper) / <alpha-value>)",
        "dd-gray-600": "rgb(var(--dd-muted) / <alpha-value>)",
        "dd-gray-300": "rgb(var(--dd-line) / <alpha-value>)",
        "dd-gray-100": "rgb(var(--dd-soft) / <alpha-value>)",
      },
      backgroundImage: {
        "dd-gradient":
          "linear-gradient(125deg, #0E2A85 0%, #0C8F80 33%, #D99A00 66%, #D93600 100%)",
        "dd-gradient-dark": "linear-gradient(135deg, #0A1F6E, #050E33)",
        "dd-gradient-radial":
          "radial-gradient(circle at 30% 20%, rgba(14, 42, 133, 0.25), transparent 60%)",
      },
      borderRadius: {
        "2xl": "1.375rem",
      },
      boxShadow: {
        "dd-card": "0 18px 55px rgba(14, 42, 133, 0.08)",
        "dd-card-hover": "0 24px 70px rgba(14, 42, 133, 0.15)",
        "glow-blue": "0 20px 45px -10px rgba(14, 42, 133, 0.35)",
        "glow-teal": "0 20px 45px -10px rgba(12, 143, 128, 0.35)",
        "glow-yellow": "0 20px 45px -10px rgba(217, 154, 0, 0.35)",
        "glow-red": "0 20px 45px -10px rgba(217, 54, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
