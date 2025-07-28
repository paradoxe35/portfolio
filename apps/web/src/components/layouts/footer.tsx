import Link from "next/link";
import { Container } from "./layouts";

export default function Footer() {
  return (
    <footer className="py-12 bg-neutral-2/70 dark:bg-dark-bg-secondary text-neutral-5 dark:text-neutral-4 font-semibold text-sm text-center">
      <Container>
        Designed by{" "}
        <Link 
          href="https://github.com/paradoxe35/portfolio" 
          target="_blank"
          className="text-primary dark:text-primary-light hover:underline transition-colors"
        >
          @PNG_
        </Link>
      </Container>
    </footer>
  );
}