"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type RevealVariant = "fadeUp" | "clipUp" | "slideLeft" | "slideRight" | "scaleIn" | "blurIn";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

const variantStates: Record<
  RevealVariant,
  { hidden: Record<string, number | string>; visible: Record<string, number | string> }
> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  clipUp: {
    hidden: { opacity: 0, y: 56, clipPath: "inset(100% 0 0 0)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-12% 0px -8% 0px",
  });
  const reduceMotion = useReducedMotion();
  const states = variantStates[variant];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : states.hidden}
      animate={reduceMotion || isInView ? states.visible : states.hidden}
      transition={{
        duration: reduceMotion ? 0 : 0.72,
        ease: [0.22, 1, 0.36, 1],
        delay: reduceMotion ? 0 : delay,
      }}
    >
      {children}
    </motion.div>
  );
}
