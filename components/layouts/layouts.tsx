import { forwardRef, ReactNode } from "react";
import style from "styles/layout.module.scss";

type GridProps = {
  col?: number;
  ref?: React.MutableRefObject<HTMLDivElement | null>;
  children?: ReactNode;
};

export const Container: React.FC = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export const Main: React.FC = ({ children }) => {
  return (
    <main className={style.main}>
      <Container>{children}</Container>
    </main>
  );
};

export const Footer: React.FC = ({ children }) => {
  return <div className={style.footer}>{children}</div>;
};

export const Description: React.FC = ({ children }) => {
  return <div className={style.description}>{children}</div>;
};

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, col }, ref) => {
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

export const Card: React.FC = ({ children, ...props }) => {
  return (
    <div className={style.card} {...props}>
      {children}
    </div>
  );
};

export const CardItem: React.FC = ({ children, ...props }) => {
  return (
    <div className={style.card__item} {...props}>
      {children}
    </div>
  );
};
