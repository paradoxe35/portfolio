import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/b");
  }, []);

  return <></>;
}

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
