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

/**
 * Fixed, full-bleed animated gradient-mesh background.
 *
 * Three soft blurred color blobs drift on a slow ambient loop, and are
 * additionally offset by scroll position (each at a different rate, for a
 * parallax depth cue) and by pointer position (subtle, spring-smoothed).
 * This gives a "moving 3D background" feel without a WebGL/Three.js layer.
 *
 * Mount this once, near the top of the document body in app/layout.tsx:
 *   <body>
 *     <a className="skip-link" href="#main-content">Skip to content</a>
 *     <GradientField />
 *     {children}
 *   </body>
 *
 * It is position: fixed with z-index: -1 (see globals.css), so it sits
 * behind every section automatically - no changes needed in Hero, About,
 * etc. Sections with an opaque background will simply cover it; sections
 * with a transparent background will let it show through.
 */
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

  // Each blob scrolls at its own rate -> depth/parallax illusion.
  const blobAY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const blobBY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const blobCY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const blobAX = useTransform(springX, [-1, 1], [-24, 24]);
  const blobBX = useTransform(springX, [-1, 1], [18, -18]);
  const blobCX = useTransform(springY, [-1, 1], [-14, 14]);

  const hueShift = useTransform(scrollYProgress, [0, 0.5, 1], [0, 18, -10]);
  const blobCFilter = useTransform(hueShift, (value) => `hue-rotate(${value}deg) blur(70px)`);

  if (reducedMotion) {
    // Static gradient wash, no animation, no listeners - respects the
    // person's OS-level motion preference.
    return <div aria-hidden className="dd-mesh-static" />;
  }

  return (
    <div aria-hidden className="dd-mesh">
      <motion.span className="dd-blob dd-blob-a" style={{ x: blobAX, y: blobAY }} />
      <motion.span className="dd-blob dd-blob-b" style={{ x: blobBX, y: blobBY }} />
      <motion.span
        className="dd-blob dd-blob-c"
        style={{ x: blobCX, y: blobCY, filter: blobCFilter }}
      />
      <div className="dd-grain" />
    </div>
  );
}
