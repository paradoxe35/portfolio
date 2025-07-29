import { Metadata } from "next";
import { SEO } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: SEO.description.contact,
  openGraph: {
    title: "Contact - Let's Work Together",
    description: SEO.description.contact,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}