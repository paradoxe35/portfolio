import Titles from "@/components/titles";
import WorksItem from "@/components/works-item";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import style from "@/styles/modules/home.module.scss";
import { animate } from "@/utils/animate";
import { getBrowserWidth, getRandomArbitrary } from "@/utils/functions";
import { GetStaticProps } from "next";
import { Position } from "@/types";
import { site_details } from "@/utils/constants";
import { SkillCard } from "@/components/skill-card";
import { entitiesToJSON } from "@/utils/entity-to-json";
import { getProjects } from "@/data/actions/project";
import { getDefaultSkills, getSkills } from "@/data/actions/skill";
import { Project, Skill } from "@repo/contracts";

const functions: Function[] = [];
const PROJECTS_QUERY_LIMIT: number | undefined = 6;

function animation(
  images: NodeListOf<HTMLImageElement>,
  positions: Position[],
  anime: boolean = true
) {
  images.forEach((el, i) => {
    el.style.top = `${positions[i].top || getRandomArbitrary(10, 80) + i}%`;
    el.style.left = `${positions[i].left || getRandomArbitrary(50, 90) + i}%`;

    const animeFn = anime ? animate(el, 30) : animate(el, 0, 0, 0);
    functions.push(animeFn);

    !anime && functions.forEach((fn) => fn());
  });
}

