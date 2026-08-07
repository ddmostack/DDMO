"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<{
    text: string;
    variant: "default" | "hover" | "view" | "explore";
  }>({
    text: "",
    variant: "default",
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 28, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (reduceMotion) return;

    // Check if pointer device (not touch screen)
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check for custom data-cursor targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      const interactiveTarget = target.closest("a, button, input, textarea, [role='button']");

      if (cursorTarget) {
        const cursorType = cursorTarget.getAttribute("data-cursor");
        const cursorText = cursorTarget.getAttribute("data-cursor-text") || "";

        if (cursorType === "view") {
          setCursorState({ text: cursorText || "VIEW", variant: "view" });
        } else if (cursorType === "explore") {
          setCursorState({ text: cursorText || "EXPLORE", variant: "explore" });
        } else {
          setCursorState({ text: cursorText, variant: "hover" });
        }
      } else if (interactiveTarget) {
        setCursorState({ text: "", variant: "hover" });
      } else {
        setCursorState({ text: "", variant: "default" });
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [reduceMotion, mouseX, mouseY, isVisible]);

  if (reduceMotion || !isVisible) return null;

  const isExpanded = cursorState.variant === "view" || cursorState.variant === "explore";

  return (
    <>
      {/* Outer Spring Follower Ring / Badge */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? 90 : cursorState.variant === "hover" ? 44 : 28,
          height: isExpanded ? 90 : cursorState.variant === "hover" ? 44 : 28,
          backgroundColor: isExpanded
            ? "rgba(10, 15, 30, 0.88)"
            : cursorState.variant === "hover"
            ? "rgba(10, 15, 30, 0.15)"
            : "rgba(10, 15, 30, 0.05)",
          borderColor: isExpanded
            ? "rgba(255, 255, 255, 0.3)"
            : cursorState.variant === "hover"
            ? "rgba(10, 15, 30, 0.4)"
            : "rgba(10, 15, 30, 0.2)",
          borderWidth: "1px",
          backdropFilter: isExpanded ? "blur(8px)" : "blur(2px)",
          boxShadow: isExpanded
            ? "0 12px 32px rgba(0, 0, 0, 0.25)"
            : "0 4px 12px rgba(0, 0, 0, 0.05)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        {cursorState.text && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-extrabold tracking-widest text-white uppercase"
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 rounded-full bg-dd-navy"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isExpanded ? 0 : cursorState.variant === "hover" ? 1.5 : 1,
          opacity: isExpanded ? 0 : 0.85,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
