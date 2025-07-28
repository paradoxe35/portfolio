import { forwardRef, PropsWithChildren, ReactNode } from "react";

type GridProps = {
  col?: number;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
  hidden?: boolean;
  children?: ReactNode;
  className?: string;
};

export const Container: React.FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => {
  return <div className={`container-custom ${className}`}>{children}</div>;
};

export const Main: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col justify-center items-center py-20">
      <Container>{children}</Container>
    </main>
  );
};

export const Footer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="w-full h-[100px] border-t border-neutral-3 flex justify-center items-center">
      {children}
    </div>
  );
};

export const Description: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className="text-2xl leading-relaxed">{children}</div>;
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, col, hidden, className = "" }, ref) => {
    const gridCols =
      col === 4
        ? "lg:grid-cols-4 md:grid-cols-2"
        : col === 3
          ? "lg:grid-cols-3"
          : "";
    const gridClass = col ? `grid gap-4 ${gridCols}` : "flex flex-wrap";

    return (
      <div
        ref={ref}
        className={`w-full ${gridClass} ${hidden ? "invisible" : ""} ${className}`}
      >
        {children}
      </div>
    );
  },
);

Grid.displayName = "Grid";

export const Card: React.FC<
  PropsWithChildren<{ hidden?: boolean; className?: string }>
> = ({ children, hidden, className = "", ...props }) => {
  return (
    <div className={`${hidden ? "invisible" : ""} ${className}`} {...props}>
      <div className="mr-4 mb-4 text-left p-6 bg-white/80 dark:bg-dark-surface backdrop-blur-sm border border-neutral-3/50 dark:border-dark-border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary/50 dark:hover:border-primary-light/50 hover:-translate-y-1 group">
        {children}
      </div>
    </div>
  );
};

export const CardItem: React.FC<PropsWithChildren<{}>> = ({
  children,
  ...props
}) => {
  return (
    <div
      className="basis-full mr-4 mb-4 p-8 border border-neutral-3 rounded-lg transition-all duration-300"
      {...props}
    >
      {children}
    </div>
  );
};
