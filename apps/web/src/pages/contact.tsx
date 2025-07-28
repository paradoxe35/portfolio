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

const Alert: React.FC<PropsWithChildren<{ success?: boolean }>> = function ({
  children,
  success,
}) {
  return (
    <div className={`p-4 rounded-lg mb-4 text-sm font-medium animate-fadeInUp ${
      success 
        ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800" 
        : "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800"
    }`}>
      {children}
    </div>
  );
};

const FORMBOLD_FORM_ID = "3G55p";

function Contact() {
  const [state, handleSubmit] = useFormBold(FORMBOLD_FORM_ID);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-dark-surface/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-neutral-3/20 dark:border-dark-border/20">
        <h1 className="text-4xl font-bold mb-4 text-neutral-9 dark:text-neutral-1">
          Let's talk
        </h1>
        <p className="text-neutral-7 dark:text-neutral-4 mb-8">
          Have a project in mind? Send me the details.
        </p>

        {state.succeeded && (
          <Alert success={state.succeeded}>
            Message sent successfully. I'll get back to you soon.
          </Alert>
        )}
        {state.error.status && (
          <Alert success={false}>{state.error.message}</Alert>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              minLength={3}
              className="w-full px-4 py-3 rounded-lg border border-neutral-3 dark:border-neutral-7 bg-white dark:bg-neutral-9/50 text-neutral-9 dark:text-neutral-1 placeholder-neutral-5 dark:placeholder-neutral-5 focus:outline-none focus:border-primary dark:focus:border-primary-light transition-colors"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              className="w-full px-4 py-3 rounded-lg border border-neutral-3 dark:border-neutral-7 bg-white dark:bg-neutral-9/50 text-neutral-9 dark:text-neutral-1 placeholder-neutral-5 dark:placeholder-neutral-5 focus:outline-none focus:border-primary dark:focus:border-primary-light transition-colors"
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
              className="px-8 py-3 bg-primary dark:bg-primary-light text-white font-medium rounded-lg hover:bg-primary-dark dark:hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    <section className="py-24 bg-white dark:bg-dark-bg">
      <Container>
        <Titles
          title="About"
          subtitle="A bit about me"
        />
        <p className="text-neutral-7 dark:text-neutral-3 max-w-3xl mb-8">
          I'm {site_details.full_name}, a web developer focused on building clean, 
          functional applications. I've been working in web development since 2017.
        </p>
        <ResumeComponent resume={resume} />
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
          className="inline-flex items-center gap-2 px-6 py-3 border border-primary dark:border-primary-light text-primary dark:text-primary-light font-medium rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-white transition-all"
          target="_blank"
        >
          Download Resume
          <svg
            className="w-4 h-4"
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
        <Header title="Contact" subtitle="Get in touch" />
        <section className="py-24 min-h-[60vh] bg-gradient-to-br from-neutral-1 to-neutral-2 dark:from-dark-bg-secondary dark:to-dark-bg">
          <Container>
            <Contact />
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