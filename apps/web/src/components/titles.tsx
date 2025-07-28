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
        data-aos="fade-up"
        className="text-sm font-semibold uppercase text-primary dark:text-primary-light tracking-wider"
      >
        {title}
      </div>
      <div
        data-aos="fade-up"
        className="text-3xl md:text-4xl font-bold mb-8 text-neutral-9 dark:text-neutral-1 lg:w-3/4"
      >
        {subtitle}
      </div>
    </>
  );
};

export default Titles;
