import type { PropsWithChildren } from "react";

export function GradientText({ children }: PropsWithChildren) {
  return (
    <span className="text-dd-navy">{children}</span>
  );
}
