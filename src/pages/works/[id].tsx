import Header from "@/ui/components/header";
import Application from "@/ui/components/layouts/application";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import style from "@/ui/styles/modules/project.module.scss";
import homeStyle from "@/ui/styles/modules/home.module.scss";
import { Container } from "@/ui/components/layouts/layouts";
import { useEffect, useState } from "react";
import { Project } from "@/features/project";
import { getProjectByIDUsecase, getProjectsUsecase } from "@/data/usecases";
import Link from "next/link";

const Content = ({ project }: { project: Project }) => {
  return (
    <section
      className={`${homeStyle.skills__section} ${homeStyle.works__section}`}
    >
      <Container>
        <div className={style.project}>
          <div className={`${style.columns}`}>
            <h2 className={style.big} style={{ marginBottom: 0 }}>
              {project.technology}
            </h2>

            {project.link && (
              <Link
                href={project.link}
                className={`${homeStyle.project__action} ${style.btn}`}
                target="_blank"
              >
                Check it out
                <svg
                  className={homeStyle.icon__action}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  id="arrow"
                  viewBox="0 0 14 14"
                >
                  <path
                    d="M6 1l.6-.6c.3-.3.8-.3 1.1 0l6 6c.4.4.4.8 0 1.1l-6 6.1c-.3.3-.8.3-1 0l-.7-.7a.8.8 0 010-1l3.7-3.6h-9a.7.7 0 01-.7-.8v-1c0-.4.3-.7.8-.7h9L6 2.2A.7.7 0 016 1z"
                    fill="currentColor"
                  ></path>
                </svg>
              </Link>
            )}
          </div>

          <div dangerouslySetInnerHTML={{ __html: project.content }} />
        </div>
      </Container>
    </section>
  );
};

export default function Work({ project: _project }: { project: Project }) {
  const [project, setProject] = useState<Project>(_project);

  useEffect(() => {
    getProjectByIDUsecase(_project.id).then((data) => setProject(data));
  }, [_project.id]);

  return (
    <Application>
      <Head>
        <title>{`Project - ${project.title}`}</title>
      </Head>
      <main>
        <Header
          title={project.title}
          image={project.imageLink}
          subtitle={project.description}
        />
        <Content project={project} />
      </main>
    </Application>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let project;
  if (params && typeof params.id === "string") {
    project = (await getProjectByIDUsecase(params.id)).toJSON();
  }

  return {
    props: { project },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjectsUsecase();

  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));
  return { paths, fallback: false };
};
