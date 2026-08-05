"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

import { navLinks } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const nextScrolled = latest > 24;
    setScrolled((current) => (current === nextScrolled ? current : nextScrolled));
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || menuOpen
          ? "border-dd-gray-300 bg-dd-offwhite/95 shadow-[0_8px_32px_rgba(25,27,24,0.05)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="page-container flex h-[72px] items-center justify-between" aria-label="Primary navigation">
        <a href="#home" onClick={() => setMenuOpen(false)}>
          <Logo />
        </a>

        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-2 text-[0.76rem] font-bold text-dd-gray-600 transition-colors hover:text-dd-ink"
            >
              {link.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-dd-gradient transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <Button href="#contact" className="ml-1 min-h-10 px-5 py-2.5 text-xs">
            Start a Project
          </Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md border border-dd-gray-300 bg-dd-offwhite text-dd-ink lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="absolute inset-x-0 top-[72px] min-h-[calc(100dvh-72px)] border-t border-dd-gray-300 bg-dd-offwhite px-6 pb-10 pt-8 lg:hidden"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
          >
            <div className="mx-auto flex max-w-md flex-col">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between border-b border-dd-gray-300 py-4 text-2xl font-extrabold tracking-[-0.03em] text-dd-ink"
                  onClick={() => setMenuOpen(false)}
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.04 }}
                >
                  {link.label}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </motion.a>
              ))}
              <Button href="#contact" className="mt-8 w-full" ariaLabel="Start a project">
                Start a Project <ArrowUpRight className="ml-2" size={17} />
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
