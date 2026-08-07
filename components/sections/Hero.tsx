"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { HeroParticles } from "@/components/effects/HeroParticles";
import { SectionOrb } from "@/components/effects/SectionOrb";
import { Button } from "@/components/ui/Button";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";

const wordContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
};

const wordItemVariants = {
  hidden: { y: "120%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden pt-[72px]">
      {/* Interactive Particle Canvas */}
      <HeroParticles />

      {/* Responsive locked 3D Orbs */}
      <SectionOrb className="top-16 right-2 md:top-20 md:right-4 h-44 w-44 md:h-64 md:w-64" />
      <SectionOrb className="bottom-8 left-2 md:bottom-12 md:left-4 h-36 w-36 md:h-52 md:w-52" />

      {/* Soft legibility wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dd-offwhite/55 via-dd-offwhite/15 to-transparent"
      />

      <div className="page-container relative flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center py-12 text-center">
        <CursorTiltCard
          maxTilt={5}
          magnetic={true}
          glare={true}
          className="rounded-[36px] p-6 md:p-12 z-10"
        >
          <div className="flex flex-col items-center">
            {/* Top Studio Label */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-dd-gray-600"
            >
              <span className="h-px w-9 bg-dd-navy" aria-hidden="true" />
              Independent digital studio
              <span className="h-px w-9 bg-dd-navy" aria-hidden="true" />
            </motion.p>

            {/* Kinetic Text Reveal Headline */}
            <motion.h1
              variants={wordContainerVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="max-w-[920px] text-balance text-[clamp(3.6rem,8vw,7.2rem)] font-extrabold leading-[0.92] tracking-[-0.075em] text-dd-ink"
            >
              <span className="inline-block overflow-hidden py-1">
                <motion.span variants={wordItemVariants} className="inline-block">
                  Ideas
                </motion.span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1">
                <motion.span variants={wordItemVariants} className="inline-block">
                  built
                </motion.span>
              </span>
              <br />
              <span className="inline-block overflow-hidden py-1">
                <motion.span variants={wordItemVariants} className="inline-block">
                  to
                </motion.span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1">
                <motion.span
                  variants={wordItemVariants}
                  className="inline-block bg-gradient-to-r from-dd-navy via-[#1d4ed8] to-[#0284c7] bg-clip-text text-transparent"
                  animate={
                    reduceMotion
                      ? {}
                      : {
                          y: [0, -3.5, 0],
                          skewX: [0, -1, 0, 1, 0],
                        }
                  }
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  move.
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-[620px] text-balance text-base font-medium leading-relaxed text-dd-gray-600 md:text-xl"
            >
              Strategy, design, and technology for ambitious brands ready to turn attention into momentum.
            </motion.p>

            {/* Magnetic Sweep CTAs */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
            >
              <Button href="#contact" vhsEffect magnetic={true}>
                Start a Project{" "}
                <ArrowUpRight
                  className="ml-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  size={17}
                  aria-hidden="true"
                />
              </Button>
              <Button href="#portfolio" variant="outline" vhsEffect magnetic={true}>
                View Work
              </Button>
            </motion.div>
          </div>
        </CursorTiltCard>
      </div>

      {/* Animated Scroll-Cue Indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down to About section"
        className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-dd-gray-600 transition-colors hover:text-dd-navy"
        initial={reduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-dd-gray-600 group-hover:text-dd-navy">
          Scroll
        </span>
        <div className="h-8 w-0.5 overflow-hidden rounded-full bg-dd-navy/20">
          <motion.div
            className="h-full w-full rounded-full bg-dd-navy"
            animate={reduceMotion ? {} : { y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <ChevronDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
      </motion.a>
    </section>
  );
}
