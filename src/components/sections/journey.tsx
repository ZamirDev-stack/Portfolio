"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Code2,
  BarChart3,
  Hammer,
  Globe,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { journey } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/bits/reveal";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Code2,
  BarChart3,
  Hammer,
  Globe,
  TrendingUp,
};

export function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-[300px] w-[300px] rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <div className="section-shell">
        <SectionHeading
          eyebrow="My journey"
          title={
            <>
              From first line of code to{" "}
              <span className="text-gradient">first portfolio</span>.
            </>
          }
          description="I'm a fresher — so instead of inventing a work history, here's the real progression: how I started, what I learned, and where I am now."
        />

        <div className="relative mt-14">
          {/* horizontal rail (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-10">
            {journey.map((m, i) => {
              const Icon = iconMap[m.icon] ?? Sparkles;
              return (
                <li key={m.id} className="relative">
                  <motion.article
                    initial={{ opacity: 1, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.55,
                      delay: (i % 3) * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative h-full rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40"
                  >
                    {/* number */}
                    <div className="flex items-center justify-between">
                      <span className="grid size-11 place-items-center rounded-xl border border-border bg-background/60 text-primary transition-colors group-hover:bg-primary/15">
                        <Icon className="size-5" />
                      </span>
                      <span className="font-mono text-2xl font-bold text-foreground/10 transition-colors group-hover:text-primary/30">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {m.period}
                    </p>
                    <h3 className="mt-1 font-sora text-base font-semibold leading-snug">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {m.description}
                    </p>

                    {/* connector dot for desktop */}
                    <span
                      aria-hidden
                      className="absolute -top-[1.6rem] left-11 hidden size-3 rounded-full border-2 border-primary/60 bg-background lg:block"
                    />
                  </motion.article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
