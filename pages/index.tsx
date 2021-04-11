import Application from "layouts/application";
import { Container } from "layouts/layouts";
import Head from "next/head";
import { useEffect, useRef } from "react";
import style from 'styles/modules/home.module.scss'
import { animate } from "utils/animate";
import { getRandomArbitrary } from "utils/functions";

type Position = {
    left: number,
    top: number
}


export default function Home() {
    return <Application>
        <Head>
            <title>Home</title>
        </Head>
        <Hero />
    </Application >
}


function Hero() {
    const objectsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const positions = [
            { left: 59.1977, top: 59.3489 },
            { left: 76.4234, top: 43.2874 },
            { left: 68.0684, top: 74.9761 },
            { left: 67.8254, top: 27.2987 },
        ] as Readonly<Position[]>

        if (objectsRef.current) {
            objectsRef.current.querySelectorAll<HTMLImageElement>('img')
                .forEach((el, i) => {
                    el.style.top = `${positions[i].top || getRandomArbitrary(10, 80) + i}%`
                    el.style.left = `${positions[i].left || getRandomArbitrary(50, 90) + i}%`
                    animate(el, 30)
                })
        }
    }, [])

    return <main>
        <div className={style.home__hero} data-aos="fade-up" data-aos-duration="500" style={{ backgroundImage: `url(/jonathan-boyer.png)` }}>
            <div className={style.hero__body}>
                <Container>
                    <div data-aos="fade-up" data-aos-duration="1000" className={style.hero__hello}>
                        Bonjour, je suis
                    </div>
                    <div data-aos="fade-up" data-aos-duration="2000" className={style.hero__title}>Paradoxe Ngwasi</div>
                    <div data-aos="fade-up" data-aos-duration="3000" className={style.hero__job}>Développeur Web FullStack</div>
                </Container>
            </div>
            <div ref={objectsRef} className={style.hero__icons}>
                <img src="/laravel.svg" alt="Laravel" />
                <img src="/vue.svg" alt="VueJs" />
                <img src="/react.svg" alt="React" />
                <img src="/node.svg" alt="NodeJs" />
            </div>
        </div>
    </main>
}
