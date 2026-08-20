"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import { education } from "@/lib/portfolio-data";
import { SectionHeading } from "@/components/bits/reveal";

export function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Education"
          title={
            <>
              The <span className="text-gradient">academic</span> path.
            </>
          }
          description="A short, honest timeline. Not a list of impressive-sounding institutions — just the real steps I'm taking."
        />

        <div className="relative mt-14">
          {/* vertical line */}
          <div
            aria-hidden
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-border to-transparent sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol className="space-y-10">
            {education.map((item, i) => {
              const onRight = i % 2 === 1;
              return (
                <li key={item.id} className="relative">
                  <div
                    className={`flex ${
                      onRight ? "sm:justify-end" : "sm:justify-start"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 1, x: onRight ? 40 : -40, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative ml-12 w-full rounded-2xl border border-border bg-card/40 p-5 sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                        onRight ? "sm:ml-auto" : ""
                      }`}
                    >
                      {/* node */}
                      <span
                        className={`absolute -left-[2.05rem] top-5 grid size-8 place-items-center rounded-full border border-primary/40 bg-background text-primary sm:hidden`}
                      >
                        <GraduationCap className="size-4" />
                      </span>
                      {/* desktop node */}
                      <span
                        className={`absolute top-5 hidden size-8 place-items-center rounded-full border border-primary/40 bg-background text-primary sm:grid ${
                          onRight
                            ? "-left-[3.05rem]"
                            : "-right-[3.05rem]"
                        }`}
                      >
                        <GraduationCap className="size-4" />
                      </span>

                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                          {item.period}
                        </span>
                        {item.status === "In Progress" ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-400">
                            <span className="size-1.5 animate-pulse rounded-full bg-amber-400" />
                            {item.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                            <CheckCircle2 className="size-3.5" />
                            {item.status}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 font-sora text-lg font-semibold leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-primary">
                        {item.org}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      {item.tags && (
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {item.tags.map((t) => (
                            <li
                              key={t}
                              className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                            >
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
