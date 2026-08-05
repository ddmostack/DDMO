import { ArrowUpRight, BriefcaseBusiness, Camera, Share2 } from "lucide-react";

import { FooterLink } from "@/components/layout/FooterLink";
import { Logo } from "@/components/ui/Logo";
import { footerDetails, footerServices, navLinks, socialLinks } from "@/lib/constants";

const socialIcons = [BriefcaseBusiness, Camera, Share2] as const;

export function Footer() {
  return (
    <footer className="border-t border-dd-gray-300 bg-dd-offwhite text-dd-ink">
      <div className="page-container pb-8 pt-16 md:pt-20">
        <div className="grid gap-12 border-b border-dd-gray-300 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
          <div>
            <a href="#home"><Logo /></a>
            <p className="mt-6 max-w-[430px] text-sm font-medium leading-relaxed text-dd-gray-600">
              Strategy, design, and technology for ambitious brands ready to build meaningful momentum.
            </p>
            <a href={`mailto:${footerDetails.email}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-dd-navy transition-colors hover:text-dd-ink">
              {footerDetails.email} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div>
            <h2 className="text-xs font-bold text-dd-gray-600">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.slice(0, 5).map((link) => <li key={link.href}><FooterLink href={link.href}>{link.label}</FooterLink></li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold text-dd-gray-600">Services</h2>
            <ul className="mt-5 space-y-3">
              {footerServices.map((service) => <li key={service}><FooterLink href="#services">{service}</FooterLink></li>)}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6 pt-8 text-xs font-medium text-dd-gray-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Doodle Dynamo. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {socialLinks.map((link, index) => {
              const Icon = socialIcons[index];
              return (
                <a key={link.label} href={link.href} aria-label={link.label} className="grid h-10 w-10 place-items-center rounded-md border border-dd-gray-300 text-dd-gray-600 transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-dd-navy hover:text-dd-navy" rel="noreferrer" target="_blank">
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
