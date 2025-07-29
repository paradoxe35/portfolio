import Link from "next/link";
import { StorageImg } from "./storage-img";
import { Project } from "@repo/contracts";
import { cn } from "@/utils/cn";

interface Work {
  aosDuration: number;
  project: Project;
  inCarousel?: boolean;
}

export default function WorksItem({ aosDuration = 0, project, inCarousel = false }: Work) {
  return (
    <div
      className={cn(
        "group relative flex flex-col h-full rounded-2xl overflow-hidden",
        "bg-white/80 dark:bg-white/5 backdrop-blur-md",
        "border border-black/10 dark:border-white/10",
        "hover:border-primary/50 dark:hover:border-primary-light/50",
        inCarousel ? "shadow-sm" : "shadow-lg hover:shadow-2xl",
        "hover:bg-white/90 dark:hover:bg-white/10",
        "transition-all duration-300"
      )}
    >
      <Link
        href={`/works/${project.id}`}
        className={cn(
          "rounded-t-lg overflow-hidden relative",
          "w-full h-[336px] flex-none"
        )}
      >
        <div
          className={cn(
            "relative h-full w-full overflow-hidden",
            "bg-neutral-2 dark:bg-neutral-8"
          )}
        >
          <StorageImg
            src={project.image}
            alt={project.title}
            className={cn(
              "block opacity-100 h-full w-full object-cover",
              "transition-all duration-700 group-hover:scale-110"
            )}
          />
          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-t from-black/50 via-transparent to-transparent",
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-500"
            )}
          />
        </div>
      </Link>

      <div
        className={cn(
          "p-5 sm:p-8 md:p-10 h-full",
          "flex flex-1 flex-col items-start"
        )}
      >
        <div
          className={cn(
            "font-semibold uppercase text-xs",
            "text-primary dark:text-primary-light"
          )}
        >
          {project.technology}
        </div>
        <Link
          href={`/works/${project.id}`}
          className={cn(
            "text-2xl my-3 font-semibold",
            "text-neutral-9 dark:text-neutral-1",
            "transition-colors",
            "hover:text-primary dark:hover:text-primary-light"
          )}
        >
          {project.title}
        </Link>
        <p
          className={cn(
            "mb-12",
            "text-neutral-7 dark:text-neutral-4",
            "line-clamp-3"
          )}
        >
          {project.description}
        </p>

        <Link
          href={`/works/${project.id}`}
          className={cn(
            "mt-auto inline-flex items-center group/btn",
            "text-xs leading-8 font-semibold uppercase",
            "px-6 sm:px-8 py-2 rounded-lg",
            "text-primary dark:text-primary-light",
            "border border-primary/75 dark:border-primary-light/75",
            "hover:text-white dark:hover:text-neutral-9",
            "hover:bg-primary dark:hover:bg-primary-light",
            "hover:border-primary dark:hover:border-primary-light",
            "transition-all duration-300"
          )}
        >
          Find out more
          <svg
            className={cn(
              "w-3 h-3 inline-block -ml-1",
              "opacity-0 group-hover/btn:opacity-100",
              "group-hover/btn:ml-1 group-hover/btn:translate-x-1",
              "transition-all duration-500"
            )}
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
