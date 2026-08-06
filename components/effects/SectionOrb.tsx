"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type SectionOrbProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function SectionOrb({ className = "", style }: SectionOrbProps) {
  const reduceMotion = useReducedMotion();
  // Initialize to 0.5 (center) so that the initial transform evaluates to 0 on both server and client,
  // preventing hydration mismatches.
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    if (reduceMotion) return;

    function handlePointerMove(e: PointerEvent) {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, mouseX, mouseY]);

  const springConfig = { stiffness: 45, damping: 20 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const orbX = useTransform(smoothMouseX, (x) => {
    if (reduceMotion) return 0;
    return (x - 0.5) * 24;
  });

  const orbY = useTransform(smoothMouseY, (y) => {
    if (reduceMotion) return 0;
    return (y - 0.5) * 20;
  });

  if (reduceMotion) {
    return <div className={`white-orb-3d ${className}`} style={style} aria-hidden="true" />;
  }

  return (
    <motion.div
      className={`white-orb-3d ${className}`}
      style={{
        ...style,
        x: orbX,
        y: orbY,
      }}
      animate={{
        scale: [1, 1.025, 1],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}
