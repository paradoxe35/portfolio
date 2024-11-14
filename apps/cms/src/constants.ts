export const FIRECMS_ADMIN_EMAI = (
  import.meta.env.VITE_FIRECMS_ADMIN_EMAIL || ""
)
  .split(",")
  .map((t: string) => t.trim());

if (FIRECMS_ADMIN_EMAI.length === 0) {
  throw new Error("FIRECMS_ADMIN_EMAIL is not set");
}
