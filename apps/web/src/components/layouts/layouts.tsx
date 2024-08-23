import { forwardRef, PropsWithChildren, ReactNode } from "react";
import style from "@/styles/layout.module.scss";

type GridProps = {
  col?: number;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
  hidden?: boolean;
  children?: ReactNode;
};

export const Container: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export const Main: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <main className={style.main}>
      <Container>{children}</Container>
    </main>
  );
};

export const Footer: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={style.footer}>{children}</div>;
};

export const Description: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={style.description}>{children}</div>;
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, col, hidden }, ref) => {
    return (
      <div
        ref={ref}
        className={`${style.grid} ${col ? style["grid__" + col] : ""}`}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export const Card: React.FC<
  PropsWithChildren<{ hidden?: boolean; className?: string }>
> = ({ children, hidden, className, ...props }) => {
  return (
    <div
      className={`${style.card} ${hidden ? style.hidden : ""} ${
        className || ""
      }`}
      {...props}
    >
      <div className={style.card_content}>{children}</div>
    </div>
  );
};

export const CardItem: React.FC<PropsWithChildren<{}>> = ({
  children,
  ...props
}) => {
  return (
    <div className={style.card__item} {...props}>
      {children}
    </div>
  );
};
