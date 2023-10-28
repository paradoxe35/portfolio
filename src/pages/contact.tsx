import Header from "@/ui/components/header";
import Titles from "@/ui/components/titles";
import Application from "@/ui/components/layouts/application";
import { Container } from "@/ui/components/layouts/layouts";
import Head from "next/head";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import style from "@/ui/styles/modules/contact.module.scss";
import styleHome from "@/ui/styles/modules/home.module.scss";
import { throttle } from "@/utils/functions";
import homeStyle from "@/ui/styles/modules/home.module.scss";
import emailjs from "@emailjs/browser";
import constants from "@/utils/constants";
import { getResumeUsecase } from "@/data/usecases/resume";
import Link from "next/link";

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

function Contact() {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [success, setSuccess] = useState<string>();
  const [error, setError] = useState<string>();

  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitted(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        e.target as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID as string
      )
      .then((_) => {
        setSuccess(
          "Your message has been sent successfully, thank you again for showing me this interest."
        );
        const target = e.target as HTMLFormElement;
        Array.from(target.querySelectorAll("[name]")).forEach((element) => {
          if (
            element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement
          ) {
            element.value = "";
          }
        });
      })
      .catch((error) => setError(error.text))
      .finally(() => setSubmitted(false));
  }

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
        {(success || error) && (
          <Alert success={!!success}>{success || error}</Alert>
        )}
        <form
          data-aos="fade-up"
          data-aos-delay="300"
          onSubmit={sendEmail}
          className={style.contact__form}
          autoComplete="off"
        >
          <input type="hidden" name="to_name" value={constants.full_name} />
          <div>
            <input
              type="text"
              name="from_name"
              placeholder="Name"
              required
              minLength={3}
            />
            <input type="email" name="reply_to" placeholder="Email" required />
          </div>
          <textarea
            name="message"
            placeholder="Description"
            required
            minLength={20}
          />
          <div>
            <button
              disabled={submitted}
              className={`${styleHome.project__action} font-sans`}
              type="submit"
            >
              {submitted ? "..." : "Get in touch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function About() {
  return (
    <section className={styleHome.skills__section}>
      <Container>
        <Titles
          title="About"
          subtitle="I believe in moving at a sustainable pace and fixing what’s broken."
        />
        <p data-aos="fade-up">
          {`My name is ${constants.full_name}. I design and manufacture web
          applications that are intuitive, accessible, beautiful and fun. I've
          been doing this passionately since 2017.`}
        </p>
        <Resume />
      </Container>
    </section>
  );
}

function Resume() {
  const [link, setLink] = useState<string | undefined>(undefined);

  useEffect(() => {
    getResumeUsecase().then((resume) => setLink(resume.fileLink));
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

export default function Home() {
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
        <title>{"About"}</title>
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
            <About />
          </div>
        </div>
      </main>
    </Application>
  );
}
