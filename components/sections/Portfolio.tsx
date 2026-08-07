import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { SectionOrb } from "@/components/effects/SectionOrb";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/lib/constants";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative overflow-hidden bg-transparent">
      <SectionOrb className="top-36 right-2 md:right-4 h-48 w-48 md:h-64 md:w-64" />
      <div className="page-container section-space border-t border-dd-gray-300/40">
        <ScrollReveal>
          <SectionLabel>Selected Work</SectionLabel>
          <h2 className="mt-7 max-w-[760px] text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] text-dd-ink md:text-7xl">
            Different problems.<br />Distinct answers.
          </h2>
          <p className="mt-6 max-w-[560px] text-base font-medium leading-relaxed text-dd-gray-600 md:text-lg">
            Brand systems, campaigns, and digital experiences designed to create practical momentum.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-x-7 gap-y-14 md:grid-cols-12">
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.title}
              delay={(index % 2) * 0.06}
              className={index % 4 === 0 || index % 4 === 3 ? "md:col-span-7" : "md:col-span-5"}
            >
              <article className="group">
                <a href="#contact" className="block" aria-label={`Discuss a project like ${project.title}`}>
                  <CursorTiltCard
                    maxTilt={7}
                    magnetic={true}
                    glare={true}
                    dataCursor="view"
                    dataCursorText="VIEW PROJECT"
                    className="rounded-[28px]"
                  >
                    <div className={`relative overflow-hidden rounded-[28px] border border-white/80 bg-white/25 p-2.5 shadow-lg backdrop-blur-xl ${index % 2 === 0 ? "aspect-[4/3]" : "aspect-[5/6]"}`}>
                      <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                        <Image
                          src={project.image}
                          alt={project.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 58vw"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                        />
                      </div>
                    </div>
                  </CursorTiltCard>
                  <div className="mt-5 grid grid-cols-[1fr_auto] gap-5 border-t border-dd-gray-300 pt-5">
                    <div>
                      <p className="text-xs font-bold text-dd-navy">{project.category}</p>
                      <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-dd-ink">{project.title}</h3>
                      <p className="mt-2 max-w-[48ch] text-sm font-medium leading-relaxed text-dd-gray-600">{project.description}</p>
                    </div>
                    <ArrowUpRight className="text-dd-ink transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={22} aria-hidden="true" />
                  </div>
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

