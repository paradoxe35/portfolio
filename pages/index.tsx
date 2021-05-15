import Application from "layouts/application";
import { Card, Container, Grid } from "layouts/layouts";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import style from 'styles/modules/home.module.scss'
import { animate } from "utils/animate";
import { getBrowserWidth, getRandomArbitrary } from "utils/functions";

type Position = {
    left: number,
    top: number
}


export default function Home() {
    return <Application>
        <Head>
            <title>Paradoxe Ng | Portfolio</title>
        </Head>
        <main>
            <Hero />
            <Skills />
            <Works />
        </main>
    </Application >
}



function WorksItem({ aosDuration = 0 }) {
    return <div className={style.project} data-aos-duration={aosDuration} >
        <a className={style.project__image} href="/projets/kls">
            <img src="https://jonathan-boyer.fr/images/projects/kls/thumbnail.jpg" alt="Aperçu du site Jeremy.design" />
        </a>
        <div className={style.project__body}>
            <div className={style.project__tags}>React</div>
            <a className={style.project__name} href="/projets/kls">KLS Syndication</a>
            <p className={style.project__desc}>Développement React au sein d'une équipe pour le lancement du projet KLS Syndication</p>
            <a className={style.project__action} href="/projets/kls">
                En savoir plus
            </a>
        </div>
    </div>
}

function Works() {
    const carouselRef = useRef<HTMLDivElement | null>(null)
    const flkty = useRef<Flickity | null>(null)

    useEffect(() => {
        let flickity: typeof import('flickity') = require('flickity');

        function mountFlickity() {
            if (carouselRef.current) {
                flkty.current = new flickity(carouselRef.current, {
                    freeScroll: false,
                    prevNextButtons: false,
                    contain: true,
                    draggable: true,
                    groupCells: true,
                });
            }
        }

        if (getBrowserWidth() !== 'xs') {
            mountFlickity()
        }

        let sm = getBrowserWidth()

        function responsiveFlickity() {
            if (window.innerWidth < 768 && sm !== 'xs') {
                flkty.current?.destroy()
                sm = getBrowserWidth()
            } else if (window.innerWidth >= 768 && sm === 'xs') {
                mountFlickity()
                sm = getBrowserWidth()
            }
        }

        window.addEventListener('resize', responsiveFlickity)

        return () => {
            flkty.current?.destroy()
            window.removeEventListener('resize', responsiveFlickity)
        }
    }, [])

    return <section className={`${style.skills__section} ${style.works__section}`}>
        <Container>
            <div data-aos="fade-up" className={style['section__top-title']}>Works</div>
            <div data-aos="fade-up" className={style['section__title']}>Projects</div>
            <div className={style.projects} ref={carouselRef}>
                <WorksItem aosDuration={100} />
                <WorksItem aosDuration={200} />
                <WorksItem aosDuration={300} />
                <WorksItem aosDuration={400} />
            </div>
        </Container>
    </section>
}



function Skills() {
    return <section className={style.skills__section}>
        <Container>
            <div data-aos="fade-up" className={style['section__top-title']}>Skills</div>
            <div data-aos="fade-up" className={style['section__title']}>Services</div>

            <Grid col={4}>
                <Card data-aos="fade-right" data-aos-duration="500">
                    <img src="/laravel.svg" alt="Laravel" className={style.service__logo} />
                    <h3>Backend Laravel</h3>
                </Card>
                <Card data-aos="fade-right" data-aos-duration="600">
                    <div style={{ display: "flex" }}>
                        <img src="/vue.svg" alt="Vue" className={style.service__logo} />
                        <img src="/react.svg" alt="React" className={style.service__logo} />
                    </div>
                    <h3>Frontend VueJS or React</h3>
                </Card>

                <Card data-aos="fade-right" data-aos-duration="700">
                    <img src="/node.svg" alt="NodeJs" className={style.service__logo} />
                    <h3>NodeJs</h3>
                </Card>

                <Card data-aos="fade-right" data-aos-duration="800">
                    <img src="/flutter.svg" alt="Flutter" className={style.service__logo} />
                    <h3>Flutter Mobile development</h3>
                </Card>
            </Grid>
        </Container>
    </section>
}

function Hero() {
    const objectsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const positions: Readonly<Position[]> = [
            { left: 59.1977, top: 59.3489 },
            { left: 76.4234, top: 43.2874 },
            { left: 68.0684, top: 74.9761 },
            { left: 67.8254, top: 27.2987 },
            { left: 80.8254, top: 65.2987 },
        ] as const

        if (objectsRef.current) {
            objectsRef.current.querySelectorAll<HTMLImageElement>('img')
                .forEach((el, i) => {
                    el.style.top = `${positions[i].top || getRandomArbitrary(10, 80) + i}%`
                    el.style.left = `${positions[i].left || getRandomArbitrary(50, 90) + i}%`
                    animate(el, 30)
                })
        }
    }, [])

    return <section>
        <div className={style.home__hero} data-aos="fade-up" data-aos-duration="500" style={{ backgroundImage: `url(/paradoxe-ngwasi.png)` }}>
            <div className={style.hero__body}>
                <Container>
                    <div data-aos="fade-up" data-aos-duration="1000" className={style.hero__hello}>
                        Hello, I am
                    </div>
                    <div data-aos="fade-up" data-aos-duration="2000" className={style.hero__title}>Paradoxe Ngwasi</div>
                    <div data-aos="fade-up" data-aos-duration="3000" className={style.hero__job}>FullStack Web Developer</div>
                </Container>
            </div>
            <div ref={objectsRef} className={style.hero__icons}>
                <img src="/laravel.svg" alt="Laravel" />
                <img src="/vue.svg" alt="VueJs" />
                <img src="/react.svg" alt="React" />
                <img src="/node.svg" alt="NodeJs" />
                <img src="/flutter.svg" alt="Flutter" />
            </div>
        </div>
    </section>
}
