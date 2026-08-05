import { ArrowUpRight } from "lucide-react";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { services } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="bg-dd-offwhite">
      <div className="page-container section-space">
        <ScrollReveal>
          <h2 className="max-w-[760px] text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] text-dd-ink md:text-7xl">
            Built for the whole journey.
          </h2>
          <p className="mt-6 max-w-[580px] text-base font-medium leading-relaxed text-dd-gray-600 md:text-lg">
            Focused capabilities that connect brand clarity with practical, measurable execution.
          </p>
        </ScrollReveal>

        <div className="mt-16 border-t border-dd-ink">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={service.title} delay={(index % 3) * 0.04}>
                <article className="group grid gap-5 border-b border-dd-gray-300 py-7 transition-colors hover:bg-dd-gray-100 md:grid-cols-[72px_0.75fr_1.25fr_auto] md:items-center md:px-5">
                  <span className="text-xs font-bold text-dd-gray-600">0{index + 1}</span>
                  <div className="flex items-center gap-4">
                    <Icon className="shrink-0 text-dd-navy" size={24} strokeWidth={1.7} aria-hidden="true" />
                    <h3 className="text-xl font-bold tracking-[-0.035em] text-dd-ink md:text-2xl">{service.title}</h3>
                  </div>
                  <p className="max-w-[560px] text-sm font-medium leading-relaxed text-dd-gray-600 md:text-base">
                    {service.description}
                  </p>
                  <a
                    href="#contact"
                    aria-label={`Start a project for ${service.title}`}
                    className="grid h-11 w-11 place-items-center rounded-md border border-dd-gray-300 text-dd-ink transition-[background-color,color,border-color,transform] group-hover:-translate-y-0.5 group-hover:border-dd-navy group-hover:bg-dd-navy group-hover:text-white"
                  >
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </a>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
