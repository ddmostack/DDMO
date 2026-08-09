"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  delay?: number;
  label: string;
  prefix?: string;
  suffix?: string;
  value: number;
};

export function StatCounter({
  delay = 0,
  label,
  prefix = "",
  suffix = "",
  value,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();

  const [displayValue, setDisplayValue] = useState(() => (reduceMotion ? value : 0));
  const [progressRatio, setProgressRatio] = useState(() => (reduceMotion ? 1 : 0));
  const [isCompleted, setIsCompleted] = useState(() => Boolean(reduceMotion));

  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const duration = 1200;

    const timeoutId = setTimeout(() => {
      const start = performance.now();

      const tick = (time: number) => {
        const elapsed = time - start;
        const rawProgress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - rawProgress, 3); // Cubic easeOut

        setDisplayValue(Math.round(value * eased));
        setProgressRatio(rawProgress);

        if (rawProgress < 1) {
          frame.current = requestAnimationFrame(tick);
        } else {
          setIsCompleted(true);
        }
      };

      frame.current = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [isInView, reduceMotion, value, delay]);

  return (
    <div ref={ref} className="min-w-0 flex flex-col justify-between h-full">
      <div>
        {/* Scale Bounce Punctuation on Number when Count Completes */}
        <motion.p
          className="bg-dd-gradient bg-clip-text text-3xl font-extrabold tracking-[-0.04em] text-transparent sm:text-4xl md:text-5xl inline-block"
          animate={
            isCompleted && !reduceMotion
              ? { scale: [1, 1.08, 1] }
              : { scale: 1 }
          }
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {prefix}
          {reduceMotion ? value : displayValue}
          {suffix}
        </motion.p>
        <p className="mt-2 text-sm font-medium leading-relaxed text-dd-gray-600">{label}</p>
      </div>

      {/* Syncing Thin Animated Underline / Progress Bar */}
      <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-dd-navy/15" aria-hidden="true">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-dd-blue-600 via-dd-yellow-600 to-dd-blue-600"
          style={{ width: `${(reduceMotion ? 1 : progressRatio) * 100}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </div>
  );
}
