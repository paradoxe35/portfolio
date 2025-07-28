import { Container } from "./layouts";
import Link from "next/link";
import { site_details } from "@/utils/constants";
import { PropsWithChildren, useState } from "react";
import { cn } from "@/utils/cn";

const Navigation: React.FC<PropsWithChildren<{}>> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav
        className={cn(
          "backdrop-blur-xl",
          "bg-white/10 dark:bg-white/5",
          "border-b border-white/20 dark:border-white/10"
        )}
      >
        <Container className="flex justify-between items-center py-4 sm:py-6">
          <Link
            href="/"
            className={cn(
              "relative pr-2 sm:pr-3 py-2 leading-4 pointer-events-auto",
              "font-bold text-base sm:text-lg",
              "text-neutral-8 dark:text-neutral-2",
              "hover:text-primary dark:hover:text-primary-light",
              "transition-all duration-200"
            )}
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
                className={cn(
                  "relative px-4 py-2 leading-4 pointer-events-auto rounded-lg",
                  "font-medium",
                  "text-neutral-7 dark:text-neutral-3",
                  "hover:text-primary dark:hover:text-primary-light",
                  "hover:bg-neutral-2/50 dark:hover:bg-dark-surface",
                  "transition-all duration-200"
                )}
              >
                Works
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={cn(
                  "relative px-4 py-2 leading-4 pointer-events-auto rounded-lg",
                  "font-medium",
                  "text-neutral-7 dark:text-neutral-3",
                  "hover:text-primary dark:hover:text-primary-light",
                  "hover:bg-neutral-2/50 dark:hover:bg-dark-surface",
                  "transition-all duration-200"
                )}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "sm:hidden p-2 pointer-events-auto",
              "text-neutral-7 dark:text-neutral-3",
              "hover:text-primary dark:hover:text-primary-light",
              "transition-colors"
            )}
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
          <div
            className={cn(
              "sm:hidden backdrop-blur-md",
              "bg-white/95 dark:bg-dark-bg/95",
              "border-t border-neutral-3/20 dark:border-dark-border/20"
            )}
          >
            <Container className="py-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/works"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 pointer-events-auto rounded-lg",
                      "font-medium",
                      "text-neutral-7 dark:text-neutral-3",
                      "hover:text-primary dark:hover:text-primary-light",
                      "hover:bg-neutral-2/50 dark:hover:bg-dark-surface",
                      "transition-all duration-200"
                    )}
                  >
                    Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 pointer-events-auto rounded-lg",
                      "font-medium",
                      "text-neutral-7 dark:text-neutral-3",
                      "hover:text-primary dark:hover:text-primary-light",
                      "hover:bg-neutral-2/50 dark:hover:bg-dark-surface",
                      "transition-all duration-200"
                    )}
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
