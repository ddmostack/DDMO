"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function GradientField() {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (reducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 2);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion, mouseX, mouseY]);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  // Parallax translation per blob
  const blobAY = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const blobBY = useTransform(scrollYProgress, [0, 1], [0, 420]);
  const blobCY = useTransform(scrollYProgress, [0, 1], [0, -280]);
  const blobDY = useTransform(scrollYProgress, [0, 1], [0, 320]);

  const blobAX = useTransform(springX, [-1, 1], [-30, 30]);
  const blobBX = useTransform(springX, [-1, 1], [24, -24]);
  const blobCX = useTransform(springY, [-1, 1], [-20, 20]);
  const blobDX = useTransform(springX, [-1, 1], [16, -16]);

  // Color-shift-on-scroll: subtle hue & scale interpolation matching brand sections
  const blobAOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.75, 0.55, 0.75, 0.85]);
  const blobBOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.6, 0.8, 0.6, 0.75]);
  const blobCOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.55, 0.75, 0.5, 0.7]);

  const hueShift = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 18, -12, 22, -18, 0]
  );
  const blobCFilter = useTransform(hueShift, (value) => `hue-rotate(${value}deg) blur(70px)`);

  if (reducedMotion) {
    return <div aria-hidden className="dd-mesh-static" />;
  }

  return (
    <div aria-hidden className="dd-mesh">
      <div className="dd-grid-overlay" />
      <motion.span
        className="dd-blob dd-blob-a"
        style={{ x: blobAX, y: blobAY, opacity: blobAOpacity }}
      />
      <motion.span
        className="dd-blob dd-blob-b"
        style={{ x: blobBX, y: blobBY, opacity: blobBOpacity }}
      />
      <motion.span
        className="dd-blob dd-blob-c"
        style={{ x: blobCX, y: blobCY, opacity: blobCOpacity, filter: blobCFilter }}
      />
      <motion.span className="dd-blob dd-blob-d" style={{ x: blobDX, y: blobDY }} />
      <div className="dd-grain" />
    </div>
  );
}
