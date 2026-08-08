"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

export interface BlobConfig {
  id: string;
  color: string;
  size?: string;
  initialPosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  animate: {
    x: (number | string)[];
    y: (number | string)[];
    scale: number[];
  };
  duration: number;
}

export interface AnimatedGradientBackgroundProps {
  /** Base background color (defaults to near-white paper #F7F8FA) */
  baseColor?: string;
  /** Custom array of blob configurations for total brand flexibility */
  blobs?: BlobConfig[];
  /** Grain overlay opacity (0.04 to 0.08 recommended, defaults to 0.06) */
  grainOpacity?: number;
  /** Custom className for container */
  className?: string;
  /** Blur radius for the blobs (defaults to 100px) */
  blurRadius?: string;
  /** Fixed vs Absolute positioning (defaults to fixed) */
  positioning?: "fixed" | "absolute";
}

// Default blob setup closely tuned to match the reference image:
// - Luminous soft white highlights in the inner gradients for high contrast & clarity
// - Warm orange/coral top-right
// - Electric azure blue bottom-left
// - Rich violet-purple center-bottom diagonal sweep
// - Soft lavender top-center accent
const defaultBlobs: BlobConfig[] = [
  // Luminous Soft White Core Glow (Center-Top)
  {
    id: "center-white-luminous",
    color: "radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.6) 45%, transparent 80%)",
    size: "w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px]",
    initialPosition: { top: "10%", left: "20%" },
    animate: {
      x: [0, 40, -40, 20, 0],
      y: [0, -30, 40, -20, 0],
      scale: [1, 1.15, 0.92, 1.08, 1],
    },
    duration: 20,
  },
  // Luminous Soft White Glow (Bottom-Right)
  {
    id: "bottom-white-luminous",
    color: "radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 40%, transparent 80%)",
    size: "w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] md:w-[850px] md:h-[850px]",
    initialPosition: { bottom: "10%", right: "15%" },
    animate: {
      x: [0, -50, 30, -20, 0],
      y: [0, 40, -30, 25, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
    },
    duration: 24,
  },
  // Warm orange/coral top-right with soft white center core
  {
    id: "top-right-coral",
    color: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 94, 54, 0.75) 30%, rgba(255, 140, 40, 0.4) 60%, transparent 85%)",
    size: "w-[480px] h-[480px] sm:w-[650px] sm:h-[650px] md:w-[800px] md:h-[800px]",
    initialPosition: { top: "-12%", right: "-8%" },
    animate: {
      x: [0, 45, -35, 25, 0],
      y: [0, -35, 45, -25, 0],
      scale: [1, 1.12, 0.92, 1.08, 1],
    },
    duration: 22,
  },
  // Electric azure blue bottom-left with soft white inner transition
  {
    id: "bottom-left-blue",
    color: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(0, 145, 255, 0.8) 35%, rgba(37, 99, 235, 0.5) 60%, transparent 85%)",
    size: "w-[520px] h-[520px] sm:w-[700px] sm:h-[700px] md:w-[900px] md:h-[900px]",
    initialPosition: { bottom: "-18%", left: "-12%" },
    animate: {
      x: [0, 55, -45, 30, 0],
      y: [0, -45, 35, -30, 0],
      scale: [1, 1.18, 0.95, 1.1, 1],
    },
    duration: 27,
  },
  // Rich violet-purple center-bottom diagonal sweep with soft white highlights
  {
    id: "bottom-center-purple",
    color: "radial-gradient(circle, rgba(255, 255, 255, 0.45) 0%, rgba(140, 45, 226, 0.7) 35%, rgba(124, 58, 237, 0.45) 60%, transparent 85%)",
    size: "w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] md:w-[950px] md:h-[950px]",
    initialPosition: { bottom: "-15%", left: "12%" },
    animate: {
      x: [0, -45, 55, -25, 0],
      y: [0, 35, -40, 20, 0],
      scale: [1, 0.92, 1.15, 1.05, 1],
    },
    duration: 32,
  },
  // Soft lavender top-center accent with white glow
  {
    id: "top-center-lavender",
    color: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(168, 85, 247, 0.35) 40%, rgba(99, 102, 241, 0.2) 65%, transparent 85%)",
    size: "w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] md:w-[700px] md:h-[700px]",
    initialPosition: { top: "15%", right: "20%" },
    animate: {
      x: [0, 30, -30, 20, 0],
      y: [0, -30, 25, -15, 0],
      scale: [1, 1.08, 0.94, 1.04, 1],
    },
    duration: 25,
  },
];

export function AnimatedGradientBackground({
  baseColor = "#F7F8FA",
  blobs = defaultBlobs,
  grainOpacity = 0.06,
  className = "",
  blurRadius = "100px",
  positioning = "fixed",
}: AnimatedGradientBackgroundProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`${positioning} inset-0 -z-20 overflow-hidden pointer-events-none ${className}`}
      style={{ backgroundColor: baseColor }}
      aria-hidden="true"
    >
      {/* Container for blurred colorful gradient blobs */}
      <div className="relative h-full w-full">
        {blobs.map((blob) => {
          const style: React.CSSProperties = {
            background: blob.color,
            filter: `blur(${blurRadius})`,
            WebkitFilter: `blur(${blurRadius})`,
            willChange: "transform",
            ...blob.initialPosition,
          };

          return (
            <motion.div
              key={blob.id}
              className={`absolute rounded-full pointer-events-none opacity-90 ${
                blob.size || "w-[600px] h-[600px]"
              }`}
              style={style}
              animate={
                reduceMotion
                  ? false
                  : {
                      x: blob.animate.x,
                      y: blob.animate.y,
                      scale: blob.animate.scale,
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: blob.duration,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }
              }
            />
          );
        })}
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
