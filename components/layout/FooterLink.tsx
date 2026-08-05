import type { PropsWithChildren } from "react";

type FooterLinkProps = PropsWithChildren<{
  href: string;
}>;

export function FooterLink({ children, href }: FooterLinkProps) {
  return (
    <a href={href} className="text-sm font-medium text-dd-gray-600 transition-colors hover:text-dd-ink">
      {children}
    </a>
  );
}
