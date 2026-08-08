"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { SectionOrb } from "@/components/effects/SectionOrb";
import { Button } from "@/components/ui/Button";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/lib/constants";

type Project = (typeof projects)[number];

const projectDetails: Record<
  string,
  {
    client: string;
    timeline: string;
    challenge: string;
    solution: string;
    impact: string;
  }
> = {
  "Northline Studio": {
    client: "Northline Fashion Co.",
    timeline: "8 Weeks",
    challenge:
      "Struggled with an outdated, fragmented brand identity that failed to communicate sustainable circular craftsmanship.",
    solution:
      "Created a modern, high-contrast visual identity and modular digital design system built for multi-channel storytelling.",
    impact: "140% boost in online engagement and 42% lift in direct-to-consumer sales.",
  },
  "Daymark Coffee": {
    client: "Daymark Roasters",
    timeline: "6 Weeks",
    challenge:
      "Needed a distinctive product packaging system and digital launch campaign for premium single-origin roasts.",
    solution:
      "Designed vibrant tactile packaging and an interactive ecommerce experience focused on morning rituals.",
    impact: "Sold out initial 5,000-unit batch within 12 days of launch.",
  },
  "Relay Health": {
    client: "Relay Health Inc.",
    timeline: "12 Weeks",
    challenge:
      "Complex clinical workflows and confusing user navigation were hindering patient care team adoption.",
    solution:
      "Rebuilt the digital design system and UI/UX flows from the ground up prioritizing speed, clarity, and accessibility.",
    impact: "Reduced task completion times by 35% across 12 medical centers.",
  },
  "Fieldwork Homes": {
    client: "Fieldwork Properties",
    timeline: "10 Weeks",
    challenge:
      "High search competition and low organic organic qualified lead conversions for architectural home buyers.",
    solution:
      "Built a technical SEO architecture and editorial content engine highlighting modern concrete architecture.",
    impact: "3.2x organic search growth and 65% increase in qualified consultation requests.",
  },
};

