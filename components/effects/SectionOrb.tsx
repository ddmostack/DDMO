"use client";

import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type SectionOrbProps = {
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
};

export function SectionOrb({ className = "", glowColor = "rgba(14, 42, 133, 0.16)", style }: SectionOrbProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "200px 0px" });
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    if (reduceMotion || !isInView) return;

    function handlePointerMove(e: PointerEvent) {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, isInView, mouseX, mouseY]);

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
    return (
      <div ref={ref} className="relative pointer-events-none" aria-hidden="true">
        <div
          className="absolute -inset-8 rounded-full blur-2xl opacity-60"
          style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
        />
        <div className={`white-orb-3d ${className}`} style={style} />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative pointer-events-none" aria-hidden="true">
      {/* Light Source Backglow Aura */}
      <motion.div
        className="absolute -inset-10 rounded-full blur-3xl pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          x: orbX,
          y: orbY,
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.55, 0.8, 0.55],
        }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Primary 3D Orb */}
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
      />
    </div>
  );
}
