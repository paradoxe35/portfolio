import Header from "@/components/header";
import Titles from "@/components/titles";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import { site_details, SOCIALS } from "@/utils/constants";
import { getResume } from "@/data/actions/resume";
import { BackgroundPattern } from "@/components/background-pattern";
import { ContactForm } from "@/components/contact-form";
import { ResumeDownload } from "@/components/resume-download";
import { entityToJSON } from "@/utils/entity-to-json";
import { Resume } from "@repo/contracts";
import { cn } from "@/utils/cn";
import Link from "next/link";

export const revalidate = 30;

function ContactInfo() {
  return (
    <div className={cn("animate-fadeUp animation-delay-100")}>
      <h3 className="text-xl font-bold text-neutral-8 dark:text-neutral-2 mb-6">
        Get in Touch
      </h3>

      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
              "bg-primary/10 dark:bg-white/10",
            )}
          >
            <svg
              className="w-5 h-5 text-primary dark:text-primary-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-neutral-5 dark:text-neutral-4 mb-1">
              Email
            </p>
            <a
              href="mailto:contact@pngwasi.me"
              className="text-neutral-8 dark:text-neutral-2 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              contact@pngwasi.me
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
              "bg-primary/10 dark:bg-white/10",
            )}
          >
            <svg
              className="w-5 h-5 text-primary dark:text-primary-light"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-neutral-5 dark:text-neutral-4 mb-1">
              Location
            </p>
            <p className="text-neutral-8 dark:text-neutral-2">
              Remote / Worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10">
        <p className="text-sm text-neutral-5 dark:text-neutral-4 mb-4">
          Connect with me
        </p>
        <div className="flex gap-3">
          <Link
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-neutral-2 dark:bg-white/10",
              "hover:bg-primary/10 dark:hover:bg-white/20",
              "transition-colors",
            )}
          >
            <svg
              className="w-5 h-5 fill-neutral-7 dark:fill-neutral-3"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
          <Link
            href={SOCIALS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-neutral-2 dark:bg-white/10",
              "hover:bg-primary/10 dark:hover:bg-white/20",
              "transition-colors",
            )}
          >
            <svg
              className="w-5 h-5 fill-neutral-7 dark:fill-neutral-3"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </Link>
          <Link
            href={SOCIALS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-neutral-2 dark:bg-white/10",
              "hover:bg-primary/10 dark:hover:bg-white/20",
              "transition-colors",
            )}
          >
            <svg
              className="w-5 h-5 fill-neutral-7 dark:fill-neutral-3"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

async function About() {
  const resumeData = await getResume();
  const resume = resumeData ? (entityToJSON(resumeData) as Resume) : null;

  return (
    <section className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      <Container>
        <div className="relative z-10">
          <Titles
            title="About"
            subtitle="A bit about me"
            className="animate-fadeUp animation-delay-200"
          />

          <div className="prose prose-lg dark:prose-invert max-w-3xl mb-12 animate-fadeUp animation-delay-200">
            <p className="text-neutral-7 dark:text-neutral-3 leading-relaxed">
              {`I'm ${site_details.full_name}, a Software Engineer since 2017,
              working in web development and DevOps. I build web applications
              and automation tools using TypeScript, Node.js, PHP, and Go.
              I also manage cloud infrastructure, CI/CD pipelines, and
              container deployments.`.replace(/\s+/g, " ")}
            </p>
          </div>

          <ResumeDownload resume={resume} />
        </div>
      </Container>
    </section>
  );
}

export default function ContactPage() {
  return (
    <Application>
      <main>
        <Header
          title="Contact"
          subtitle="Let's discuss your next project or collaboration opportunity"
        />
        <section className="py-24 min-h-[60vh] bg-neutral-1/50 dark:bg-dark-bg-secondary relative">
          <BackgroundPattern variant="diagonal" />

          <Container>
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Contact Info - Left Column */}
                <div className="lg:col-span-2">
                  <ContactInfo />
                </div>

                {/* Contact Form - Right Column */}
                <div className="lg:col-span-3">
                  <ContactForm className="animate-fadeUp animation-delay-200" />
                </div>
              </div>
            </div>
          </Container>
        </section>

        <About />
      </main>
    </Application>
  );
}
