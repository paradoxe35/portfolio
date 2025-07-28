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
      <div data-aos="fade-up" className="text-sm font-semibold uppercase text-primary">
        {title}
      </div>
      <div data-aos="fade-up" className="text-3xl font-bold mb-5 text-neutral-8 lg:w-1/2">
        {subtitle}
      </div>
    </>
  );
};

export default Titles;