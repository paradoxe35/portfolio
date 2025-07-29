import { site_details, SOCIALS, SEO } from "@/utils/constants";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site_details.website;

export function StructuredData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site_details.full_name,
    alternateName: site_details.full_name_title,
    url: siteUrl,
    image: `${siteUrl}/paradoxe-ngwasi.jpg`,
    sameAs: Object.values(SOCIALS),
    jobTitle: "Full-Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "Laravel",
      "PHP",
      "Node.js",
      "JavaScript",
      "Go",
      "Flutter",
      "Vue.js",
      "Software Engineering",
      "Full-Stack Development",
      "DevOps",
    ],
    description: SEO.description.homeShort,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${site_details.full_name} Portfolio`,
    alternateName: `${site_details.full_name_title} Portfolio`,
    url: siteUrl,
    description: SEO.description.default,
    publisher: {
      "@type": "Person",
      name: site_details.full_name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/works?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Works",
        item: `${siteUrl}/works`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Contact",
        item: `${siteUrl}/contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export function ProjectStructuredData({
  title,
  description,
  image,
  technology,
  link,
}: {
  title: string;
  description: string;
  image?: string;
  technology?: string;
  link?: string;
}) {
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: description,
    creator: {
      "@type": "Person",
      name: site_details.full_name,
    },
    ...(image && { image: image }),
    ...(link && { url: link }),
    ...(technology && {
      keywords: technology,
      about: {
        "@type": "Thing",
        name: technology,
      },
    }),
    dateCreated: new Date().toISOString(),
    inLanguage: "en",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
    />
  );
}
