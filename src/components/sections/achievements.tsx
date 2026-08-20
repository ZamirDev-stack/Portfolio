"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  GraduationCap,
  Trophy,
  Clock,
  CircleDashed,
  type LucideIcon,
} from "lucide-react";
import { achievements } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "@/components/bits/reveal";
import { cn } from "@/lib/utils";

const typeMeta: Record<
  string,
  { icon: LucideIcon; label: string; color: string }
> = {
  Certification: { icon: BadgeCheck, label: "Certification", color: "text-emerald-400" },
  Course: { icon: Award, label: "Course", color: "text-teal-300" },
  Workshop: { icon: Trophy, label: "Workshop", color: "text-amber-400" },
  Academic: { icon: GraduationCap, label: "Academic", color: "text-sky-300" },
};

const statusMeta: Record<
  string,
  { label: string; chip: string; dot: string }
> = {
  Completed: {
    label: "Completed",
    chip: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    dot: "bg-emerald-400",
  },
  "In Progress": {
    label: "In progress",
    chip: "border-teal-500/30 bg-teal-500/10 text-teal-300",
    dot: "bg-teal-300 animate-pulse",
  },
  Planned: {
    label: "Planned",
    chip: "border-border bg-card/60 text-muted-foreground",
    dot: "bg-muted-foreground/50",
  },
};

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Learning roadmap"
          title={
            <>
              What I&apos;m <span className="text-gradient">learning next</span>.
            </>
          }
          description="An honest view of what I'm currently studying, what's next, and what's on the wishlist. No invented credentials — only real, verifiable items appear as Completed."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const meta = typeMeta[a.type] ?? typeMeta.Course;
            const status = statusMeta[a.status] ?? statusMeta.Planned;
            const Icon = meta.icon;
            return (
              <Reveal key={a.id} delay={(i % 3) * 0.08}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card/40 p-5 transition-colors",
                    a.status === "Planned"
                      ? "border-dashed border-border hover:border-primary/40"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  {/* top row */}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "grid size-11 place-items-center rounded-xl border border-border bg-background/60",
                        meta.color
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        status.chip
                      )}
                    >
                      <span className={cn("size-1.5 rounded-full", status.dot)} />
                      {status.label}
                    </span>
                  </div>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {meta.label} · {a.date}
                  </p>
                  <h3 className="mt-1 font-sora text-base font-semibold leading-snug">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{a.issuer}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>

                  {a.credentialUrl && (
                    <a
                      href={a.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      View credential
                    </a>
                  )}
                </article>
              </Reveal>
            );
          })}

          {/* "Completed" locked card — sets the bar */}
          <Reveal delay={0.24}>
            <div className="grid h-full place-items-center rounded-2xl border border-dashed border-border bg-gradient-to-br from-primary/5 to-transparent p-6 text-center">
              <div>
                <span className="mx-auto grid size-11 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Trophy className="size-5" />
                </span>
                <p className="mt-3 font-sora text-sm font-semibold">
                  Completed credentials live here
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Real, verifiable achievements will replace the planned slots as I earn them. This bar only moves in one direction.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <CircleDashed className="size-3" />
                  Earned: 0 · Planned: {achievements.filter(a => a.status === "Planned").length}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* summary strip */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border bg-card/30 px-6 py-4 text-center">
            <Stat icon={Clock} label="In progress" value={achievements.filter(a => a.status === "In Progress").length} />
            <span className="h-8 w-px bg-border" />
            <Stat icon={Trophy} label="Completed" value={0} />
            <span className="h-8 w-px bg-border" />
            <Stat icon={CircleDashed} label="On the roadmap" value={achievements.filter(a => a.status === "Planned").length} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Icon className="size-4 text-primary" />
      <div className="text-left">
        <p className="font-sora text-lg font-bold leading-none">{value}</p>
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
}
