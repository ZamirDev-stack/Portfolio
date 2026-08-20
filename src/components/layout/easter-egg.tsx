"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Terminal, X, Heart } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const [show, setShow] = React.useState(false);
  const [matched, setMatched] = React.useState(0);
  const [hint, setHint] = React.useState(false);

  // Konami sequence detector
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[matched].toLowerCase() || key === KONAMI[matched]) {
        const next = matched + 1;
        setMatched(next);
        if (next === KONAMI.length) {
          setShow(true);
          setMatched(0);
        }
      } else {
        setMatched(key === KONAMI[0].toLowerCase() ? 1 : 0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [matched]);

  // open via custom event from command palette
  React.useEffect(() => {
    const onOpen = () => setShow(true);
    window.addEventListener("open-easter-egg", onOpen);
    return () => window.removeEventListener("open-easter-egg", onOpen);
  }, []);

  // brief hint after 6s idle on home
  React.useEffect(() => {
    const t = setTimeout(() => setHint(true), 6000);
    const dismiss = () => setHint(false);
    window.addEventListener("scroll", dismiss, { once: true, passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", dismiss);
    };
  }, []);

  return (
    <>
      {/* subtle hint badge */}
      <AnimatePresence>
        {hint && !show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-6 z-40 hidden items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur md:flex"
          >
            <Terminal className="size-3.5 text-primary" />
            Psst… try the Konami code.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[90] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur"
              onClick={() => setShow(false)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Developer Easter egg"
              initial={{ scale: 0.85, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 24, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 240 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-primary/30 bg-background p-6 shadow-2xl"
            >
              <div className="pointer-events-none absolute -inset-1 -z-10 bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                  <Terminal className="size-3" />
                  dev_mode
                </span>
                <button
                  onClick={() => setShow(false)}
                  aria-label="Close"
                  className="grid size-8 place-items-center rounded-full border border-border hover:bg-accent"
                >
                  <X className="size-4" />
                </button>
              </div>

              <h3 className="mt-4 font-sora text-2xl font-bold">
                You found me. <span className="text-gradient">Nice.</span>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                If you&apos;re reading this, you probably inspect things the
                same way I do. That instinct — poking at how something works —
                is exactly what makes a good developer.
              </p>

              <div className="mt-5 rounded-xl border border-border bg-card/40 p-4 font-mono text-xs text-muted-foreground">
                <p>
                  <span className="text-emerald-400">$</span> whoami
                </p>
                <p className="mt-1 text-foreground">{profile.name}</p>
                <p className="mt-2">
                  <span className="text-emerald-400">$</span> cat .status
                </p>
                <p className="mt-1 text-foreground">
                  {profile.status} · {profile.availableFor}
                </p>
                <p className="mt-2">
                  <span className="text-emerald-400">$</span> echo $CONTACT
                </p>
                <p className="mt-1 text-foreground">{profile.email}</p>
              </div>

              <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                Built with <Heart className="size-3 fill-primary text-primary" /> and
                a lot of late nights.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
