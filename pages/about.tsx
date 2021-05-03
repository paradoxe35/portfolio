import Application from "layouts/application";
import Head from "next/head";
import React from "react";

export default function Home() {
    return <Application>
        <Head>
            <title>About</title>
        </Head>
        <main>
            About
        </main>
    </Application>
}