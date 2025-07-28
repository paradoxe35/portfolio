import Link from "next/link";
import { StorageImg } from "./storage-img";
import { Project } from "@repo/contracts";

interface Work {
  aosDuration: number;
  project: Project;
}

export default function WorksItem({ aosDuration = 0, project }: Work) {
  return (
    <div className="group relative flex flex-col h-full rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary-light/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/20 dark:hover:bg-white/10 overflow-hidden">
      <Link
        href={`/works/${project.id}`}
        className="rounded-t-lg overflow-hidden w-full h-[336px] flex-none relative"
      >
        <div className="relative h-full w-full overflow-hidden bg-neutral-2 dark:bg-neutral-8">
          <StorageImg
            src={project.image}
            alt={project.title}
            className="block opacity-100 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>

      <div className="p-10 h-full flex flex-1 flex-col items-start">
        <div className="font-semibold text-primary dark:text-primary-light uppercase text-xs">
          {project.technology}
        </div>
        <Link
          href={`/works/${project.id}`}
          className="text-2xl my-3 font-semibold transition-colors hover:text-primary dark:hover:text-primary-light"
        >
          {project.title}
        </Link>
        <p className="mb-12 text-neutral-7 dark:text-neutral-4">
          {project.description}
        </p>

        <Link
          href={`/works/${project.id}`}
          className="mt-auto inline-flex items-center text-primary dark:text-primary-light text-xs leading-8 font-semibold uppercase px-8 py-2 border border-primary/75 dark:border-primary-light/75 rounded-sm transition-all hover:text-neutral-9 dark:hover:text-neutral-1 hover:bg-primary dark:hover:bg-primary-light group"
        >
          Find out more
          <svg
            className="w-3 h-3 opacity-0 transition-all duration-500 -ml-1 inline-block group-hover:ml-1 group-hover:opacity-100 group-hover:translate-x-1"
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
      </div>
    </div>
  );
}
