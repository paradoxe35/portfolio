import "@/ui/styles/globals.scss";
import Script from "next/script";
import type { AppProps /*, AppContext */ } from "next/app";
import { FC, ReactElement, ReactNode, useEffect } from "react";
import "aos/dist/aos.css";
import aos from "aos";

import { NextPage } from "next";

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>;

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
      <Script
        id="sitespeak-script"
        src="https://chatwith.tools/chatbot/0834a97b-d36c-45f4-8009-2395c93c67a4.js"
        async={true}
        type="text/javascript"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
