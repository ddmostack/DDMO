"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/constants";

export function Navbar() {
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>("#home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll spy to dynamically track and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = navLinks
        .map((link) => {
          const el = document.querySelector(link.href);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          return { href: link.href, top, height: rect.height };
        })
        .filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.top - 80) {
          setActiveSection(section.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 sm:top-4 md:top-5 z-50 mx-auto flex max-w-[1040px] w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] md:w-fit flex-col items-center">
      {/* Main Floating Glass Pill Container */}
      <nav
        className="floating-glass-pill flex w-full items-center justify-between gap-3 px-3.5 py-2 sm:px-5 sm:py-2.5"
        aria-label="Primary navigation"
      >
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02]"
        >
          <Logo />
        </a>

        {/* Desktop Nav Items with Reference Floating Pill Hover Effect */}
        <div
          className="hidden items-center gap-1 sm:gap-1.5 lg:flex"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            const isHovered = hoveredLink === link.href;
            const showPill = isHovered || (hoveredLink === null && isActive);

            return (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.href)}
                className="relative inline-flex items-center px-4 py-2 text-xs font-bold tracking-[0.01em] transition-colors duration-200 md:text-[0.8125rem]"
              >
                {/* Active / Hover Translucent Glass Pill Indicator */}
                {showPill ? (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-white/35 backdrop-blur-lg shadow-sm z-0"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 30 }
                    }
                  />
                ) : null}

                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    showPill ? "text-black font-extrabold" : "text-dd-gray-600 hover:text-black font-semibold"
                  }`}
                >
                  {link.label}
                </span>
              </a>
            );
          })}
        </div>

        {/* Action Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="liquid-glass-btn-primary hidden items-center justify-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
          >
            Start a Project{" "}
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/40 text-dd-ink shadow-sm backdrop-blur-md transition-colors hover:bg-white/60 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Glass Menu Drawer */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="floating-glass-panel mt-2.5 w-full overflow-hidden p-5 shadow-2xl backdrop-blur-2xl lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-bold tracking-[-0.02em] transition-colors ${
                      isActive
                        ? "bg-white/35 backdrop-blur-lg text-black font-extrabold shadow-sm"
                        : "text-dd-ink hover:bg-white/25"
                    }`}
                    onClick={() => setMenuOpen(false)}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : index * 0.03 }}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={18} className="opacity-70" />
                  </motion.a>
                );
              })}

              <a
                href="#contact"
                className="liquid-glass-btn-primary mt-3 flex items-center justify-center gap-2 py-3 text-sm font-bold"
                onClick={() => setMenuOpen(false)}
              >
                Start a Project <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
