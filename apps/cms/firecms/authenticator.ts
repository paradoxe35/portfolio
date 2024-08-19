import { FIRECMS_ADMIN_EMAI } from "@/utils/constants";
import { User as FirebaseUser } from "firebase/auth";
import { Authenticator } from "firecms";
import { useCallback } from "react";

export function useAuthenticator() {
  const GoogleAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (user?.email !== FIRECMS_ADMIN_EMAI) {
        return false;
      }

      console.log("Allowing access to", user?.email);
      // This is an example of retrieving async data related to the user
      // and storing it in the user extra field.

      // const sampleUserRoles = await Promise.resolve(["admin"]);
      // authController.setExtra(sampleUserRoles);

      return true;
    },
    [],
  );

  return { GoogleAuthenticator };
}
