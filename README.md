# Showket Farooq — Portfolio

A premium, animated, accessible personal portfolio website built with **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)

---

## Live Sections

| Section | Description |
|---------|-------------|
| **Hero** | Animated developer console visual with orbiting tech badges |
| **About** | Bio, highlights, and stats grid |
| **Skills** | 4 categorized skill cards with honest proficiency levels |
| **Projects** | Filterable project gallery with detailed modals |
| **Education** | Vertical alternating timeline |
| **Journey** | 6 milestones with connector dots |
| **Achievements** | Certifications & courses (editable placeholders) |
| **GitHub Activity** | Real-time GitHub API integration |
| **Resume** | Download button with preview mockup |
| **Contact** | Validated form with Prisma persistence |

---

## Features

### Premium UI/UX
- **Command Palette** — `⌘K` / `Ctrl+K` for quick navigation and actions
- **Custom Cursor** — Desktop-only, reduced-motion-aware
- **Scroll Progress** — Animated top progress bar
- **Back to Top** — Floating button on scroll
- **Theme Toggle** — Dark/Light mode with system preference detection
- **Easter Egg** — Konami code (`↑↑↓↓←→←→ba`) triggers a dev greeting
- **Framer Motion** — Smooth animations throughout

### Technical
- **GitHub API Integration** — Live repos, languages, activity feed (edge runtime, 1h cache)
- **Contact Form** — Zod validation, honeypot spam protection, Prisma/SQLite persistence
- **SEO Optimized** — Metadata, Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt
- **Accessibility** — Semantic HTML, ARIA attributes, focus states, keyboard navigation, `prefers-reduced-motion`
- **Responsive** — Mobile-first design, works across all screen sizes

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router, standalone output) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, `tw-animate-css` |
| Components | shadcn/ui (New York style, Lucide icons) |
| Animation | Framer Motion |
| Forms | React Hook Form + Zod |
| Database | Prisma + SQLite |
| Runtime | Bun |
| Themes | next-themes |
| Icons | Lucide React |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (or [Bun](https://bun.sh/) 1.3+)
- [Git](https://git-scm.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/ZamirDev-stack/Portfolio.git
cd Portfolio

# Install dependencies
bun install
# or
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

### Database Setup

```bash
# Push the Prisma schema to SQLite
bun run db:push
# or
npm run db:push
```

### Development

```bash
# Start the dev server on port 3000
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
bun run build
bun run start
```

---

## Project Structure

```
Portfolio/
├── public/
│   ├── favicon.svg
│   ├── logo.svg
│   ├── resume.pdf          # Replace with your real resume
│   └── site.webmanifest
├── prisma/
│   └── schema.prisma        # Database schema (SQLite)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts   # Contact form endpoint
│   │   │   ├── github/route.ts    # GitHub API proxy
│   │   │   └── route.ts
│   │   ├── globals.css            # Design system & utilities
│   │   ├── layout.tsx             # Root layout (fonts, SEO, theme)
│   │   ├── page.tsx               # Home page (all sections)
│   │   ├── opengraph-image.tsx    # Dynamic OG image
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── bits/
│   │   │   └── reveal.tsx         # Scroll-triggered reveal animation
│   │   ├── layout/
│   │   │   ├── navbar.tsx         # Sticky glassmorphic navbar
│   │   │   ├── footer.tsx
│   │   │   ├── command-palette.tsx
│   │   │   ├── custom-cursor.tsx
│   │   │   ├── scroll-progress.tsx
│   │   │   ├── back-to-top.tsx
│   │   │   └── easter-egg.tsx
│   │   ├── sections/
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── skills.tsx
│   │   │   ├── projects.tsx
│   │   │   ├── education.tsx
│   │   │   ├── journey.tsx
│   │   │   ├── achievements.tsx
│   │   │   ├── github-activity.tsx
│   │   │   ├── resume.tsx
│   │   │   └── contact.tsx
│   │   ├── theme-provider.tsx
│   │   └── ui/                   # 48 shadcn/ui components
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   ├── use-prefers-reduced-motion.ts
│   │   └── use-toast.ts
│   └── lib/
│       ├── db.ts                 # Prisma client
│       ├── portfolio-data.ts     # Single source of truth for all content
│       └── utils.ts
├── Caddyfile                     # Caddy reverse proxy config
├── components.json               # shadcn/ui config
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Customization

All portfolio content is centralized in a single file: **`src/lib/portfolio-data.ts`**

Fields marked with `// EDITABLE:` comments are meant to be personalized:

| Field | Description |
|-------|-------------|
| `profile.name` | Your full name |
| `profile.email` | Your email address |
| `profile.githubUsername` | Your GitHub username |
| `profile.githubUrl` | Your GitHub profile URL |
| `profile.linkedinUrl` | Your LinkedIn profile URL |
| `profile.resumeUrl` | Path to your resume PDF |
| `projects[].github` | Project repository links |
| `projects[].demo` | Live demo URLs |
| `achievements[]` | Your certifications & courses |

### Content Sections

- **Skills** — Add or remove skill categories and individual skills
- **Projects** — Add new projects with categories, tags, and features
- **Education** — Update your education timeline
- **Journey** — Add milestones to your developer journey
- **Socials** — Update social media links

### Styling

- **Theme** — Modify CSS variables in `src/app/globals.css`
- **Colors** — Accent colors are emerald/teal (defined in CSS variables)
- **Fonts** — Inter (sans), JetBrains Mono (mono), Sora (display) in `layout.tsx`
- **Components** — 48 shadcn/ui components in `src/components/ui/`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api` | Health check |
| `POST` | `/api/contact` | Submit contact form (Zod validated, honeypot protected) |
| `GET` | `/api/github` | Proxied GitHub data (repos, languages, activity) |

---

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server on port 3000 |
| `bun run build` | Production build with standalone output |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema to database |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Run Prisma migration |
| `bun run db:reset` | Reset database |

---

## License

This project is private and proprietary.
