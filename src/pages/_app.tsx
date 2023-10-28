import "@/ui/styles/globals.scss";
import type { AppProps /*, AppContext */ } from "next/app";
import { useEffect } from "react";
import "aos/dist/aos.css";
import aos from "aos";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    aos.init({ once: true });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
