"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 120, damping: 14 });
  const springTiltY = useSpring(tiltY, { stiffness: 120, damping: 14 });
  const rotateX = useTransform(springTiltY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springTiltX, [-0.5, 0.5], [-6, 6]);

  function handleImagePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    tiltX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    tiltY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handleImagePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden pt-[72px]">
      {/* Soft legibility wash — lets the animated gradient mesh show through
          while keeping headline/body text easy to read on top of it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-dd-offwhite/55 via-dd-offwhite/15 to-dd-offwhite/70"
      />

      <div className="page-container relative grid min-h-[calc(100dvh-72px)] items-center gap-10 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-dd-gray-600">
            <span className="h-px w-9 bg-dd-navy" aria-hidden="true" />
            Independent digital studio
          </p>
          <h1 className="max-w-[760px] text-balance text-[clamp(3.6rem,7.6vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.075em] text-dd-ink">
            Ideas built<br />
            <span className="text-gradient">to move.</span>
          </h1>
          <p className="mt-8 max-w-[510px] text-base font-medium leading-relaxed text-dd-gray-600 md:text-lg">
            Strategy, design, and technology for ambitious brands ready to turn attention into momentum.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" vhsEffect>
              Start a Project <ArrowUpRight className="ml-2" size={17} aria-hidden="true" />
            </Button>
            <Button href="#portfolio" variant="outline" vhsEffect>View Work</Button>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[560px] lg:mr-0"
          style={{ perspective: 1000 }}
          initial={reduceMotion ? false : { opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
          onPointerMove={handleImagePointerMove}
          onPointerLeave={handleImagePointerLeave}
        >
          <div className="absolute -left-5 -top-5 h-full w-full border border-dd-gray-300" aria-hidden="true" />
          <motion.div
            className="relative aspect-[4/5] overflow-hidden bg-dd-gray-100"
            style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <Image
              src="/images/work/northline.png"
              alt="Cobalt fabric draped over a steel clothing rail"
              fill
              priority
              loading="eager"
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-dd-gradient px-5 py-4 text-sm font-bold text-white">
              Strategy / Design / Build
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
