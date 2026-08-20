"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks, profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // scroll state
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // active section via IntersectionObserver
  React.useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2.5" : "py-4"
      )}
    >
      <div className="section-shell">
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl px-3 py-2 transition-all duration-300",
            scrolled
              ? "glass-strong border border-border shadow-lg shadow-black/5"
              : "border border-transparent"
          )}
        >
          {/* Brand */}
          <Link
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNav("home");
            }}
            className="group flex items-center gap-2.5"
            aria-label={`${profile.name} — home`}
          >
            <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/90 to-teal-500/70 font-mono text-sm font-bold text-primary-foreground shadow-md">
              {profile.initials}
              <span className="absolute inset-0 translate-y-full bg-black/20 transition-transform duration-300 group-hover:translate-y-0" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-sora text-sm font-semibold tracking-tight">
                {profile.firstName}
                <span className="text-primary">.</span>
                {profile.lastName}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                dev
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className={cn(
                      "relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-lg bg-accent/60"
                        transition={{ type: "spring", damping: 22, stiffness: 280 }}
                      />
                    )}
                    {link.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-command-palette"));
              }}
              className="hidden items-center gap-2 rounded-lg border border-border bg-card/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40 sm:flex"
              aria-label="Open command palette"
            >
              <Command className="size-3.5" />
              <kbd className="font-mono text-[10px] tracking-wider">⌘K</kbd>
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="grid size-10 place-items-center rounded-lg border border-border bg-card/40 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                ))}
            </button>

            <Button
              size="sm"
              className="hidden h-9 px-4 font-medium md:inline-flex"
              onClick={() => handleNav("contact")}
            >
              Let&apos;s talk
            </Button>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid size-10 place-items-center rounded-lg border border-border bg-card/40 text-foreground lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="section-shell lg:hidden"
          >
            <div className="mt-2 overflow-hidden rounded-2xl glass-strong border border-border p-2 shadow-xl">
              <ul className="flex flex-col">
                {navLinks.map((link) => {
                  const isActive = active === link.id;
                  return (
                    <li key={link.id}>
                      <button
                        onClick={() => handleNav(link.id)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors",
                          isActive
                            ? "bg-accent/60 text-foreground"
                            : "text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                        )}
                      >
                        {link.label}
                        {isActive && (
                          <span className="size-1.5 rounded-full bg-primary" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-1 border-t border-border p-2">
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleNav("contact")}
                >
                  Contact me
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
