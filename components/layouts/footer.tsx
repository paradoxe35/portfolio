import { Container } from './layouts'
import style from "styles/footer.module.scss"

export default function Footer() {
    return <footer className={style.footer}>
        <Container>
            Designed by <a href="#!">@PNG_</a>
        </Container>
    </footer>
}

