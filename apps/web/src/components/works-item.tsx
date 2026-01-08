import Link from "next/link";
import { StorageImg } from "./storage-img";
import { Project } from "@repo/contracts";
import { cn } from "@/utils/cn";

interface WorksItemProps {
  project: Project;
  inCarousel?: boolean;
}

export default function WorksItem({
  project,
  inCarousel = false,
}: WorksItemProps) {
  return (
    <article
      className={cn(
        "group relative flex flex-col h-full rounded-xl overflow-hidden",
        "bg-white dark:bg-neutral-9/50",
        "border border-neutral-2 dark:border-white/8",
        "hover:border-neutral-3 dark:hover:border-white/15",
        inCarousel ? "shadow-sm" : "shadow-sm hover:shadow-md",
        "transition-all duration-300",
      )}
    >
      {/* Image Section */}
      <Link
        href={`/works/${project.id}`}
        className="block relative w-full aspect-[16/10] overflow-hidden"
      >
        <StorageImg
          src={project.image}
          alt={project.title}
          className={cn(
            "w-full h-full object-cover",
            "transition-transform duration-500 group-hover:scale-105",
          )}
          width={800}
          height={500}
        />
        {/* Subtle overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-black/0 group-hover:bg-black/10",
            "transition-colors duration-300",
          )}
        />
      </Link>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Technology Tag */}
        {project.technology && (
          <span
            className={cn(
              "inline-block self-start px-2.5 py-1 mb-3",
              "text-xs font-medium uppercase tracking-wide",
              "text-primary dark:text-primary-light",
              "bg-primary/8 dark:bg-primary-light/10",
              "rounded",
            )}
          >
            {project.technology}
          </span>
        )}

        {/* Title */}
        <Link href={`/works/${project.id}`} className="group/title">
          <h3
            className={cn(
              "text-lg sm:text-xl font-semibold mb-2",
              "text-neutral-9 dark:text-neutral-1",
              "group-hover/title:text-primary dark:group-hover/title:text-primary-light",
              "transition-colors duration-200",
            )}
          >
            {project.title}
          </h3>
        </Link>

        {/* Description */}
        <p
          className={cn(
            "text-sm text-neutral-7 dark:text-neutral-3",
            "line-clamp-2 mb-4 flex-1",
          )}
        >
          {project.description}
        </p>

        {/* Link */}
        <Link
          href={`/works/${project.id}`}
          className={cn(
            "inline-flex items-center gap-1.5 mt-auto",
            "text-sm font-medium",
            "text-neutral-7 dark:text-neutral-3",
            "hover:text-primary dark:hover:text-primary-light",
            "transition-colors duration-200",
          )}
        >
          View project
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
