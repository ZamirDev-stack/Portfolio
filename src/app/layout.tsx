import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { BackToTop } from "@/components/layout/back-to-top";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://showketfarooq.dev";
const description =
  "Showket Farooq — BCA student and aspiring software developer from Srinagar, India. Building practical projects with Python, Java, and data tools. Open to opportunities.";
const keywords = [
  "Showket Farooq",
  "software developer",
  "BCA student",
  "Python developer",
  "Java developer",
  "data analysis",
  "portfolio",
  "Srinagar",
  "Jammu and Kashmir",
  "aspiring developer",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Showket Farooq — Aspiring Software Developer",
    template: "%s · Showket Farooq",
  },
  description,
  keywords,
  authors: [{ name: "Showket Farooq", url: siteUrl }],
  creator: "Showket Farooq",
  publisher: "Showket Farooq",
  applicationName: "Showket Farooq Portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Showket Farooq — Aspiring Software Developer",
    description,
    url: siteUrl,
    siteName: "Showket Farooq",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Showket Farooq — Aspiring Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Showket Farooq — Aspiring Software Developer",
    description,
    creator: "@showketfarooq",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c10" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Showket Farooq",
  jobTitle: "Aspiring Software Developer",
  description,
  url: siteUrl,
  image: siteUrl + "/og.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Srinagar",
    addressRegion: "Jammu and Kashmir",
    addressCountry: "India",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Bachelor of Computer Applications",
  },
  knowsAbout: [
    "Python",
    "Java",
    "Data Analysis",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Git",
    "Linux",
    "Object-Oriented Programming",
    "Data Structures",
    "Algorithms",
  ],
  sameAs: [
    "https://github.com/showketfarooq",
    "https://www.linkedin.com/in/showketfarooq",
    "mailto:hello@showketfarooq.dev",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* No-flash theme script: sets the class before hydration to avoid
            any flash and any attribute hydration mismatch on <html>. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=t==='dark'||(!t||t==='system')&&m||(!t&&m);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <ScrollProgress />
          <div className="relative flex min-h-screen flex-col">
            {children}
          </div>
          <BackToTop />
        </ThemeProvider>
        <Toaster />
        <SonnerToaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