export function Portfolio() {
  const reduceMotion = useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="portfolio" className="relative bg-transparent">
      <SectionOrb className="top-36 right-2 md:right-4 h-48 w-48 md:h-64 md:w-64" />

      <div className="page-container section-space">
        <ScrollReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <h2 className="mt-7 max-w-[760px] text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] text-dd-ink md:text-7xl">
                Different problems.<br />Distinct answers.
              </h2>
            </div>
            <p className="max-w-[460px] text-base font-medium leading-relaxed text-dd-gray-600 md:text-lg">
              Brand systems, campaigns, and digital experiences engineered to turn attention into momentum.
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile Horizontal Scroll-Snap Gallery (sm:hidden) */}
        <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 sm:hidden scrollbar-none">
          {projects.map((project) => (
            <div
              key={project.title}
              className="w-[85vw] shrink-0 snap-center"
              onClick={() => setSelectedProject(project)}
            >
              <CursorTiltCard
                maxTilt={4}
                magnetic={false}
                glare={true}
                dataCursor="view"
                dataCursorText="VIEW"
                className="rounded-[24px]"
              >
                <article className="group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/80 bg-white/25 p-2 shadow-lg backdrop-blur-xl">
                    <div className="relative h-full w-full overflow-hidden rounded-[18px]">
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        sizes="85vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="mt-4 border-t border-dd-gray-300 pt-4">
                    <p className="text-xs font-bold text-dd-navy">{project.category}</p>
                    <h3 className="mt-1 text-xl font-bold tracking-[-0.04em] text-dd-ink">
                      {project.title}
                    </h3>
                  </div>
                </article>
              </CursorTiltCard>
            </div>
          ))}
        </div>

        {/* Desktop Alternating Rhythm Grid (hidden sm:grid) */}
        <div className="mt-16 hidden gap-x-7 gap-y-16 sm:grid sm:grid-cols-12">
          {projects.map((project, index) => {
            const isWide = index % 4 === 0 || index % 4 === 3;
            const colSpan = isWide ? "sm:col-span-7" : "sm:col-span-5";
            const aspect = isWide ? "aspect-[16/11]" : "aspect-[4/5]";

            return (
              <ScrollReveal key={project.title} delay={(index % 2) * 0.08} className={colSpan}>
                <article className="group cursor-pointer" onClick={() => setSelectedProject(project)}>
                  <CursorTiltCard
                    maxTilt={6}
                    magnetic={true}
                    glare={true}
                    dataCursor="view"
                    dataCursorText="VIEW PROJECT"
                    className="rounded-[28px]"
                  >
                    <div
                      className={`relative overflow-hidden rounded-[28px] border border-white/80 bg-white/30 p-2.5 shadow-lg backdrop-blur-xl transition-all duration-500 hover:shadow-2xl ${aspect}`}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                        {/* Hover Category Pill Badge */}
                        <div className="pointer-events-none absolute top-4 left-4 z-20 translate-y-2 rounded-full border border-white/90 bg-white/75 px-4 py-1.5 text-xs font-bold text-dd-ink opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          {project.category}
                        </div>

                        {/* Image Hover Zoom & Reveal */}
                        <Image
                          src={project.image}
                          alt={project.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, 55vw"
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-106"
                        />

                        {/* Soft Gradient Overlay on Hover */}
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </CursorTiltCard>

                  {/* Caption & Arrow */}
                  <div className="mt-5 grid grid-cols-[1fr_auto] gap-5 border-t border-dd-gray-300 pt-5">
                    <div>
                      <p className="text-xs font-bold text-dd-navy uppercase tracking-wider">
                        {project.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-dd-ink transition-transform duration-300 group-hover:translate-x-1">
                        {project.title}
                      </h3>
                      <p className="mt-2 max-w-[48ch] text-sm font-medium leading-relaxed text-dd-gray-600">
                        {project.description}
                      </p>
                    </div>
                    <div className="liquid-glass-btn-primary grid h-11 w-11 place-items-center p-0 transition-transform duration-300 group-hover:scale-110">
                      <ArrowUpRight
                        className="text-dd-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        size={18}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Case Study Shared-Element Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-dd-ink/65 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={reduceMotion ? { opacity: 0, scale: 0.95 } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[32px] border border-white/90 bg-white/90 p-6 shadow-2xl backdrop-blur-xl md:p-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-dd-gray-300 bg-white/80 text-dd-ink transition-all hover:bg-dd-ink hover:text-white"
              >
                <X size={20} />
              </button>

              {/* Modal Image Header */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[24px]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.alt}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Modal Overview */}
              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-dd-navy/10 px-4 py-1 text-xs font-bold text-dd-navy uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs font-semibold text-dd-gray-600">
                    Timeline: {projectDetails[selectedProject.title]?.timeline || "6 Weeks"}
                  </span>
                </div>

                <h3 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-dd-ink md:text-4xl">
                  {selectedProject.title}
                </h3>
                <p className="mt-2 text-lg font-medium text-dd-gray-600">
                  {selectedProject.description}
                </p>

                {/* Challenge / Solution / Impact Cards */}
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-dd-gray-300/60 bg-white/60 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-dd-navy">
                      Challenge
                    </p>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-dd-gray-600">
                      {projectDetails[selectedProject.title]?.challenge}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-dd-gray-300/60 bg-white/60 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-dd-navy">
                      Solution
                    </p>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-dd-gray-600">
                      {projectDetails[selectedProject.title]?.solution}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-dd-gray-300/60 bg-white/60 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-dd-navy">
                      Outcome
                    </p>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-dd-gray-600">
                      {projectDetails[selectedProject.title]?.impact}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-dd-gray-300 pt-6">
                  <p className="text-xs font-semibold text-dd-gray-600">
                    Client: {projectDetails[selectedProject.title]?.client}
                  </p>
                  <Button
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    vhsEffect
                  >
                    Start a Project Like This <ArrowUpRight className="ml-2" size={16} />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
