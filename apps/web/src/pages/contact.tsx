import Header from "@/components/header";
import Titles from "@/components/titles";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import Head from "next/head";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import style from "@/styles/modules/contact.module.scss";
import styleHome from "@/styles/modules/home.module.scss";
import { throttle } from "@/utils/functions";
import homeStyle from "@/styles/modules/home.module.scss";
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
    <div className={`${style.alert} ${success ? style.alert__success : ""}`}>
      {children}
    </div>
  );
};

const FORMBOLD_FORM_ID = "3G55p";

function Contact() {
  const [state, handleSubmit] = useFormBold(FORMBOLD_FORM_ID);

  return (
    <div className={style.contact__page}>
      <div className={style.contact__card}>
        <h1
          className={style.section__title}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Contact me
        </h1>
        <p data-aos="fade-up" data-aos-delay="200">
          {`If it's about a project, please give as much detail as possible about
          the project so that i can properly assess the workload your project
          represents.`}
        </p>

        {state.succeeded && (
          <Alert success={state.succeeded}>
            {
              "Your message has been sent successfully, thank you again for showing me this interest."
            }
          </Alert>
        )}
        {!state.error.status && (
          <Alert success={false}>{state.error.message}</Alert>
        )}
        <form
          data-aos="fade-up"
          data-aos-delay="300"
          onSubmit={handleSubmit}
          className={style.contact__form}
          autoComplete="off"
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              minLength={3}
            />
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <textarea
            name="message"
            placeholder="Your message..."
            required
            minLength={15}
          />
          <div>
            <button
              disabled={state.loading}
              className={`${styleHome.project__action} font-sans`}
              type="submit"
            >
              {state.loading ? "..." : "Get in touch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function About({ resume }: { resume: Resume | null }) {
  return (
    <section className={styleHome.skills__section}>
      <Container>
        <Titles
          title="About"
          subtitle="I believe in moving at a sustainable pace and fixing what’s broken."
        />
        <p data-aos="fade-up">
          {`My name is ${site_details.full_name}. I design and manufacture web
          applications that are intuitive, accessible, beautiful and fun. I've
          been doing this passionately since 2017.`}
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
          data-aos="fade-up"
          href={link}
          className={`${homeStyle.project__action}`}
          style={{ borderRadius: "5px" }}
          target="_blank"
        >
          Download Resume
        </Link>
      )}
    </>
  );
}

export default function ContactPage({ resume }: { resume: Resume | null }) {
  const container = useRef<HTMLDivElement>(null);
  const containerParent = useRef<HTMLDivElement>(null);
  const containerChild = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function resize() {
      if (
        container.current &&
        containerParent.current &&
        containerChild.current
      ) {
        const { height } = container.current.getBoundingClientRect();
        containerParent.current.style.minHeight = `${height}px`;
        containerChild.current.style.paddingTop = `${height}px`;
      }
    }

    resize();

    window.addEventListener("resize", throttle(resize, 50));

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Application>
      <Head>
        <title>{"Contact"}</title>
      </Head>
      <main>
        <Header title="" subtitle="" />
        <div className={style.gry__section} ref={containerParent}>
          <div className={style.contact__container} ref={container}>
            <Container>
              <Contact />
            </Container>
          </div>

          <div style={{ width: "100%" }} ref={containerChild}>
            <About resume={resume} />
          </div>
        </div>
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
