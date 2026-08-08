"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import React from "react";

export interface AnimatedGradientBackgroundProps {
  /** Base background color (defaults to near-white paper #F7F8FA) */
  baseColor?: string;
  /** Grain overlay opacity (0.04 to 0.08 recommended, defaults to 0.06) */
  grainOpacity?: number;
  /** Custom className for container */
  className?: string;
  /** Blur radius for the blobs (defaults to 100px) */
  blurRadius?: string;
  /** Fixed vs Absolute positioning (defaults to fixed) */
  positioning?: "fixed" | "absolute";
}

// Brand color palette hex definitions from reference:
// BLUE:   #1235A0 -> rgba(18, 53, 160, opacity)
// TEAL:   #10D9AB -> rgba(16, 217, 171, opacity)
// YELLOW: #FEBD02 -> rgba(254, 189, 2, opacity)
// RED:    #FF4101 -> rgba(255, 65, 1, opacity)

export function AnimatedGradientBackground({
  baseColor = "#F7F8FA",
  grainOpacity = 0.06,
  className = "",
  blurRadius = "100px",
  positioning = "fixed",
}: AnimatedGradientBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
  });

  // Blob 1 (Top-Right): Red -> Teal -> Yellow -> Blue on scroll
  const blob1Color = useTransform(
    smoothScroll,
    [0, 0.33, 0.66, 1],
    [
      "rgba(255, 65, 1, 0.75)",   // Red at Top
      "rgba(16, 217, 171, 0.75)", // Teal at Middle
      "rgba(254, 189, 2, 0.75)",  // Yellow at Lower-Middle
      "rgba(18, 53, 160, 0.75)",  // Blue at Bottom
    ]
  );
  const blob1Bg = useTransform(
    blob1Color,
    (c) => `radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, ${c} 40%, transparent 80%)`
  );

  // Blob 2 (Bottom-Left): Blue -> Red -> Teal -> Yellow on scroll
  const blob2Color = useTransform(
    smoothScroll,
    [0, 0.33, 0.66, 1],
    [
      "rgba(18, 53, 160, 0.8)",   // Blue at Top
      "rgba(255, 65, 1, 0.75)",   // Red at Middle
      "rgba(16, 217, 171, 0.75)", // Teal at Lower-Middle
      "rgba(254, 189, 2, 0.75)",  // Yellow at Bottom
    ]
  );
  const blob2Bg = useTransform(
    blob2Color,
    (c) => `radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, ${c} 42%, transparent 80%)`
  );

  // Blob 3 (Bottom-Center / Diagonal Sweep): Teal -> Yellow -> Blue -> Red on scroll
  const blob3Color = useTransform(
    smoothScroll,
    [0, 0.33, 0.66, 1],
    [
      "rgba(16, 217, 171, 0.75)", // Teal at Top
      "rgba(254, 189, 2, 0.75)",  // Yellow at Middle
      "rgba(18, 53, 160, 0.75)",  // Blue at Lower-Middle
      "rgba(255, 65, 1, 0.75)",   // Red at Bottom
    ]
  );
  const blob3Bg = useTransform(
    blob3Color,
    (c) => `radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, ${c} 40%, transparent 80%)`
  );

  // Blob 4 (Top-Left Accent): Yellow -> Blue -> Red -> Teal on scroll
  const blob4Color = useTransform(
    smoothScroll,
    [0, 0.33, 0.66, 1],
    [
      "rgba(254, 189, 2, 0.65)",  // Yellow at Top
      "rgba(18, 53, 160, 0.65)",  // Blue at Middle
      "rgba(255, 65, 1, 0.65)",   // Red at Lower-Middle
      "rgba(16, 217, 171, 0.65)", // Teal at Bottom
    ]
  );
  const blob4Bg = useTransform(
    blob4Color,
    (c) => `radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, ${c} 45%, transparent 85%)`
  );

  const styleBase = (blur: string): React.CSSProperties => ({
    filter: `blur(${blur})`,
    WebkitFilter: `blur(${blur})`,
    willChange: "transform, background",
  });

  return (
    <div
      className={`${positioning} inset-0 -z-20 overflow-hidden pointer-events-none ${className}`}
      style={{ backgroundColor: baseColor }}
      aria-hidden="true"
    >
      {/* Container for blurred colorful gradient blobs */}
      <div className="relative h-full w-full">
        {/* Luminous Soft White Glow (Center-Top) */}
        <motion.div
          className="absolute rounded-full pointer-events-none opacity-90 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px] top-[10%] left-[20%]"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.6) 45%, transparent 80%)",
            ...styleBase(blurRadius),
          }}
          animate={
            reduceMotion
              ? false
              : {
                  x: [0, 40, -40, 20, 0],
                  y: [0, -30, 40, -20, 0],
                  scale: [1, 1.15, 0.92, 1.08, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />

        {/* Luminous Soft White Glow (Bottom-Right) */}
        <motion.div
          className="absolute rounded-full pointer-events-none opacity-90 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] md:w-[850px] md:h-[850px] bottom-[10%] right-[15%]"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 40%, transparent 80%)",
            ...styleBase(blurRadius),
          }}
          animate={
            reduceMotion
              ? false
              : {
                  x: [0, -50, 30, -20, 0],
                  y: [0, 40, -30, 25, 0],
                  scale: [1, 1.1, 0.95, 1.05, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 24,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />

        {/* Blob 1 (Top-Right): Red -> Teal -> Yellow -> Blue */}
        <motion.div
          className="absolute rounded-full pointer-events-none opacity-90 w-[480px] h-[480px] sm:w-[650px] sm:h-[650px] md:w-[800px] md:h-[800px] -top-[12%] -right-[8%]"
          style={{
            background: blob1Bg,
            ...styleBase(blurRadius),
          }}
          animate={
            reduceMotion
              ? false
              : {
                  x: [0, 45, -35, 25, 0],
                  y: [0, -35, 45, -25, 0],
                  scale: [1, 1.12, 0.92, 1.08, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 22,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />

        {/* Blob 2 (Bottom-Left): Blue -> Red -> Teal -> Yellow */}
        <motion.div
          className="absolute rounded-full pointer-events-none opacity-90 w-[520px] h-[520px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px] -bottom-[18%] -left-[12%]"
          style={{
            background: blob2Bg,
            ...styleBase(blurRadius),
          }}
          animate={
            reduceMotion
              ? false
              : {
                  x: [0, 55, -45, 30, 0],
                  y: [0, -45, 35, -30, 0],
                  scale: [1, 1.18, 0.95, 1.1, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 27,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />

        {/* Blob 3 (Bottom-Center / Diagonal Sweep): Teal -> Yellow -> Blue -> Red */}
        <motion.div
          className="absolute rounded-full pointer-events-none opacity-90 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] md:w-[950px] md:h-[950px] -bottom-[15%] left-[12%]"
          style={{
            background: blob3Bg,
            ...styleBase(blurRadius),
          }}
          animate={
            reduceMotion
              ? false
              : {
                  x: [0, -45, 55, -25, 0],
                  y: [0, 35, -40, 20, 0],
                  scale: [1, 0.92, 1.15, 1.05, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 32,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />

        {/* Blob 4 (Top-Left Accent): Yellow -> Blue -> Red -> Teal */}
        <motion.div
          className="absolute rounded-full pointer-events-none opacity-90 w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px] top-[15%] right-[20%]"
          style={{
            background: blob4Bg,
            ...styleBase(blurRadius),
          }}
          animate={
            reduceMotion
              ? false
              : {
                  x: [0, 30, -30, 20, 0],
                  y: [0, -30, 25, -15, 0],
                  scale: [1, 1.08, 0.94, 1.04, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 25,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />
      </div>

      {/* SVG feTurbulence Grain / Noise Overlay matching the reference */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay"
        style={{ opacity: grainOpacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="gradient-bg-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#gradient-bg-noise)" />
      </svg>
    </div>
  );
}
