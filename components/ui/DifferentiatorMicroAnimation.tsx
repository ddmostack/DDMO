"use client";

import { motion, useReducedMotion } from "framer-motion";

export function DifferentiatorMicroAnimation({ index }: { index: number }) {
  const reduceMotion = useReducedMotion();

  // 0: One connected team (interlocking nodes)
  if (index === 0) {
    return (
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/60 shadow-sm backdrop-blur-md">
        <svg className="h-7 w-7 text-dd-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <line x1="8.7" y1="10.7" x2="15.3" y2="7.3" />
          <line x1="8.7" y1="13.3" x2="15.3" y2="16.7" />
        </svg>
        {!reduceMotion && (
          <motion.span
            className="absolute h-2 w-2 rounded-full bg-dd-navy shadow-sm"
            animate={{
              x: [-12, 12, -12],
              y: [0, -9, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    );
  }

  // 1: Data meets design (animated bar chart)
  if (index === 1) {
    return (
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/60 shadow-sm backdrop-blur-md">
        <div className="flex h-6 items-end gap-1">
          <motion.div
            className="w-1.5 rounded-full bg-dd-navy/40"
            animate={reduceMotion ? {} : { height: ["35%", "85%", "35%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-1.5 rounded-full bg-dd-navy"
            animate={reduceMotion ? {} : { height: ["75%", "40%", "75%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div
            className="w-1.5 rounded-full bg-blue-600"
            animate={reduceMotion ? {} : { height: ["50%", "100%", "50%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
        </div>
      </div>
    );
  }

  // 2: AI-native workflow (circuit pulse node)
  if (index === 2) {
    return (
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/60 shadow-sm backdrop-blur-md">
        <svg className="h-7 w-7 text-dd-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="7" y="7" width="10" height="10" rx="2" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
        {!reduceMotion && (
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-dd-navy/40"
            animate={{ scale: [0.9, 1.25, 0.9], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </div>
    );
  }

  // 3: Useful speed (speedometer dial sweep)
  if (index === 3) {
    return (
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/60 shadow-sm backdrop-blur-md">
        <svg className="h-7 w-7 text-dd-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M20 12h2M19.07 4.93l-1.41 1.41" />
        </svg>
        <motion.div
          className="absolute h-3.5 w-0.5 origin-bottom bg-dd-navy rounded-full"
          style={{ bottom: "28px" }}
          animate={reduceMotion ? {} : { rotate: [-40, 45, -40] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    );
  }

  // 4: Open reporting (document unfold / eye beam)
  if (index === 4) {
    return (
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/60 shadow-sm backdrop-blur-md">
        <svg className="h-7 w-7 text-dd-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        {!reduceMotion && (
          <motion.div
            className="absolute h-full w-full rounded-2xl bg-dd-navy/10"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
    );
  }

  // 5: Local insight, global craft (spinning globe orbit ring)
  return (
    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/60 shadow-sm backdrop-blur-md">
      <motion.svg
        className="h-7 w-7 text-dd-navy"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={reduceMotion ? {} : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </motion.svg>
    </div>
  );
}
