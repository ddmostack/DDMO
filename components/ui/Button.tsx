"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren<{
  className?: string;
  variant?: "primary" | "outline";
  vhsEffect?: boolean;
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
  "group relative inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full px-8 py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-55";

const variants = {
  primary: "liquid-glass-btn-primary",
  outline: "liquid-glass-btn-outline",
};

export function Button(props: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const { children, className = "", variant = "primary", vhsEffect = false } = props;
  const vhsClasses = vhsEffect && !reduceMotion ? "vhs-flicker" : "";
  const classes = `${baseClasses} ${variants[variant]} ${vhsClasses} ${className}`;
  const interaction = reduceMotion
    ? {}
    : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } };

  if ("href" in props && props.href) {
    return (
      <motion.a
        href={props.href}
        aria-label={props.ariaLabel}
        className={classes}
        {...interaction}
      >
        {children}
      </motion.a>
    );
  }

  const nativeProps = props as NativeButtonProps;

  return (
    <motion.button
      aria-label={nativeProps.ariaLabel}
      className={classes}
      disabled={nativeProps.disabled}
      id={nativeProps.id}
      name={nativeProps.name}
      onClick={nativeProps.onClick}
      type={nativeProps.type ?? "button"}
      {...interaction}
    >
      {children}
    </motion.button>
  );
}
