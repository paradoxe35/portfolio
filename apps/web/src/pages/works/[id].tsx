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
    <section className="py-24 min-h-screen bg-gradient-to-br from-white via-neutral-1 to-neutral-2 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-black">
      <Container>
        {/* Project Header */}
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary-light bg-primary/10 dark:bg-primary-light/10 rounded-full mb-4">
                {project.technology}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-9 dark:text-neutral-1">
                Project Overview
              </h2>
            </div>

            {project.link && (
              <Link
                href={project.link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 text-neutral-9 dark:text-neutral-1 font-medium rounded-xl hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 hover:scale-105"
                target="_blank"
              >
                View Live Project
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Project Content */}
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-8">
          <div className="prose prose-lg max-w-none dark:prose-invert 
            prose-headings:text-neutral-9 dark:prose-headings:text-neutral-1 
            prose-p:text-neutral-7 dark:prose-p:text-neutral-3
            prose-a:text-primary dark:prose-a:text-primary-light prose-a:no-underline hover:prose-a:underline
            prose-strong:text-neutral-8 dark:prose-strong:text-neutral-2
            prose-code:text-primary dark:prose-code:text-primary-light prose-code:bg-white/20 dark:prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm
            prose-pre:bg-neutral-9 dark:prose-pre:bg-neutral-8 prose-pre:border prose-pre:border-white/20 dark:prose-pre:border-white/10 prose-pre:rounded-xl
            prose-blockquote:border-l-primary dark:prose-blockquote:border-l-primary-light
            prose-img:rounded-xl prose-img:shadow-lg
            prose-hr:border-white/20 dark:prose-hr:border-white/10">
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