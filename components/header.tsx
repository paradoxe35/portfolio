import { Container } from "components/layouts/layouts";
import style from "styles/modules/page.module.scss";

export default function Header({
  title,
  subtitle,
  image,
}: {
  image?: string;
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
}) {
  return (
    <div
      className={`${style.page__header} ${image ? style.hero : ""}`}
      style={{
        background:
          image === undefined
            ? image
            : `url(${image || "/bg-elements.png"}) ${
                image ? "50% / cover fixed" : "0 fixed no-repeat"
              }`,
      }}
    >
      <Container>
        <h1 data-aos="fade-up" className={style.page__title}>
          {title}
        </h1>
        <p data-aos="fade-up" className={style.page__subtitle}>
          {subtitle}{" "}
        </p>
      </Container>
    </div>
  );
}
