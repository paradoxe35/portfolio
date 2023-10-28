import style from "@/ui/styles/navigation.module.scss";
import { Container } from "./layouts";
import Link from "next/link";
import { site_details } from "@/utils/constants";
import { PropsWithChildren } from "react";

const Navigation: React.FC<PropsWithChildren<{}>> = () => {
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Container>
          <Link href="/" className={`${style["page-link"]} ${style.logo}`}>
            <span className={style.firstname}>{site_details.firstname}</span>{" "}
            <span className={style.lastname}>{site_details.lastname_abbr}</span>
          </Link>
          <ul className={style.list}>
            <li className={style["page-link"]}>
              <Link href="/works">Works</Link>
            </li>
            <li className={style["page-link"]}>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </Container>
      </nav>
    </header>
  );
};

export default Navigation;
