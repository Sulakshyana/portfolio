import type { MetadataRoute } from "next";
import { ME } from "@/config/constant";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: ME.seo.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${ME.seo.siteUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
