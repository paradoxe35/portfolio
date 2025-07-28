import { PropsWithChildren } from "react";

type Title = {
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
};

const Titles: React.FC<PropsWithChildren<Title>> = function ({
  title,
  subtitle,
}) {
  return (
    <>
      <div
        className="text-sm font-semibold uppercase text-primary dark:text-primary-light tracking-wider animate-fadeUp"
      >
        {title}
      </div>
      <div
        className="text-3xl md:text-4xl font-bold mb-8 text-neutral-9 dark:text-neutral-1 lg:w-3/4 animate-fadeUp animation-delay-100"
      >
        {subtitle}
      </div>
    </>
  );
};

export default Titles;
