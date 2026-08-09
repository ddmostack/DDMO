"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function GradientField() {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "200px 0px" });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const fadeStart = useMotionValue(1400);
  const fadeEnd = useMotionValue(1800);
  const { scrollY, scrollYProgress } = useScroll();

  const fieldOpacity = useTransform(
    [scrollY, fadeStart, fadeEnd],
    (latest) => {
      const [scroll, start, end] = latest as number[];
      if (scroll <= start) return 1;
      if (scroll >= end) return 0;
      return 1 - (scroll - start) / Math.max(1, end - start);
    }
  );

  useEffect(() => {
    const measure = () => {
      const height = window.innerHeight;
      const services = document.getElementById("services");
      const servicesTop = services?.offsetTop ?? height * 2.2;

      fadeStart.set(Math.max(height, servicesTop - height * 1.1));
      fadeEnd.set(Math.max(height + 1, servicesTop - height * 0.4));
    };

    measure();
    window.addEventListener("resize", measure);

    if (reducedMotion || !isInView) return;

    function handlePointerMove(event: PointerEvent) {
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 2);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [reducedMotion, isInView, mouseX, mouseY, fadeStart, fadeEnd]);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const blobAY = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const blobBY = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const blobAX = useTransform(springX, [-1, 1], [-25, 25]);
  const blobBX = useTransform(springY, [-1, 1], [-20, 20]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: fieldOpacity }}
    >
      {/* Sky Blue Luminous Gradient Base (Matches user image sky-blue tones) */}
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#2563eb_0%,#3b82f6_35%,#60a5fa_60%,#93c5fd_82%,#eff6ff_100%)]" />

      {/* Ambient Radial Light Core */}
      <motion.div
        className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[55rem] w-[55rem]"
        style={{ x: blobAX, y: blobAY }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.45)_0%,rgba(147,197,253,0.35)_40%,transparent_70%)] blur-[80px]"
          animate={
            reducedMotion
              ? {}
              : {
                  scale: [1, 1.1, 0.95, 1],
                  opacity: [0.85, 1, 0.85],
                }
          }
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Top Left Deep Blue Accent */}
      <motion.div
        className="absolute -top-[15%] -left-[10%] h-[50rem] w-[50rem]"
        style={{ x: blobBX, y: blobBY }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(29,78,216,0.5)_0%,rgba(59,130,246,0.25)_50%,transparent_75%)] blur-[90px]"
          animate={
            reducedMotion
              ? {}
              : {
                  x: [0, 40, -30, 0],
                  y: [0, -30, 25, 0],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Center Precision Grid Pattern with Circular Vignette Mask (Matches user image center grid overlay) */}
      <div 
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          backgroundPosition: "center center",
          WebkitMaskImage: "radial-gradient(ellipse 55% 55% at 50% 44%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.5) 55%, transparent 75%)",
          maskImage: "radial-gradient(ellipse 55% 55% at 50% 44%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.5) 55%, transparent 75%)",
        }}
      />
    </motion.div>
  );
}
