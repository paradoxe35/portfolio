import React from "react";
import ReactDOM from "react-dom/client";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import { FirebaseCMSApp, FirebaseLoginView } from "firecms";
import { useAuthenticator } from "./authenticator";
import { useDataEnhancementPlugin } from "@firecms/data_enhancement";

import firebaseConfig from "@repo/firebase-config/config.json";

import {
  mediaCollection,
  projectsCollection,
  resumeCollection,
  skillsCollection,
} from "./collections";
import { textSearchController } from "./search";

function AdminApp() {
  const dataEnhancementPlugin = useDataEnhancementPlugin();
  const { GoogleAuthenticator } = useAuthenticator();

  return (
    <FirebaseCMSApp
      name="Pngwasi CMS"
      plugins={[dataEnhancementPlugin]}
      authentication={GoogleAuthenticator}
      collections={[
        projectsCollection,
        skillsCollection,
        resumeCollection,
        mediaCollection,
      ]}
      textSearchController={textSearchController}
      firebaseConfig={firebaseConfig}
      signInOptions={["google.com"]}
      primaryColor="#a37c44"
      LoginView={(props) => {
        return (
          <>
            <FirebaseLoginView
              {...props}
              additionalComponent={
                <a
                  style={{ marginTop: "1rem", color: "#a37c44" }}
                  href="https://pngwasi.me"
                >
                  {"Or go to pngwasi.me"}
                </a>
              }
            />
          </>
        );
      }}
    />
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);
