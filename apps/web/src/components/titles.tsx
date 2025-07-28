import { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type Title = {
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
};

const Titles: React.FC<PropsWithChildren<Title>> = function ({
  title,
  subtitle,
}) {
  return (
    <>
      <div
        className={cn(
          "text-sm font-semibold uppercase tracking-wider",
          "text-primary dark:text-primary-light",
          "animate-fadeUp"
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          "text-3xl md:text-4xl font-bold mb-8",
          "text-neutral-9 dark:text-neutral-1",
          "lg:w-3/4",
          "animate-fadeUp animation-delay-100"
        )}
      >
        {subtitle}
      </div>
    </>
  );
};

export default Titles;
