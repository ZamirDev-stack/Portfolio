"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  GraduationCap,
  Trophy,
  AlertCircle,
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

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Certifications & achievements"
          title={
            <>
              Verified <span className="text-gradient">milestones</span>.
            </>
          }
          description="Only real, verifiable items belong here. Where I don't have something yet, you'll see a clearly-marked placeholder I can replace later — no invented credentials."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const meta = typeMeta[a.type] ?? typeMeta.Course;
            const Icon = meta.icon;
            return (
              <Reveal key={a.id} delay={(i % 3) * 0.08}>
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-2xl border bg-card/40 p-5 transition-colors",
                    a.verified
                      ? "border-border hover:border-primary/40"
                      : "border-dashed border-border hover:border-primary/40"
                  )}
                >
                  <div className="flex items-start justify-between">
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
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        a.verified
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                      )}
                    >
                      {a.verified ? "Verified" : "Placeholder"}
                    </span>
                  </div>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {meta.label} · {a.date}
                  </p>
                  <h3 className="mt-1 font-sora text-base font-semibold leading-snug">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm text-primary">{a.issuer}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>

                  {!a.verified && (
                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-[11px] text-amber-400/90">
                      <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                      <span>
                        Replace with real, verifiable information before publishing.
                      </span>
                    </div>
                  )}

                  {a.verified && a.credentialUrl && (
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

          {/* add-more card */}
          <Reveal delay={0.24}>
            <button
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="grid h-full min-h-[200px] w-full place-items-center rounded-2xl border border-dashed border-border bg-card/20 p-5 text-center text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <div>
                <span className="mx-auto grid size-11 place-items-center rounded-xl border border-border">
                  <Trophy className="size-5" />
                </span>
                <p className="mt-3 font-sora text-sm font-medium">
                  More coming soon
                </p>
                <p className="mt-1 text-xs">
                  I keep this section honest. New entries land as I earn them.
                </p>
              </div>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
