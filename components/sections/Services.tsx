"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { services } from "@/lib/constants";

// 6 Cards strictly mapped to the 4-brand-color scale (Blue, Teal, Yellow, Red, Blue-Teal, Yellow-Red)
const serviceStyles = [
  {
    gradient: "from-dd-blue-600/20 via-dd-blue-700/10 to-transparent",
    iconAccent: "group-hover:border-dd-blue-600/40 group-hover:text-dd-blue-600",
    hoverGlow: "hover:shadow-glow-blue",
    lineGlow: "via-dd-blue-600/60",
    badgeColor: "group-hover:text-dd-blue-600/20",
  },
  {
    gradient: "from-dd-teal-600/20 via-dd-teal-700/10 to-transparent",
    iconAccent: "group-hover:border-dd-teal-600/40 group-hover:text-dd-teal-600",
    hoverGlow: "hover:shadow-glow-teal",
    lineGlow: "via-dd-teal-600/60",
    badgeColor: "group-hover:text-dd-teal-600/20",
  },
  {
    gradient: "from-dd-yellow-600/22 via-dd-yellow-700/12 to-transparent",
    iconAccent: "group-hover:border-dd-yellow-700/40 group-hover:text-dd-yellow-700",
    hoverGlow: "hover:shadow-glow-yellow",
    lineGlow: "via-dd-yellow-600/60",
    badgeColor: "group-hover:text-dd-yellow-700/20",
  },
  {
    gradient: "from-dd-red-600/20 via-dd-red-700/10 to-transparent",
    iconAccent: "group-hover:border-dd-red-600/40 group-hover:text-dd-red-600",
    hoverGlow: "hover:shadow-glow-red",
    lineGlow: "via-dd-red-600/60",
    badgeColor: "group-hover:text-dd-red-600/20",
  },
  {
    gradient: "from-dd-blue-600/20 via-dd-teal-600/15 to-transparent",
    iconAccent: "group-hover:border-dd-teal-600/40 group-hover:text-dd-blue-600",
    hoverGlow: "hover:shadow-glow-blue",
    lineGlow: "via-dd-blue-600/60",
    badgeColor: "group-hover:text-dd-blue-600/20",
  },
  {
    gradient: "from-dd-yellow-600/20 via-dd-red-600/15 to-transparent",
    iconAccent: "group-hover:border-dd-red-600/40 group-hover:text-dd-red-600",
    hoverGlow: "hover:shadow-glow-red",
    lineGlow: "via-dd-red-600/60",
    badgeColor: "group-hover:text-dd-red-600/20",
  },
];

export function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative bg-transparent">

      <div className="page-container section-space relative z-10">
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

        {/* Connecting System Network Badge */}
        <div className="relative mt-12 flex items-center justify-center py-2" aria-hidden="true">
          <span className="text-[10px] font-bold uppercase tracking-widest text-dd-navy/70">
            System Network • 01 — 06
          </span>
        </div>

        {/* 6-Item Interactive Services Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {services.map((service, index) => {
            const Icon = service.icon;
            const style = serviceStyles[index % serviceStyles.length];
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
                    <article
                      className={`liquid-glass-card relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/70 bg-white/35 p-7 md:p-8 transition-all duration-300 hover:scale-[1.02] hover:border-white hover:bg-white/65 ${style.hoverGlow} backdrop-blur-md`}
                    >
                      {/* Service Specific Animated Gradient Overlay on Hover */}
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${style.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                        aria-hidden="true"
                      />

                      {/* Oversized Background Numeral */}
                      <span
                        className={`pointer-events-none absolute -bottom-3 -right-2 font-mono text-8xl md:text-9xl font-extrabold tracking-tighter text-dd-ink/5 select-none transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-105 ${style.badgeColor}`}
                        aria-hidden="true"
                      >
                        {num}
                      </span>

                      {/* Top Row: Icon Badge & Arrow */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div
                          className={`grid h-13 w-13 place-items-center rounded-2xl border border-white/80 bg-white/60 text-dd-navy shadow-sm backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md ${style.iconAccent}`}
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
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${style.lineGlow} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
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
