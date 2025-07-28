import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
              // Set dark mode by default, can be overridden by theme toggle
              if (localStorage.getItem('theme') === 'light') {
                document.documentElement.classList.remove('dark');
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
