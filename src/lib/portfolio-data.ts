/**
 * ============================================================================
 *  PORTFOLIO DATA — single source of truth
 *  Edit this file to update the entire website.
 *  Look for `EDITABLE:` comments for fields you should personalise.
 * ============================================================================
 */

export const profile = {
  name: "Showket Farooq",
  firstName: "Showket",
  lastName: "Farooq",
  initials: "SF",
  title: "BCA Student · Aspiring Software Developer · Tech Enthusiast",
  shortTitle: "Aspiring Software Developer",
  tagline: "Building Ideas Into Digital Experiences.",
  location: "Srinagar, Jammu & Kashmir, India",
  // EDITABLE: real email
  email: "hello@showketfarooq.dev",
  // EDITABLE: real GitHub username
  githubUsername: "showketfarooq",
  githubUrl: "https://github.com/showketfarooq",
  // EDITABLE: real LinkedIn
  linkedinUrl: "https://www.linkedin.com/in/showketfarooq",
  // EDITABLE: real resume path (drop a PDF at /public/resume.pdf)
  resumeUrl: "/resume.pdf",
  status: "Open to Opportunities",
  availableFor: "Internships · Entry-level roles · Open-source collaboration",
  bio: `BCA student and aspiring developer from Srinagar, India. I build with Python and Java, care about clean fundamentals, and ship projects to learn how things actually work.`,
  bioLong: `My journey into software started with curiosity — I wanted to understand how the apps I used every day actually worked. That curiosity turned into Python and Java, then into data analysis, and now into a habit of building.`,

  bioLongParagraphs: [
    `My journey into software started with curiosity — I wanted to understand how the apps I used every day actually worked. That curiosity turned into Python and Java, then into data analysis, and now into a habit of building. I'm pursuing my Bachelor of Computer Applications and treating every semester as a chance to ship something real alongside the coursework.`,
    `I'm strongest in the fundamentals — object-oriented programming, data structures, algorithms — and the core tooling every developer relies on: Git, Linux, and a well-tuned editor. I enjoy turning raw data into something readable, automating the boring parts of my own workflow, and writing code that's clean enough to come back to months later.`,
    `Right now I'm looking for my first real opportunity — an internship, an entry-level role, or an open-source project where I can contribute, learn from experienced engineers, and earn the next step of my career. I take the craft seriously, I ship consistently, and I'm ready to be useful.`,
  ],
} as const;

export type NavLink = { id: string; label: string };

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "journey", label: "Journey" },
  { id: "achievements", label: "Achievements" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export type SkillCategory = {
  title: string;
  icon: string; // lucide icon name
  description: string;
  skills: { name: string; level: "Learning" | "Comfortable" | "Confident" }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    icon: "Code2",
    description: "Languages I write day-to-day and reason about.",
    skills: [
      { name: "Python", level: "Confident" },
      { name: "Java", level: "Comfortable" },
    ],
  },
  {
    title: "Data & Analysis",
    icon: "BarChart3",
    description: "Turning raw data into readable insight.",
    skills: [
      { name: "Pandas", level: "Comfortable" },
      { name: "NumPy", level: "Comfortable" },
      { name: "Matplotlib", level: "Comfortable" },
      { name: "Excel", level: "Confident" },
    ],
  },
  {
    title: "Development & Tools",
    icon: "Terminal",
    description: "The toolchain I actually live in.",
    skills: [
      { name: "Git", level: "Comfortable" },
      { name: "GitHub", level: "Comfortable" },
      { name: "VS Code", level: "Confident" },
      { name: "Linux", level: "Comfortable" },
    ],
  },
  {
    title: "Core Concepts",
    icon: "Brain",
    description: "The fundamentals I keep sharpening.",
    skills: [
      { name: "Object-Oriented Programming", level: "Comfortable" },
      { name: "Data Structures", level: "Comfortable" },
      { name: "Algorithms", level: "Comfortable" },
      { name: "Database Fundamentals", level: "Learning" },
      { name: "Computer Networks", level: "Learning" },
      { name: "Operating Systems", level: "Learning" },
    ],
  },
];

export type ProjectVisual = "chart" | "terminal" | "files" | "browser";

