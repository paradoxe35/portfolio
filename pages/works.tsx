import Header from "components/header";
import Application from "components/layouts/application";
import { Container } from "components/layouts/layouts";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import homeStyle from "styles/modules/home.module.scss";
import WorksItem from "components/works-item";
import { GetStaticProps } from "next";
import { getSerializedProjects } from "models/project";
import { db } from "utils/db";
import { Projects, SerializedProject } from "types";

function WorksItems({ projects }: Projects) {
  const [works, setWorks] = useState<SerializedProject[]>(projects);

  useEffect(() => {
    getSerializedProjects(db.projects).then((ps) => setWorks(ps || []));
  }, []);

  return (
    <section
      className={`${homeStyle.skills__section} ${homeStyle.works__section}`}
    >
      <Container>
        <div className={`${homeStyle.projects} ${homeStyle.projects__grid}`}>
          {works.map((work, i) => (
            <WorksItem key={work.id} project={work} aosDuration={i * 100} />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function Works({ projects }: Projects) {
  return (
    <Application>
      <Head>
        <title>Works</title>
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
      projects: await getSerializedProjects(db.projects),
    },
  };
};
