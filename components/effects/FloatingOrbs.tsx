"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

type OrbConfig = {
  id: string;
  left?: string;
  parallaxRate: number;
  right?: string;
  size: number;
  top: string;
};

const ORBS: OrbConfig[] = [
  { id: "hero-orb", top: "10%", right: "6%", size: 210, parallaxRate: -180 },
  { id: "about-orb", top: "27%", left: "-40px", size: 260, parallaxRate: 220 },
  { id: "services-orb", top: "46%", right: "-50px", size: 230, parallaxRate: -150 },
  { id: "portfolio-orb", top: "64%", left: "3%", size: 180, parallaxRate: 200 },
  { id: "whyus-orb", top: "81%", right: "8%", size: 200, parallaxRate: -170 },
];

export function FloatingOrbs() {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (reduceMotion) return;

    function handlePointerMove(e: PointerEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, mouseX, mouseY]);

  const springConfig = { stiffness: 45, damping: 22 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {ORBS.map((orb, index) => (
        <SingleOrb
          key={orb.id}
          orb={orb}
          index={index}
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function SingleOrb({
  index,
  mouseX,
  mouseY,
  orb,
  scrollYProgress,
}: {
  index: number;
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
  orb: OrbConfig;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, orb.parallaxRate]);

  // 2D cursor deflection calculation
  const orbX = useTransform(mouseX, (x) => {
    if (typeof window === "undefined") return 0;
    const targetX = x / window.innerWidth - 0.5;
    return (index % 2 === 0 ? 1 : -1) * targetX * 28;
  });

  const orbCursorY = useTransform(mouseY, (y) => {
    if (typeof window === "undefined") return 0;
    const targetY = y / window.innerHeight - 0.5;
    return (index % 3 === 0 ? -1 : 1) * targetY * 24;
  });

  const combinedY = useTransform(
    [parallaxY, orbCursorY],
    ([pY, cY]: number[]) => pY + cY
  );

  return (
    <motion.div
      className="white-orb-3d"
      style={{
        width: orb.size,
        height: orb.size,
        top: orb.top,
        left: orb.left,
        right: orb.right,
        x: orbX,
        y: combinedY,
      }}
      animate={{
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 8 + index * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