export type Project = {
  id: string;
  title: string;
  blurb: string;
  description: string;
  category: "Python" | "Java" | "Data" | "Web";
  tags: string[];
  features: string[];
  // EDITABLE: add real links
  github?: string;
  demo?: string;
  accent: string; // tailwind gradient classes
  year: string;
  visual: ProjectVisual;
  metrics?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    id: "data-viz",
    title: "Data Analysis & Visualization Suite",
    blurb:
      "An end-to-end pipeline that ingests messy CSV data, cleans it with Pandas, and renders publication-ready charts.",
    description:
      "A personal data-analysis toolkit. It loads CSV datasets, handles missing values, computes summary statistics with NumPy, and produces multi-panel Matplotlib dashboards. I built it to practice the full data workflow — not just plotting, but cleaning, reshaping, and storytelling.",
    category: "Data",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib"],
    features: [
      "Automated cleaning & null-value handling",
      "Multi-panel Matplotlib dashboards",
      "Summary statistics with NumPy",
      "Reusable analysis pipeline",
    ],
    github: "https://github.com/showketfarooq",
    accent: "from-emerald-500/20 to-teal-500/10",
    year: "2025",
    visual: "chart",
    metrics: [
      { label: "datasets", value: "3+" },
      { label: "chart panels", value: "6" },
      { label: "pipeline", value: "CSV→clean→plot" },
    ],
  },
  {
    id: "java-oop",
    title: "Java OOP Console Application",
    blurb:
      "A small, well-structured Java app demonstrating OOP design — encapsulation, inheritance, polymorphism.",
    description:
      "A console-based Java project built to practise object-oriented design. It models a small domain with proper encapsulation, inheritance hierarchies, and clean separation between model, service, and view layers. No frameworks — just careful Java.",
    category: "Java",
    tags: ["Java", "OOP", "Problem Solving"],
    features: [
      "Clean model/service/view layering",
      "Inheritance & polymorphism examples",
      "Input validation & error handling",
      "JUnit-friendly structure",
    ],
    github: "https://github.com/showketfarooq",
    accent: "from-amber-500/20 to-orange-500/10",
    year: "2025",
    visual: "terminal",
    metrics: [
      { label: "layers", value: "model/service/view" },
      { label: "OOP pillars", value: "all 4" },
      { label: "tests", value: "JUnit-ready" },
    ],
  },
  {
    id: "python-automation",
    title: "Python File Automation Utility",
    blurb:
      "A small automation tool that organises a cluttered Downloads folder by extension and date.",
    description:
      "A Python automation script I built to clean up my own Downloads folder. It scans, classifies, and moves files by extension and modification date, with dry-run mode and undo logs. Small, but something I actually use every week.",
    category: "Python",
    tags: ["Python", "File Handling", "Automation"],
    features: [
      "Dry-run preview before moving",
      "Undo log for safe rollback",
      "Custom rules by extension",
      "Cross-platform paths",
    ],
    github: "https://github.com/showketfarooq",
    accent: "from-rose-500/20 to-pink-500/10",
    year: "2024",
    visual: "files",
    metrics: [
      { label: "rules", value: "ext + date" },
      { label: "safety", value: "dry-run + undo" },
      { label: "used", value: "weekly" },
    ],
  },
  {
    id: "portfolio-site",
    title: "This Portfolio Website",
    blurb:
      "A premium, animated, accessible portfolio built with Next.js, TypeScript, Tailwind, and Framer Motion.",
    description:
      "The site you're looking at. Built to be fast, accessible, and genuinely pleasant to navigate — with a command palette, custom cursor, scroll progress, and a real GitHub integration. It's a project in its own right.",
    category: "Web",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    features: [
      "Command palette (⌘K)",
      "GitHub API integration",
      "Accessibility-first markup",
      "Dark/light theme",
    ],
    github: "https://github.com/showketfarooq",
    demo: "#",
    accent: "from-emerald-500/20 to-cyan-500/10",
    year: "2026",
    visual: "browser",
    metrics: [
      { label: "stack", value: "Next.js 16 + TS" },
      { label: "a11y", value: "WCAG-minded" },
      { label: "features", value: "⌘K + cursor + OG" },
    ],
  },
];

export const projectFilters = ["All", "Python", "Java", "Data", "Web"] as const;

export type TimelineItem = {
  id: string;
  title: string;
  org: string;
  period: string;
  status: "Completed" | "In Progress";
  description: string;
  tags?: string[];
};

export const education: TimelineItem[] = [
  {
    id: "bca",
    title: "Bachelor of Computer Applications (BCA)",
    org: "Currently Pursuing",
    period: "2024 — 2027",
    status: "In Progress",
    description:
      "Undergraduate degree focused on computer applications, programming, data structures, databases, and software engineering fundamentals. Building a strong academic foundation alongside hands-on project work.",
    tags: ["Programming", "Databases", "OOP", "DSA"],
  },
  {
    id: "12th",
    title: "Higher Secondary Education",
    org: "12th Passed",
    period: "Completed",
    status: "Completed",
    description:
      "Completed Higher Secondary education. The point where I started treating programming as a serious craft rather than just a subject.",
    tags: ["Foundations"],
  },
];

