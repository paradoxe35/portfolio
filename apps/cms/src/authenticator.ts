import { FIRECMS_ADMIN_EMAI } from "./constants";
import { User as FirebaseUser } from "firebase/auth";
import { Authenticator } from "firecms";
import { useCallback } from "react";

export function useAuthenticator() {
  const GoogleAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (!FIRECMS_ADMIN_EMAI.includes(user?.email || "")) {
        return false;
      }

      console.log("Allowing access to", user?.email);

      return true;
    },
    [],
  );

  return { GoogleAuthenticator };
}
