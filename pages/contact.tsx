import Header from "components/header";
import Titles from "components/titles";
import Application from "layouts/application";
import { Container } from "layouts/layouts";
import Head from "next/head";
import React, { useEffect, useRef } from "react";
import style from 'styles/modules/contact.module.scss'
import styleHome from 'styles/modules/home.module.scss'
import { throttle } from "utils/functions";



function Contact() {
    return <div className={style.contact__page}>
        <div className={style.contact__card}>
            <h1 className={style.section__title}>Contact me</h1>
            <p>Please give as much detail as possible on the project so that I can correctly assess the workload that your project represents.</p>

            <form className={style.contact__form} autoComplete="off">
                <div>
                    <input type="text" name="name" placeholder="Name" required minLength={3} />
                    <input type="email" name="email" placeholder="Email" required />
                </div>
                <textarea name="description" placeholder="Description" required minLength={20} />
                <div>
                    <button className={`${styleHome.project__action} font-sans`} type="submit">
                        Get in touch
                    </button>
                </div>
            </form>
        </div>
    </div>
}

function About() {
    return <section className={styleHome.skills__section}>
        <Container>
            <Titles title="About" subtitle="I believe in moving at a sustainable pace and fixing what’s broken." />
            <p>My name is Paradoxe Ngwasi. I design and build digital products that are intuitive, accessible, beautiful, and fun. I’ve done this professionally since 2012, and I’ve been designing for the web since 2007.</p>
            <p>This is a home for things I’ve made and how I’ve made them. My goal is for anyone (and anyone’s grandma) to understand what I’ve written. Although the focus is on my design and the process behind it, case studies occasionally detour to explore interesting, relevant topics.</p>
        </Container>
    </section>
}


export default function Home() {

    const container = useRef<HTMLDivElement>(null)
    const containerParent = useRef<HTMLDivElement>(null)
    const containerChild = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function resize() {
            if (container.current && containerParent.current && containerChild.current) {
                const { height } = container.current.getBoundingClientRect()
                containerParent.current.style.minHeight = `${height}px`
                containerChild.current.style.paddingTop = `${height}px`
            }
        }

        resize()

        window.addEventListener('resize', throttle(resize, 50))

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    return <Application>
        <Head>
            <title>About</title>
        </Head>
        <main>
            <Header title="" subtitle="" />
            <div className={style.gry__section} ref={containerParent}>
                <div className={style.contact__container} ref={container}>
                    <Container>
                        <Contact />
                    </Container>
                </div>

                <div style={{ width: "100%" }} ref={containerChild}>
                    <About />
                </div>
            </div>
        </main>
    </Application>
}