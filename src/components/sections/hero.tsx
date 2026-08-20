"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  MapPin,
} from "lucide-react";
import { profile, socials, constellationTech } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const techIcons: Record<string, string> = {
  Python: "🐍",
  Java: "☕",
  Pandas: "🐼",
  NumPy: "🔢",
  Matplotlib: "📊",
  Git: "🌿",
  Linux: "🐧",
  OOP: "🧩",
  DSA: "⚙️",
  "VS Code": "💻",
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade" />
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] animate-blob" />
      <div className="pointer-events-none absolute top-1/3 -right-24 -z-10 h-[320px] w-[320px] rounded-full bg-teal-500/15 blur-[100px] animate-blob [animation-delay:-6s]" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-[100px] animate-blob [animation-delay:-12s]" />

      <div className="section-shell w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT — copy */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {profile.status}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-sora text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
            >
              <span className="block">{profile.name}</span>
              <span className="mt-2 block text-gradient animate-gradient-text">
                {profile.tagline}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {profile.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-4 text-primary" />
                {profile.location}
              </span>
              <span className="text-border">·</span>
              <span>{profile.availableFor}</span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button size="lg" onClick={() => scrollTo("projects")} className="group">
                View My Work
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="group"
              >
                <a href={profile.resumeUrl} download>
                  <Download className="size-4" />
                  Download Resume
                </a>
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={() => scrollTo("contact")}
              >
                <Mail className="size-4" />
                Contact Me
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Find me
              </span>
              <span className="h-px w-8 bg-border" />
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    aria-label={`${s.label} — ${s.handle}`}
                    className="grid size-10 place-items-center rounded-xl border border-border bg-card/40 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                  >
                    {s.label === "GitHub" && <Github className="size-4" />}
                    {s.label === "LinkedIn" && <Linkedin className="size-4" />}
                    {s.label === "Email" && <Mail className="size-4" />}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — animated visual */}
          <HeroVisual />
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground sm:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          Scroll
        </span>
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-border pt-1.5">
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="size-1 rounded-full bg-primary"
          />
        </span>
      </div>
    </section>
  );
}

// Precompute orbit + sparkle positions at module level so SSR and client
// produce byte-identical style strings (avoids hydration mismatch warnings).
const orbitPositions = constellationTech.map((_, i) => {
  const angle = (i / constellationTech.length) * Math.PI * 2;
  const radius = 46;
  return {
    x: Math.round(Math.cos(angle) * radius * 100) / 100,
    y: Math.round(Math.sin(angle) * radius * 100) / 100,
  };
});

const sparklePositions = [...Array(6)].map((_, i) => {
  const a = (i / 6) * Math.PI * 2;
  const r = 48;
  return {
    left: Math.round(Math.cos(a) * r * 100) / 100,
    top: Math.round(Math.sin(a) * r * 100) / 100,
  };
});

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-square w-full max-w-md lg:max-w-lg"
    >
      {/* central glass card — developer console */}
      <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-2xl glass-strong border border-border shadow-2xl"
          style={{ boxShadow: "0 0 60px -12px color-mix(in oklch, var(--primary) 35%, transparent), 0 20px 50px -20px rgba(0,0,0,0.6)" }}
        >
          {/* window chrome */}
          <div className="flex items-center gap-1.5 border-b border-border bg-card/60 px-4 py-3">
            <span className="size-3 rounded-full bg-rose-400/80" />
            <span className="size-3 rounded-full bg-amber-400/80" />
            <span className="size-3 rounded-full bg-emerald-400/80" />
            <span className="ml-3 font-mono text-[10px] text-muted-foreground">
              showket@dev:~
            </span>
          </div>
          {/* code lines */}
          <div className="space-y-2 p-5 font-mono text-xs sm:text-sm">
            <p className="text-muted-foreground">
              <span className="text-emerald-400">const</span>{" "}
              <span className="text-teal-300">developer</span> = {"{"}
            </p>
            <p className="pl-4 text-foreground/80">
              <span className="text-sky-300">name</span>:{" "}
              <span className="text-amber-300">&apos;{profile.firstName} {profile.lastName}&apos;</span>,
            </p>
            <p className="pl-4 text-foreground/80">
              <span className="text-sky-300">role</span>:{" "}
              <span className="text-amber-300">&apos;{profile.shortTitle}&apos;</span>,
            </p>
            <p className="pl-4 text-foreground/80">
              <span className="text-sky-300">stack</span>:{" "}
              <span className="text-amber-300">[&apos;Python&apos;, &apos;Java&apos;, &apos;Pandas&apos;]</span>,
            </p>
            <p className="pl-4 text-foreground/80">
              <span className="text-sky-300">learning</span>:{" "}
              <span className="text-amber-300">true</span>,
            </p>
            <p className="pl-4 text-foreground/80">
              <span className="text-sky-300">openToWork</span>:{" "}
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="text-emerald-400"
              >
                true
              </motion.span>
              ,
            </p>
            <p className="text-muted-foreground">{"}"};</p>
            <p className="pt-1 text-emerald-300">
              <span className="text-foreground/60">{"// "}</span>
              ready to build.
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block h-[1.1em] w-[7px] translate-y-[0.15em] bg-emerald-400 align-middle"
                style={{ animation: "blink-cursor 1.1s steps(2, start) infinite" }}
              />
            </p>
          </div>
        </motion.div>
      </div>

      {/* orbiting tech badges */}
      {constellationTech.map((tech, i) => {
        const pos = orbitPositions[i];
        return (
          <motion.div
            key={tech}
            className="absolute left-1/2 top-1/2"
            style={{
              x: `${pos.x}%`,
              y: `${pos.y}%`,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.div
              animate={{ rotate: -360 }}
              transition={{
                duration: 30 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex items-center gap-1.5 rounded-full glass-strong border border-border px-3 py-1.5 shadow-md"
            >
              <span className="text-sm">{techIcons[tech] ?? "·"}</span>
              <span className="font-mono text-[10px] font-medium">{tech}</span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* central glow ring */}
      <div className="absolute left-1/2 top-1/2 -z-10 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 animate-pulse-ring" />
      <div className="absolute left-1/2 top-1/2 -z-10 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10" />

      {/* sparkles */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 -z-10"
      >
        {sparklePositions.map((pos, i) => (
          <Sparkles
            key={i}
            className="absolute size-3 text-primary/40"
            style={{
              left: `calc(50% + ${pos.left}%)`,
              top: `calc(50% + ${pos.top}%)`,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
