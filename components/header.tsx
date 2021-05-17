import { Container } from "layouts/layouts";
import style from 'styles/modules/page.module.scss'


export default function Header({ title, subtitle }: { title: string | JSX.Element, subtitle: string | JSX.Element }) {
    return <div className={style.page__header} style={{ background: "url(/bg-elements.png) 0 fixed no-repeat" }}>
        <Container>
            <div data-aos="fade-up" className={style.page__title}>{title}</div>
            <p data-aos="fade-up" className={style.page__subtitle}>{subtitle} </p>
        </Container>
    </div>
}