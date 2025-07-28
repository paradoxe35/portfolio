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
    <section className="py-24 min-h-screen bg-gradient-to-br from-neutral-1 to-neutral-2 dark:from-dark-bg dark:to-dark-bg-secondary">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          subtitle="Projects I've worked on"
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
