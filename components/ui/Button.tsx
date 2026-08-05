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
  "relative inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-md px-6 py-3 text-sm font-bold transition-[background-color,color,border-color,box-shadow,transform] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-55";

const variants = {
  primary:
    "border border-dd-navy bg-dd-navy text-white hover:bg-dd-ink hover:border-dd-ink",
  outline:
    "border border-dd-gray-300 bg-transparent text-dd-ink hover:border-dd-ink hover:bg-dd-gray-100",
};

export function Button(props: ButtonProps) {
  const reduceMotion = useReducedMotion();
  const { children, className = "", variant = "primary", vhsEffect = false } = props;
  const vhsClasses = vhsEffect && !reduceMotion ? "vhs-flicker vhs-glitch-hover" : "";
  const classes = `${baseClasses} ${variants[variant]} ${vhsClasses} ${className}`;
  const interaction = reduceMotion
    ? {}
    : { whileHover: vhsEffect ? {} : { scale: 1.02 }, whileTap: { scale: vhsEffect ? 0.96 : 0.98 } };

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
