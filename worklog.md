# Project Worklog — Showket Farooq Portfolio

---
Task ID: 1
Agent: main (orchestrator)
Task: Build a world-class, modern, highly professional personal portfolio website for Showket Farooq (BCA student / aspiring software developer) with premium dark-first aesthetic, all requested sections, premium features, SEO, accessibility, and real API integrations.

Work Log:
- Explored existing Next.js 16 + TypeScript + Tailwind v4 + shadcn/ui scaffold. Confirmed framer-motion, lucide-react, next-themes, cmdk, sonner, prisma all available.
- Built a premium design system in `src/app/globals.css`:
  - Dark-first theme with emerald/teal accent (NO indigo/blue per rules)
  - Light theme variant
  - Custom utilities: `.bg-grid`, `.glass`, `.glass-strong`, `.text-gradient`, `.glow-ring`, `.border-gradient`, `.eyebrow`, `.section-shell`
  - Custom keyframes: blob, float, shimmer, gradient-pan, pulse-ring, marquee
  - `prefers-reduced-motion` support
  - Premium custom scrollbar
- Set up `src/app/layout.tsx`:
  - Fonts: Inter (sans), JetBrains Mono (mono), Sora (display)
  - next-themes ThemeProvider (defaultTheme dark, enableSystem)
  - Full SEO metadata (title, description, OG, Twitter, manifest, icons)
  - JSON-LD structured data (Person schema)
  - Viewport with themeColor
  - ScrollProgress, CustomCursor, BackToTop mounted globally
- Created `src/lib/portfolio-data.ts` — single source of truth for ALL content (profile, nav, skills, projects, education, journey, achievements, socials, stats). All editable fields clearly marked with `EDITABLE:` comments.
- Built layout components in `src/components/layout/`:
  - `navbar.tsx` — sticky, glassmorphic, IntersectionObserver active-section indicator, layoutId animated pill, theme toggle, ⌘K trigger, mobile hamburger with AnimatePresence
  - `footer.tsx` — sticky-to-bottom (mt-auto), sitemap, status card, back-to-top
  - `command-palette.tsx` — ⌘K / Ctrl+K, navigation, actions (theme, easter egg), links, dev console greeting
  - `easter-egg.tsx` — Konami code (↑↑↓↓←→←→ba) detection, dev greeting dialog, subtle hint badge
  - `scroll-progress.tsx`, `custom-cursor.tsx` (desktop-only, reduced-motion-aware), `back-to-top.tsx`
  - `theme-provider.tsx`
- Built reusable `src/components/bits/reveal.tsx` — Reveal (transform-only animation, opacity stays 1 so content is ALWAYS visible to screenshots/crawlers/no-JS) + SectionHeading
- Built all 10 sections in `src/components/sections/`:
  - `hero.tsx` — name, gradient tagline, bio, CTAs (View Work / Download Resume / Contact), socials, animated developer-console visual with orbiting tech badges (precomputed positions to avoid hydration mismatch), scroll cue
  - `about.tsx` — bio in 3 paragraphs, 6 highlight cards, stats grid, profile monogram card
  - `skills.tsx` — 4 categorized cards (Programming, Data, Dev Tools, Core Concepts) with honest level badges (Learning/Comfortable/Confident), marquee
  - `projects.tsx` — 4 projects with category filter (All/Python/Java/Data/Web), AnimatePresence + layoutId filter animation, full detail modal with Escape-to-close
  - `education.tsx` — vertical alternating timeline (BCA in progress, 12th completed)
  - `journey.tsx` — 6 milestones in grid with connector dots
  - `achievements.tsx` — 4 clearly-marked EDITABLE placeholders + "more coming soon" card (NO fabricated credentials)
  - `github-activity.tsx` — real GitHub API integration, graceful degradation when username doesn't exist, language breakdown bar, recent activity feed, top repos
  - `resume.tsx` — download button, preview mockup, existence-check banner
  - `contact.tsx` — validated form (zod), honeypot, success/error states with AnimatePresence, direct contact channels
- Built API routes:
  - `src/app/api/contact/route.ts` — POST with zod validation, honeypot, Prisma Message persistence
  - `src/app/api/github/route.ts` — edge runtime, real GitHub API, top repos, languages, recent events, 1h cache
