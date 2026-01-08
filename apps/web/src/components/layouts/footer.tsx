"use client";

import Link from "next/link";
import { Container } from "./layouts";
import { cn } from "@/utils/cn";
import { SOCIALS } from "@/utils/constants";
import { ThemeToggle } from "../theme-toggle";

export default function Footer() {
  return (
    <footer
      className={cn(
        "py-12",
        "bg-gradient-to-t from-neutral-2 to-neutral-1",
        "dark:from-dark-bg-secondary dark:to-dark-bg",
        "border-t border-black/10 dark:border-white/5",
      )}
    >
      <Container>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div
            className={cn(
              "text-sm font-medium text-center sm:text-left",
              "text-neutral-6 dark:text-neutral-4",
            )}
          >
            Designed by{" "}
            <Link
              href={SOCIALS.github}
              target="_blank"
              className={cn(
                "text-primary dark:text-primary-light",
                "hover:underline transition-colors",
              )}
            >
              @PNG_
            </Link>
          </div>

          <ThemeToggle />
        </div>
      </Container>
    </footer>
  );
}
