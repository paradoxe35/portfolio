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

export const dynamicParams = true;

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
    <section className="py-16 md:py-20 bg-neutral-1/50 dark:bg-dark-bg-secondary">
      <Container>
        {/* Back link & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-fadeUp">
          <Link
            href="/works"
            className={cn(
              "inline-flex items-center gap-2 text-sm",
              "text-neutral-8 dark:text-neutral-4",
              "hover:text-primary dark:hover:text-primary-light",
              "transition-colors"
            )}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Projects
          </Link>

          <div className="flex items-center gap-3">
            {/* Technology badge */}
            <span
              className={cn(
                "px-3 py-1 text-xs font-medium",
                "text-primary dark:text-primary-light",
                "bg-primary/10 dark:bg-primary-light/10",
                "rounded-full"
              )}
            >
              {project.technology}
            </span>

            {/* Live project link */}
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium",
                  "text-neutral-7 dark:text-neutral-3",
                  "bg-white dark:bg-white/10",
                  "border border-neutral-2 dark:border-white/10",
                  "rounded-full",
                  "hover:border-primary/50 dark:hover:border-primary-light/50",
                  "transition-colors"
                )}
              >
                View Live
                <svg
                  className="w-3 h-3"
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
        <article
          className={cn(
            "bg-white dark:bg-dark-bg",
            "border border-neutral-2 dark:border-white/10",
            "rounded-xl p-6 sm:p-8 md:p-10",
            "animate-fadeUp animation-delay-100"
          )}
        >
          <div
            className={cn(
              "prose prose-neutral max-w-none dark:prose-invert",
              "prose-headings:text-neutral-9 dark:prose-headings:text-neutral-1",
              "prose-headings:font-semibold",
              "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
              "prose-p:text-neutral-7 dark:prose-p:text-neutral-3",
              "prose-p:leading-relaxed",
              "prose-a:text-primary dark:prose-a:text-primary-light",
              "prose-a:no-underline hover:prose-a:underline",
              "prose-strong:text-neutral-8 dark:prose-strong:text-neutral-2",
              "prose-code:text-sm prose-code:text-primary dark:prose-code:text-primary-light",
              "prose-code:bg-neutral-1 dark:prose-code:bg-white/10",
              "prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
              "prose-code:before:content-none prose-code:after:content-none",
              "prose-pre:bg-neutral-9 dark:prose-pre:bg-neutral-8",
              "prose-pre:border prose-pre:border-neutral-2 dark:prose-pre:border-white/10",
              "prose-pre:rounded-lg",
              "prose-blockquote:border-l-primary dark:prose-blockquote:border-l-primary-light",
              "prose-blockquote:text-neutral-6 dark:prose-blockquote:text-neutral-4",
              "prose-img:rounded-lg",
              "prose-hr:border-neutral-2 dark:prose-hr:border-white/10",
              "prose-ul:text-neutral-7 dark:prose-ul:text-neutral-3",
              "prose-ol:text-neutral-7 dark:prose-ol:text-neutral-3",
              "prose-li:marker:text-neutral-4 dark:prose-li:marker:text-neutral-5"
            )}
          >
            <RenderMarkdown>{project.content}</RenderMarkdown>
          </div>
        </article>
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
