import Header from "components/header";
import Application from "layouts/application";
import { Container } from "layouts/layouts";
import Head from "next/head";
import React from "react";
import homeStyle from 'styles/modules/home.module.scss'
import WorksItem from "components/works-item";


function Works() {
    return <section className={`${homeStyle.skills__section} ${homeStyle.works__section}`}>
        <Container>
            <div className={`${homeStyle.projects} ${homeStyle.projects__grid}`}>
                <WorksItem aosDuration={100} />
                <WorksItem aosDuration={200} />
                <WorksItem aosDuration={300} />
                <WorksItem aosDuration={400} />
            </div>
        </Container>
    </section>
}

export default function Home() {
    return <Application>
        <Head>
            <title>Works</title>
        </Head>
        <main>
            <Header title="My achievements" subtitle="Here is a range of projects I have worked on." />
            <Works />
        </main>
    </Application>
}