import Link from "next/link";
import { Container } from "./layouts";
import { cn } from "@/utils/cn";

export default function Footer() {
  return (
    <footer
      className={cn(
        "py-12",
        "bg-gradient-to-t from-neutral-2 to-neutral-1",
        "dark:from-dark-bg-secondary dark:to-dark-bg",
        "border-t border-neutral-3/30 dark:border-white/5",
      )}
    >
      <Container>
        <div
          className={cn(
            "text-center text-sm font-medium",
            "text-neutral-6 dark:text-neutral-4",
          )}
        >
          Designed by{" "}
          <Link
            href="https://github.com/paradoxe35/portfolio"
            target="_blank"
            className={cn(
              "text-primary dark:text-primary-light",
              "hover:underline transition-colors",
            )}
          >
            @PNG_
          </Link>
        </div>
      </Container>
    </footer>
  );
}
