"use client";

import * as React from "react";
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import { profile, socials, navLinks } from "@/lib/portfolio-data";

export function Footer() {
  const year = new Date().getFullYear();
  const handleNav = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="mt-auto border-t border-border bg-card/30">
      <div className="section-shell py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary/90 to-teal-500/70 font-mono text-sm font-bold text-primary-foreground">
                {profile.initials}
              </span>
              <span className="font-sora text-base font-semibold">
                {profile.firstName}
                <span className="text-primary">.</span>
                {profile.lastName}
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Building, learning, and creating one project at a time.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-lg border border-border bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                >
                  {s.label === "GitHub" && <Github className="size-4" />}
                  {s.label === "LinkedIn" && <Linkedin className="size-4" />}
                  {s.label === "Email" && <Mail className="size-4" />}
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => handleNav(l.id)}
                    className="link-underline text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Status
            </p>
            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                {profile.status}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {profile.availableFor}
              </p>
            </div>
            <button
              onClick={() => handleNav("home")}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowUp className="size-3.5" />
              Back to top
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Built with
            <Heart className="size-3 fill-primary text-primary" />
            using Next.js · TypeScript · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
