import { NextResponse } from "next/server";
import { profile } from "@/lib/portfolio-data";

export const runtime = "edge";
export const revalidate = 3600; // 1 hour

type Repo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

type Event = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload?: Record<string, unknown>;
};

async function gh<T>(path: string): Promise<T | null> {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "showket-portfolio",
    },
  });
  if (!res.ok) return null;
  return res.json() as Promise<T>;
}

export async function GET() {
  const user = profile.githubUsername;
  if (!user) {
    return NextResponse.json(
      { error: "GitHub username not configured" },
      { status: 400 }
    );
  }

  try {
    const [userRes, reposRes, eventsRes, langsRes] = await Promise.allSettled([
      gh<{ login: string; name: string | null; bio: string | null; avatar_url: string; followers: number; following: number; public_repos: number; html_url: string; created_at: string }>(`/users/${user}`),
      gh<Repo[]>(`/users/${user}/repos?per_page=100&sort=updated`),
      gh<Event[]>(`/users/${user}/events/public?per_page=30`),
      gh<Record<string, number>>(`/users/${user}/repos?per_page=100`).then(async () => {
        // language aggregation from repos
        const repos = await gh<Repo[]>(`/users/${user}/repos?per_page=100&sort=updated`);
        if (!repos) return {};
        const totals: Record<string, number> = {};
        for (const r of repos) {
          if (!r.language) continue;
          totals[r.language] = (totals[r.language] ?? 0) + 1;
        }
        return totals;
      }),
    ]);

    if (userRes.status !== "fulfilled" || !userRes.value) {
      return NextResponse.json(
        { error: "GitHub user not found", user: profile.githubUsername },
        { status: 404 }
      );
    }

    const userData = userRes.value;
    const repos = reposRes.status === "fulfilled" && reposRes.value ? reposRes.value : [];
    const events = eventsRes.status === "fulfilled" && eventsRes.value ? eventsRes.value : [];
    const langs = langsRes.status === "fulfilled" && langsRes.value ? langsRes.value : {};

    // top repos by stars (non-fork, non-archived)
    const topRepos = repos
      .filter((r) => !r.fork && !r.archived)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

    // recent push events -> simple activity feed
    const recentEvents = events
      .filter((e) => ["PushEvent", "CreateEvent", "ForkEvent", "WatchEvent", "PullRequestEvent"].includes(e.type))
      .slice(0, 5)
      .map((e) => ({
        type: e.type,
        repo: e.repo?.name ?? "",
        created_at: e.created_at,
      }));

    // language breakdown (top 5)
    const languages = Object.entries(langs)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json(
      {
        user: userData,
        topRepos,
        totalStars,
        recentEvents,
        languages,
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        joined: userData.created_at,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data", detail: String(err) },
      { status: 500 }
    );
  }
}
