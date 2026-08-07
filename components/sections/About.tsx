"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

import { SectionOrb } from "@/components/effects/SectionOrb";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats, values } from "@/lib/constants";

export function About() {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);

  // Active scroll progress indicator for the values grid
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 80%", "end 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 28,
  });

  const progressLineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const progressDotY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="relative overflow-hidden bg-transparent">
      <SectionOrb className="top-10 right-2 md:right-4 h-44 w-44 md:h-60 md:w-60" />

      <div className="page-container section-space">
        {/* Top Header & Overview */}
        <div className="grid gap-12 border-t border-dd-gray-300/40 pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left Column - Sticky Heading & Studio Badge */}
          <ScrollReveal>
            <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-dd-navy">
                About Doodle Dynamo
              </p>
              <h2 className="text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] text-dd-ink md:text-6xl">
                Small team.<br />
                Wide-angle thinking.
              </h2>

              {/* Supporting Badge Card to eliminate left column dead space */}
              <div className="liquid-glass-card mt-6 max-w-[360px] rounded-2xl border border-white/70 bg-white/35 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:bg-white/50 hover:shadow-md">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-dd-navy">
                  <span className="h-2 w-2 rounded-full bg-dd-navy animate-pulse" aria-hidden="true" />
                  Agile Studio Model
                </div>
                <p className="mt-3 text-sm font-medium leading-relaxed text-dd-gray-600">
                  Direct access to senior strategists and developers. No middle management or bloated agency layers.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Intro Paragraphs & Values Module */}
          <div>
            <ScrollReveal delay={0.08}>
              <p className="max-w-[650px] text-xl font-medium leading-relaxed tracking-[-0.02em] text-dd-ink md:text-2xl">
                We connect strategy, creative work, and engineering so every part of a brand moves in the same direction.
              </p>
              <p className="mt-6 max-w-[620px] text-base font-medium leading-relaxed text-dd-gray-600">
                That means fewer handoffs, sharper decisions, and digital work built around clear business goals.
              </p>
            </ScrollReveal>

            {/* Values Grid Module (Distinct spacing from intro text) */}
            <div ref={gridRef} className="relative mt-16 lg:mt-20">
              {/* Vertical Scroll-Linked Progress Track & Indicator */}
              {!reduceMotion && (
                <div
                  className="pointer-events-none absolute -left-5 top-0 bottom-0 hidden w-1 bg-dd-gray-300/40 rounded-full md:block"
                  aria-hidden="true"
                >
                  <motion.div
                    className="w-full bg-dd-navy rounded-full"
                    style={{ height: progressLineHeight }}
                  />
                  <motion.div
                    className="absolute -left-[3px] top-0 h-2.5 w-2.5 rounded-full bg-dd-navy shadow-sm"
                    style={{ top: progressDotY, translateY: "-50%" }}
                  />
                </div>
              )}

              {/* 3x2 Balanced Grid Layout */}
              <div className="grid gap-4 sm:grid-cols-2">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <motion.div
                      key={value.title}
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.5,
                        delay: reduceMotion ? 0 : (index % 2) * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <CursorTiltCard
                        maxTilt={4}
                        magnetic={true}
                        glare={true}
                        className="h-full rounded-2xl"
                      >
                        <article className="group h-full border-t border-dd-gray-300/80 p-6 transition-all duration-300 hover:border-white/90 hover:bg-white/50 hover:shadow-md hover:backdrop-blur-md rounded-2xl">
                          {/* Heading + Icon Optically Aligned to Cap-Height */}
                          <div className="flex items-center gap-3">
                            <Icon
                              className="shrink-0 text-dd-navy transition-transform duration-300 group-hover:scale-110"
                              size={20}
                              strokeWidth={2}
                              aria-hidden="true"
                            />
                            <h3 className="font-bold tracking-[-0.02em] text-dd-ink transition-transform duration-300 group-hover:translate-x-1 text-lg">
                              {value.title}
                            </h3>
                          </div>
                          <p className="mt-3 text-sm font-medium leading-relaxed text-dd-gray-600">
                            {value.description}
                          </p>
                        </article>
                      </CursorTiltCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counter Row */}
        <ScrollReveal className="mt-16 lg:mt-24">
          <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-[28px] border border-white/80 bg-white/25 p-3 shadow-lg backdrop-blur-xl lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="liquid-glass-card rounded-[20px] bg-white/40 px-5 py-8 transition-all duration-300 hover:bg-white/70 md:px-7"
              >
                <StatCounter {...stat} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
