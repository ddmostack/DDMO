import { SectionOrb } from "@/components/effects/SectionOrb";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats, values } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-transparent">
      <SectionOrb className="top-10 right-2 md:right-4 h-44 w-44 md:h-60 md:w-60" />
      <div className="page-container section-space">
        <div className="grid gap-12 border-t border-dd-gray-300/40 pt-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <ScrollReveal>
            <p className="text-sm font-bold text-dd-navy">About Doodle Dynamo</p>
            <h2 className="mt-5 text-balance text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] text-dd-ink md:text-6xl">
              Small team.<br />Wide-angle thinking.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <p className="max-w-[650px] text-xl font-medium leading-relaxed tracking-[-0.02em] text-dd-ink md:text-2xl">
              We connect strategy, creative work, and engineering so every part of a brand moves in the same direction.
            </p>
            <p className="mt-6 max-w-[620px] text-base font-medium leading-relaxed text-dd-gray-600">
              That means fewer handoffs, sharper decisions, and digital work built around clear business goals.
            </p>

            <div className="mt-12 grid gap-x-10 sm:grid-cols-2">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <article
                    key={value.title}
                    className={`flex gap-4 border-t border-dd-gray-300 py-6 ${index === values.length - 1 ? "sm:col-span-2" : ""}`}
                  >
                    <Icon className="mt-1 shrink-0 text-dd-navy" size={20} strokeWidth={1.8} aria-hidden="true" />
                    <div>
                      <h3 className="font-bold tracking-[-0.02em] text-dd-ink">{value.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-relaxed text-dd-gray-600">{value.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-16">
          <div className="grid grid-cols-2 gap-3 overflow-hidden rounded-[28px] border border-white/80 bg-white/25 p-3 shadow-lg backdrop-blur-xl lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="liquid-glass-card rounded-[20px] bg-white/40 px-5 py-8 transition-all duration-300 hover:bg-white/70 md:px-7">
                <StatCounter {...stat} />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
