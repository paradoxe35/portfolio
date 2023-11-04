import "@/ui/styles/globals.scss";
// import Script from "next/script";
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
      {/* <Script id="sitespeak-script" type="text/javascript">
        {`(function(){d=document;s=d.createElement("script");s.src="https://sitespeak.ai/chatbots/6e3433de-45e5-41e0-b6bb-a9cbfd2055e3.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
      </Script> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
