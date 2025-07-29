import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { site_details, SEO } from "@/utils/constants";
import { StructuredData } from "@/components/seo/structured-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site_details.website;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SEO.title,
  description: SEO.description.default,
  keywords: SEO.keywords,
  authors: [{ name: site_details.full_name }],
  creator: site_details.full_name,
  publisher: site_details.full_name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: SEO.title.default,
    description: SEO.description.default,
    url: siteUrl,
    ...SEO.openGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.title.default,
    description: SEO.description.default,
    images: ["/paradoxe-ngwasi.jpg"],
    creator: "@paradoxe_ng",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have the verification codes
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark antialiased">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/paradoxe-ngwasi.jpg" />
        <meta name="theme-color" content="#8a693b" />
        <Script
          id="theme-switcher"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Set dark mode by default, can be overridden by theme toggle
              if (localStorage.getItem('theme') === 'light') {
                document.documentElement.classList.remove('dark');
              }
            `,
          }}
        />
      </head>
      <body>
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
