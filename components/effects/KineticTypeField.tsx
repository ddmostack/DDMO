"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

import { GradientField } from "@/components/effects/GradientField";
import { GradientShimmer } from "@/components/ui/gradient-shimmer";

import type { MotionStyle, MotionValue } from "framer-motion";

const BLUE = "#1138e6";
const YELLOW = "#ffd93b";
const FIELD_HEIGHT = 1.85;

type WordPlacement = {
  id: string;
  label: string;
  left: number;
  top: number;
  mobileLeft: number;
  mobileTop: number;
  size: number;
  mobileSize: number;
  rotation: number;
  driftX: number;
  driftY: number;
  duration: number;
  idleOpacity: number;
  activeOpacity: number;
  accent: typeof BLUE | typeof YELLOW;
  mobile: boolean;
  parallaxFactor: number;
};

const WORDS: WordPlacement[] = [
  // Top Hero Region (Visible immediately around hero card)
  { id: "momentum-a", label: "MOMENTUM", left: 3, top: 8, mobileLeft: 2, mobileTop: 8, size: 72, mobileSize: 42, rotation: -8, driftX: 16, driftY: 12, duration: 23, idleOpacity: 0.55, activeOpacity: 0.95, accent: YELLOW, mobile: true, parallaxFactor: 0.025 },
  { id: "clarity-a", label: "CLARITY", left: 72, top: 7, mobileLeft: 60, mobileTop: 6, size: 66, mobileSize: 40, rotation: 7, driftX: -13, driftY: 16, duration: 27, idleOpacity: 0.52, activeOpacity: 0.92, accent: BLUE, mobile: true, parallaxFactor: 0.04 },
  { id: "velocity-a", label: "VELOCITY", left: 5, top: 25, mobileLeft: 4, mobileTop: 24, size: 58, mobileSize: 36, rotation: -5, driftX: -15, driftY: -10, duration: 25, idleOpacity: 0.48, activeOpacity: 0.90, accent: YELLOW, mobile: true, parallaxFactor: 0.035 },
  { id: "precision-a", label: "PRECISION", left: 70, top: 26, mobileLeft: 56, mobileTop: 28, size: 68, mobileSize: 42, rotation: 9, driftX: 18, driftY: 14, duration: 22, idleOpacity: 0.50, activeOpacity: 0.92, accent: BLUE, mobile: true, parallaxFactor: 0.03 },

  // Mid Hero & About Region
  { id: "craft-a", label: "CRAFT", left: 4, top: 40, mobileLeft: 3, mobileTop: 40, size: 64, mobileSize: 48, rotation: 11, driftX: 12, driftY: -15, duration: 19, idleOpacity: 0.52, activeOpacity: 0.95, accent: YELLOW, mobile: true, parallaxFactor: 0.03 },
  { id: "strategy-a", label: "STRATEGY", left: 68, top: 42, mobileLeft: 54, mobileTop: 46, size: 76, mobileSize: 44, rotation: -6, driftX: -18, driftY: 11, duration: 29, idleOpacity: 0.50, activeOpacity: 0.92, accent: YELLOW, mobile: true, parallaxFactor: 0.05 },
  { id: "vision-a", label: "VISION", left: 6, top: 54, mobileLeft: 4, mobileTop: 56, size: 62, mobileSize: 38, rotation: 8, driftX: 14, driftY: -12, duration: 24, idleOpacity: 0.48, activeOpacity: 0.90, accent: BLUE, mobile: true, parallaxFactor: 0.025 },
  { id: "ideas-a", label: "IDEAS", left: 72, top: 56, mobileLeft: 58, mobileTop: 64, size: 60, mobileSize: 46, rotation: -13, driftX: 14, driftY: 18, duration: 21, idleOpacity: 0.50, activeOpacity: 0.95, accent: YELLOW, mobile: true, parallaxFactor: 0.02 },

  // Lower About Region
  { id: "impact-a", label: "IMPACT", left: 70, top: 68, mobileLeft: 56, mobileTop: 74, size: 84, mobileSize: 50, rotation: 9, driftX: -16, driftY: -12, duration: 25, idleOpacity: 0.48, activeOpacity: 0.90, accent: BLUE, mobile: true, parallaxFactor: 0.045 },
  { id: "innovation-a", label: "INNOVATION", left: 4, top: 72, mobileLeft: 3, mobileTop: 82, size: 70, mobileSize: 40, rotation: -7, driftX: 20, driftY: 15, duration: 30, idleOpacity: 0.46, activeOpacity: 0.90, accent: YELLOW, mobile: true, parallaxFactor: 0.035 },
  { id: "partnership-a", label: "PARTNERSHIP", left: 5, top: 84, mobileLeft: 0, mobileTop: 0, size: 80, mobileSize: 42, rotation: 5, driftX: 19, driftY: -14, duration: 30, idleOpacity: 0.48, activeOpacity: 0.92, accent: YELLOW, mobile: false, parallaxFactor: 0.035 },
  { id: "openness-a", label: "OPENNESS", left: 66, top: 86, mobileLeft: 0, mobileTop: 0, size: 66, mobileSize: 40, rotation: -10, driftX: -12, driftY: 17, duration: 24, idleOpacity: 0.46, activeOpacity: 0.95, accent: YELLOW, mobile: false, parallaxFactor: 0.02 },

  // Section 3 & Beyond
  { id: "built-to-move-a", label: "BUILT TO MOVE", left: 8, top: 94, mobileLeft: 0, mobileTop: 0, size: 108, mobileSize: 44, rotation: -4, driftX: 15, driftY: 10, duration: 28, idleOpacity: 0.45, activeOpacity: 0.88, accent: YELLOW, mobile: false, parallaxFactor: 0.04 },
  { id: "agility-a", label: "AGILITY", left: 72, top: 98, mobileLeft: 0, mobileTop: 0, size: 62, mobileSize: 38, rotation: 10, driftX: -14, driftY: -11, duration: 22, idleOpacity: 0.44, activeOpacity: 0.88, accent: BLUE, mobile: false, parallaxFactor: 0.03 },
  { id: "momentum-b", label: "MOMENTUM", left: 64, top: 108, mobileLeft: 0, mobileTop: 0, size: 76, mobileSize: 42, rotation: 12, driftX: -20, driftY: -16, duration: 26, idleOpacity: 0.46, activeOpacity: 0.92, accent: BLUE, mobile: false, parallaxFactor: 0.03 },
  { id: "identity-a", label: "IDENTITY", left: 16, top: 116, mobileLeft: 0, mobileTop: 0, size: 68, mobileSize: 40, rotation: -8, driftX: 16, driftY: 12, duration: 27, idleOpacity: 0.44, activeOpacity: 0.90, accent: YELLOW, mobile: false, parallaxFactor: 0.025 },
  { id: "clarity-b", label: "CLARITY", left: 4, top: 124, mobileLeft: 0, mobileTop: 0, size: 92, mobileSize: 40, rotation: -7, driftX: 18, driftY: 13, duration: 22, idleOpacity: 0.48, activeOpacity: 0.90, accent: YELLOW, mobile: false, parallaxFactor: 0.05 },
  { id: "transformation-a", label: "TRANSFORMATION", left: 42, top: 130, mobileLeft: 0, mobileTop: 0, size: 78, mobileSize: 42, rotation: 6, driftX: -18, driftY: -14, duration: 32, idleOpacity: 0.42, activeOpacity: 0.88, accent: BLUE, mobile: false, parallaxFactor: 0.04 },
  { id: "ideas-b", label: "IDEAS", left: 74, top: 137, mobileLeft: 0, mobileTop: 0, size: 120, mobileSize: 46, rotation: 8, driftX: -15, driftY: 19, duration: 31, idleOpacity: 0.44, activeOpacity: 0.88, accent: YELLOW, mobile: false, parallaxFactor: 0.025 },
  { id: "distinction-a", label: "DISTINCTION", left: 8, top: 145, mobileLeft: 0, mobileTop: 0, size: 74, mobileSize: 40, rotation: -11, driftX: 15, driftY: -13, duration: 26, idleOpacity: 0.46, activeOpacity: 0.92, accent: BLUE, mobile: false, parallaxFactor: 0.035 },
  { id: "kinetic-a", label: "KINETIC", left: 60, top: 152, mobileLeft: 0, mobileTop: 0, size: 84, mobileSize: 44, rotation: 9, driftX: -16, driftY: 14, duration: 24, idleOpacity: 0.44, activeOpacity: 0.90, accent: YELLOW, mobile: false, parallaxFactor: 0.03 },
];