export type JourneyMilestone = {
  id: string;
  title: string;
  period: string;
  description: string;
  icon: string;
};

export const journey: JourneyMilestone[] = [
  {
    id: "m1",
    title: "Started Learning Programming",
    period: "2023",
    description:
      "Wrote my first lines of code and immediately got hooked on the idea that I could make a machine do exactly what I told it to.",
    icon: "Sparkles",
  },
  {
    id: "m2",
    title: "Python & Java Fundamentals",
    period: "2024",
    description:
      "Built a working grasp of syntax, control flow, functions, and the basics of object-oriented programming in two real languages.",
    icon: "Code2",
  },
  {
    id: "m3",
    title: "Explored Data Analysis & Visualization",
    period: "2024 — 2025",
    description:
      "Picked up Pandas, NumPy, and Matplotlib. Learned to clean, analyse, and visualise real datasets — and to tell a story with the numbers.",
    icon: "BarChart3",
  },
  {
    id: "m4",
    title: "Built Practical Projects",
    period: "2025 — ongoing",
    description:
      "Started shipping — automation utilities, data pipelines, and Java applications. Each one taught me something a tutorial couldn't.",
    icon: "Hammer",
  },
  {
    id: "m5",
    title: "Built This Portfolio",
    period: "2026",
    description:
      "Designed and developed a professional personal site to present my work cleanly and to raise the bar on what I build next.",
    icon: "Globe",
  },
  {
    id: "m6",
    title: "Continuously Improving",
    period: "Now",
    description:
      "Sharpening data structures, algorithms, and core CS fundamentals — and keeping an eye out for my first real opportunity.",
    icon: "TrendingUp",
  },
];

export type Achievement = {
  id: string;
  type: "Certification" | "Course" | "Workshop" | "Academic";
  title: string;
  issuer: string;
  date: string;
  description: string;
  status: "Completed" | "In Progress" | "Planned";
  credentialUrl?: string;
};

export const achievements: Achievement[] = [
  {
    id: "a1",
    type: "Course",
    title: "Python — Core & Data",
    issuer: "Self-directed + coursework",
    date: "Ongoing",
    description:
      "Building working fluency in Python — core syntax, data structures, file handling, and the Pandas / NumPy / Matplotlib stack for data work.",
    status: "In Progress",
  },
  {
    id: "a2",
    type: "Course",
    title: "Java & Object-Oriented Design",
    issuer: "Self-directed + coursework",
    date: "Ongoing",
    description:
      "Practising Java fundamentals and the four pillars of OOP — encapsulation, inheritance, polymorphism, abstraction — through small structured projects.",
    status: "In Progress",
  },
  {
    id: "a3",
    type: "Workshop",
    title: "Data Analysis with Pandas",
    issuer: "Add a real workshop once attended",
    date: "Planned",
    description:
      "On the lookout for a hands-on workshop on data cleaning, analysis, and visualisation. This slot is reserved for the next one I attend.",
    status: "Planned",
  },
  {
    id: "a4",
    type: "Certification",
    title: "Industry certification (TBD)",
    issuer: "To be decided",
    date: "Planned",
    description:
      "Saving space for a recognised developer certification. I'll add the real one here as soon as I sit it — no fabricated credentials in the meantime.",
    status: "Planned",
  },
];

export type SocialLink = {
  label: string;
  href: string;
  icon: string;
  handle: string;
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/showketfarooq",
    icon: "Github",
    handle: "@showketfarooq",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/showketfarooq",
    icon: "Linkedin",
    handle: "Showket Farooq",
  },
  {
    label: "Email",
    href: "mailto:hello@showketfarooq.dev",
    icon: "Mail",
    handle: "hello@showketfarooq.dev",
  },
];

export const stats = [
  { label: "Focus areas", value: "2", suffix: "languages", hint: "Python · Java" },
  { label: "Projects shipped", value: "4", suffix: "+", hint: "and counting" },
  { label: "Current degree", value: "BCA", suffix: "", hint: "in progress" },
  { label: "Status", value: "Open", suffix: "", hint: "to opportunities" },
];

// Technology constellation — floating badges in the hero
export const constellationTech = [
  "Python",
  "Java",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Git",
  "Linux",
  "OOP",
  "DSA",
  "VS Code",
];
