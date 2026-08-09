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

  // Parallax translation per blob
  const blobAY = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const blobBY = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const blobCY = useTransform(scrollYProgress, [0, 1], [0, -280]);

  const blobAX = useTransform(springX, [-1, 1], [-30, 30]);
  const blobBX = useTransform(springX, [-1, 1], [24, -24]);
  const blobCX = useTransform(springY, [-1, 1], [-20, 20]);

  if (reducedMotion) {
    return (
      <motion.div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ opacity: fieldOpacity }}
      >
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(255,217,59,0.55)_0%,transparent_70%)] blur-[115px] opacity-75" />
        <div className="absolute -top-[10%] -left-[10%] h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(17,56,230,0.65)_0%,transparent_70%)] blur-[115px] opacity-80" />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: fieldOpacity }}
    >
      {/* White Base Blob 1 - Top Left */}
      <motion.div
        className="absolute -top-[14%] -left-[10%] h-[52rem] w-[52rem]"
        style={{ x: blobAX, y: blobAY }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(255,255,255,1)_0%,rgba(248,249,251,0.9)_50%,transparent_80%)] blur-[95px] opacity-100"
          animate={{
            x: [0, 50, -40, 0],
            y: [0, -45, 35, 0],
            scale: [1, 1.12, 0.92, 1],
            rotate: [0, 18, -12, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* White Base Blob 2 - Center */}
      <motion.div
        className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 h-[48rem] w-[48rem]"
        style={{ x: blobBX, y: blobBY }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,1)_0%,rgba(250,250,252,0.85)_40%,transparent_80%)] blur-[95px] opacity-100"
          animate={{
            x: [0, -35, 45, 0],
            y: [0, 30, -35, 0],
            scale: [1, 1.14, 0.95, 1],
            rotate: [0, -15, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* White Base Blob 3 - Right Side */}
      <motion.div
        className="absolute top-[18%] -right-[14%] h-[46rem] w-[46rem]"
        style={{ x: blobCX, y: blobCY }}
      >
        <motion.div
          className="h-full w-full rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,1)_0%,rgba(247,248,250,0.9)_45%,transparent_80%)] blur-[90px] opacity-100"
          animate={{
            x: [0, 40, -50, 0],
            y: [0, -40, 25, 0],
            scale: [1, 0.92, 1.1, 1],
            rotate: [0, 22, -16, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
