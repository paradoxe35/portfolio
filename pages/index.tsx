import Titles from "components/titles";
import WorksItem from "components/works-item";
import Application from "components/layouts/application";
import { Container } from "components/layouts/layouts";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "styles/modules/home.module.scss";
import { animate } from "utils/animate";
import { db } from "utils/db";
import { getBrowserWidth, getRandomArbitrary } from "utils/functions";
import { GetStaticProps } from "next";
import { getSerializedProjects } from "models/project";
import { Position, SerializedProject, Skill } from "types";
import constants from "utils/constants";
import { default_skills } from "utils/data";
import { getSerializedSkills } from "models/skill";
import { SkillCard } from "components/skill-card";

const functions: Function[] = [];

function animation(
  imgs: NodeListOf<HTMLImageElement>,
  positions: Position[],
  anime: boolean = true
) {
  imgs.forEach((el, i) => {
    el.style.top = `${positions[i].top || getRandomArbitrary(10, 80) + i}%`;
    el.style.left = `${positions[i].left || getRandomArbitrary(50, 90) + i}%`;

    const animeFn = anime ? animate(el, 30) : animate(el, 0, 0, 0);
    functions.push(animeFn);

    !anime && functions.forEach((fn) => fn());
  });
}

function Works({ projects }: { projects: SerializedProject[] }) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const flkty = useRef<Flickity | null>(null);
  const [works, setWorks] = useState<SerializedProject[]>(projects);

  useEffect(() => {
    getSerializedProjects(db.projects).then((ps) => setWorks(ps || []));
  }, []);

  useEffect(() => {
    let flickity: typeof import("flickity") = require("flickity");

    function mountFlickity() {
      if (carouselRef.current) {
        flkty.current = new flickity(carouselRef.current, {
          freeScroll: false,
          prevNextButtons: false,
          contain: true,
          draggable: true,
          groupCells: true,
        });
      }
    }

    if (getBrowserWidth() !== "xs") {
      mountFlickity();
    }

    let sm = getBrowserWidth();

    function responsiveFlickity() {
      if (window.innerWidth < 768 && sm !== "xs") {
        flkty.current?.destroy();
        sm = getBrowserWidth();
      } else if (window.innerWidth >= 768 && sm === "xs") {
        mountFlickity();
        sm = getBrowserWidth();
      }
    }

    window.addEventListener("resize", responsiveFlickity);

    return () => {
      flkty.current?.destroy();
      window.removeEventListener("resize", responsiveFlickity);
    };
  }, []);

  return (
    <section className={`${style.skills__section} ${style.works__section}`}>
      <Container>
        <Titles title="Works" subtitle="Projects" />
        <div className={style.projects} ref={carouselRef}>
          {works.map((work, i) => (
            <WorksItem key={work.id} project={work} aosDuration={i * 100} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function Skills({ skills: nskills }: { skills: Skill[] }) {
  const [skills, setSkills] = useState(nskills || []);

  useEffect(() => {
    getSerializedSkills(db.skills).then((skll) => {
      console.log(skll);
      
      setSkills(skll);
    });
  }, []);

  const splitter = useCallback(
    (acc: Skill[][], skill: Skill, index: number, array: Skill[]) => {
      if (index % 4 === 0) {
        acc.push([skill]);
      } else {
        acc[acc.length - 1].push(skill);
      }
      if (index === array.length - 1) {
        const ls = acc[acc.length - 1];
        new Array(4 - ls.length).fill(null).forEach(() => {
          acc[acc.length - 1].push({ icons: [], name: "" });
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
        data-aos="fade-up"
        data-aos-duration="500"
        style={{ backgroundImage: `url(/paradoxe-ngwasi.png)` }}
      >
        <div className={style.hero__body}>
          <Container>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              className={style.hero__hello}
            >
              Hello, I am
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className={style.hero__title}
            >
              {constants.full_name}
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className={style.hero__job}
            >
              FullStack Web Developer
            </div>
          </Container>
        </div>
        <div ref={objectsRef} className={style.hero__icons}>
          <img src="/laravel.svg" alt="Laravel" />
          <img src="/vue.svg" alt="VueJs" />
          <img src="/react.svg" alt="React" />
          <img src="/node.svg" alt="NodeJs" />
          <img src="/flutter.svg" alt="Flutter" />
        </div>
      </div>
    </section>
  );
}

export default function Home({ projects, skills }: StaticProps) {
  return (
    <Application>
      <Head>
        <title>{constants.full_name_title} | Portfolio</title>
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
  projects: SerializedProject[];
  skills: Skill[];
};

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      projects: await getSerializedProjects(db.projects),
      skills: await getSerializedSkills(db.skills),
    },
  };
};
