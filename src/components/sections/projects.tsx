"use client";

import * as React from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, X } from "lucide-react";
import { projects, projectFilters, type Project } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "@/components/bits/reveal";
import { ProjectVisual } from "@/components/bits/project-visual";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Projects() {
  const [filter, setFilter] = React.useState<(typeof projectFilters)[number]>(
    "All"
  );
  const [selected, setSelected] = React.useState<Project | null>(null);

  const filtered = React.useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="section-shell">
        <SectionHeading
          eyebrow="Featured work"
          title={
            <>
              Things I&apos;ve <span className="text-gradient">built</span>.
            </>
          }
          description="A small, honest set of projects. Each one taught me something specific — and none of them are dressed up to look bigger than they are."
        />

        {/* Filters */}
        <Reveal>
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            {projectFilters.map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "border-primary/50 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/15"
                      transition={{ type: "spring", damping: 22, stiffness: 280 }}
                    />
                  )}
                  {f}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.article
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/40",
                    "card-hover hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                  )}
                >
                  {/* Visual header */}
                  <button
                    onClick={() => setSelected(p)}
                    className="relative block aspect-[16/10] w-full overflow-hidden text-left"
                    aria-label={`View details for ${p.title}`}
                  >
                    <ProjectVisual visual={p.visual} accent={p.accent} title={p.title} />

                    {/* category + year chip */}
                    <span className="absolute right-4 top-4 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur">
                      {p.category} · {p.year}
                    </span>

                    {/* hover overlay */}
                    <div className="absolute inset-0 grid place-items-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                        View case study
                        <ArrowUpRight className="size-3.5" />
                      </span>
                    </div>
                  </button>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-sora text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {p.blurb}
                    </p>

                    {/* metrics strip — concrete, non-fabricated */}
                    {p.metrics && (
                      <dl className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
                        {p.metrics.map((m) => (
                          <div key={m.label} className="bg-card/60 px-2 py-1.5 text-center">
                            <dt className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground">
                              {m.label}
                            </dt>
                            <dd className="mt-0.5 truncate text-[11px] font-medium text-foreground">
                              {m.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    )}

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-border bg-background/40 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
                      {p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40"
                        >
                          <Github className="size-3.5" />
                          Code
                        </a>
                      )}
                      {p.demo && (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-primary/40"
                        >
                          <ExternalLink className="size-3.5" />
                          Live
                        </a>
                      )}
                      <button
                        onClick={() => setSelected(p)}
                        className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        Details
                        <ArrowUpRight className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Detail modal */}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // close on escape
  React.useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl glass-strong border border-border shadow-2xl"
          >
            {/* header visual */}
            <div className="relative aspect-[16/7] w-full overflow-hidden">
              <ProjectVisual visual={project.visual} accent={project.accent} title={project.title} />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur hover:bg-accent"
              >
                <X className="size-4" />
              </button>
              <span className="absolute bottom-3 left-3 rounded-full border border-border bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground backdrop-blur">
                {project.category} · {project.year}
              </span>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-6">
              <h3 className="font-sora text-2xl font-bold">{project.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <h4 className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Key features
              </h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 rounded-lg border border-border bg-card/40 p-3 text-sm"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Tech stack
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noreferrer">
                      <Github className="size-4" />
                      View code
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noreferrer">
                      <ExternalLink className="size-4" />
                      Live demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
