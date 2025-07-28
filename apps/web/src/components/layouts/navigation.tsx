import { Container } from "./layouts";
import Link from "next/link";
import { site_details } from "@/utils/constants";
import { PropsWithChildren } from "react";

const Navigation: React.FC<PropsWithChildren<{}>> = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav className="backdrop-blur-md bg-white/70 dark:bg-dark-bg/70 border-b border-neutral-3/20 dark:border-dark-border/20">
        <Container className="flex justify-between items-center py-6">
          <Link 
            href="/" 
            className="relative px-3 py-2 leading-4 text-neutral-8 dark:text-neutral-2 pointer-events-auto transition-all duration-200 font-bold text-lg hover:text-primary dark:hover:text-primary-light"
          >
            <span className="text-primary dark:text-primary-light">{site_details.firstname}</span>{" "}
            <span className="text-neutral-7 dark:text-neutral-3">{site_details.lastname_abbr}</span>
          </Link>
          <ul className="flex m-0 p-0 list-none gap-2">
            <li>
              <Link 
                href="/works" 
                className="relative px-4 py-2 leading-4 text-neutral-7 dark:text-neutral-3 pointer-events-auto transition-all duration-200 font-medium hover:text-primary dark:hover:text-primary-light rounded-lg hover:bg-neutral-2/50 dark:hover:bg-dark-surface"
              >
                Works
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="relative px-4 py-2 leading-4 text-neutral-7 dark:text-neutral-3 pointer-events-auto transition-all duration-200 font-medium hover:text-primary dark:hover:text-primary-light rounded-lg hover:bg-neutral-2/50 dark:hover:bg-dark-surface"
              >
                Contact
              </Link>
            </li>
          </ul>
        </Container>
      </nav>
    </header>
  );
};

export default Navigation;