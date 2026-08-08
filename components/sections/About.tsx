"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { CurvyDashedProgressArrow } from "@/components/ui/CurvyDashedProgressArrow";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats, values } from "@/lib/constants";

const valueCardStyles = [
  { iconColor: "text-dd-blue-600", hoverGlow: "hover:shadow-glow-blue", borderHover: "group-hover:border-dd-blue-600/40" },
  { iconColor: "text-dd-teal-600", hoverGlow: "hover:shadow-glow-teal", borderHover: "group-hover:border-dd-teal-600/40" },
  { iconColor: "text-dd-yellow-700", hoverGlow: "hover:shadow-glow-yellow", borderHover: "group-hover:border-dd-yellow-700/40" },
  { iconColor: "text-dd-red-600", hoverGlow: "hover:shadow-glow-red", borderHover: "group-hover:border-dd-red-600/40" },
  { iconColor: "text-dd-blue-600", hoverGlow: "hover:shadow-glow-blue", borderHover: "group-hover:border-dd-blue-600/40" },
  { iconColor: "text-dd-teal-600", hoverGlow: "hover:shadow-glow-teal", borderHover: "group-hover:border-dd-teal-600/40" },
];

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

  return (
    <section id="about" className="relative bg-transparent">

      <div className="page-container section-space relative z-10">
        {/* Top Header & Overview */}
        <div className="grid gap-12 pt-4 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
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
                  <span className="h-2 w-2 rounded-full bg-dd-blue-600 animate-pulse" aria-hidden="true" />
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

            {/* Values Grid Module */}
            <div ref={gridRef} className="relative mt-12 lg:mt-16">
              {/* Organic Hand-Drawn Curvy Arrow Scroll Indicator */}
              {!reduceMotion && (
                <CurvyDashedProgressArrow
                  progress={smoothProgress}
                  className="absolute -left-6 sm:-left-8 md:-left-12 lg:-left-14 top-0 bottom-0 w-10 sm:w-12 md:w-16 lg:w-20 block z-20"
                />
              )}

              {/* 3x2 Balanced Grid Layout */}
              <div className="grid gap-4 sm:grid-cols-2">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  const style = valueCardStyles[index % valueCardStyles.length];

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
                        <article
                          className={`liquid-glass-card group h-full p-6 transition-all duration-300 hover:border-white/90 hover:bg-white/50 ${style.hoverGlow} backdrop-blur-md rounded-2xl`}
                        >
                          {/* Heading + Icon Optically Aligned to Cap-Height */}
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`shrink-0 ${style.iconColor} transition-transform duration-300 group-hover:scale-110`}
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

        {/* Stats Counter Row with Eyebrow Header Context */}
        <ScrollReveal className="mt-16 lg:mt-20">
          <div className="mb-5 flex items-center justify-center gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-dd-blue-600">
              Studio Metrics • Impact By The Numbers
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-[28px] border border-white/80 bg-white/25 p-3 shadow-lg backdrop-blur-xl lg:grid-cols-4">
            {stats.map((stat, index) => (
              <CursorTiltCard
                key={stat.label}
                maxTilt={4}
                magnetic={true}
                glare={true}
                className="rounded-[20px]"
              >
                <article className="liquid-glass-card group h-full rounded-[20px] bg-white/40 px-5 py-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/75 hover:shadow-xl md:px-7">
                  <StatCounter delay={index * 0.12} {...stat} />
                </article>
              </CursorTiltCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
