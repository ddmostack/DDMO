"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState, type PropsWithChildren } from "react";

type CommonProps = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  vhsEffect?: boolean;
  magnetic?: boolean;
}>;

type LinkButtonProps = CommonProps & {
  href: string;
  ariaLabel?: string;
};

type NativeButtonProps = CommonProps & {
  ariaLabel?: string;
  disabled?: boolean;
  href?: never;
  id?: string;
  name?: string;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const baseClasses =
  "group relative inline-flex min-h-12 items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-8 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-55";

const variants = {
  primary: "liquid-glass-btn-primary shadow-md hover:shadow-lg",
  outline: "liquid-glass-btn-outline shadow-sm hover:shadow-md",
};

export function Button(props: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const {
    children,
    className = "",
    variant = "primary",
    vhsEffect = false,
    magnetic = true,
  } = props;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 350, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const magneticX = useTransform(smoothX, (x) => (magnetic && !reduceMotion ? x * 0.25 : 0));
  const magneticY = useTransform(smoothY, (y) => (magnetic && !reduceMotion ? y * 0.25 : 0));

  const handlePointerMove = (e: React.PointerEvent) => {
    if (reduceMotion || !btnRef.current || !magnetic) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerEnter = () => setIsHovered(true);

  const handlePointerLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const vhsClasses = vhsEffect && !reduceMotion ? "vhs-flicker" : "";
  const classes = `${baseClasses} ${variants[variant]} ${vhsClasses} ${className}`;

  const fillSweepLayer = (
    <motion.span
      className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      initial={{ x: "-100%" }}
      animate={{ x: isHovered && !reduceMotion ? "100%" : "-100%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  );

  if ("href" in props && props.href) {
    return (
      <motion.a
        ref={btnRef}
        href={props.href}
        aria-label={props.ariaLabel}
        className={classes}
        onClick={props.onClick}
        style={{ x: magneticX, y: magneticY }}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        whileHover={reduceMotion ? {} : { scale: 1.04 }}
        whileTap={reduceMotion ? {} : { scale: 0.96 }}
      >
        {fillSweepLayer}
        <span className="relative z-10 flex items-center justify-center">{children}</span>
      </motion.a>
    );
  }

  const nativeProps = props as NativeButtonProps;

  return (
    <motion.button
      ref={btnRef}
      aria-label={nativeProps.ariaLabel}
      className={classes}
      disabled={nativeProps.disabled}
      id={nativeProps.id}
      name={nativeProps.name}
      onClick={nativeProps.onClick}
      type={nativeProps.type ?? "button"}
      style={{ x: magneticX, y: magneticY }}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      whileHover={reduceMotion ? {} : { scale: 1.04 }}
      whileTap={reduceMotion ? {} : { scale: 0.96 }}
    >
      {fillSweepLayer}
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </motion.button>
  );
}
