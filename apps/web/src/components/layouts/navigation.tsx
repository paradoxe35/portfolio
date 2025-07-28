import { Container } from "./layouts";
import Link from "next/link";
import { site_details } from "@/utils/constants";
import { PropsWithChildren, useState } from "react";

const Navigation: React.FC<PropsWithChildren<{}>> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav className="backdrop-blur-md bg-white/70 dark:bg-dark-bg/70 border-b border-neutral-3/20 dark:border-dark-border/20">
        <Container className="flex justify-between items-center py-4 sm:py-6">
          <Link
            href="/"
            className="relative px-2 sm:px-3 py-2 leading-4 text-neutral-8 dark:text-neutral-2 pointer-events-auto transition-all duration-200 font-bold text-base sm:text-lg hover:text-primary dark:hover:text-primary-light"
          >
            <span className="text-primary dark:text-primary-light">
              {site_details.firstname}
            </span>{" "}
            <span className="text-neutral-7 dark:text-neutral-3">
              {site_details.lastname_abbr}
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex m-0 p-0 list-none gap-2">
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 pointer-events-auto text-neutral-7 dark:text-neutral-3 hover:text-primary dark:hover:text-primary-light transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </Container>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-white/95 dark:bg-dark-bg/95 backdrop-blur-md border-t border-neutral-3/20 dark:border-dark-border/20">
            <Container className="py-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-neutral-7 dark:text-neutral-3 pointer-events-auto transition-all duration-200 font-medium hover:text-primary dark:hover:text-primary-light rounded-lg hover:bg-neutral-2/50 dark:hover:bg-dark-surface"
                  >
                    Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-neutral-7 dark:text-neutral-3 pointer-events-auto transition-all duration-200 font-medium hover:text-primary dark:hover:text-primary-light rounded-lg hover:bg-neutral-2/50 dark:hover:bg-dark-surface"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </Container>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
