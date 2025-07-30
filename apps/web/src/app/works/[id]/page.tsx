import Header from "@/components/header";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import Link from "next/link";
import { entityToJSON } from "@/utils/entity-to-json";
import { RenderMarkdown } from "@/components/react-markdown/markdown";
import { getProjectByID, getProjects } from "@/data/actions/project";
import { Project } from "@repo/contracts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProjectStructuredData } from "@/components/seo/structured-data";
import { cn } from "@/utils/cn";

export const revalidate = 30;

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectByID(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Project`,
    description: project.description,
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({
    id: project.id,
  }));
}

const Content = ({ project }: { project: Project }) => {
  return (
    <section
      className={cn(
        "pb-24 pt-16 min-h-screen bg-gradient-to-br from-white via-neutral-1 to-neutral-2",
        "dark:from-dark-bg dark:via-dark-bg-secondary dark:to-black"
      )}
    >
      <Container>
        {/* Project Header */}
        <div
          className={cn(
            "bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10",
            "rounded-2xl p-4 sm:p-6 md:p-8 mb-12 shadow-lg dark:shadow-none"
          )}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <span
                className={cn(
                  "inline-block px-3 py-1 text-xs font-semibold uppercase",
                  "tracking-wider text-primary dark:text-primary-light bg-primary/10 dark:bg-primary-light/10 rounded-full mb-4",
                  "animate-fadeUp animation-delay-100"
                )}
              >
                {project.technology}
              </span>

              <h2 className="text-2xl md:text-3xl font-bold text-neutral-9 dark:text-neutral-1 animate-fadeUp animation-delay-200">
                Project Overview
              </h2>
            </div>

            {project.link && (
              <Link
                href={project.link}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20",
                  "text-neutral-9 dark:text-neutral-1 font-medium rounded-xl hover:bg-white/90",
                  "dark:hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-lg dark:shadow-none",
                  "animate-fadeUp animation-delay-200"
                )}
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
        <div className="bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg dark:shadow-none">
          <div
            className={cn(
              "prose prose-lg max-w-none dark:prose-invert",
              "prose-headings:text-neutral-9 dark:prose-headings:text-neutral-1",
              "prose-p:text-neutral-7 dark:prose-p:text-neutral-3",
              "prose-a:text-primary dark:prose-a:text-primary-light prose-a:no-underline hover:prose-a:underline",
              "prose-strong:text-neutral-8 dark:prose-strong:text-neutral-2",
              "prose-code:text-primary dark:prose-code:text-primary-light prose-code:bg-white/20 dark:prose-code:bg-white/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm",
              "prose-pre:bg-neutral-9 dark:prose-pre:bg-neutral-8 prose-pre:border prose-pre:border-white/20 dark:prose-pre:border-white/10 prose-pre:rounded-xl",
              "prose-blockquote:border-l-primary dark:prose-blockquote:border-l-primary-light",
              "prose-img:rounded-xl prose-img:shadow-lg",
              "prose-hr:border-white/20 dark:prose-hr:border-white/10",
              "animate-fadeUp animation-delay-300"
            )}
          >
            <RenderMarkdown>{project.content}</RenderMarkdown>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default async function Work({ params }: PageProps) {
  const { id } = await params;
  const project = await getProjectByID(id);

  if (!project) {
    notFound();
  }

  const projectData = entityToJSON(project) as Project;

  return (
    <Application>
      <ProjectStructuredData
        title={projectData.title}
        description={projectData.description}
        image={projectData.image}
        technology={projectData.technology}
        link={projectData.link}
      />
      <main>
        <Header
          title={projectData.title}
          image={projectData.image}
          subtitle={projectData.description}
        />
        <Content project={projectData} />
      </main>
    </Application>
  );
}
