import style from 'styles/navigation.module.scss'
import { Container } from './layouts'
import Link from 'next/link'

const Navigation: React.FC = () => {
    return <header className={style.header}>
        <nav className={style.nav}>
            <Container>
                <Link href="/">
                    <a className={`${style['page-link']} ${style.logo}`}>Paradoxe Ng</a>
                </Link>
                <ul className={style.list}>
                    <li className={style['page-link']}>
                        <Link href="/works">
                            <a>Works</a>
                        </Link>
                    </li>
                    <li className={style['page-link']}>
                        <Link href="/about">
                            <a>About</a>
                        </Link>
                    </li>
                    <li className={style['page-link']}>
                        <Link href="/contact">
                            <a>Contact</a>
                        </Link>
                    </li>
                </ul>
            </Container>
        </nav>
    </header>
}

export default Navigation