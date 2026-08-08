"use client";

import { motion, MotionValue, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useCallback, useRef, useState } from "react";

interface CurvyDashedProgressArrowProps {
  progress: MotionValue<number>;
  className?: string;
}

export function CurvyDashedProgressArrow({ progress, className = "" }: CurvyDashedProgressArrowProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [totalLength, setTotalLength] = useState(0);

  const arrowX = useMotionValue(0);
  const arrowY = useMotionValue(0);
  const arrowAngle = useMotionValue(0);

  const setRef = useCallback(
    (node: SVGPathElement | null) => {
      if (node) {
        pathRef.current = node;
        const len = node.getTotalLength();
        setTotalLength(len);
        if (len > 0) {
          const pt = node.getPointAtLength(0.1);
          const ptBefore = node.getPointAtLength(0);
          const angle = Math.atan2(pt.y - ptBefore.y, pt.x - ptBefore.x) * (180 / Math.PI);
          arrowX.set(pt.x);
          arrowY.set(pt.y);
          arrowAngle.set(angle);
        }
      }
    },
    [arrowX, arrowY, arrowAngle]
  );

  useMotionValueEvent(progress, "change", (latest) => {
    if (!pathRef.current || totalLength === 0) return;
    const currentLength = Math.max(0.1, Math.min(totalLength, latest * totalLength));
    const pt = pathRef.current.getPointAtLength(currentLength);
    const ptBefore = pathRef.current.getPointAtLength(Math.max(0, currentLength - 2));
    const angle = Math.atan2(pt.y - ptBefore.y, pt.x - ptBefore.x) * (180 / Math.PI);

    arrowX.set(pt.x);
    arrowY.set(pt.y);
    arrowAngle.set(angle);
  });

  const strokeDashoffset = useTransform(progress, [0, 1], [totalLength, 0]);
  const arrowOpacity = useTransform(progress, [0, 0.015], [0, 1]);

  // Organic hand-drawn S-curve path definition with loop at top (viewBox: 0 0 100 1000)
  const pathD = `
    M 20 15
    C 45 15, 75 18, 80 32
    C 85 48, 70 65, 52 58
    C 38 50, 48 24, 72 26
    C 90 28, 82 70, 62 115
    C 32 185, 90 290, 78 430
    C 62 570, 15 690, 52 825
    C 78 910, 68 965, 48 988
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="h-full w-full overflow-visible"
      >
        <defs>
          {/* Theme Palette Gradient: Indigo -> Blue -> Teal -> Navy */}
          <linearGradient id="curvy-arrow-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />   {/* Indigo */}
            <stop offset="35%" stopColor="#2563EB" />  {/* Blue */}
            <stop offset="70%" stopColor="#0C8F80" />  {/* Teal */}
            <stop offset="100%" stopColor="#0E2A85" /> {/* Navy */}
          </linearGradient>

          {/* Mask for smooth progressive drawing */}
          <mask id="curvy-arrow-mask" maskUnits="userSpaceOnUse">
            <rect x="-100" y="-100" width="300" height="1200" fill="black" />
            {totalLength > 0 && (
              <motion.path
                d={pathD}
                fill="none"
                stroke="white"
                strokeWidth="30"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={`${totalLength} ${totalLength}`}
                style={{ strokeDashoffset }}
              />
            )}
          </mask>
        </defs>

        {/* Faint Background Guide Track */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#curvy-arrow-gradient)"
          strokeWidth="3"
          strokeDasharray="4 10"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
          vectorEffect="non-scaling-stroke"
        />

        {/* Hidden reference path used for length & point calculations */}
        <path
          ref={setRef}
          d={pathD}
          fill="none"
          stroke="transparent"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />

        {/* Active Animated Dashed Gradient Path */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#curvy-arrow-gradient)"
          strokeWidth="3.5"
          strokeDasharray="5 9"
          strokeLinecap="round"
          strokeLinejoin="round"
          mask="url(#curvy-arrow-mask)"
          vectorEffect="non-scaling-stroke"
          className="drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]"
        />

        {/* Animated Arrowhead pointing in direction of travel */}
        <motion.g
          style={{
            x: arrowX,
            y: arrowY,
            rotate: arrowAngle,
            opacity: arrowOpacity,
          }}
        >
          {/* Filled Arrowhead Triangle */}
          <polygon
            points="-8,-6 8,0 -8,6"
            fill="url(#curvy-arrow-gradient)"
            className="drop-shadow-[0_2px_6px_rgba(14,42,133,0.4)]"
          />
        </motion.g>
      </svg>
    </div>
  );
}
