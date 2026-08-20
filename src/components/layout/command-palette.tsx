"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Home,
  User,
  Cpu,
  FolderGit2,
  GraduationCap,
  Map,
  Trophy,
  Github,
  FileText,
  Mail,
  Sun,
  Moon,
  Terminal,
  Sparkles,
} from "lucide-react";
import { useTheme } from "next-themes";
import { navLinks, profile, socials } from "@/lib/portfolio-data";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onCustom = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onCustom);
    };
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      50
    );
  };

  const navIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    home: Home,
    about: User,
    skills: Cpu,
    projects: FolderGit2,
    education: GraduationCap,
    journey: Map,
    achievements: Trophy,
    github: Github,
    resume: FileText,
    contact: Mail,
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          {navLinks.map((l) => {
            const Icon = navIcons[l.id] ?? Home;
            return (
              <CommandItem
                key={l.id}
                onSelect={() => goTo(l.id)}
                value={`${l.label} navigate go to`}
              >
                <Icon className="size-4" />
                <span>Go to {l.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              setOpen(false);
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
            Toggle theme
            <CommandShortcut>⌘J</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent("open-easter-egg"));
            }}
            value="easter egg konami secret"
          >
            <Sparkles className="size-4" />
            <span className="text-primary">Tell me a secret</span>
            <CommandShortcut>↑↑↓↓</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          {socials.map((s) => (
            <CommandItem
              key={s.label}
              onSelect={() => {
                setOpen(false);
                window.open(s.href, "_blank", "noreferrer");
              }}
              value={`${s.label} ${s.handle} open external`}
            >
              <span className="text-muted-foreground">→</span>
              Open {s.label}
              <span className="ml-auto text-xs text-muted-foreground">
                {s.handle}
              </span>
            </CommandItem>
          ))}
          <CommandItem
            onSelect={() => {
              setOpen(false);
              window.open(profile.resumeUrl, "_blank");
            }}
            value="resume cv download"
          >
            <FileText className="size-4" />
            Download resume
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Developer">
          <CommandItem
            onSelect={() => {
              setOpen(false);
              console.log(
                "%cHey, you found the console. 👋",
                "font-size:16px;font-weight:bold;color:#10b981"
              );
              console.log(
                "%cI'm Showket — open to internships and entry-level roles. Reach me at " +
                  profile.email,
                "color:#94a3b8"
              );
              console.log(
                "%c— and yes, this site was built with Next.js, TypeScript, Tailwind, and Framer Motion.",
                "color:#64748b;font-style:italic"
              );
            }}
            value="console dev developer about"
          >
            <Terminal className="size-4" />
            Print dev greeting
            <CommandShortcut>F12</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
