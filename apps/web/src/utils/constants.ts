export const site_details = {
  full_name: "Paradoxe Ngwasi",
  full_name_title: "Paradoxe Ng",
  firstname: "Paradoxe",
  lastname_abbr: "Ng",
  website: "https://pngwasi.me",
};

export const SOCIALS = {
  github: "https://github.com/paradoxe35",
  linkedin: "https://www.linkedin.com/in/paradoxe-ngwasi-476727130",
  twitter: "https://twitter.com/paradoxe_ng",
};

// SEO Constants
export const SEO = {
  title: {
    default: `${site_details.full_name} - Full-Stack Developer Portfolio`,
    template: `%s | ${site_details.full_name}`,
  },
  description: {
    default: "Experienced Full-Stack Developer specializing in React, Next.js, Laravel, and Node.js. Building scalable web applications with modern technologies.",
    home: `${site_details.full_name} - Full-Stack Developer with ${new Date().getFullYear() - 2017}+ years of experience building scalable web applications with React, Next.js, Laravel, Node.js, and modern technologies.`,
    homeShort: `Experienced developer with ${new Date().getFullYear() - 2017}+ years building scalable web applications. Specializing in React, Next.js, Laravel, and Node.js.`,
    works: "Explore my portfolio of web development projects. From full-stack applications to innovative solutions using React, Next.js, Laravel, and more.",
    contact: "Get in touch to discuss your next project. Let's collaborate and build something amazing together using modern web technologies.",
  },
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js",
    "Laravel",
    "Node.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
    site_details.full_name,
  ],
  openGraph: {
    siteName: `${site_details.full_name} Portfolio`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/paradoxe-ngwasi.jpg",
        width: 1200,
        height: 630,
        alt: `${site_details.full_name} - Full-Stack Developer`,
      },
    ],
  },
};

export const FIREBASE_CONFIG = require("@repo/firebase-config/config.json");

export const FIRECMS_ADMIN_EMAI = process.env.NEXT_PUBLIC_FIRECMS_ADMIN_EMAIL;
