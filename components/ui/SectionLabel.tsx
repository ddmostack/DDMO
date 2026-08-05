import type { PropsWithChildren } from "react";

export function SectionLabel({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex border-l-2 border-dd-navy pl-3 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-dd-gray-600">
      <span>{children}</span>
    </span>
  );
}
