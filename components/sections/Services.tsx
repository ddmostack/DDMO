import { ArrowUpRight } from "lucide-react";

import { SectionOrb } from "@/components/effects/SectionOrb";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { services } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-transparent">
      <SectionOrb className="top-24 left-2 md:left-4 h-40 w-40 md:h-56 md:w-56" />
      <div className="page-container section-space">
        <ScrollReveal>
          <h2 className="max-w-[760px] text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] text-dd-ink md:text-7xl">
            Built for the whole journey.
          </h2>
          <p className="mt-6 max-w-[580px] text-base font-medium leading-relaxed text-dd-gray-600 md:text-lg">
            Focused capabilities that connect brand clarity with practical, measurable execution.
          </p>
        </ScrollReveal>

        <div className="mt-16 border-t border-dd-gray-300/40">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={(index % 3) * 0.04}>
                <CursorTiltCard
                  maxTilt={4}
                  magnetic={true}
                  glare={true}
                  className="my-2 rounded-2xl"
                >
                  <article className="group grid gap-5 border-b border-dd-gray-300/70 p-6 transition-all duration-300 hover:border-white/80 hover:bg-white/45 hover:shadow-lg hover:backdrop-blur-md md:grid-cols-[72px_0.75fr_1.25fr_auto] md:items-center">
                    <span className="text-xs font-bold text-dd-gray-600">0{index + 1}</span>
                    <div className="flex items-center gap-4">
                      <Icon className="shrink-0 text-dd-navy transition-transform duration-300 group-hover:scale-110" size={24} strokeWidth={1.7} aria-hidden="true" />
                      <h3 className="text-xl font-bold tracking-[-0.035em] text-dd-ink md:text-2xl">{service.title}</h3>
                    </div>
                    <p className="max-w-[560px] text-sm font-medium leading-relaxed text-dd-gray-600 md:text-base">
                      {service.description}
                    </p>
                    <a
                      href="#contact"
                      aria-label={`Start a project for ${service.title}`}
                      className="liquid-glass-btn-primary grid h-11 w-11 place-items-center p-0"
                    >
                      <ArrowUpRight size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </article>
                </CursorTiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