function Works({ projects }: { projects: Project[] }) {
  // Ref
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const flkty = useRef<Flickity | null>(null);
  const flickity = useRef<typeof import("flickity") | null>(null);

  // State
  const [works, setWorks] = useState<Project[]>(projects);

  useEffect(() => {
    getProjects(PROJECTS_QUERY_LIMIT).then((ps) => {
      Array.isArray(ps) && setWorks(ps || []);
    });
  }, []);

  useEffect(() => {
    if (works.length === 0) {
      return;
    }

    if (!flickity.current) {
      flickity.current = require("flickity");
    }

    function mountFlickity() {
      try {
        if (carouselRef.current && flickity.current) {
          flkty.current = new flickity.current(carouselRef.current, {
            freeScroll: false,
            prevNextButtons: false,
            contain: true,
            draggable: true,
            groupCells: true,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (getBrowserWidth() !== "xs") {
      mountFlickity();
    }

    let sm = getBrowserWidth();

    function responsiveFlickity() {
      try {
        if (window.innerWidth < 768 && sm !== "xs") {
          flkty.current?.destroy();
          sm = getBrowserWidth();
        } else if (window.innerWidth >= 768 && sm === "xs") {
          mountFlickity();
          sm = getBrowserWidth();
        }
      } catch (error) {
        console.log(error);
      }
    }

    window.addEventListener("resize", responsiveFlickity);

    return () => {
      try {
        flkty.current?.destroy();
      } catch (error) {
        console.log(error);
      }

      window.removeEventListener("resize", responsiveFlickity);
    };
  }, [works.length]);

  return (
    <section className={`${style.skills__section} ${style.works__section}`}>
      <Container>
        <Titles title="Works" subtitle="Projects" />
        <div className={style.projects} data-aos="fade-up" ref={carouselRef}>
          {works.map((work, i) => (
            <WorksItem
              key={work.id}
              project={work}
              aosDuration={(i + 1) * 100}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Skills({ skills: defaultSkills }: { skills: Skill[] }) {
  const default_skills = getDefaultSkills();
  const [skills, setSkills] = useState(defaultSkills || []);

  useEffect(() => {
    getSkills().then((skills) => {
      setSkills(skills);
    });
  }, []);

  const splitter = useCallback(
    (acc: Skill[][], skill: Skill, index: number, array: Skill[]) => {
      const limit = 3;

      if (index % limit === 0) {
        acc.push([skill]);
      } else {
        acc[acc.length - 1].push(skill);
      }
      if (index === array.length - 1) {
        const ls = acc[acc.length - 1];
        new Array(limit - ls.length).fill(null).forEach((_, i) => {
          acc[acc.length - 1].push({ icons: [], name: "", id: String(i) });
        });
      }
      return acc;
    },
    []
  );

  return (
    <section className={style.skills__section}>
      <Container>
        <Titles title="Skills" subtitle="Services" />
        <SkillCard skills={default_skills} />
        {skills.reduce(splitter, [] as Skill[][]).map((sklls, i) => {
          return <SkillCard skills={sklls} key={i} />;
        })}
      </Container>
    </section>
  );
}

function dataPositions(sm: boolean = false): Position[] {
  return [
    { left: 59.1977 - (sm ? 30 : 0), top: 59.3489 + (sm ? 10 : 0) },
    { left: 76.4234 - (sm ? 30 : 0), top: 43.2874 + (sm ? 10 : 0) },
    { left: 68.0684 - (sm ? 30 : 0), top: 74.9761 + (sm ? 10 : 0) },
    { left: 67.8254 - (sm ? 30 : 0), top: 27.2987 + (sm ? 10 : 0) },
    { left: 80.8254 - (sm ? 30 : 0), top: 65.2987 + (sm ? 10 : 0) },
  ];
}

function Hero() {
  const objectsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let positions: Position[] = dataPositions(true);

    if (getBrowserWidth() !== "xs") {
      positions = dataPositions(false);
    }

    let sm = getBrowserWidth();

    function responsive() {
      if (window.innerWidth < 768 && sm !== "xs" && objectsRef.current) {
        const images =
          objectsRef.current.querySelectorAll<HTMLImageElement>("img");
        animation(images, dataPositions(true), false);
        sm = getBrowserWidth();
      } else if (
        window.innerWidth >= 768 &&
        sm === "xs" &&
        objectsRef.current
      ) {
        const images =
          objectsRef.current.querySelectorAll<HTMLImageElement>("img");
        animation(images, dataPositions(false), true);
        sm = getBrowserWidth();
      }
    }

    if (objectsRef.current) {
      const images =
        objectsRef.current.querySelectorAll<HTMLImageElement>("img");
      animation(images, positions, sm !== "xs");
    }

    window.addEventListener("resize", responsive);

    return () => {
      window.removeEventListener("resize", responsive);
    };
  }, []);

  return (
    <section>
      <div
        className={style.home__hero}
        style={{ backgroundImage: `url(/paradoxe-ngwasi.png)` }}
      >
        <div className={style.hero__body}>
          <Container>
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className={style.hero__hello}
            >
              Hello, I am
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className={style.hero__title}
            >
              {site_details.full_name}
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className={style.hero__job}
            >
              FullStack Web Developer
            </div>
          </Container>
        </div>
        <div ref={objectsRef} className={style.hero__icons}>
          <img
            data-aos="fade-up"
            data-aos-delay="500"
            src="/laravel.svg"
            alt="Laravel"
          />
          <img
            data-aos="fade-up"
            data-aos-delay="600"
            src="/vue.svg"
            alt="VueJs"
          />
          <img
            data-aos="fade-up"
            data-aos-delay="700"
            src="/react.svg"
            alt="React"
          />
          <img
            data-aos="fade-up"
            data-aos-delay="800"
            src="/node.svg"
            alt="NodeJs"
          />
          <img
            data-aos="fade-up"
            data-aos-delay="900"
            src="/flutter.svg"
            alt="Flutter"
          />
        </div>
      </div>
    </section>
  );
}

export default function Home({ projects, skills }: StaticProps) {
  return (
    <Application>
      <Head>
        <link rel="preload" href="/paradoxe-ngwasi.png" as="image" />

        <title>{`${site_details.full_name_title} - Portfolio`}</title>
      </Head>
      <main>
        <Hero />
        <Skills skills={skills} />
        <Works projects={projects} />
      </main>
    </Application>
  );
}

type StaticProps = {
  projects: Project[];
  skills: Skill[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  const projects = entitiesToJSON(await getProjects(PROJECTS_QUERY_LIMIT));
  const skills = entitiesToJSON(await getSkills());

  return {
    props: {
      projects,
      skills,
    },
    revalidate: 5,
  };
};
