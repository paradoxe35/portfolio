import Titles from "@/components/titles";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { site_details } from "@/utils/constants";
import { SkillCard } from "@/components/skill-card";
import { SkillsGrid } from "@/components/skills-grid";
import { entitiesToJSON } from "@/utils/entity-to-json";
import { getProjects } from "@/data/actions/project";
import { getDefaultSkills, getSkills } from "@/data/actions/skill";
import { Project, Skill } from "@repo/contracts";
import { ProjectCarousel } from "@/components/project-carousel";
import { ProfileAvatar } from "@/components/profile-avatar";
import { cn } from "@/utils/cn";

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

  // Combine all skills for intelligent grouping
  const allSkills = [...default_skills, ...skills];

  return (
    <section
      id="skills"
      className="py-[120px] pb-[90px] scroll-mt-20 bg-gradient-to-br from-neutral-1 to-white dark:from-dark-bg dark:to-dark-bg-secondary"
    >
      <Container>
        <Titles title="What I can do" subtitle="Building Digital Experiences" />
        <SkillsGrid skills={allSkills} />
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
                <div className="text-lg text-neutral-7 dark:text-neutral-3 animate-fadeUp">
                  Hey, I'm{" "}
                  <span className="text-primary dark:text-primary-light font-semibold">
                    {site_details.firstname}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-9 dark:text-neutral-1 leading-tight animate-fadeUp animation-delay-100">
                  A{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-primary bg-clip-text text-transparent">
                    Software Developer
                  </span>
                </h1>
                <p className="text-lg text-neutral-6 dark:text-neutral-4 max-w-lg leading-relaxed animate-fadeUp animation-delay-100">
                  Building scalable web applications with modern technologies.
                  Passionate about clean code, DevOps, and exceptional user
                  experiences
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fadeUp animation-delay-200">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 text-neutral-9 dark:text-neutral-1 font-medium rounded-xl hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                >
                  Contact Me
                </a>
                <a
                  href="/works"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-neutral-7 dark:text-neutral-3 font-medium hover:text-primary dark:hover:text-primary-light transition-colors w-full sm:w-auto"
                >
                  View Projects
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Content - Tech Stack Icons with Centered Avatar */}
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
                {/* Centered Profile Avatar */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <ProfileAvatar size="lg" delay={300} />
                </div>

                {/* Tech Stack Icons around the avatar */}
                {[
                  {
                    src: "/laravel.svg",
                    alt: "Laravel",
                    delay: 0,
                    position: { top: "20%", left: "10%" },
                  },
                  {
                    src: "/vue.svg",
                    alt: "VueJs",
                    delay: 50,
                    position: { top: "15%", right: "15%" },
                  },
                  {
                    src: "/react.svg",
                    alt: "React",
                    delay: 100,
                    position: { top: "60%", left: "5%" },
                  },
                  {
                    src: "/node.svg",
                    alt: "NodeJs",
                    delay: 150,
                    position: { bottom: "20%", right: "20%" },
                  },
                  {
                    src: "/flutter.svg",
                    alt: "Flutter",
                    delay: 200,
                    position: { top: "40%", right: "10%" },
                  },
                ].map((tech, i) => (
                  <div
                    key={tech.alt}
                    className="absolute animate-float"
                    style={{
                      ...tech.position,
                      animationDelay: `${i * 0.8}s`,
                    }}
                  >
                    <div
                      className={cn(
                        "group p-3 md:p-4 rounded-2xl bg-white/10 dark:bg-white/5",
                        "backdrop-blur-md border border-white/20 dark:border-white/10",
                        "transition-all duration-300 hover:scale-110 cursor-pointer",
                        "animate-zoomIn",
                        tech.delay === 50 && "animation-delay-100",
                        tech.delay === 100 && "animation-delay-100",
                        tech.delay === 150 && "animation-delay-200",
                        tech.delay === 200 && "animation-delay-200",
                      )}
                    >
                      <img
                        src={tech.src}
                        alt={tech.alt}
                        className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 opacity-80 hover:opacity-100 transition-opacity"
                      />
                    </div>
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
