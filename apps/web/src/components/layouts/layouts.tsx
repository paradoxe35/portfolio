import { forwardRef, PropsWithChildren, ReactNode } from "react";
import { cn } from "@/utils/cn";

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
  return <div className={cn("container-custom", className)}>{children}</div>;
};

export const Main: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main className={cn(
      "flex-1 flex flex-col justify-center items-center py-20"
    )}>
      <Container>{children}</Container>
    </main>
  );
};

export const Footer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className={cn(
      "w-full h-[100px] border-t border-neutral-3",
      "flex justify-center items-center"
    )}>
      {children}
    </div>
  );
};

export const Description: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={cn("text-2xl leading-relaxed")}>{children}</div>;
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, col, hidden, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          col ? "grid gap-4" : "flex flex-wrap",
          {
            "lg:grid-cols-4 md:grid-cols-2": col === 4,
            "lg:grid-cols-3": col === 3,
            "invisible": hidden,
          },
          className
        )}
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
    <div className={cn({ "invisible": hidden }, className)} {...props}>
      <div className={cn(
        "mr-4 mb-4 text-left p-6 rounded-2xl",
        "bg-white/10 dark:bg-white/5 backdrop-blur-md",
        "border border-white/20 dark:border-white/10",
        "shadow-lg hover:shadow-xl",
        "transition-all duration-300",
        "hover:border-primary/50 dark:hover:border-primary-light/50",
        "hover:-translate-y-1 hover:bg-white/20 dark:hover:bg-white/10",
        "group"
      )}>
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
      className={cn(
        "basis-full mr-4 mb-4 p-8",
        "border border-neutral-3 rounded-lg",
        "transition-all duration-300"
      )}
      {...props}
    >
      {children}
    </div>
  );
};
