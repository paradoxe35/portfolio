import Header from "@/components/header";
import Application from "@/components/layouts/application";
import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { Container } from "@/components/layouts/layouts";
import { useEffect, useState } from "react";
import Link from "next/link";
import { entityToJSON } from "@/utils/entity-to-json";
import { RenderMarkdown } from "@/components/react-markdown/markdown";
import { getProjectByID, getProjects } from "@/data/actions/project";
import { Project } from "@repo/contracts";

const Content = ({ project }: { project: Project }) => {
  return (
    <section className="py-24 min-h-screen bg-gradient-to-br from-neutral-1 to-white dark:from-dark-bg dark:to-dark-bg-secondary">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h2 className="text-primary dark:text-primary-light text-sm font-semibold uppercase tracking-wider mb-2">
                {project.technology}
              </h2>
            </div>

            {project.link && (
              <Link
                href={project.link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary dark:bg-primary-light text-white font-medium rounded-lg hover:bg-primary-dark dark:hover:bg-primary transition-colors"
                target="_blank"
              >
                View project
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
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

          <div className="prose prose-lg max-w-none dark:prose-invert 
            prose-headings:text-neutral-9 dark:prose-headings:text-neutral-1 
            prose-p:text-neutral-7 dark:prose-p:text-neutral-3
            prose-a:text-primary dark:prose-a:text-primary-light prose-a:no-underline hover:prose-a:underline
            prose-strong:text-neutral-8 dark:prose-strong:text-neutral-2
            prose-code:text-primary dark:prose-code:text-primary-light prose-code:bg-neutral-2 dark:prose-code:bg-neutral-8 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-neutral-9 dark:prose-pre:bg-neutral-8 prose-pre:border prose-pre:border-neutral-3 dark:prose-pre:border-neutral-7">
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
    fallback: "blocking",
  };
};