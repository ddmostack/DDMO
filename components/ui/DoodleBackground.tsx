"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const doodles = [
  { d: "M 12 90 Q 40 20, 88 62 T 168 34", stroke: "#ffd93b", delay: 0 },
  { d: "M 24 120 C 70 40, 110 140, 160 70", stroke: "#ffd93b", delay: 0.15 },
  { d: "M 40 60 A 48 48 0 1 1 39.5 60", stroke: "#1138e6", delay: 0.3 },
  { d: "M 180 100 L 220 60 L 260 100 M 200 120 L 240 80", stroke: "#1138e6", delay: 0.2 },
];

export function DoodleBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={reduceMotion ? undefined : { y, opacity }}
      aria-hidden="true"
    >
      <svg
        className="absolute -left-[6%] top-[8%] h-[min(52vw,520px)] w-[min(52vw,520px)] opacity-90"
        viewBox="0 0 280 280"
        fill="none"
      >
        {doodles.map((doodle) => (
          <motion.path
            key={doodle.d}
            d={doodle.d}
            stroke={doodle.stroke}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { pathLength: 1, opacity: 0.55 }}
            transition={{
              duration: 1.8,
              delay: doodle.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </svg>

      <motion.div
        className="absolute right-[-4%] top-[18%] h-[min(38vw,380px)] w-[min(38vw,380px)] rounded-[42%] bg-dd-yellow-600/18 blur-[2px]"
        animate={reduceMotion ? undefined : { rotate: [0, 8, -4, 0], scale: [1, 1.04, 0.98, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[8%] left-[28%] h-[min(44vw,420px)] w-[min(44vw,420px)] rounded-[38%] bg-dd-blue-600/10 blur-[1px]"
        animate={reduceMotion ? undefined : { rotate: [0, -6, 4, 0], y: [0, -18, 12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
