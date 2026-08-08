"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  Variants,
} from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { HeroParticles } from "@/components/effects/HeroParticles";
import { Button } from "@/components/ui/Button";
import { CursorTiltCard } from "@/components/ui/CursorTiltCard";

const ROTATING_WORDS = ["move.", "scale.", "convert.", "ship."];

const loadWordVariants: Variants = {
  hidden: { y: "100%" },
  visible: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.15 + i * 0.08,
    },
  }),
};

const lastWordRevealVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.46, // 150ms after "to" (0.15 + 2 * 0.08 + 0.15 = 0.46)
    },
  },
};

const wordRotationVariants: Variants = {
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(8px)",
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const letterVariants: Variants = {
  rest: { y: 0 },
  hover: (i: number) => ({
    y: [0, -4, 0],
    transition: {
      duration: 0.35,
      delay: i * 0.03,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "0px 0px -200px 0px" });
  const [wordIndex, setWordIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isRevealed, setIsRevealed] = useState(() => Boolean(reduceMotion));

  // Parallax spring values (max 6px opposite mouse movement)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20 };
  const headlineX = useSpring(rawMouseX, springConfig);
  const headlineY = useSpring(rawMouseY, springConfig);

  // Parallax mouse move handler
  useEffect(() => {
    if (reduceMotion || !isInView) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;
      rawMouseX.set(-normX * 6);
      rawMouseY.set(-normY * 6);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reduceMotion, isInView, rawMouseX, rawMouseY]);

  // Load reveal trigger timer
  useEffect(() => {
    if (reduceMotion) return;

    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 460);

    return () => clearTimeout(timer);
  }, [reduceMotion]);

  // Word rotator interval (cycles every 2.5s once load reveal finishes)
  useEffect(() => {
    if (reduceMotion || !isRevealed) return;

    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [reduceMotion, isRevealed]);

  const currentWord = ROTATING_WORDS[wordIndex];

  return (
    <section ref={sectionRef} id="home" className="relative min-h-[100dvh] pt-[72px]">
      {/* Interactive Particle Canvas */}
      <HeroParticles />

      <div className="page-container relative flex min-h-[calc(100dvh-72px)] flex-col items-center justify-center py-12 text-center">
        <CursorTiltCard
          maxTilt={5}
          magnetic={true}
          glare={true}
          className="rounded-[36px] p-6 md:p-12 z-10"
        >
          <div className="flex flex-col items-center">
            {/* Top Studio Label */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="mb-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] text-dd-gray-600"
            >
              <span className="h-px w-9 bg-dd-navy" aria-hidden="true" />
              Independent digital studio
              <span className="h-px w-9 bg-dd-navy" aria-hidden="true" />
            </motion.p>

            {/* Kinetic Text Reveal Headline with Parallax & Word Rotator */}
            <motion.h1
              style={reduceMotion ? {} : { x: headlineX, y: headlineY }}
              initial={reduceMotion ? { opacity: 0 } : "hidden"}
              animate={reduceMotion ? { opacity: 1 } : "visible"}
              transition={reduceMotion ? { duration: 0.7 } : undefined}
              className="max-w-[920px] text-balance text-[clamp(2.6rem,8vw,7.2rem)] font-extrabold leading-[0.92] tracking-[-0.075em] text-dd-ink"
            >
              {/* Line 1: Ideas built */}
              <span className="inline-block overflow-hidden py-1">
                <motion.span
                  custom={0}
                  variants={reduceMotion ? undefined : loadWordVariants}
                  className="inline-block"
                >
                  Ideas
                </motion.span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1">
                <motion.span
                  custom={1}
                  variants={reduceMotion ? undefined : loadWordVariants}
                  className="inline-block"
                >
                  built
                </motion.span>
              </span>
              <br />
              {/* Line 2: to [Rotating Word] */}
              <span className="inline-block overflow-hidden py-1">
                <motion.span
                  custom={2}
                  variants={reduceMotion ? undefined : loadWordVariants}
                  className="inline-block"
                >
                  to
                </motion.span>
              </span>{" "}
              <span className="inline-block overflow-hidden py-1 align-bottom">
                <motion.span
                  variants={reduceMotion ? undefined : lastWordRevealVariants}
                  className="inline-block"
                >
                  {/* Fixed-width layout wrapper to prevent Cumulative Layout Shift (CLS) */}
                  <span
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => {
                      setIsHovered(true);
                      setTimeout(() => setIsHovered(false), 600);
                    }}
                    className="relative inline-flex items-center justify-start min-w-[5.2ch] md:min-w-[5.2ch] text-left cursor-pointer"
                  >
                    {reduceMotion ? (
                      <span className="bg-dd-gradient bg-clip-text text-transparent">
                        move.
                      </span>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentWord}
                          variants={wordRotationVariants}
                          initial="initial"
                          animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            backgroundPosition: ["0% 50%", "200% 50%"],
                          }}
                          exit="exit"
                          className="inline-block bg-clip-text text-transparent"
                          style={{
                            backgroundImage:
                              "linear-gradient(90deg, #1235A0 0%, #10D9AB 25%, #FEBD02 50%, #FF4101 75%, #1235A0 100%)",
                            backgroundSize: "200% auto",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                          transition={{
                            opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
                            y: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
                            filter: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
                            backgroundPosition: {
                              duration: isHovered ? 3 : 6,
                              repeat: Infinity,
                              ease: "linear",
                            },
                          }}
                        >
                          {currentWord.split("").map((char, index) => (
                            <motion.span
                              key={`${currentWord}-${index}`}
                              custom={index}
                              variants={letterVariants}
                              animate={isHovered ? "hover" : "rest"}
                              className="inline-block"
                            >
                              {char}
                            </motion.span>
                          ))}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </span>
                </motion.span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="mt-8 max-w-[620px] text-balance text-base font-medium leading-relaxed text-dd-gray-600 md:text-xl"
            >
              Strategy, design, and technology for ambitious brands ready to turn attention into momentum.
            </motion.p>

            {/* Magnetic Sweep CTAs */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center"
            >
              <Button href="#contact" vhsEffect magnetic={true}>
                Start a Project{" "}
                <ArrowUpRight
                  className="ml-2 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  size={17}
                  aria-hidden="true"
                />
              </Button>
              <Button href="#portfolio" variant="outline" vhsEffect magnetic={true}>
                View Work
              </Button>
            </motion.div>
          </div>
        </CursorTiltCard>
      </div>

      {/* Animated Scroll-Cue Indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll down to About section"
        className="group absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 text-dd-gray-600 transition-colors hover:text-dd-navy"
        initial={reduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-dd-gray-600 group-hover:text-dd-navy">
          Scroll
        </span>
        <div className="h-8 w-0.5 overflow-hidden rounded-full bg-dd-navy/20">
          <motion.div
            className="h-full w-full rounded-full bg-dd-navy"
            animate={reduceMotion ? {} : { y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <ChevronDown size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" />
      </motion.a>
    </section>
  );
}
