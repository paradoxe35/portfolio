import { MetadataRoute } from "next";
import { site_details } from "@/utils/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site_details.website;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/", "/private/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
