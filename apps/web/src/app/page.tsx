import Titles from "@/components/titles";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import { site_details, SEO, TECHS_STACK } from "@/utils/constants";
import { SkillsGrid } from "@/components/skills-grid";
import { entitiesToJSON } from "@/utils/entity-to-json";
import { getProjects } from "@/data/actions/project";
import { getDefaultSkills, getSkills } from "@/data/actions/skill";
import { Project, Skill } from "@repo/contracts";
import { ProjectCarousel } from "@/components/project-carousel";
import { ProfileAvatar } from "@/components/profile-avatar";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

const PROJECTS_QUERY_LIMIT: number | undefined = 6;

export const metadata: Metadata = {
  title: site_details.full_name,
  description: SEO.description.home,
  openGraph: {
    title: `${site_details.full_name} - Full-Stack Developer`,
    description: SEO.description.homeShort,
    type: "profile",
    images: SEO.openGraph.images,
  },
};

export const revalidate = 30;

// Server Component for Works
async function Works() {
  const projects = entitiesToJSON(
    await getProjects(PROJECTS_QUERY_LIMIT)
  ) as Project[];

  return (
    <section className="py-16 sm:py-20 md:py-[120px] pb-12 sm:pb-16 md:pb-[90px] bg-gradient-to-br from-neutral-1 to-white dark:from-dark-bg-secondary dark:to-dark-bg">
      <Container>
        <Titles title="Portfolio" subtitle="Selected Works" />
        <div className="mt-8">
          <ProjectCarousel projects={projects} />
        </div>
      </Container>
    </section>
  );
}

// Server Component for Skills
async function Skills() {
  const default_skills = getDefaultSkills();
  const skills = entitiesToJSON(await getSkills()) as Skill[];

  // Combine all skills for intelligent grouping
  const allSkills = [...default_skills, ...skills];

  return (
    <section
      id="skills"
      className="py-16 sm:py-20 md:py-[120px] pb-12 sm:pb-16 md:pb-[90px] scroll-mt-20 bg-gradient-to-br from-white to-neutral-1 dark:from-dark-bg dark:to-dark-bg-secondary"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_theme(colors.primary.DEFAULT)_0%,_transparent_50%),_radial-gradient(circle_at_75%_75%,_theme(colors.primary.DEFAULT)_0%,_transparent_50%)]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center pt-32 pb-10 sm:pb-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Introduction */}
              <div className="space-y-3 sm:space-y-4">
                <div className="text-lg text-neutral-7 dark:text-neutral-3 animate-fadeUp">
                  {"Hey, I'm "}
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
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 text-neutral-9 dark:text-neutral-1 font-medium rounded-xl ",
                    "hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-md md:shadow-lg w-full sm:w-auto"
                  )}
                >
                  Contact Me
                </Link>
                <Link
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
                </Link>
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
                {TECHS_STACK.map((tech, i) => (
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
                        "group p-3 md:p-4 rounded-2xl bg-white/80 dark:bg-white/5",
                        "backdrop-blur-md border border-black/10 dark:border-white/10",
                        "transition-all duration-300 hover:scale-110 cursor-default shadow-lg dark:shadow-none",
                        "animate-zoomIn",
                        tech.delay === 50 && "animation-delay-100",
                        tech.delay === 100 && "animation-delay-100",
                        tech.delay === 150 && "animation-delay-200",
                        tech.delay === 200 && "animation-delay-200"
                      )}
                    >
                      <Image
                        src={tech.src}
                        alt={tech.alt}
                        width={90}
                        height={90}
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

export default function Home() {
  return (
    <Application>
      <main>
        <Hero />
        <Skills />
        <Works />
      </main>
    </Application>
  );
}
