import type { MetadataRoute } from "next";

const navIds = [
  "home",
  "about",
  "skills",
  "projects",
  "education",
  "journey",
  "achievements",
  "github",
  "resume",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://showketfarooq.dev";
  const lastModified = new Date();
  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...navIds.map((id) => ({
      url: `${base}/#${id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
