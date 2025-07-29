"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "./layouts";
import { cn } from "@/utils/cn";

export default function Footer() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark"; // Default to dark mode

    setTheme(initialTheme);

    // Always start with dark mode by default
    // Remove any existing class first, then add dark if needed
    document.documentElement.classList.remove("dark");
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
    
    // If no saved preference, save dark as default
    if (!savedTheme) {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Toggle the dark class on the html element
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <footer
      className={cn(
        "py-12",
        "bg-gradient-to-t from-neutral-2 to-neutral-1",
        "dark:from-dark-bg-secondary dark:to-dark-bg",
        "border-t border-black/10 dark:border-white/5"
      )}
    >
      <Container>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div
            className={cn(
              "text-sm font-medium text-center sm:text-left",
              "text-neutral-6 dark:text-neutral-4"
            )}
          >
            Designed by{" "}
            <Link
              href="https://github.com/paradoxe35"
              target="_blank"
              className={cn(
                "text-primary dark:text-primary-light",
                "hover:underline transition-colors"
              )}
            >
              @PNG_
            </Link>
          </div>
          
          {theme && (
            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-lg",
                "bg-white/80 dark:bg-neutral-8/80 backdrop-blur-sm",
                "shadow-md border border-black/10 dark:border-white/10",
                "hover:bg-white dark:hover:bg-neutral-7",
                "transition-all duration-300 hover:scale-105",
                "group"
              )}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5 text-neutral-8 group-hover:text-neutral-9 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-neutral-1 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </Container>
    </footer>
  );
}
