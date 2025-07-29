import Header from "@/components/header";
import Application from "@/components/layouts/application";
import { Container } from "@/components/layouts/layouts";
import WorksItem from "@/components/works-item";
import { entitiesToJSON } from "@/utils/entity-to-json";
import { getProjects } from "@/data/actions/project";
import { Project } from "@repo/contracts";
import { BackgroundPattern } from "@/components/background-pattern";
import { Metadata } from "next";
import { SEO } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Works",
  description: SEO.description.works,
  openGraph: {
    title: "Works - Portfolio Projects",
    description: SEO.description.works,
    type: "website",
  },
};

export const revalidate = 30;

async function WorksItems() {
  const projects = entitiesToJSON(await getProjects()) as Project[];

  return (
    <section className="py-24 min-h-screen bg-gradient-to-b from-neutral-1 via-white to-neutral-1 dark:from-dark-bg dark:via-dark-bg-secondary dark:to-dark-bg relative">
      <BackgroundPattern variant="diagonal" />

      <Container>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((work, i) => (
            <div
              key={work.id}
              className="animate-fadeInUp"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <WorksItem project={work} aosDuration={(i + 1) * 100} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function Works() {
  return (
    <Application>
      <main>
        <Header
          title="Works"
          subtitle="Projects that showcase what I can build"
        />
        <WorksItems />
      </main>
    </Application>
  );
}