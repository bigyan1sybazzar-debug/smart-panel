import { readDB } from "@/lib/db";

export default function robots() {
  const { settings } = readDB();
  const domain = settings?.domain ? `https://${settings.domain.replace(/^https?:\/\//, "")}` : "https://prefabpanelnepal.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
