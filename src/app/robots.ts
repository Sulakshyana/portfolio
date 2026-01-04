import type { MetadataRoute } from "next";
import { ME } from "@/config/constant";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${ME.seo.siteUrl}/sitemap.xml`,
  };
}
