import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/b");
  }, [router]);

  return <></>;
}

AdminPage.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
