import style from "@/ui/styles/navigation.module.scss";
import { Container } from "./layouts";
import Link from "next/link";
import constants from "@/utils/constants";
import { PropsWithChildren } from "react";

const Navigation: React.FC<PropsWithChildren<{}>> = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Container>
          <Link href="/">
            <a className={`${style["page-link"]} ${style.logo}`}>
              <span className={style.firstname}>{constants.firstname}</span>{" "}
              <span className={style.lastname}>{constants.lastname_abbr}</span>
            </a>
          </Link>
          <ul className={style.list}>
            <li className={style["page-link"]}>
              <Link href="/works">
                <a>Works</a>
              </Link>
            </li>
            <li className={style["page-link"]}>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </Container>
      </nav>
    </header>
  );
};

export default Navigation;
