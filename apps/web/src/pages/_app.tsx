import "@/styles/globals.scss";
import Script from "next/script";
import type { AppProps /*, AppContext */ } from "next/app";
import { FC, ReactElement, ReactNode, useEffect } from "react";
import "aos/dist/aos.css";
import aos from "aos";

import { NextPage } from "next";
import { useRouter } from "next/router";

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
      <Init />
      <Component {...pageProps} />
    </>,
  );
}

function Init() {
  const route = useRouter();

  return <>{!route.asPath.includes("/admin") && <></>}</>;
}

export default MyApp;
