"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { CurvyDashedProgressArrow } from "@/components/ui/CurvyDashedProgressArrow";
import { SectionOrb } from "@/components/effects/SectionOrb";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { DifferentiatorMicroAnimation } from "@/components/ui/DifferentiatorMicroAnimation";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { differentiators } from "@/lib/constants";

const diffGlows = [
  "hover:shadow-glow-blue",
  "hover:shadow-glow-teal",
  "hover:shadow-glow-yellow",
  "hover:shadow-glow-red",
  "hover:shadow-glow-blue",
  "hover:shadow-glow-teal",
];

export function WhyUs() {
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Progressive scroll-linked timeline fill
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 25%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 28,
  });

  return (
    <section id="why-us" className="relative bg-transparent">
      <SectionOrb className="top-16 left-2 md:left-4 h-40 w-40 md:h-56 md:w-56" />

      <div className="page-container section-space">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-dd-navy">
              Our Differentiators
            </p>
            <h2 className="mt-4 text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] text-dd-ink md:text-7xl">
              Why teams keep us close.
            </h2>
            <p className="mt-6 text-base font-medium leading-relaxed text-dd-gray-600 md:text-lg">
              Senior thinking, clear communication, and one connected process from first idea to measurable result.
            </p>
          </div>
        </ScrollReveal>

        {/* Alternating Two-Column Timeline Module */}
        <div ref={timelineRef} className="relative mt-20 max-w-5xl mx-auto">
          {/* Organic Hand-Drawn Curvy Arrow Scroll Indicator */}
          {!reduceMotion && (
            <CurvyDashedProgressArrow
              progress={smoothProgress}
              className="absolute left-2 md:left-1/2 top-0 bottom-0 w-10 sm:w-12 md:w-16 lg:w-20 -translate-x-1/2 z-20"
            />
          )}

          {/* 6 Alternating Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {differentiators.map((item, index) => {
              const isEven = index % 2 === 0;
              const glowClass = diffGlows[index % diffGlows.length];

              return (
                <motion.div
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.6,
                    delay: reduceMotion ? 0 : (index % 2) * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative grid grid-cols-1 gap-6 pl-10 md:grid-cols-12 md:gap-8 md:pl-0"
                >
                  {/* Left Column (Content for EVEN items, Empty for ODD items) */}
                  <div
                    className={`md:col-span-5 ${
                      isEven ? "md:order-1 md:text-right" : "md:order-3 md:block hidden"
                    }`}
                  >
                    {isEven && (
                      <CursorTiltCard
                        maxTilt={5}
                        magnetic={true}
                        glare={true}
                        className="rounded-[28px]"
                      >
                        <article
                          className={`liquid-glass-card group rounded-[28px] border border-white/80 bg-white/35 p-7 md:p-8 transition-all duration-300 hover:border-white hover:bg-white/60 ${glowClass} backdrop-blur-md`}
                        >
                          <div className="flex items-center justify-between gap-4 md:flex-row-reverse">
                            <DifferentiatorMicroAnimation index={index} />
                            <span className="text-xs font-mono font-bold text-dd-navy/70">
                              0{index + 1}
                            </span>
                          </div>
                          <h3 className="mt-6 text-xl font-bold tracking-[-0.035em] text-dd-ink md:text-2xl transition-transform duration-300 group-hover:translate-x-1">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-sm font-medium leading-relaxed text-dd-gray-600 md:text-base">
                            {item.description}
                          </p>
                        </article>
                      </CursorTiltCard>
                    )}
                  </div>

                  {/* Central Node Pillar */}
                  <div className="hidden md:col-span-2 md:order-2 md:flex md:items-center md:justify-center">
                    <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-dd-navy text-xs font-mono font-bold text-white shadow-md transition-colors duration-300 group-hover:bg-dd-blue-700">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Right Column (Content for ODD items, Empty for EVEN items) */}
                  <div
                    className={`md:col-span-5 ${
                      !isEven ? "md:order-3 md:text-left" : "md:order-1 md:block hidden"
                    }`}
                  >
                    {!isEven && (
                      <CursorTiltCard
                        maxTilt={5}
                        magnetic={true}
                        glare={true}
                        className="rounded-[28px]"
                      >
                        <article
                          className={`liquid-glass-card group rounded-[28px] border border-white/80 bg-white/35 p-7 md:p-8 transition-all duration-300 hover:border-white hover:bg-white/60 ${glowClass} backdrop-blur-md`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <DifferentiatorMicroAnimation index={index} />
                            <span className="text-xs font-mono font-bold text-dd-navy/70">
                              0{index + 1}
                            </span>
                          </div>
                          <h3 className="mt-6 text-xl font-bold tracking-[-0.035em] text-dd-ink md:text-2xl transition-transform duration-300 group-hover:translate-x-1">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-sm font-medium leading-relaxed text-dd-gray-600 md:text-base">
                            {item.description}
                          </p>
                        </article>
                      </CursorTiltCard>
                    )}
                  </div>

                  {/* Mobile Screen Card Layout */}
                  <div className="block md:hidden">
                    <CursorTiltCard
                      maxTilt={4}
                      magnetic={false}
                      glare={true}
                      className="rounded-[24px]"
                    >
                      <article
                        className={`liquid-glass-card group rounded-[24px] border border-white/80 bg-white/35 p-6 transition-all duration-300 hover:bg-white/60 ${glowClass} backdrop-blur-md`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <DifferentiatorMicroAnimation index={index} />
                          <span className="text-xs font-mono font-bold text-dd-navy">
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="mt-5 text-xl font-bold tracking-[-0.035em] text-dd-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm font-medium leading-relaxed text-dd-gray-600">
                          {item.description}
                        </p>
                      </article>
                    </CursorTiltCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
