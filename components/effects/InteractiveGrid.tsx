"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Grid config
    const gridSize = 48;
    let gridOffset = 0;

    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, { passive: true });

    const render = () => {
      // Smooth lerp mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Ambient movement
      gridOffset = (gridOffset + 0.35) % gridSize;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize) + 2;
      const rows = Math.ceil(height / gridSize) + 2;

      // Draw Grid Vertical Lines (Blueprint weight variations)
      for (let i = -1; i < cols; i++) {
        const x = i * gridSize + (gridOffset % gridSize) - gridSize;
        const isFifth = Math.abs(i) % 5 === 0;

        ctx.lineWidth = isFifth ? 1.5 : 1;
        ctx.strokeStyle = isFifth ? "rgba(14, 42, 133, 0.065)" : "rgba(14, 42, 133, 0.03)";

        ctx.beginPath();
        ctx.moveTo(x, 0);

        for (let j = 0; j <= rows; j++) {
          const y = j * gridSize;

          let drawX = x;
          let drawY = y;

          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 160;

            if (dist < radius) {
              const force = (1 - dist / radius) * 12;
              const angle = Math.atan2(dy, dx);
              drawX += Math.cos(angle) * force;
              drawY += Math.sin(angle) * force;
            }
          }

          ctx.lineTo(drawX, drawY);
        }

        ctx.stroke();
      }

      // Draw Grid Horizontal Lines (Blueprint weight variations)
      for (let j = -1; j < rows; j++) {
        const y = j * gridSize;
        const isFifth = Math.abs(j) % 5 === 0;

        ctx.lineWidth = isFifth ? 1.5 : 1;
        ctx.strokeStyle = isFifth ? "rgba(14, 42, 133, 0.065)" : "rgba(14, 42, 133, 0.03)";

        ctx.beginPath();
        ctx.moveTo(0, y);

        for (let i = 0; i <= cols; i++) {
          const x = i * gridSize + (gridOffset % gridSize) - gridSize;

          let drawX = x;
          let drawY = y;

          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 160;

            if (dist < radius) {
              const force = (1 - dist / radius) * 12;
              const angle = Math.atan2(dy, dx);
              drawX += Math.cos(angle) * force;
              drawY += Math.sin(angle) * force;
            }
          }

          ctx.lineTo(drawX, drawY);
        }

        ctx.stroke();
      }

      // Draw interactive glowing dots at grid intersections near cursor
      if (mouse.active) {
        const radius = 180;
        const startCol = Math.max(-1, Math.floor((mouse.x - radius) / gridSize));
        const endCol = Math.min(cols, Math.ceil((mouse.x + radius) / gridSize));
        const startRow = Math.max(-1, Math.floor((mouse.y - radius) / gridSize));
        const endRow = Math.min(rows, Math.ceil((mouse.y + radius) / gridSize));

        for (let i = startCol; i <= endCol; i++) {
          for (let j = startRow; j <= endRow; j++) {
            const x = i * gridSize + (gridOffset % gridSize) - gridSize;
            const y = j * gridSize;

            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
              const alpha = Math.pow(1 - dist / radius, 2) * 0.65;
              const dotSize = (1 - dist / radius) * 3.5 + 1;

              ctx.beginPath();
              ctx.arc(x, y, dotSize, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(12, 143, 128, ${alpha})`;
              ctx.fill();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(14, 42, 133, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 42, 133, 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 20%, transparent 80%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-65"
      style={{
        maskImage: "radial-gradient(circle at 50% 40%, black 25%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(circle at 50% 40%, black 25%, transparent 80%)",
      }}
    />
  );
}
