"use client";

import { useEffect, useRef, useState } from "react";
import WorksItem from "./works-item";
import { Project } from "@repo/contracts";

interface ProjectCarouselProps {
  projects: Project[];
}

export function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const element = scrollRef.current;
    if (element) {
      element.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        element.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Desktop Navigation Buttons */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-5 w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 shadow-lg rounded-full items-center justify-center hover:shadow-xl transition-all hover:scale-110 hover:bg-white/30 dark:hover:bg-white/20"
          aria-label="Previous projects"
        >
          <svg
            className="w-6 h-6 text-neutral-7 dark:text-neutral-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-5 w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 shadow-lg rounded-full items-center justify-center hover:shadow-xl transition-all hover:scale-110 hover:bg-white/30 dark:hover:bg-white/20"
          aria-label="Next projects"
        >
          <svg
            className="w-6 h-6 text-neutral-7 dark:text-neutral-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 animate-fadeUp"
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            className="min-w-[320px] max-w-[320px] md:min-w-[380px] md:max-w-[380px] flex-shrink-0 h-full"
          >
            <WorksItem project={project} aosDuration={(i + 1) * 100} />
          </div>
        ))}
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="flex justify-center mt-6 gap-2 lg:hidden">
        {projects.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-neutral-3 dark:bg-neutral-7 transition-all"
          />
        ))}
      </div>
    </div>
  );
}
