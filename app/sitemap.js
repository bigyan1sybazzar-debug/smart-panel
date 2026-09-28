import { readDB } from "@/lib/db";

export default function sitemap() {
  const { settings, servicesList, products, blogs = [] } = readDB();
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
    "/blog",
    "/catalogue",
    "/investor-relations",
    "/notice",
    "/newsletter",
    "/contact",
  ].map((route) => ({
    url: `${domain}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : route === "/blog" ? "weekly" : "weekly",
    priority: route === "" ? 1.0 : route === "/blog" ? 0.9 : 0.8,
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

  const blogRoutes = blogs
    .filter((b) => (b.status || "Published").toLowerCase() === "published" && b.slug)
    .map((b) => ({
      url: `${domain}/blog/${b.slug}`,
      lastModified: b.publishedDate || new Date().toISOString().split("T")[0],
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes, ...blogRoutes];
}
