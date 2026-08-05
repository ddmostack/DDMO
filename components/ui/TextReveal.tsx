"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function TextReveal({ text, className = "", delay = 0, as = "span" }: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });
  const reduceMotion = useReducedMotion();
  const Tag = as;

  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "108%", rotate: 2.5 }}
            animate={isInView ? { y: 0, rotate: 0 } : { y: "108%", rotate: 2.5 }}
            transition={{
              duration: 0.55,
              delay: delay + index * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
