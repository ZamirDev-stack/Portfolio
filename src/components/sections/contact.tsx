"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { profile, socials } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "@/components/bits/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export function Contact() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = React.useState<string>("");

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      e.email = "Please enter a valid email.";
    if (form.subject.trim().length < 3) e.subject = "Subject is too short.";
    if (form.message.trim().length < 10) e.message = "Message is too short.";
    return e;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.website) return; // bot
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setFeedback(json.error ?? "Something went wrong. Please try again.");
        if (json.field) {
          setErrors({ [json.field]: json.error } as FieldErrors);
        }
        return;
      }
      setStatus("success");
      setFeedback(json.message ?? "Thanks!");
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch {
      setStatus("error");
      setFeedback("Network error. Please try again or email me directly.");
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          align="center"
          title={
            <>
              Let&apos;s build something{" "}
              <span className="text-gradient">great</span>.
            </>
          }
          description="Internship, entry-level role, open-source collaboration, or just a hello — my inbox is open."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left — direct channels */}
          <Reveal>
            <div className="flex h-full flex-col gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Email
                  </p>
                  <p className="truncate font-medium text-foreground group-hover:text-primary">
                    {profile.email}
                  </p>
                </div>
              </a>

              {socials
                .filter((s) => s.label !== "Email")
                .map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5 transition-colors hover:border-primary/40"
                  >
                    <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                      {s.label === "GitHub" && <Github className="size-5" />}
                      {s.label === "LinkedIn" && <Linkedin className="size-5" />}
                    </span>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {s.label}
                      </p>
                      <p className="truncate font-medium text-foreground group-hover:text-primary">
                        {s.handle}
                      </p>
                    </div>
                  </a>
                ))}

              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/40 p-5">
                <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Location
                  </p>
                  <p className="font-medium text-foreground">{profile.location}</p>
                </div>
              </div>

              <div className="mt-auto rounded-2xl border border-primary/30 bg-primary/5 p-5">
                <p className="flex items-center gap-2 font-medium text-emerald-400">
                  <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                  {profile.status}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.availableFor}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="relative flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-6 sm:p-7"
            >
              {/* honeypot */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={update("website")}
                tabIndex={-1}
                autoComplete="off"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                aria-hidden
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" error={errors.name} htmlFor="name">
                  <Input
                    id="name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your name"
                    autoComplete="name"
                   
                    aria-invalid={Boolean(errors.name)}
                  />
                </Field>
                <Field label="Email" error={errors.email} htmlFor="email">
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                   
                    aria-invalid={Boolean(errors.email)}
                  />
                </Field>
              </div>

              <Field label="Subject" error={errors.subject} htmlFor="subject">
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="What is this about?"
                 
                  aria-invalid={Boolean(errors.subject)}
                />
              </Field>

              <Field label="Message" error={errors.message} htmlFor="message">
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell me a bit about what you're building, what you need, and the timeline."
                  rows={5}
                  className="resize-none"
                 
                  aria-invalid={Boolean(errors.message)}
                />
              </Field>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[11px] text-muted-foreground">
                  Replies usually within 1–2 days.
                </p>
                <Button type="submit" disabled={status === "loading"} className="group min-w-[140px]">
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </div>

              {/* feedback */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-start gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300"
                    role="status"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                    <div>
                      <p className="font-medium">Message sent.</p>
                      <p className="mt-0.5 text-emerald-300/80">{feedback}</p>
                    </div>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />
                    <p>{feedback}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-medium text-foreground">
        {label}
      </Label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-rose-400" role="alert">
          <AlertCircle className="size-3" />
          {error}
        </p>
      )}
    </div>
  );
}
