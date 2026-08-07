"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

type CursorTiltCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  magnetic?: boolean;
  glare?: boolean;
  dataCursor?: string;
  dataCursorText?: string;
};

export function CursorTiltCard({
  children,
  className = "",
  maxTilt = 8,
  magnetic = true,
  glare = true,
  dataCursor,
  dataCursorText,
}: CursorTiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse offset from center: -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Absolute cursor pos for spotlight glare (percentage 0 - 100)
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 300, damping: 22 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, (y) => (reduceMotion ? 0 : -y * maxTilt));
  const rotateY = useTransform(smoothMouseX, (x) => (reduceMotion ? 0 : x * maxTilt));

  const translateX = useTransform(smoothMouseX, (x) => (magnetic && !reduceMotion ? x * 14 : 0));
  const translateY = useTransform(smoothMouseY, (y) => (magnetic && !reduceMotion ? y * 14 : 0));

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    const normalizedX = (relativeX / width) - 0.5;
    const normalizedY = (relativeY / height) - 0.5;

    mouseX.set(normalizedX);
    mouseY.set(normalizedY);

    glareX.set((relativeX / width) * 100);
    glareY.set((relativeY / height) * 100);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      data-cursor={dataCursor}
      data-cursor-text={dataCursorText}
    >
      {children}

      {/* Dynamic Cursor Spotlight Glare Sheen */}
      {glare && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle 350px at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 70%)`,
          }}
        />
      )}
    </motion.div>
  );
}
