import Header from "@/ui/components/header";
import Application from "@/ui/components/layouts/application";
import { Container } from "@/ui/components/layouts/layouts";
import Head from "next/head";
import { useEffect, useState } from "react";
import homeStyle from "@/ui/styles/modules/home.module.scss";
import WorksItem from "@/ui/components/works-item";
import { GetStaticProps } from "next";
import { Project } from "@/features/project";
import { getProjectsUsecase } from "@/data/usecases";

type StaticProps = {
  projects: Project[];
};

function WorksItems({ projects }: StaticProps) {
  const [works, setWorks] = useState<Project[]>(projects);

  useEffect(() => {
    getProjectsUsecase().then((ps) => {
      Array.isArray(ps) && setWorks(ps || []);
    });
  }, []);

  return (
    <section
      className={`${homeStyle.skills__section} ${homeStyle.works__section}`}
    >
      <Container>
        <div
          className={`${homeStyle.projects} ${homeStyle.projects__grid}`}
          data-aos="fade-up"
        >
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

export default function Works({ projects }: StaticProps) {
  return (
    <Application>
      <Head>
        <title>{"My achievements"}</title>
      </Head>
      <main>
        <Header
          title="My achievements"
          subtitle="Here is a range of projects I have worked on."
        />
        <WorksItems projects={projects} />
      </main>
    </Application>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      projects: await getProjectsUsecase(),
    },
  };
};