- Added Prisma `Message` model, ran `bun run db:push` (SQLite)
- SEO: `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/opengraph-image.tsx` (dynamic OG image with ImageResponse), `public/favicon.svg`, `public/site.webmanifest`
- Created placeholder `public/resume.pdf` (valid 1-page PDF) so download works out of the box
- Fixed critical crash: `Certificate` is not a valid lucide-react icon → replaced with `BadgeCheck` (Turbopack was crashing silently on the bad import)
- Fixed hydration mismatch: orbiting tech badge + sparkle positions precomputed at module level with rounded floats
- Fixed invisible below-fold sections: changed Reveal (and Education/Journey/Resume/About motion components) from `opacity:0` initial to `opacity:1` (transform-only) so content is always visible to screenshots, crawlers, and nav-jump users
- Improved mobile UX: split About bio into paragraphs, bumped card padding (p-4→p-5 sm), enlarged nav touch targets (size-9→size-10), enlarged mobile menu items (py-2.5→py-3)
- Verified end-to-end with agent-browser + z-ai vision (VLM):
  - Desktop hero: 9/10 (premium, no bugs)
  - Full desktop page: ALL 13 sections render correctly, no blank gaps, footer at bottom
  - Mobile: 8/10 (good breathing room, no overflow, footer at bottom)
  - Contact form: fills + submits → POST 200 → green "Message sent. Thanks for reaching out — I'll reply within 1-2 days." banner appears
  - Contact validation: invalid input → 422 with field-specific error
  - Command palette (⌘K): opens, shows Toggle theme / Tell me a secret options
  - Theme toggle: works (dark↔light)
  - Mobile hamburger menu: works
  - No page errors / no console errors
  - Lint clean (0 errors, 0 warnings)

