import Header from "@/components/header";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import Head from "next/head";
import { useEffect, useState } from "react";
import WorksItem from "@/components/works-item";
import { GetStaticProps } from "next";
import { entitiesToJSON } from "@/utils/entity-to-json";
import { getProjects } from "@/data/actions/project";
import { Project } from "@repo/contracts";

type StaticProps = {
  projects: Project[];
};

function WorksItems({ projects }: StaticProps) {
  const [works, setWorks] = useState<Project[]>(projects);

  useEffect(() => {
    getProjects().then((ps) => {
      Array.isArray(ps) && setWorks(ps || []);
    });
  }, []);

  return (
    <section className="py-24 min-h-screen bg-gradient-to-b from-neutral-1 via-white to-neutral-1 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`,
        }} />
      </div>
      <Container>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, i) => (
            <div
              key={work.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
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

export default function Works({ projects }: StaticProps) {
  return (
    <Application>
      <Head>
        <title>{"Works - Portfolio"}</title>
      </Head>
      <main>
        <Header
          title="Works"
          subtitle="Projects that showcase what I can build"
        />
        <WorksItems projects={projects} />
      </main>
    </Application>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const projects = entitiesToJSON(await getProjects());

  return {
    props: {
      projects,
    },
    revalidate: 5,
  };
};
