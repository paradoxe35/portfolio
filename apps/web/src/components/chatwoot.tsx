import { useEffect } from "react";

declare global {
  interface Window {
    chatwootSettings: any;
    chatwootSDK: any;
  }
}

export function ChatwootWidget() {
  useEffect(() => {
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "right",
      locale: "en",
      type: "standard",
    };

    const BASE_URL = "https://app.chatwoot.com";
    const websiteToken = "tkonZs8mrZz7kTSEXsiHPqMo";

    (function (d, t) {
      const g = d.createElement(t) as HTMLScriptElement,
        s = d.getElementsByTagName(t)[0];
      g.src = BASE_URL + "/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode?.insertBefore(g, s);
      g.onload = function () {
        window.chatwootSDK.run({
          websiteToken,
          baseUrl: BASE_URL,
        });
      };
    })(document, "script");
  }, []);

  return <></>;
}