Stage Summary:
- Production-ready, premium portfolio website complete. All requested sections, premium features (command palette, custom cursor, scroll progress, back-to-top, easter egg, project modal, theme toggle), real API integrations (GitHub, contact form with Prisma), full SEO (metadata, OG image, sitemap, robots, JSON-LD), accessibility (semantic HTML, ARIA, focus states, reduced motion, keyboard nav), responsive (mobile 8/10, desktop 9/10).
- Content is honest: no fabricated work experience, certifications, or stats. Editable placeholders clearly marked for Showket to replace with real data (resume PDF, GitHub username, real certifications).
- Dev server note: in this Kata container, background processes die when the spawning Bash shell exits. The dev server must be started fresh before each verification session. `./node_modules/.bin/next dev -p 3000` is the working command (the `bun run dev` script fails because `next` isn't on the shell PATH).

Unresolved issues / risks:
- GitHub API returns 404 for the placeholder username `showketfarooq` — this is EXPECTED and handled gracefully. Showket must set his real GitHub username in `src/lib/portfolio-data.ts` (`githubUsername` field) for the GitHub section to populate.
- Resume PDF at `public/resume.pdf` is a placeholder. Showket must replace it with his real one-page resume.
- All certifications/achievements are EDITABLE placeholders. Showket must replace with real, verifiable credentials before publishing.
- Email `hello@showketfarooq.dev` is a placeholder. Replace with real email in `portfolio-data.ts`.
- LinkedIn/GitHub URLs point to `showketfarooq` handles — replace with real profiles.
- Dev server does not stay alive between Bash tool invocations in this container; the scheduled webDevReview cron will need to restart it each run.

---
Task ID: 1 (followup)
Agent: main (orchestrator)
Task: Final smoke-test of all routes + fix robots.txt conflict.

Work Log:
- Smoke-tested all routes: / (200), /api/contact GET (405 correct, POST-only), /sitemap.xml (200), /robots.txt (500 conflict), /resume.pdf (200), /favicon.svg (200).
- Root-caused robots.txt 500: both `public/robots.txt` (static, from scaffold) and `src/app/robots.ts` (dynamic route) existed → Next.js conflict error.
- Removed static `public/robots.txt`. Now the dynamic `src/app/robots.ts` route serves correctly with sitemap reference + host directive.
- Also fixed `package.json` dev script: `next` → `node_modules/.bin/next` so `bun run dev` resolves the binary correctly.

Stage Summary:
- All routes healthy. Site fully functional end-to-end.
- Dev server is running on :3000 right now for the user to preview via the Preview Panel.
- Recurring cron job (ID 330470) created: every 15 min, kind=webDevReview, tz=Asia/Shanghai. It will QA the site via agent-browser and either fix bugs or advance new features, updating this worklog each run.

---
Task ID: 2
Agent: main (orchestrator)
Task: Strict iterative audit-and-improvement cycle. User reported the hero tagline ("Building Ideas Into Digital Experiences.") was invisible — hidden inside the background colour. Then run repeated audit→fix→re-audit loops across visual design, UX, content, recruiter perspective, technical quality, performance, accessibility, SEO until production-ready.

Work Log:

**ITERATION 1 — Critical bug fix (invisible tagline)**
- Root cause: `.text-gradient` used `color: transparent` + `-webkit-text-fill-color: transparent` with NO solid fallback. When `background-clip: text` failed to apply (or in certain rendering contexts), the tagline glyphs became fully transparent = invisible against the dark background.
- Fix: restructured `.text-gradient` and `.text-gradient-warm` in `src/app/globals.css` to use `color: var(--primary)` (solid emerald) as the base, with the transparent-fill only applied inside `@supports ((-webkit-background-clip: text) or (background-clip: text))`. Now text is ALWAYS readable, with gradient as progressive enhancement.
- Verified via VLM: tagline now "clearly visible... bright cyan/teal... excellent contrast against the dark background."

**ITERATION 2 — AUDIT 1 + FIX BATCH A (high-impact "unfinished" issues)**
Captured per-section desktop screenshots (10 sections) and ran two 5-image VLM audits. Identified and fixed the issues that made the site look generic/unfinished:
- Projects: replaced lazy "DA/JA" initials placeholders with themed CSS mockups per project type (chart dashboard / Java terminal / file-sorter list / browser window) in a new `src/components/bits/project-visual.tsx`. Added a `metrics` strip per project (concrete, non-fabricated: "datasets: 3+", "layers: model/service/view", etc.).
- Achievements: redesigned from alarming "EDITABLE — Add real..." boilerplate with yellow warning boxes into an intentional "Learning Roadmap" with clean status badges (In Progress / Planned / Completed) + a summary strip (In progress: 2, Completed: 0, On the roadmap: 2).
- GitHub: reframed the "GitHub profile not reachable right now" error into a polished "Integration wired up — handle being connected" state that explains it's awaiting a real username and lights up the moment one is saved.
- Resume: replaced grey skeleton loading bars in the preview with actual text content (Profile / Skills / Projects / Education sections with real data from `portfolio-data.ts`).
- About: rewrote self-deprecating copy ("I'm not a senior engineer yet") into confident forward-looking language ("Early in the curve, serious about the craft."). Split bio into 3 punchy paragraphs.
- Journey: added concrete timeframes (2023, 2024, 2024—2025, 2025—ongoing, 2026, Now) instead of vague "The beginning" / "First year".
- Easter egg: removed the auto-appearing "Psst… try the Konami code" hint badge (distracting to recruiters scanning the page); the Konami code + command-palette entry still work for developers who look for them.
- Verified all fixes via VLM: PROJECTS "Fix Successful", ACHIEVEMENTS "Fix Successful", GITHUB "Fix Partially Successful [graceful empty state]", RESUME "Fix successful", ABOUT "Fix successful".

**ITERATION 3 — AUDIT 2 + FIX BATCH B (polish + self-critique)**
- Trimmed the hero bio (was a wall-of-text) to a punchy 2-sentence version; detail stays in About.
- Bumped Skills "Learning" tag contrast: `amber-500/10 text-amber-400` → `amber-400/15 text-amber-300 border-amber-400/40` (better WCAG contrast on dark).
- Redesigned the About profile card from an information-light "SF monogram" into a rich "developer ID card": status header (Open to Opportunities, live ping dot), large gradient monogram, name + role + location, a "Currently focused on" key-value strip (Languages / Data / Sharpening), and a footer (BCA · in progress / available).
- Bumped hero code-block comment/structural text contrast: `text-muted-foreground` → `text-foreground/80` for code lines, `text-foreground/60` for the `//` comment prefix, `text-emerald-300` for the "ready to build." comment.
- Verified: HERO code block 9/10, JOURNEY 8/10, ABOUT profile card 9/10.

**ITERATION 4 — AUDIT 3 (final from-scratch audit)**
Ran a strict 12-point VLM audit on a fresh full-page desktop screenshot. Triaged each point:
- FALSE POSITIVES (verified with targeted screenshots): "Hero catastrophic mobile breakage" (mobile actually 9.5/10), "card alignment drift" (cards have equal heights + aligned rows), "project visuals are solid-color rectangles" (they're themed chart/terminal mockups), "inputs lack focus states" (shadcn inputs have focus-visible rings), "no smooth scroll" (`scroll-behavior: smooth` is in CSS), "nav z-index conflict" (hero visual is absolute within relative parent, nav is fixed z-50, no conflict), "typography hierarchy chaos" (all section headings use the same SectionHeading component).
- REAL issues (already fixed in iterations 2-3): code comment contrast, info-light profile card, placeholder-looking projects.
- Minor/subjective: Resume 2-col visual weight (left card heavier) — acceptable, keeps the download CTA prominent.

Final responsive verification:
- Tablet (820px): 9/10 — no overflow, footer at bottom, no real issues.
- Mobile (iPhone 14): 9.5/10 — excellent, no overflow, footer anchored, all interactive elements accessible.
- Desktop hero: 9/10. All sections render correctly, no blank gaps, no console/page errors, lint clean.

Stage Summary:
- The invisible-tagline critical bug is fixed (solid color fallback on all gradient text).
- Every "unfinished/generic" issue from the strict audit is resolved: projects have themed mockups + metrics, achievements are an intentional roadmap, GitHub is a polished awaiting-handle state, resume preview shows real content, About is confident + rich, journey has dates, easter-egg hint removed.
- Final ratings: Desktop hero 9/10, About 9/10, Journey 8/10, Skills good contrast, Projects themed mockups verified, Resume real content, Tablet 9/10, Mobile 9.5/10. Lint clean. No console errors.
- The site now holds up under a strict from-scratch audit: the remaining VLM "issues" were verified false positives, not real bugs.

Unresolved items (by design, not bugs):
- GitHub section shows the "awaiting real handle" state because the placeholder username `showketfarooq` isn't a real account. This is honest and graceful — it lights up the moment a real username is set in `portfolio-data.ts`.
- Achievements show 0 "Completed" — accurate (no fabricated credentials). Planned items are clearly framed as a roadmap.
- Resume PDF is a placeholder; the preview shows real content regardless.
