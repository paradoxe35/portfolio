import dynamic from "next/dynamic";
import { ReactElement } from "react";

const AdminApp = dynamic(() => import("@/firecms"), {
  ssr: false,
});

export default function AdminPages() {
  return <AdminApp />;
}

AdminPages.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
