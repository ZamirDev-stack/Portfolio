"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Heart,
  Lightbulb,
  Users,
  Puzzle,
  Rocket,
} from "lucide-react";
import { profile, stats } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "@/components/bits/reveal";

const highlights = [
  {
    icon: GraduationCap,
    title: "Currently pursuing BCA",
    body: "Building a structured academic foundation in computer applications alongside my own project work.",
  },
  {
    icon: Lightbulb,
    title: "Software & technology focus",
    body: "Drawn to how things work under the hood — from data structures to the tooling that ships real software.",
  },
  {
    icon: Rocket,
    title: "Learning by building",
    body: "I treat every project as a lesson. Shipping small things beats reading about big things.",
  },
  {
    icon: Heart,
    title: "Strong willingness to learn",
    body: "Comfortable being a beginner at something new every week — it's the only way the skill set actually grows.",
  },
  {
    icon: Users,
    title: "Teamwork & communication",
    body: "I write clearly, ask good questions, and care about making collaboration easier for the people around me.",
  },
  {
    icon: Puzzle,
    title: "Problem-solving mindset",
    body: "I enjoy the part where a problem resists the first attempt. Patience and a debugger tend to win.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="About me"
          title={
            <>
              A student developer who actually
              <br className="hidden sm:block" />
              <span className="text-gradient"> ships things.</span>
            </>
          }
          description="I'm not a senior engineer (yet) — I'm someone early in the curve who's already taking the craft seriously. Here's the honest version."
        />

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Profile visual */}
          <Reveal>
            <ProfileVisual />
          </Reveal>

          {/* Bio + highlights */}
          <div className="flex flex-col gap-8">
            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {profile.bioLongParagraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-foreground" : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="grid gap-3 sm:grid-cols-2">
                {highlights.map((h) => (
                  <div
                    key={h.title}
                    className="group rounded-xl border border-border bg-card/40 p-4 transition-colors hover:border-primary/40 hover:bg-accent/30 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <h.icon className="size-4" />
                      </span>
                      <div>
                        <p className="font-medium text-foreground">{h.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {h.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.24}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-card/60 p-4 text-center">
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-sora text-2xl font-bold text-foreground">
                      {s.value}
                      <span className="text-primary">{s.suffix}</span>
                    </dd>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {s.hint}
                    </p>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileVisual() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
      {/* gradient backdrop */}
      <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-primary/30 via-teal-500/15 to-transparent blur-2xl" />
      <div className="absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-primary/40 to-transparent" />

      {/* card */}
      <div className="relative h-full overflow-hidden rounded-3xl border border-border glass-strong">
        {/* dotted bg */}
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />

        {/* monogram */}
        <div className="absolute inset-0 grid place-items-center">
          <motion.div
            initial={{ scale: 0.92, opacity: 1 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="font-sora text-[8rem] font-extrabold leading-none text-gradient">
              {profile.initials}
            </div>
            <div className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              dev · bca · india
            </div>
          </motion.div>
        </div>

        {/* corner labels */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="size-1.5 rounded-full bg-emerald-400" />
          live
        </div>
        <div className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          v1.0
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>{profile.location.split(",")[0]}</span>
          <span>{profile.shortTitle}</span>
        </div>

        {/* EDITABLE note */}
        <div className="absolute right-4 bottom-4 hidden font-mono text-[9px] text-muted-foreground/60 sm:block">
          {/* replace monogram with real photo at /public/profile.jpg */}
        </div>
      </div>
    </div>
  );
}
