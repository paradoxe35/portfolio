"use client";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { cn } from "@/utils/cn";

import { Highlighter } from "./highlighter";

export function RenderMarkdown({ children }: { children: string }) {
  return (
    <Markdown
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");

          return match ? (
            <Highlighter
              match={match}
              codeText={String(children).replace(/\n$/, "")}
              props={props}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
        img({ src, alt }) {
          if (!src) return null;

          // Check if it's an external URL or a relative path
          const isExternal =
            src.startsWith("http://") || src.startsWith("https://");

          if (isExternal) {
            return (
              <Image
                src={src}
                alt={alt || ""}
                width={1200}
                height={800}
                className={cn(
                  "w-full h-auto rounded-xl my-8",
                  "max-h-[400px] sm:max-h-[500px] md:max-h-[600px]",
                  "object-contain",
                  // Add container styling only on large screens
                  "lg:p-8 lg:bg-white/80 dark:lg:bg-white/5",
                  "lg:backdrop-blur-md lg:border lg:border-neutral-2 dark:lg:border-white/10"
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
                loading="lazy"
                quality={90}
                title={alt || undefined}
              />
            );
          }

          return (
            <img
              src={src}
              alt={alt || ""}
              className={cn(
                "w-full h-auto rounded-xl my-8",
                "max-h-[400px] sm:max-h-[500px] md:max-h-[600px]",
                "object-contain",
                // Add container styling only on large screens
                "lg:p-8 lg:bg-white/80 dark:lg:bg-white/5",
                "lg:backdrop-blur-md lg:border lg:border-neutral-2 dark:lg:border-white/10"
              )}
              loading="lazy"
              title={alt || undefined}
            />
          );
        },
        // Improve link styling
        a({ href, children }) {
          const isExternal =
            href?.startsWith("http://") || href?.startsWith("https://");

          return (
            <a
              href={href}
              className={cn(
                "text-primary dark:text-primary-light",
                "underline decoration-primary/30 dark:decoration-primary-light/30",
                "hover:decoration-primary dark:hover:decoration-primary-light",
                "transition-colors duration-200"
              )}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {children}
              {isExternal && (
                <svg
                  className="inline-block w-4 h-4 ml-1 mb-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              )}
            </a>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {children}
    </Markdown>
  );
}
