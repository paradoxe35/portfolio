import { MetadataRoute } from "next";
import { getProjects } from "@/data/actions/project";
import { site_details } from "@/utils/constants";

export const revalidate = 5;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site_details.website;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all projects for dynamic routes
  const projects = await getProjects();

  const projectUrls = projects.map((project) => ({
    url: `${siteUrl}/works/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/works`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
