import { MetadataRoute } from "next";
import { categories } from "@/data/checklists";

const BASE_URL = "https://checklist-seven-woad.vercel.app";

const LAST_UPDATED = new Date("2026-03-07");

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: LAST_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const checklistPages: MetadataRoute.Sitemap = categories.flatMap((cat) =>
    cat.checklists.map((cl) => ({
      url: `${BASE_URL}/${cat.slug}/${cl.slug}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }))
  );

  return [...home, ...categoryPages, ...checklistPages];
}
