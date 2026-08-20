"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Download, FileText, Eye, CheckCircle2 } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "@/components/bits/reveal";
import { Button } from "@/components/ui/button";

export function Resume() {
  const [exists, setExists] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    fetch(profile.resumeUrl, { method: "HEAD" })
      .then((r) => setExists(r.ok))
      .catch(() => setExists(false));
  }, []);

  return (
    <section id="resume" className="relative py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Resume"
          title={
            <>
              Grab the <span className="text-gradient">PDF</span>.
            </>
          }
          description="A one-page resume I keep updated alongside this site. Download it, print it, pass it along — whatever's useful."
        />

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Left — meta + buttons */}
          <Reveal>
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-border bg-card/40 p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="size-6" />
                  </span>
                  <div>
                    <p className="font-sora text-lg font-semibold">
                      Showket_Farooq_Resume.pdf
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {exists ? "Available · ~1 page" : "Drop a PDF at /public/resume.pdf"}
                    </p>
                  </div>
                </div>

                <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Name
                    </dt>
                    <dd className="mt-0.5 font-medium">{profile.name}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Role
                    </dt>
                    <dd className="mt-0.5 font-medium">{profile.shortTitle}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Location
                    </dt>
                    <dd className="mt-0.5 font-medium">{profile.location}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Status
                    </dt>
                    <dd className="mt-0.5 font-medium text-emerald-400">
                      {profile.status}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                  <Button asChild>
                    <a href={profile.resumeUrl} download>
                      <Download className="size-4" />
                      Download Resume
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                      <Eye className="size-4" />
                      Preview
                    </a>
                  </Button>
                </div>

                {!exists && (
                  <p className="mt-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-2.5 text-[11px] text-amber-400/90">
                    No PDF found yet. Add one at{" "}
                    <code className="rounded bg-card px-1 font-mono">
                      /public/resume.pdf
                    </code>{" "}
                    and this banner disappears automatically.
                  </p>
                )}
              </div>

              <ul className="grid grid-cols-2 gap-3 text-sm">
                {[
                  "Education & timeline",
                  "Technical skills",
                  "Featured projects",
                  "Contact details",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 rounded-lg border border-border bg-card/30 px-3 py-2 text-muted-foreground"
                  >
                    <CheckCircle2 className="size-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Right — preview mockup */}
          <Reveal delay={0.12}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
              <motion.div
                whileHover={{ rotate: 0, y: -4 }}
                initial={{ rotate: -1.5 }}
                transition={{ type: "spring", damping: 18, stiffness: 200 }}
                className="relative aspect-[1/1.414] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
              >
                {/* paper */}
                <div className="absolute inset-0 bg-background" />
                <div className="absolute inset-0 bg-grid bg-grid-fade opacity-40" />

                {/* mock content */}
                <div className="relative flex h-full flex-col p-7">
                  <div className="flex items-start justify-between border-b border-border pb-4">
                    <div>
                      <div className="font-sora text-xl font-bold">
                        {profile.name}
                      </div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">
                        {profile.shortTitle}
                      </div>
                    </div>
                    <div className="text-right text-[10px] text-muted-foreground">
                      <div>{profile.email}</div>
                      <div>{profile.githubUsername}</div>
                    </div>
                  </div>

                  <ResumeLine label="Profile" delay={0.1} />
                  <ResumeLine label="Skills" delay={0.2} />
                  <ResumeLine label="Projects" delay={0.3} />
                  <ResumeLine label="Education" delay={0.4} />

                  <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-[10px] text-muted-foreground">
                    <span>{profile.location}</span>
                    <span className="font-mono">v1.0 · 2026</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ResumeLine({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 1, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="mt-4"
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-primary">
        {label}
      </p>
      <div className="mt-2 space-y-1.5">
        <div className="h-2 w-full rounded bg-muted-foreground/15" />
        <div className="h-2 w-5/6 rounded bg-muted-foreground/15" />
        <div className="h-2 w-2/3 rounded bg-muted-foreground/15" />
      </div>
    </motion.div>
  );
}
