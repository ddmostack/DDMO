import { SectionOrb } from "@/components/effects/SectionOrb";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { differentiators } from "@/lib/constants";

export function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-transparent">
      <SectionOrb className="top-16 left-2 md:left-4 h-40 w-40 md:h-56 md:w-56" />
      <div className="page-container section-space">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="text-balance text-5xl font-extrabold leading-[0.94] tracking-[-0.06em] text-dd-ink md:text-6xl">
                Why teams keep us close.
              </h2>
              <p className="mt-6 max-w-[430px] text-base font-medium leading-relaxed text-dd-gray-600">
                Senior thinking, clear communication, and one connected process from first idea to measurable result.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {differentiators.map((item, index) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={(index % 2) * 0.06}>
                  <article className="liquid-glass-card min-h-[260px] p-7 md:p-9">
                    <div className="flex items-center justify-between">
                      <Icon className="text-dd-navy" size={26} strokeWidth={1.7} aria-hidden="true" />
                      <span className="text-xs font-bold text-dd-gray-600">0{index + 1}</span>
                    </div>
                    <h3 className="mt-14 text-xl font-bold tracking-[-0.035em] text-dd-ink md:text-2xl">{item.title}</h3>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-dd-gray-600 md:text-base">{item.description}</p>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
