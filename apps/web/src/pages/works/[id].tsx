import Header from "@/components/header";
import Application from "@/components/layouts/application";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";

import style from "@/styles/modules/project.module.scss";
import homeStyle from "@/styles/modules/home.module.scss";
import { Container } from "@/components/layouts/layouts";
import { useEffect, useState } from "react";
import Link from "next/link";
import { entityToJSON } from "@/utils/entity-to-json";
import { RenderMarkdown } from "@/components/react-markdown/markdown";
import { getProjectByID, getProjects } from "@/data/actions/project";
import { Project } from "@repo/contracts";

const Content = ({ project }: { project: Project }) => {
  return (
    <section
      className={`${homeStyle.skills__section} ${homeStyle.works__section}`}
    >
      <Container>
        <div className={style.project}>
          <div className={`${style.columns}`}>
            <div className="w-full">
              <h2 className={style.big} style={{ marginBottom: 10 }}>
                {project.technology}
              </h2>
            </div>

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

          <div className={style.content}>
            <RenderMarkdown>{project.content}</RenderMarkdown>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default function Work({
  project: _project,
}: {
  project: Project | null;
}) {
  const [project, setProject] = useState<Project | null>(_project);

  useEffect(() => {
    if (!_project?.id) {
      return;
    }

    getProjectByID(_project.id).then((data) => setProject(data));
  }, [_project?.id]);

  return (
    <Application>
      {project && (
        <Head>
          <title>{`${project.title} - Project`}</title>
        </Head>
      )}
      <main>
        {project && (
          <>
            <Header
              title={project.title}
              image={project.image}
              subtitle={project.description}
            />
            <Content project={project} />
          </>
        )}
      </main>
    </Application>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let project;
  if (params && typeof params.id === "string") {
    project = await getProjectByID(params.id);
  }

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project: project ? entityToJSON(project) : null,
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();

  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));

  return {
    paths,
    fallback: false,
  };
};
