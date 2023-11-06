import { FirebaseCMSApp } from "firecms";
import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import { FIREBASE_CONFIG } from "@/utils/constants";
import { useAuthenticator } from "./authenticator";
import {
  projectsCollection,
  skillsCollection,
  resumeCollection,
  mediaCollection,
} from "./models";
import { useDataEnhancementPlugin } from "@firecms/data_enhancement";

export default function AdminApp() {
  const dataEnhancementPlugin = useDataEnhancementPlugin();
  const { GoogleAuthenticator } = useAuthenticator();

  return (
    <FirebaseCMSApp
      basePath="/admin/b"
      name="CMS"
      plugins={[dataEnhancementPlugin]}
      authentication={GoogleAuthenticator}
      collections={[
        projectsCollection,
        skillsCollection,
        resumeCollection,
        mediaCollection,
      ]}
      firebaseConfig={FIREBASE_CONFIG}
      signInOptions={["google.com"]}
    />
  );
}
