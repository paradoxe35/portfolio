import { Container } from "./layouts";
import style from "styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <Container>
        Designed by{" "}
        <a
          href="https://bitbucket.org/pngwasi/portfolio/src/main/"
          target="_blank"
        >
          @PNG_
        </a>
      </Container>
    </footer>
  );
}
