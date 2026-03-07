import { MetadataRoute } from "next";
import { categories } from "@/data/checklists";

const BASE_URL = "https://checklist-seven-woad.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const checklistPages: MetadataRoute.Sitemap = categories.flatMap((cat) =>
    cat.checklists.map((cl) => ({
      url: `${BASE_URL}/${cat.slug}/${cl.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }))
  );

  return [...home, ...categoryPages, ...checklistPages];
}
