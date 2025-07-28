import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps /*, AppContext */ } from "next/app";
import { ReactElement, ReactNode } from "react";

import { NextPage } from "next";
import { ChatwootWidget } from "@/components/chatwoot";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Component {...pageProps} />
      <Analytics />
      <ChatwootWidget />
    </>,
  );
}

export default MyApp;
