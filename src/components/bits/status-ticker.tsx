"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Activity, Sparkles } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

/**
 * StatusTicker — a thin premium ribbon between sections.
 * Shows "what I'm doing right now" + a rotating set of focuses.
 * Purely decorative supplementary content; not a real <section>.
 */
const focuses = [
  "sharpening data structures & algorithms",
  "building a data-analysis pipeline with Pandas",
  "practising clean OOP in Java",
  "automating the boring parts of my workflow",
  "prepping for my first internship",
];

export function StatusTicker() {
  const [idx, setIdx] = React.useState(0);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % focuses.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-border bg-card/30"
    >
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

      <div className="section-shell flex items-center gap-4 py-3">
        {/* live dot */}
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
          </span>
          <Activity className="size-3" />
          now
        </span>

        {/* rotating focus */}
        <div className="relative flex min-w-0 flex-1 items-center gap-1.5">
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">
            currently:
          </span>
          <span className="relative inline-flex min-w-0 flex-1 items-center overflow-hidden">
            <motion.span
              key={idx}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="truncate font-medium text-foreground"
            >
              {focuses[idx]}
            </motion.span>
          </span>
        </div>

        {/* status chip (hidden on mobile) */}
        <span className="hidden items-center gap-1.5 rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:inline-flex">
          <Sparkles className="size-3 text-primary" />
          {profile.status}
        </span>
      </div>
    </div>
  );
}
