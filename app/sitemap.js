import { readDB } from "@/lib/db";

export default function sitemap() {
  const { settings, servicesList, products } = readDB();
  const domain = settings?.domain ? `https://${settings.domain.replace(/^https?:\/\//, "")}` : "https://prefabpanelnepal.com";

  const staticRoutes = [
    "",
    "/about-us",
    "/about-us/chairperson-message",
    "/about-us/mission-vision",
    "/about-us/board-of-directors",
    "/about-us/management-committee",
    "/services",
    "/products",
    "/dealership",
    "/gallery",
    "/catalogue",
    "/investor-relations",
    "/notice",
    "/newsletter",
    "/contact",
  ].map((route) => ({
    url: `${domain}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = (servicesList || []).map((s) => ({
    url: `${domain}/services/${s.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const productRoutes = (products || []).map((p) => ({
    url: `${domain}/products/${p.id}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes];
}
