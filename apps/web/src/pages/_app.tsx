import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps /*, AppContext */ } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import "aos/dist/aos.css";
import aos from "aos";

import { NextPage } from "next";
import { ChatwootWidget } from "@/components/chatwoot";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    aos.init({ once: true });
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Component {...pageProps} />
      <Analytics />
      <ChatwootWidget />
    </>
  );
}

export default MyApp;
