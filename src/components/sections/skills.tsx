"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  BarChart3,
  Terminal,
  Brain,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "@/components/bits/reveal";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  BarChart3,
  Terminal,
  Brain,
};

const levelStyles: Record<string, string> = {
  Learning: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  Comfortable: "bg-teal-500/10 text-teal-300 border-teal-500/30",
  Confident: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* subtle backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="section-shell">
        <SectionHeading
          eyebrow="Tech stack"
          title={
            <>
              Skills I&apos;m actually <span className="text-gradient">using</span>.
            </>
          }
          description="No fake percentages. Instead, here's an honest view of what I reach for daily, what I'm comfortable with, and what I'm actively learning."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {skillCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            return (
              <Reveal key={cat.title} delay={idx * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card/40 p-6 transition-colors hover:border-primary/40">
                  {/* glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <header className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 place-items-center rounded-xl border border-border bg-background/60 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <h3 className="font-sora text-lg font-semibold">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      0{idx + 1}
                    </span>
                  </header>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <li key={s.name}>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                            levelStyles[s.level]
                          )}
                        >
                          <span className="size-1.5 rounded-full bg-current opacity-70" />
                          {s.name}
                          <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">
                            {s.level}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* footer line */}
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[11px] text-muted-foreground">
                    <span>{cat.skills.length} skills</span>
                    <span className="font-mono">
                      {cat.skills.filter((s) => s.level !== "Learning").length} in use
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* marquee of tech */}
        <Reveal delay={0.2}>
          <div className="relative mt-12 overflow-hidden rounded-xl border border-border bg-card/30 py-4">
            <div className="flex w-max animate-marquee gap-8">
              {[...skillCategories.flatMap((c) => c.skills.map((s) => s.name)), ...skillCategories.flatMap((c) => c.skills.map((s) => s.name))].map(
                (name, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 font-mono text-sm text-muted-foreground"
                  >
                    <span className="size-1 rounded-full bg-primary/60" />
                    {name}
                  </span>
                )
              )}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
