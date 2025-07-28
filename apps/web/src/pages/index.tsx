import Titles from "@/components/titles";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { site_details } from "@/utils/constants";
import { SkillCard } from "@/components/skill-card";
import { entitiesToJSON } from "@/utils/entity-to-json";
import { getProjects } from "@/data/actions/project";
import { getDefaultSkills, getSkills } from "@/data/actions/skill";
import { Project, Skill } from "@repo/contracts";
import { ProjectCarousel } from "@/components/project-carousel";
import { ProfileAvatar } from "@/components/profile-avatar";

const PROJECTS_QUERY_LIMIT: number | undefined = 6;

function Works({ projects }: { projects: Project[] }) {
  const [works, setWorks] = useState<Project[]>(projects);

  useEffect(() => {
    getProjects(PROJECTS_QUERY_LIMIT).then((ps) => {
      Array.isArray(ps) && setWorks(ps || []);
    });
  }, []);

  return (
    <section className="py-[120px] pb-[90px] bg-gradient-to-br from-white to-neutral-1 dark:from-dark-bg-secondary dark:to-dark-bg">
      <Container>
        <Titles title="Portfolio" subtitle="Selected Works" />
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
    <section id="skills" className="py-[120px] pb-[90px] scroll-mt-20 bg-gradient-to-br from-neutral-1 to-white dark:from-dark-bg dark:to-dark-bg-secondary">
      <Container>
        <Titles title="What I can do" subtitle="Building Digital Experiences" />
        <div className="space-y-8">
          <SkillCard skills={default_skills} />
          {skills.reduce(splitter, [] as Skill[][]).map((sklls, i) => {
            return <SkillCard skills={sklls} key={i} />;
          })}
        </div>
      </Container>
    </section>
  );
}


function Hero() {

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-neutral-1 to-neutral-2 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_theme(colors.primary.DEFAULT)_0%,_transparent_50%),_radial-gradient(circle_at_75%_75%,_theme(colors.purple.500)_0%,_transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-32 pb-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Introduction */}
              <div className="space-y-4">
                <div
                  data-aos="fade-right"
                  data-aos-delay="100"
                  className="text-lg text-neutral-7 dark:text-neutral-3"
                >
                  Hey, I'm <span className="text-primary dark:text-primary-light font-semibold">{site_details.firstname}</span>
                </div>
                <h1
                  data-aos="fade-right"
                  data-aos-delay="200"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-9 dark:text-neutral-1 leading-tight"
                >
                  A <span className="bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary bg-clip-text text-transparent">Software Developer</span>
                </h1>
                <p
                  data-aos="fade-right"
                  data-aos-delay="300"
                  className="text-lg text-neutral-6 dark:text-neutral-4 max-w-lg leading-relaxed"
                >
                  A fullstack developer with solid foundations in design, passionate about crafting seamless user experiences I thrive at the intersection of creativity and code
                </p>
              </div>

              {/* Action Buttons */}
              <div
                data-aos="fade-right"
                data-aos-delay="400"
                className="flex items-center gap-4"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 text-neutral-9 dark:text-neutral-1 font-medium rounded-xl hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  Contact Me
                </a>
                <a
                  href="/works"
                  className="inline-flex items-center gap-2 px-6 py-3 text-neutral-7 dark:text-neutral-3 font-medium hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                  View Projects
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Content - Tech Stack Icons with Centered Avatar */}
            <div className="relative">
              <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
                {/* Centered Profile Avatar */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <ProfileAvatar size="lg" delay={300} />
                </div>

                {/* Tech Stack Icons around the avatar */}
                {[
                  { src: "/laravel.svg", alt: "Laravel", delay: 500, position: { top: "20%", left: "10%" } },
                  { src: "/vue.svg", alt: "VueJs", delay: 600, position: { top: "15%", right: "15%" } },
                  { src: "/react.svg", alt: "React", delay: 700, position: { top: "60%", left: "5%" } },
                  { src: "/node.svg", alt: "NodeJs", delay: 800, position: { bottom: "20%", right: "20%" } },
                  { src: "/flutter.svg", alt: "Flutter", delay: 900, position: { top: "40%", right: "10%" } },
                ].map((tech, i) => (
                  <div
                    key={tech.alt}
                    data-aos="zoom-in"
                    data-aos-delay={tech.delay}
                    className="absolute p-4 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:scale-110 transition-transform duration-300 ease-out animate-float"
                    style={tech.position}
                  >
                    <img
                      src={tech.src}
                      alt={tech.alt}
                      className="w-12 h-12 opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
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
