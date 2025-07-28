import Titles from "@/components/titles";
import WorksItem from "@/components/works-item";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
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

    // Simplified animation logic - we'll handle this with CSS
    el.style.transform = anime ? `translateZ(0)` : `translateZ(0) scale(1)`;
  });
}

function Works({ projects }: { projects: Project[] }) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const flkty = useRef<Flickity | null>(null);
  const flickity = useRef<typeof import("flickity") | null>(null);

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
    <section className="py-[120px] pb-[90px] bg-gradient-to-br from-neutral-2 to-neutral-1 dark:from-dark-bg-secondary dark:to-dark-bg">
      <Container>
        <Titles title="Works" subtitle="Projects" />
        <div 
          className="mt-8 flex gap-8 overflow-x-auto lg:overflow-visible scrollbar-hide" 
          data-aos="fade-up" 
          ref={carouselRef}
        >
          {works.map((work, i) => (
            <div key={work.id} className="min-w-[350px] max-w-[410px] flex-shrink-0">
              <WorksItem
                project={work}
                aosDuration={(i + 1) * 100}
              />
            </div>
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
    <section id="skills" className="py-[120px] pb-[90px] scroll-mt-20">
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
        className="min-h-screen pt-20 pb-8 relative z-[1] flex flex-col justify-center items-center overflow-hidden bg-cover bg-left-center lg:bg-[-30%] xl:bg-[-50%] 2xl:bg-[-70%] bg-no-repeat"
        style={{ backgroundImage: `url(/paradoxe-ngwasi.png)` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-br from-bg-alt/90 via-bg-alt/70 to-primary/20 dark:from-dark-bg/95 dark:via-dark-bg-secondary/80 dark:to-purple-600/20" />
        
        <div className="relative z-[4] p-2 overflow-hidden">
          <Container>
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="mt-4 ml-1 text-primary dark:text-primary-light text-base font-medium tracking-wide"
            >
              Hello, I am
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-[90px] leading-none font-bold my-4 max-w-[640px] bg-gradient-to-r from-neutral-8 to-neutral-6 dark:from-neutral-1 dark:to-neutral-3 bg-clip-text text-transparent max-lg:text-[60px] max-lg:max-w-none"
            >
              {site_details.full_name}
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="500"
              className="text-lg font-medium ml-1 text-neutral-7 dark:text-neutral-3"
            >
              FullStack Web Developer
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay="700"
              className="mt-8 ml-1"
            >
              <a
                href="#skills"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                Explore My Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </Container>
        </div>

        {/* Animated tech icons */}
        <div ref={objectsRef} className="hidden lg:block">
          {[
            { src: "/laravel.svg", alt: "Laravel", delay: 500 },
            { src: "/vue.svg", alt: "VueJs", delay: 600 },
            { src: "/react.svg", alt: "React", delay: 700 },
            { src: "/node.svg", alt: "NodeJs", delay: 800 },
            { src: "/flutter.svg", alt: "Flutter", delay: 900 },
          ].map((tech, i) => (
            <img
              key={tech.alt}
              data-aos="fade-up"
              data-aos-delay={tech.delay}
              src={tech.src}
              alt={tech.alt}
              className="absolute w-16 transition-transform duration-1000 hover:scale-110"
              style={{
                // Initial styles will be set by animation function
                transform: "translateZ(0)",
              }}
            />
          ))}
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