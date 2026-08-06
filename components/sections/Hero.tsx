"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { SectionOrb } from "@/components/effects/SectionOrb";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden pt-[72px]">
      {/* Responsive locked 3D Orbs */}
      <SectionOrb className="top-16 right-2 md:top-20 md:right-4 h-44 w-44 md:h-64 md:w-64" />
      <SectionOrb className="bottom-4 left-2 md:bottom-8 md:left-4 h-36 w-36 md:h-52 md:w-52" />
      {/* Soft legibility wash — lets the animated gradient mesh show through
          while keeping headline/body text easy to read on top of it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dd-offwhite/55 via-dd-offwhite/15 to-transparent"
      />

      <div className="page-container relative flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center py-12 text-center">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center"
        >
          <p className="mb-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-dd-gray-600">
            <span className="h-px w-9 bg-dd-navy" aria-hidden="true" />
            Independent digital studio
            <span className="h-px w-9 bg-dd-navy" aria-hidden="true" />
          </p>
          <h1 className="max-w-[920px] text-balance text-[clamp(3.6rem,8vw,7.2rem)] font-extrabold leading-[0.9] tracking-[-0.075em] text-dd-ink">
            Ideas built<br />
            to move.
          </h1>
          <p className="mt-8 max-w-[620px] text-balance text-base font-medium leading-relaxed text-dd-gray-600 md:text-xl">
            Strategy, design, and technology for ambitious brands ready to turn attention into momentum.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Button href="#contact" vhsEffect>
              Start a Project <ArrowUpRight className="ml-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={17} aria-hidden="true" />
            </Button>
            <Button href="#portfolio" variant="outline" vhsEffect>View Work</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
