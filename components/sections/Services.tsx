"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { SectionOrb } from "@/components/effects/SectionOrb";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { services } from "@/lib/constants";

const serviceGradients = [
  "from-blue-600/15 via-indigo-500/8 to-transparent",
  "from-cyan-500/15 via-sky-500/8 to-transparent",
  "from-violet-600/15 via-purple-500/8 to-transparent",
  "from-emerald-500/15 via-teal-500/8 to-transparent",
  "from-amber-500/15 via-orange-500/8 to-transparent",
  "from-rose-500/15 via-pink-500/8 to-transparent",
];

const serviceAccents = [
  "group-hover:border-blue-400/40 group-hover:text-blue-600",
  "group-hover:border-cyan-400/40 group-hover:text-cyan-600",
  "group-hover:border-violet-400/40 group-hover:text-violet-600",
  "group-hover:border-emerald-400/40 group-hover:text-emerald-600",
  "group-hover:border-amber-400/40 group-hover:text-amber-600",
  "group-hover:border-rose-400/40 group-hover:text-rose-600",
];

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden bg-transparent">
      <SectionOrb className="top-24 left-2 md:left-4 h-40 w-40 md:h-56 md:w-56" />

      <div className="page-container section-space">
        <ScrollReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-dd-navy">
                Capabilities
              </p>
              <h2 className="mt-4 max-w-[760px] text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] text-dd-ink md:text-7xl">
                Built for the whole journey.
              </h2>
            </div>
            <p className="max-w-[440px] text-base font-medium leading-relaxed text-dd-gray-600 md:text-lg">
              Focused capabilities connecting strategy, creative, and engineering into one continuous system.
            </p>
          </div>
        </ScrollReveal>

        {/* Connecting System Line Header */}
        <div className="relative mt-14 flex items-center justify-between overflow-hidden py-3" aria-hidden="true">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-dd-navy/30 to-transparent" />
          <span className="shrink-0 px-4 text-[10px] font-bold uppercase tracking-widest text-dd-navy/60">
            System Network • 01 — 06
          </span>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-dd-navy/30 to-transparent" />
        </div>

        {/* 6-Item Interactive Services Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {services.map((service, index) => {
            const Icon = service.icon;
            const gradient = serviceGradients[index % serviceGradients.length];
            const accent = serviceAccents[index % serviceAccents.length];
            const num = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

            return (
              <motion.div
                key={service.title}
                initial={reduceMotion ? false : { opacity: 0, y: 36, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  delay: reduceMotion ? 0 : (index % 3) * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <a
                  href="#contact"
                  className="group block cursor-pointer h-full"
                  aria-label={`Learn more about ${service.title}`}
                  data-cursor="explore"
                  data-cursor-text="SERVICE"
                >
                  <CursorTiltCard
                    maxTilt={6}
                    magnetic={true}
                    glare={true}
                    className="h-full rounded-[28px]"
                  >
                    <article className="liquid-glass-card relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/70 bg-white/35 p-7 md:p-8 transition-all duration-500 hover:scale-[1.02] hover:border-white hover:bg-white/60 hover:shadow-2xl backdrop-blur-md">
                      {/* Service Specific Gradient Overlay on Hover */}
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                        aria-hidden="true"
                      />

                      {/* Oversized Background Numeral */}
                      <span
                        className="pointer-events-none absolute -bottom-3 -right-2 font-mono text-8xl md:text-9xl font-extrabold tracking-tighter text-dd-ink/5 select-none transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 group-hover:text-dd-navy/15"
                        aria-hidden="true"
                      >
                        {num}
                      </span>

                      {/* Top Row: Icon Badge & Arrow */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div
                          className={`grid h-13 w-13 place-items-center rounded-2xl border border-white/80 bg-white/60 text-dd-navy shadow-sm backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md ${accent}`}
                        >
                          <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
                        </div>

                        <div className="liquid-glass-btn-primary grid h-10 w-10 place-items-center p-0 transition-all duration-300 group-hover:scale-110">
                          <ArrowUpRight
                            size={16}
                            aria-hidden="true"
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </div>
                      </div>

                      {/* Bottom Content: Title & Description */}
                      <div className="relative z-10 mt-12">
                        <h3 className="text-xl md:text-2xl font-bold tracking-[-0.035em] text-dd-ink transition-transform duration-300 group-hover:translate-x-1">
                          {service.title}
                        </h3>
                        <p className="mt-3 text-sm font-medium leading-relaxed text-dd-gray-600">
                          {service.description}
                        </p>
                      </div>

                      {/* Bottom Connecting Glow Line */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-dd-navy/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </article>
                  </CursorTiltCard>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
