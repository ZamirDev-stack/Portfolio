"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Users,
  BookOpen,
  GitCommit,
  ExternalLink,
} from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "@/components/bits/reveal";
import { cn } from "@/lib/utils";

type GhData = {
  user: {
    login: string;
    name: string | null;
    bio: string | null;
    avatar_url: string;
    followers: number;
    following: number;
    public_repos: number;
    html_url: string;
    created_at: string;
  } | null;
  topRepos: {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    topics?: string[];
  }[];
  totalStars: number;
  recentEvents: { type: string; repo: string; created_at: string }[];
  languages: { name: string; count: number }[];
  error?: string;
};

const langColors: Record<string, string> = {
  Python: "#3572A5",
  Java: "#b07219",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  "Jupyter Notebook": "#DA5B0B",
};

export function GitHubActivity() {
  const [data, setData] = React.useState<GhData | null>(null);
  const [status, setStatus] = React.useState<"loading" | "ok" | "error">("loading");

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/github", { cache: "force-cache" });
        const json = await res.json();
        if (cancelled) return;
        if (json.error || !json.user) {
          setStatus("error");
          setData(json);
        } else {
          setData(json);
          setStatus("ok");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="section-shell">
        <SectionHeading
          eyebrow="Open source"
          title={
            <>
              Live from <span className="text-gradient">GitHub</span>.
            </>
          }
          description="Real data from the GitHub API — no fabricated stars, no fake commit counts. If a repo is empty, you'll see that honestly too."
        />

        {/* Status / loading / error states */}
        {status === "loading" && <GitHubSkeleton />}
        {status === "error" && (
          <Reveal>
            <div className="mt-10 grid gap-4 rounded-2xl border border-border bg-card/30 p-8 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
                <Github className="size-6" />
              </div>
              <p className="font-sora text-lg font-semibold text-foreground">
                GitHub integration wired up — handle being connected
              </p>
              <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted-foreground">
                This section pulls live data from the GitHub API (repos, stars,
                languages, recent activity). The placeholder handle{" "}
                <code className="rounded bg-card px-1.5 py-0.5 font-mono text-xs text-foreground">
                  @{profile.githubUsername}
                </code>{" "}
                isn&apos;t a real public account yet — drop the real username into{" "}
                <code className="rounded bg-card px-1.5 py-0.5 font-mono text-xs text-foreground">
                  portfolio-data.ts
                </code>{" "}
                and this panel lights up with real repos the moment it&apos;s saved.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Github className="size-4" />
                  Open GitHub
                </a>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-4 py-2 font-mono text-xs text-muted-foreground">
                  <span className="size-1.5 animate-pulse rounded-full bg-amber-400" />
                  awaiting real handle
                </span>
              </div>
            </div>
          </Reveal>
        )}

        {status === "ok" && data?.user && (
          <div className="mt-12 space-y-6">
            {/* profile + stats */}
            <Reveal>
              <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={data.user.avatar_url}
                    alt={`${data.user.login} GitHub avatar`}
                    width={64}
                    height={64}
                    className="size-16 rounded-xl border border-border object-cover"
                  />
                  <div>
                    <p className="font-sora text-lg font-semibold">
                      {data.user.name ?? data.user.login}
                    </p>
                    <p className="text-sm text-muted-foreground">@{data.user.login}</p>
                    {data.user.bio && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {data.user.bio}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                  <Stat icon={BookOpen} label="Repos" value={data.user.public_repos} />
                  <Stat icon={Star} label="Stars" value={data.totalStars} />
                  <Stat icon={Users} label="Followers" value={data.user.followers} />
                  <Stat icon={GitFork} label="Following" value={data.user.following} />
                </div>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              {/* Top repos */}
              <Reveal delay={0.06}>
                <div className="h-full rounded-2xl border border-border bg-card/40 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sora text-base font-semibold">
                      Pinned repositories
                    </h3>
                    <a
                      href={data.user.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    >
                      View all <ExternalLink className="size-3" />
                    </a>
                  </div>

                  {data.topRepos.length === 0 ? (
                    <div className="mt-6 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                      No public repositories yet. Once a repo is published, it
                      will appear here automatically.
                    </div>
                  ) : (
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {data.topRepos.map((r) => (
                        <li key={r.id}>
                          <a
                            href={r.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex h-full flex-col rounded-xl border border-border bg-background/40 p-4 transition-colors hover:border-primary/40"
                          >
                            <div className="flex items-center gap-2">
                              <Github className="size-3.5 text-muted-foreground" />
                              <span className="truncate font-mono text-sm font-medium text-foreground">
                                {r.name}
                              </span>
                            </div>
                            <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                              {r.description ?? "No description provided."}
                            </p>
                            <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                              {r.language && (
                                <span className="inline-flex items-center gap-1">
                                  <span
                                    className="size-2 rounded-full"
                                    style={{
                                      background:
                                        langColors[r.language] ?? "#888",
                                    }}
                                  />
                                  {r.language}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1">
                                <Star className="size-3" />
                                {r.stargazers_count}
                              </span>
                              <span className="inline-flex items-center gap-1">
                                <GitFork className="size-3" />
                                {r.forks_count}
                              </span>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>

              {/* Languages + recent activity */}
              <Reveal delay={0.12}>
                <div className="flex h-full flex-col gap-6">
                  {/* languages */}
                  <div className="rounded-2xl border border-border bg-card/40 p-5">
                    <h3 className="font-sora text-base font-semibold">
                      Most-used languages
                    </h3>
                    {data.languages.length === 0 ? (
                      <p className="mt-4 text-sm text-muted-foreground">
                        Not enough repositories to compute language stats yet.
                      </p>
                    ) : (
                      <>
                        <div className="mt-4 flex h-2 overflow-hidden rounded-full">
                          {data.languages.map((l) => {
                            const total = data.languages.reduce(
                              (a, b) => a + b.count,
                              0
                            );
                            const pct = (l.count / total) * 100;
                            return (
                              <span
                                key={l.name}
                                style={{
                                  width: `${pct}%`,
                                  background:
                                    langColors[l.name] ?? "#888",
                                }}
                                title={`${l.name} · ${Math.round(pct)}%`}
                              />
                            );
                          })}
                        </div>
                        <ul className="mt-3 space-y-1.5">
                          {data.languages.map((l) => {
                            const total = data.languages.reduce(
                              (a, b) => a + b.count,
                              0
                            );
                            const pct = Math.round((l.count / total) * 100);
                            return (
                              <li
                                key={l.name}
                                className="flex items-center justify-between text-xs"
                              >
                                <span className="inline-flex items-center gap-2">
                                  <span
                                    className="size-2.5 rounded-full"
                                    style={{
                                      background:
                                        langColors[l.name] ?? "#888",
                                    }}
                                  />
                                  {l.name}
                                </span>
                                <span className="font-mono text-muted-foreground">
                                  {pct}% · {l.count} repo{l.count > 1 ? "s" : ""}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}
                  </div>

                  {/* recent activity */}
                  <div className="rounded-2xl border border-border bg-card/40 p-5">
                    <h3 className="font-sora text-base font-semibold">
                      Recent activity
                    </h3>
                    {data.recentEvents.length === 0 ? (
                      <p className="mt-4 text-sm text-muted-foreground">
                        No public activity in the last 90 days.
                      </p>
                    ) : (
                      <ul className="mt-4 space-y-3">
                        {data.recentEvents.map((e, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-lg border border-border bg-background/60 text-primary">
                              <GitCommit className="size-3.5" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate">
                                <span className="font-mono text-xs text-muted-foreground">
                                  {e.type.replace("Event", "")}
                                </span>{" "}
                                <span className="font-medium">{e.repo}</span>
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                {formatRelative(e.created_at)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        )}
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
    <div className="bg-card/60 p-4 text-center">
      <Icon className="mx-auto size-4 text-primary" />
      <p className="mt-1.5 font-sora text-xl font-bold">{value}</p>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function GitHubSkeleton() {
  return (
    <div className="mt-12 space-y-6" aria-hidden>
      <div className="h-32 animate-pulse rounded-2xl border border-border bg-card/40" />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="h-64 animate-pulse rounded-2xl border border-border bg-card/40" />
        <div className="h-64 animate-pulse rounded-2xl border border-border bg-card/40" />
      </div>
    </div>
  );
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.round((now - then) / 1000); // seconds
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
}
