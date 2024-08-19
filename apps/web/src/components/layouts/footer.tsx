import Link from "next/link";
import { Container } from "./layouts";
import style from "@/styles/footer.module.scss";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <Container>
        Designed by{" "}
        <Link href="https://github.com/paradoxe35/portfolio" target="_blank">
          @PNG_
        </Link>
      </Container>
    </footer>
  );
}