type KineticWordProps = {
  placement: WordPlacement;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  viewportWidth: MotionValue<number>;
  viewportHeight: MotionValue<number>;
  fieldY: MotionValue<number>;
  scrollY: MotionValue<number>;
  canReact: MotionValue<number>;
  reducedMotion: boolean;
};

type KineticWordStyle = MotionStyle & {
  "--word-left": string;
  "--word-top": string;
  "--word-left-mobile": string;
  "--word-top-mobile": string;
  "--word-size": string;
  "--word-size-mobile": string;
};

function KineticWord({
  placement,
  pointerX,
  pointerY,
  viewportWidth,
  viewportHeight,
  fieldY,
  scrollY,
  canReact,
  reducedMotion,
}: KineticWordProps) {
  const mouseParallaxX = useTransform(
    [pointerX, viewportWidth],
    ([x, width]: number[]) => {
      if (reducedMotion || x <= -900) return 0;
      return (x / width - 0.5) * width * placement.parallaxFactor;
    }
  );

  const mouseParallaxY = useTransform(
    [pointerY, viewportHeight],
    ([y, height]: number[]) => {
      if (reducedMotion || y <= -900) return 0;
      return (y / height - 0.5) * height * placement.parallaxFactor;
    }
  );

  const springParallaxX = useSpring(mouseParallaxX, { stiffness: 50, damping: 20 });
  const springParallaxY = useSpring(mouseParallaxY, { stiffness: 50, damping: 20 });

  const proximity = useTransform(
    [pointerX, pointerY, viewportWidth, viewportHeight, fieldY, canReact],
    (latest) => {
      const [x, y, width, height, offsetY, interaction] = latest as number[];
      if (!interaction) return 0;

      const estimatedWidth = placement.label.length * placement.size * 0.31;
      const centerX = width * (placement.left / 100) + estimatedWidth;
      const centerY =
        height * FIELD_HEIGHT * (placement.top / 100) + offsetY + placement.size * 0.45;
      const distance = Math.hypot(x - centerX, y - centerY);
      const radius = Math.min(200, Math.max(150, width * 0.14));

      return Math.max(0, Math.min(1, 1 - distance / radius));
    }
  );

  const response = useSpring(proximity, {
    stiffness: 190,
    damping: 25,
    mass: 0.45,
  });

  // Calculate clear, high-contrast visibility with proximity hover brightening
  const opacity = useTransform(
    [scrollY, response],
    ([scroll, prox]: number[]) => {
      if (prox > 0.05) return Math.max(placement.idleOpacity, prox * placement.activeOpacity);
      if (reducedMotion) return placement.idleOpacity;

      // Subtle organic breathing oscillation while keeping background words crisp and visible
      const phase = placement.top * 0.18 + placement.left * 0.35 + placement.label.length * 2.4;
      const breathing = 0.85 + 0.15 * Math.sin(scroll * 0.0015 + phase);
      return breathing * placement.idleOpacity;
    }
  );
  const scale = useTransform(response, [0, 1], [1, 1.08]);
  const style = {
    "--word-left": `${placement.left}%`,
    "--word-top": `${placement.top}%`,
    "--word-left-mobile": `${placement.mobileLeft}%`,
    "--word-top-mobile": `${placement.mobileTop}%`,
    "--word-size": `${placement.size}px`,
    "--word-size-mobile": `${placement.mobileSize}px`,
    opacity,
    scale,
    x: springParallaxX,
    y: springParallaxY,
  } as KineticWordStyle;

  return (
    <motion.span
      data-kinetic-word={placement.id}
      className={`kinetic-type-word${placement.mobile ? "" : " kinetic-type-word-desktop"}`}
      style={style}
      initial={{ x: 0, y: 0, rotate: placement.rotation }}
      animate={
        reducedMotion
          ? { x: 0, y: 0, rotate: placement.rotation }
          : {
              x: [0, placement.driftX, placement.driftX * -0.45, 0],
              y: [0, placement.driftY, placement.driftY * -0.5, 0],
              rotate: [
                placement.rotation,
                placement.rotation + 2,
                placement.rotation - 1.5,
                placement.rotation,
              ],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration: placement.duration,
              delay: (placement.duration % 7) * 0.41,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      <GradientShimmer
        gradient="brand"
        duration={2.2}
        spread={3.5}
        angle={135}
        pauseBetween={1000}
        baseColor="rgba(255, 255, 255, 0.95)"
      >
        {placement.label}
      </GradientShimmer>
    </motion.span>
  );
}

export function KineticTypeField() {
  const reducedMotion = Boolean(useReducedMotion());
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);
  const viewportWidth = useMotionValue(1440);
  const viewportHeight = useMotionValue(900);
  const canReact = useMotionValue(0);
  const fadeStart = useMotionValue(1400);
  const fadeEnd = useMotionValue(1800);
  const { scrollY } = useScroll();

  const fieldY = useTransform(scrollY, (value) => (reducedMotion ? 0 : value * -0.4));
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
    const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const measure = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const services = document.getElementById("services");
      const servicesTop = services?.offsetTop ?? height * 2;

      viewportWidth.set(width);
      viewportHeight.set(height);
      fadeStart.set(Math.max(height, servicesTop - height * 1.15));
      fadeEnd.set(Math.max(height + 1, servicesTop - height * 0.75));
      canReact.set(!reducedMotion && width >= 768 && finePointerQuery.matches ? 1 : 0);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    const handlePointerLeave = () => {
      pointerX.set(-1000);
      pointerY.set(-1000);
    };

    measure();
    window.addEventListener("resize", measure);
    finePointerQuery.addEventListener("change", measure);

    if (!reducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    }

    return () => {
      window.removeEventListener("resize", measure);
      finePointerQuery.removeEventListener("change", measure);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [canReact, fadeEnd, fadeStart, pointerX, pointerY, reducedMotion, viewportHeight, viewportWidth]);

  return (
    <motion.div
      aria-hidden="true"
      className="kinetic-type-field"
      style={{ opacity: fieldOpacity }}
    >
      <div className="kinetic-type-base" />
      <motion.div className="kinetic-type-plane" style={{ y: fieldY }}>
        {/* Glowing Gradient Mesh attached directly behind the moving kinetic type words */}
        <GradientField />
        {WORDS.map((placement) => (
          <KineticWord
            key={placement.id}
            placement={placement}
            pointerX={pointerX}
            pointerY={pointerY}
            viewportWidth={viewportWidth}
            viewportHeight={viewportHeight}
            fieldY={fieldY}
            scrollY={scrollY}
            canReact={canReact}
            reducedMotion={reducedMotion}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
