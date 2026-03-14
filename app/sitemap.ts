import { MetadataRoute } from "next";
import { checklists } from "@/data/checklists";

const BASE_URL = "https://checklist-seven-woad.vercel.app";

const LAST_UPDATED = new Date("2026-03-14");

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

  const checklistPages: MetadataRoute.Sitemap = checklists.map((cl) => ({
    url: `${BASE_URL}/checklist/${cl.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...home, ...checklistPages];
}
