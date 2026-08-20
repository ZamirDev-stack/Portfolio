"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Terminal,
  FolderTree,
  Globe,
  type LucideIcon,
} from "lucide-react";
import type { ProjectVisual } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const iconMap: Record<ProjectVisual, LucideIcon> = {
  chart: BarChart3,
  terminal: Terminal,
  files: FolderTree,
  browser: Globe,
};

/**
 * A themed mini-mockup for each project card — replaces the lazy "initials"
 * placeholder with an intentional, on-brand visual that hints at the project
 * type (dashboard chart / terminal / file tree / browser window).
 */
export function ProjectVisual({
  visual,
  accent,
  title,
}: {
  visual: ProjectVisual;
  accent: string;
  title: string;
}) {
  const Icon = iconMap[visual];

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* gradient backdrop */}
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", accent)} />
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />

      {/* The themed mockup, centered */}
      <div className="absolute inset-0 grid place-items-center p-6">
        {visual === "chart" && <ChartMock />}
        {visual === "terminal" && <TerminalMock />}
        {visual === "files" && <FilesMock />}
        {visual === "browser" && <BrowserMock />}
      </div>

      {/* category icon badge (top-left) */}
      <span className="absolute left-4 top-4 grid size-8 place-items-center rounded-lg border border-border bg-background/70 text-muted-foreground backdrop-blur">
        <Icon className="size-4" />
      </span>

      {/* keep title for screen readers / a11y even though it's visual */}
      <span className="sr-only">{title} preview</span>
    </div>
  );
}

/* ---------- Chart mockup (Data project) ---------- */
function ChartMock() {
  const bars = [38, 62, 48, 74, 55, 82, 46];
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-[260px] rounded-xl border border-border bg-background/70 p-3 shadow-xl backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          dashboard
        </span>
        <span className="size-1.5 rounded-full bg-emerald-400" />
      </div>
      <div className="mt-3 flex h-20 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 4 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
            className={cn(
              "flex-1 rounded-t-sm",
              i % 2 === 0 ? "bg-emerald-400/80" : "bg-teal-400/60"
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[8px] text-muted-foreground">
        <span>Mon</span>
        <span>Wed</span>
        <span>Sun</span>
      </div>
      <div className="mt-2 h-px bg-border" />
      <div className="mt-2 flex items-center gap-2">
        <span className="size-2 rounded-full bg-emerald-400" />
        <span className="font-mono text-[9px] text-muted-foreground">
          active series
        </span>
      </div>
    </motion.div>
  );
}

/* ---------- Terminal mockup (Java project) ---------- */
function TerminalMock() {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-[260px] overflow-hidden rounded-xl border border-border bg-[#0a0c10] shadow-xl"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="size-2 rounded-full bg-rose-400/70" />
        <span className="size-2 rounded-full bg-amber-400/70" />
        <span className="size-2 rounded-full bg-emerald-400/70" />
        <span className="ml-2 font-mono text-[8px] text-muted-foreground">
          java — App.java
        </span>
      </div>
      <div className="space-y-1 p-3 font-mono text-[9px] leading-relaxed">
        <p className="text-muted-foreground">
          <span className="text-emerald-400">$</span> java App
        </p>
        <p className="text-sky-300">public class App {"{"}</p>
        <p className="pl-3 text-foreground/80">
          <span className="text-amber-300">public</span>{" "}
          <span className="text-amber-300">static</span>{" "}
          <span className="text-teal-300">void</span>{" "}
          <span className="text-foreground">main</span>(...) {"{"}
        </p>
        <p className="pl-6 text-emerald-300">
          var app = <span className="text-teal-300">new</span> App();
        </p>
        <p className="pl-6 text-emerald-300">app.run();</p>
        <p className="pl-3 text-foreground/80">{"}"}</p>
        <p className="text-sky-300">{"}"}</p>
        <p className="pt-1 text-emerald-400">✓ build complete</p>
      </div>
    </motion.div>
  );
}

/* ---------- Files mockup (Python automation) ---------- */
function FilesMock() {
  const rows = [
    { name: "report_q4.pdf", t: "→ /docs", c: "text-emerald-400" },
    { name: "invoice.xlsx", t: "→ /sheets", c: "text-teal-300" },
    { name: "vacation.jpg", t: "→ /images", c: "text-amber-300" },
    { name: "data.csv", t: "→ /data", c: "text-sky-300" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-[260px] overflow-hidden rounded-xl border border-border bg-background/70 shadow-xl backdrop-blur"
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          ~/Downloads
        </span>
        <span className="font-mono text-[8px] text-emerald-400">sorting…</span>
      </div>
      <ul className="divide-y divide-border">
        {rows.map((r, i) => (
          <motion.li
            key={r.name}
            initial={{ x: -8, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center justify-between gap-2 px-3 py-1.5"
          >
            <span className="truncate font-mono text-[9px] text-foreground/80">
              {r.name}
            </span>
            <span className={cn("font-mono text-[8px]", r.c)}>{r.t}</span>
          </motion.li>
        ))}
      </ul>
      <div className="border-t border-border px-3 py-1.5">
        <p className="font-mono text-[8px] text-muted-foreground">
          4 files · sorted by ext + date
        </p>
      </div>
    </motion.div>
  );
}

/* ---------- Browser mockup (Web project) ---------- */
function BrowserMock() {
  return (
    <motion.div
      initial={{ opacity: 0.7 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="w-full max-w-[260px] overflow-hidden rounded-xl border border-border bg-background/70 shadow-xl backdrop-blur"
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="size-2 rounded-full bg-rose-400/70" />
        <span className="size-2 rounded-full bg-amber-400/70" />
        <span className="size-2 rounded-full bg-emerald-400/70" />
        <div className="ml-2 flex-1 rounded border border-border bg-background/60 px-2 py-0.5">
          <span className="font-mono text-[8px] text-muted-foreground">
            showketfarooq.dev
          </span>
        </div>
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded bg-gradient-to-br from-primary/80 to-teal-500/60 font-mono text-[8px] font-bold text-background">
            SF
          </span>
          <div className="h-1.5 flex-1 rounded-full bg-foreground/10" />
          <div className="h-1.5 w-8 rounded-full bg-primary/40" />
        </div>
        <div className="space-y-1">
          <div className="h-2 w-3/4 rounded-full bg-foreground/15" />
          <div className="h-2 w-full rounded-full bg-foreground/10" />
          <div className="h-2 w-5/6 rounded-full bg-foreground/10" />
        </div>
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="aspect-square rounded border border-border bg-gradient-to-br from-primary/10 to-transparent"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
