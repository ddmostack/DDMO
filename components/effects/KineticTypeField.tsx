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
  { id: "momentum-a", label: "MOMENTUM", left: -5, top: 7, mobileLeft: -10, mobileTop: 9, size: 70, mobileSize: 42, rotation: -8, driftX: 16, driftY: 12, duration: 23, idleOpacity: 0.20, activeOpacity: 0.90, accent: YELLOW, mobile: true, parallaxFactor: 0.025 },
  { id: "clarity-a", label: "CLARITY", left: 76, top: 9, mobileLeft: 66, mobileTop: 7, size: 58, mobileSize: 40, rotation: 7, driftX: -13, driftY: 16, duration: 27, idleOpacity: 0.18, activeOpacity: 0.85, accent: BLUE, mobile: true, parallaxFactor: 0.04 },
  { id: "craft-a", label: "CRAFT", left: -12, top: 43, mobileLeft: -18, mobileTop: 44, size: 64, mobileSize: 48, rotation: 11, driftX: 12, driftY: -15, duration: 19, idleOpacity: 0.22, activeOpacity: 0.92, accent: YELLOW, mobile: true, parallaxFactor: 0.03 },
  { id: "strategy-a", label: "STRATEGY", left: 73, top: 45, mobileLeft: 58, mobileTop: 68, size: 72, mobileSize: 44, rotation: -6, driftX: -18, driftY: 11, duration: 29, idleOpacity: 0.18, activeOpacity: 0.85, accent: YELLOW, mobile: true, parallaxFactor: 0.05 },
  { id: "ideas-a", label: "IDEAS", left: 4, top: 61, mobileLeft: 2, mobileTop: 76, size: 54, mobileSize: 46, rotation: -13, driftX: 14, driftY: 18, duration: 21, idleOpacity: 0.20, activeOpacity: 0.90, accent: YELLOW, mobile: true, parallaxFactor: 0.02 },
  { id: "impact-a", label: "IMPACT", left: 79, top: 66, mobileLeft: 60, mobileTop: 90, size: 88, mobileSize: 50, rotation: 9, driftX: -16, driftY: -12, duration: 25, idleOpacity: 0.16, activeOpacity: 0.80, accent: BLUE, mobile: true, parallaxFactor: 0.045 },
  { id: "partnership-a", label: "PARTNERSHIP", left: -8, top: 78, mobileLeft: 0, mobileTop: 0, size: 84, mobileSize: 42, rotation: 5, driftX: 19, driftY: -14, duration: 30, idleOpacity: 0.18, activeOpacity: 0.85, accent: YELLOW, mobile: false, parallaxFactor: 0.035 },
  { id: "openness-a", label: "OPENNESS", left: 70, top: 82, mobileLeft: 0, mobileTop: 0, size: 66, mobileSize: 40, rotation: -10, driftX: -12, driftY: 17, duration: 24, idleOpacity: 0.20, activeOpacity: 0.92, accent: YELLOW, mobile: false, parallaxFactor: 0.02 },
  { id: "built-to-move-a", label: "BUILT TO MOVE", left: 12, top: 94, mobileLeft: 0, mobileTop: 0, size: 118, mobileSize: 44, rotation: -4, driftX: 15, driftY: 10, duration: 28, idleOpacity: 0.16, activeOpacity: 0.82, accent: YELLOW, mobile: false, parallaxFactor: 0.04 },
  { id: "momentum-b", label: "MOMENTUM", left: 66, top: 108, mobileLeft: 0, mobileTop: 0, size: 76, mobileSize: 42, rotation: 12, driftX: -20, driftY: -16, duration: 26, idleOpacity: 0.18, activeOpacity: 0.88, accent: BLUE, mobile: false, parallaxFactor: 0.03 },
  { id: "clarity-b", label: "CLARITY", left: -4, top: 124, mobileLeft: 0, mobileTop: 0, size: 96, mobileSize: 40, rotation: -7, driftX: 18, driftY: 13, duration: 22, idleOpacity: 0.18, activeOpacity: 0.85, accent: YELLOW, mobile: false, parallaxFactor: 0.05 },
  { id: "ideas-b", label: "IDEAS", left: 78, top: 137, mobileLeft: 0, mobileTop: 0, size: 132, mobileSize: 46, rotation: 8, driftX: -15, driftY: 19, duration: 31, idleOpacity: 0.16, activeOpacity: 0.82, accent: YELLOW, mobile: false, parallaxFactor: 0.025 },
];

type KineticWordProps = {
  placement: WordPlacement;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  viewportWidth: MotionValue<number>;
  viewportHeight: MotionValue<number>;
  fieldY: MotionValue<number>;
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
  const opacity = useTransform(
    response,
    [0, 1],
    [placement.idleOpacity, placement.activeOpacity]
  );
  const scale = useTransform(response, [0, 1], [1, 1.08]);
  const color = useTransform(response, [0, 1], ["#1138e6", placement.accent]);

  const style = {
    "--word-left": `${placement.left}%`,
    "--word-top": `${placement.top}%`,
    "--word-left-mobile": `${placement.mobileLeft}%`,
    "--word-top-mobile": `${placement.mobileTop}%`,
    "--word-size": `${placement.size}px`,
    "--word-size-mobile": `${placement.mobileSize}px`,
    opacity,
    scale,
    color,
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
      {placement.label}
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
            canReact={canReact}
            reducedMotion={reducedMotion}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
