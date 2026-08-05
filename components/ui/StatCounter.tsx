"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  label: string;
  prefix?: string;
  suffix?: string;
  value: number;
};

export function StatCounter({ label, prefix = "", suffix = "", value }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const isInView = useInView(ref, { once: false, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
    }

    if (reduceMotion) {
      return;
    }

    if (!isInView) {
      frame.current = requestAnimationFrame(() => setDisplayValue(0));
      return () => {
        if (frame.current !== null) cancelAnimationFrame(frame.current);
      };
    }

    const duration = 1200;
    const start = performance.now();

    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [isInView, reduceMotion, value]);

  return (
    <div ref={ref} className="min-w-0">
      <p className="bg-dd-gradient bg-clip-text text-4xl font-extrabold tracking-[-0.04em] text-transparent md:text-5xl">
        {prefix}
        {reduceMotion ? value : displayValue}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium leading-relaxed text-white/70">{label}</p>
    </div>
  );
}
