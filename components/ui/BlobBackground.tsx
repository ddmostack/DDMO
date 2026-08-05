"use client";

import { motion, useReducedMotion } from "framer-motion";

const blobs = [
  {
    className: "-left-[12%] top-[5%] h-[28rem] w-[28rem] bg-[#FFE79A]",
    x: [0, 42, -18, 0],
    y: [0, -28, 20, 0],
    duration: 26,
  },
  {
    className: "right-[-9%] top-[14%] h-[30rem] w-[30rem] bg-[#FFC2AE]",
    x: [0, -34, 18, 0],
    y: [0, 24, -22, 0],
    duration: 23,
  },
  {
    className: "bottom-[-22%] left-[32%] h-[34rem] w-[34rem] bg-[#B7C5F0]",
    x: [0, 30, -25, 0],
    y: [0, -22, 14, 0],
    duration: 29,
  },
];

export function BlobBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blobs.map((blob) => (
        <motion.div
          key={blob.className}
          className={`absolute rounded-full opacity-[0.32] blur-[110px] max-md:opacity-[0.22] max-md:blur-[80px] ${blob.className}`}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: blob.x,
                  y: blob.y,
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
