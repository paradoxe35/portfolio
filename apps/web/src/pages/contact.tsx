import Header from "@/components/header";
import Titles from "@/components/titles";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import Head from "next/head";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { site_details } from "@/utils/constants";
import Link from "next/link";
import { GetStaticProps } from "next";
import { entityToJSON } from "@/utils/entity-to-json";
import { getResume } from "@/data/actions/resume";
import { Resume } from "@repo/contracts";
import { useFormBold } from "@/utils/hooks";
import { cn } from "@/utils/cn";
import { BackgroundPattern } from "@/components/background-pattern";

const Alert: React.FC<PropsWithChildren<{ success?: boolean }>> = function ({
  children,
  success,
}) {
  return (
    <div
      className={cn(
        "p-4 rounded-lg mb-4 text-sm font-medium animate-fadeInUp",
        success
          ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
          : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800",
      )}
    >
      {children}
    </div>
  );
};

const FORMBOLD_FORM_ID = "3G55p";

function Contact() {
  const [state, handleSubmit] = useFormBold(FORMBOLD_FORM_ID);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-10 shadow-2xl border border-white/20 dark:border-white/10 hover:border-primary/20 dark:hover:border-primary-light/20 transition-all duration-300">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-neutral-9 to-neutral-8 dark:from-neutral-1 dark:to-neutral-2 bg-clip-text text-transparent">
          Let's Build Something Amazing
        </h1>
        <p className="text-neutral-7 dark:text-neutral-4 mb-8 text-lg">
          Have a project in mind? I'd love to hear about it. Send me the details
          and let's create something exceptional together.
        </p>

        {state.succeeded && (
          <Alert success={state.succeeded}>
            Message sent successfully. I'll get back to you soon.
          </Alert>
        )}
        {state.error.status && (
          <Alert success={false}>{state.error.message}</Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              minLength={3}
              className="w-full px-4 py-3 rounded-lg border border-white/20 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-neutral-9 dark:text-neutral-1 placeholder-neutral-5 dark:placeholder-neutral-5 focus:outline-none focus:border-primary dark:focus:border-primary-light focus:bg-white/70 dark:focus:bg-white/10 transition-all duration-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-lg border border-white/20 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-neutral-9 dark:text-neutral-1 placeholder-neutral-5 dark:placeholder-neutral-5 focus:outline-none focus:border-primary dark:focus:border-primary-light focus:bg-white/70 dark:focus:bg-white/10 transition-all duration-300"
            />
          </div>
          <textarea
            name="message"
            placeholder="Your message..."
            required
            minLength={15}
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-neutral-3 dark:border-neutral-7 bg-white dark:bg-neutral-9/50 text-neutral-9 dark:text-neutral-1 placeholder-neutral-5 dark:placeholder-neutral-5 focus:outline-none focus:border-primary dark:focus:border-primary-light transition-colors resize-none"
          />
          <div>
            <button
              disabled={state.loading}
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary text-white font-medium rounded-lg hover:shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              type="submit"
            >
              {state.loading ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function About({ resume }: { resume: Resume | null }) {
  return (
    <section className="py-24 bg-gradient-to-br from-white to-neutral-1 dark:from-dark-bg-secondary dark:to-dark-bg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 dark:bg-primary-light/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 dark:bg-purple-400/10 rounded-full blur-3xl" />
      <Container>
        <div className="relative z-10">
          <Titles title="About" subtitle="A bit about me" />
          <div className="prose prose-lg dark:prose-invert max-w-3xl mb-12">
            <p className="text-neutral-7 dark:text-neutral-3 leading-relaxed">
              I'm {site_details.full_name}, a Software Engineer with{" "}
              {new Date().getFullYear() - 2017} years of hands-on experience
              building web applications. My journey began in 2017 as a
              self-taught developer, and since then, I've honed my skills across
              the full stack, working with technologies like PHP, Laravel,
              React.js, Next.js, Node.js, and Go.
            </p>
          </div>
          <ResumeComponent resume={resume} />
        </div>
      </Container>
    </section>
  );
}

function ResumeComponent({ resume }: { resume: Resume | null }) {
  const [link, setLink] = useState<string | undefined>(resume?.file);

  useEffect(() => {
    getResume().then((resume) => resume && setLink(resume.file));
  }, []);

  return (
    <>
      {link && (
        <Link
          href={link}
          className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 text-neutral-9 dark:text-neutral-1 font-medium rounded-xl hover:bg-white/30 dark:hover:bg-white/20 hover:scale-105 hover:shadow-xl transition-all duration-300 group"
          target="_blank"
        >
          Download Resume
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </Link>
      )}
    </>
  );
}

export default function ContactPage({ resume }: { resume: Resume | null }) {
  return (
    <Application>
      <Head>
        <title>{"Contact - Portfolio"}</title>
      </Head>
      <main>
        <Header
          title="Contact"
          subtitle="Let's discuss your next project or collaboration opportunity"
        />
        <section className="py-24 min-h-[60vh] bg-gradient-to-b from-neutral-1 via-white to-neutral-1 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg relative">
          <BackgroundPattern variant="diagonal" />

          <Container>
            <div className="relative z-10">
              <Contact />
            </div>
          </Container>
        </section>
        <About resume={resume} />
      </main>
    </Application>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const resume = await getResume();

  return {
    props: {
      resume: resume ? entityToJSON(resume) : null,
    },
    revalidate: 5,
  };
};
