import { readDB } from "@/lib/db";

export default function robots() {
  const { settings } = readDB();
  const domain = settings?.domain ? `https://${settings.domain.replace(/^https?:\/\//, "")}` : "https://prefabpanelnepal.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/admin-dashboard", "/admin-dashboard/*", "/api/*"],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
