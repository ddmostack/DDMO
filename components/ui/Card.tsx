import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    featured?: boolean;
  }
>;

export function Card({ children, className = "", featured = false, ...props }: CardProps) {
  return (
    <div
      className={`liquid-glass-card p-6 ${
        featured ? "border-white/95 bg-white/45 shadow-lg" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
