"use client";

import { motion, useReducedMotion } from "framer-motion";

type DoodleAccentProps = {
  className?: string;
  variant?: "squiggle" | "circle" | "arrow" | "star";
};

export function DoodleAccent({ className = "", variant = "squiggle" }: DoodleAccentProps) {
  const reduceMotion = useReducedMotion();

  const paths = {
    squiggle: "M4 18 C 28 4, 52 32, 76 14 S 124 28, 148 10",
    circle: "M 74 8 A 66 66 0 1 1 73.9 8",
    arrow: "M8 20 L72 20 M52 8 L72 20 L52 32",
    star: "M74 6 L82 28 L106 28 L86 42 L94 66 L74 52 L54 66 L62 42 L42 28 L66 28 Z",
  };

  return (
    <motion.svg
      viewBox="0 0 152 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
      whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
      viewport={{ once: false, margin: "-5%" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.path
        d={paths[variant]}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}
