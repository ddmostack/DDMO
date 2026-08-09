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
          50: "#eef1ff",
          100: "#dfe5ff",
          200: "#c5d0ff",
          300: "#9cafff",
          400: "#6d85ff",
          500: "#3d5bf5",
          600: "#1138e6",
          700: "#1138e6",
          800: "#0b279f",
          900: "#071861",
        },
        "dd-yellow": {
          50: "#fffbed",
          100: "#fff6bf",
          200: "#ffef8a",
          300: "#ffe977",
          400: "#ffe15a",
          500: "#ffdc48",
          600: "#ffd93b",
          700: "#ffd93b",
          800: "#b89a18",
          900: "#765f00",
        },
        "dd-black": "#000000",
        "dd-navy": "#1138e6",
        "dd-yellow-primary": "#ffd93b",
        "dd-signal": "#ffd93b",
        "dd-ink": "rgb(var(--dd-ink) / <alpha-value>)",
        "dd-offwhite": "rgb(var(--dd-paper) / <alpha-value>)",
        "dd-gray-600": "rgb(var(--dd-muted) / <alpha-value>)",
        "dd-gray-300": "rgb(var(--dd-line) / <alpha-value>)",
        "dd-gray-100": "rgb(var(--dd-soft) / <alpha-value>)",
      },
      backgroundImage: {
        "dd-gradient":
          "linear-gradient(135deg, #000000 0%, #1138e6 52%, #ffd93b 100%)",
        "dd-gradient-dark": "linear-gradient(135deg, #000000, #1138e6)",
        "dd-gradient-radial":
          "radial-gradient(circle at 30% 20%, rgba(17, 56, 230, 0.25), transparent 60%)",
      },
      borderRadius: {
        "2xl": "1.375rem",
      },
      boxShadow: {
        "dd-card": "0 18px 55px rgba(17, 56, 230, 0.08)",
        "dd-card-hover": "0 24px 70px rgba(17, 56, 230, 0.15)",
        "glow-blue": "0 20px 45px -10px rgba(17, 56, 230, 0.35)",
        "glow-yellow": "0 20px 45px -10px rgba(255, 217, 59, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
