import Link from "next/link";
import { Container } from "./layouts";

export default function Footer() {
  return (
    <footer className="py-12 bg-neutral-1/50 dark:bg-dark-bg/80 backdrop-blur-md border-t border-neutral-3/20 dark:border-white/10">
      <Container>
        <div className="text-center text-sm font-medium text-neutral-6 dark:text-neutral-4">
          Designed by{" "}
          <Link
            href="https://github.com/paradoxe35/portfolio"
            target="_blank"
            className="text-primary dark:text-primary-light hover:underline transition-colors"
          >
            @PNG_
          </Link>
        </div>
      </Container>
    </footer>
  );
}
