import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    featured?: boolean;
  }
>;

export function Card({ children, className = "", featured = false, ...props }: CardProps) {
  return (
    <div
      className={`rounded-md border p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-dd-navy/50 hover:shadow-dd-card-hover ${
        featured
          ? "border-dd-navy/15 bg-dd-navy/[0.05] shadow-dd-card"
          : "border-dd-gray-300 bg-white shadow-sm"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
