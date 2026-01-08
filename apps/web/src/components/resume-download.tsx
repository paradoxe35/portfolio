import Link from "next/link";
import { Resume } from "@repo/contracts";
import { cn } from "@/utils/cn";

export function ResumeDownload({ resume }: { resume: Resume | null }) {
  return (
    <>
      {resume?.file && (
        <Link
          href={resume.file}
          className={cn(
            "inline-flex items-center gap-3 px-4 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 text-neutral-9 dark:text-neutral-1 font-medium rounded-xl hover:bg-white/90 ",
            "dark:hover:bg-white/20 hover:scale-105 hover:shadow-xl transition-all duration-300 group shadow-md text-base"
          )}
          target="_blank"
        >
          Download Resume
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </Link>
      )}
    </>
  );
}
