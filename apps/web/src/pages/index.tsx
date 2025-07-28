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
import { ProjectCarousel } from "@/components/project-carousel";

const functions: Function[] = [];
const PROJECTS_QUERY_LIMIT: number | undefined = 6;

function animation(
  images: NodeListOf<HTMLImageElement>,
  positions: Position[],
  anime: boolean = true,
) {
  images.forEach((el, i) => {
    el.style.top = `${positions[i].top || getRandomArbitrary(10, 80) + i}%`;
    el.style.left = `${positions[i].left || getRandomArbitrary(50, 90) + i}%`;

    // Simplified animation logic - we'll handle this with CSS
    el.style.transform = anime ? `translateZ(0)` : `translateZ(0) scale(1)`;
  });
}

function Works({ projects }: { projects: Project[] }) {
  const [works, setWorks] = useState<Project[]>(projects);

  useEffect(() => {
    getProjects(PROJECTS_QUERY_LIMIT).then((ps) => {
      Array.isArray(ps) && setWorks(ps || []);
    });
  }, []);

  return (
    <section className="py-[120px] pb-[90px] bg-gradient-to-br from-neutral-2 to-neutral-1 dark:from-dark-bg-secondary dark:to-dark-bg">
      <Container>
        <Titles title="Works" subtitle="Projects" />
        <div className="mt-8">
          <ProjectCarousel projects={works} />
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
    [],
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
  // Better positioned icons around the hero content
  if (sm) {
    // Mobile positions - hidden
    return [
      { left: 0, top: 0 },
      { left: 0, top: 0 },
      { left: 0, top: 0 },
      { left: 0, top: 0 },
      { left: 0, top: 0 },
    ];
  }

  // Desktop positions - distributed around the hero
  return [
    { left: 10, top: 20 }, // Top left
    { left: 85, top: 15 }, // Top right
    { left: 5, top: 70 }, // Bottom left
    { left: 90, top: 65 }, // Bottom right
    { left: 50, top: 85 }, // Bottom center
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
        className="min-h-screen pt-32 pb-8 relative z-[1] flex flex-col justify-center items-center overflow-hidden bg-cover bg-[50%] sm:bg-left-center lg:bg-[-30%] xl:bg-[-50%] 2xl:bg-[-70%] bg-no-repeat"
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
              className="text-[45px] sm:text-[60px] lg:text-[80px] xl:text-[90px] leading-none font-bold my-4 max-w-full lg:max-w-[640px] bg-gradient-to-r from-neutral-8 to-neutral-6 dark:from-neutral-1 dark:to-neutral-3 bg-clip-text text-transparent"
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
            <div data-aos="fade-up" data-aos-delay="700" className="mt-8 ml-1">
              <a
                href="#skills"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                Explore My Work
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
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </a>
            </div>
          </Container>
        </div>

        {/* Animated tech icons */}
        <div
          ref={objectsRef}
          className="hidden lg:block absolute inset-0 pointer-events-none"
        >
          {[
            { src: "/laravel.svg", alt: "Laravel", delay: 500 },
            { src: "/vue.svg", alt: "VueJs", delay: 600 },
            { src: "/react.svg", alt: "React", delay: 700 },
            { src: "/node.svg", alt: "NodeJs", delay: 800 },
            { src: "/flutter.svg", alt: "Flutter", delay: 900 },
          ].map((tech, i) => (
            <img
              key={tech.alt}
              data-aos="fade-in"
              data-aos-delay={tech.delay}
              src={tech.src}
              alt={tech.alt}
              className="absolute w-20 h-20 opacity-80 transition-all duration-[2000ms] hover:scale-125 hover:opacity-100 pointer-events-auto animate-float"
              style={{
                transform: "translateZ(0)",
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))",
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
