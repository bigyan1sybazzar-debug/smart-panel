import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { blogs = [], settings } = readDB();
  const blog = blogs.find((b) => b.slug === params.slug);
  if (!blog) return { title: "Article Not Found" };

  const domain = settings?.domain
    ? `https://${settings.domain.replace(/^https?:\/\//, "")}`
    : "https://prefabpanelnepal.com";

  const tags = Array.isArray(blog.tags) ? blog.tags : (blog.tags || "").split(",").map((t) => t.trim());

  return {
    metadataBase: new URL(domain),
    title: `${blog.title} | Smart Panel Nepal Blog`,
    description: blog.excerpt || blog.title,
    keywords: tags,
    authors: [{ name: blog.author || "Smart Panel Nepal" }],
    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `${domain}/blog/${blog.slug}`,
      siteName: settings?.companyName || "Smart Panel Nepal",
      images: [
        {
          url: blog.image?.startsWith("http") ? blog.image : `${domain}${blog.image}`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.publishedDate,
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image?.startsWith("http") ? blog.image : `${domain}${blog.image}`],
    },
  };
}

export default function BlogDetailPage({ params }) {
  const { blogs = [] } = readDB();
  const blog = blogs.find((b) => b.slug === params.slug && (b.status || "Published").toLowerCase() === "published");

  if (!blog) notFound();

  const tags = Array.isArray(blog.tags) ? blog.tags : (blog.tags || "").split(",").map((t) => t.trim()).filter(Boolean);

  const relatedBlogs = blogs
    .filter(
      (b) =>
        b.id !== blog.id &&
        (b.status || "Published").toLowerCase() === "published" &&
        (b.category === blog.category ||
          tags.some((t) => (b.tags || []).includes(t)))
    )
    .slice(0, 3);

  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image,
    author: {
      "@type": "Person",
      name: blog.author || "Smart Panel Nepal",
      jobTitle: blog.authorRole || "",
    },
    publisher: {
      "@type": "Organization",
      name: "Prefab Panel Nepal Pvt. Ltd.",
      url: "https://prefabpanelnepal.com",
    },
    datePublished: blog.publishedDate,
    dateModified: blog.publishedDate,
    keywords: tags.join(", "),
    articleSection: blog.category,
  });

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />

      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Hero Image Banner */}
        <div className="relative h-72 sm:h-96 lg:h-[480px] w-full bg-slate-900 overflow-hidden">
          <Image
            src={blog.image || "/images/prefab-house.webp"}
            alt={blog.title}
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />

          {/* Breadcrumb */}
          <div className="absolute top-6 left-0 right-0 z-10">
            <div className="container-page">
              <nav className="flex items-center gap-2 text-xs text-white/70 font-medium">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>›</span>
                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                <span>›</span>
                <span className="text-white/50 truncate max-w-[200px]">{blog.title}</span>
              </nav>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute bottom-6 left-0 right-0 z-10">
            <div className="container-page">
              <span className="inline-flex items-center gap-1.5 bg-brand-orange text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                {blog.category}
              </span>
            </div>
          </div>
        </div>

        <div className="container-page py-8 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
            {/* ─── Main Article Content ─── */}
            <article className="lg:col-span-8">
              {/* Title */}
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-blue-dark leading-tight">
                {blog.title}
              </h1>

              {/* Author & Meta */}
              <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-5 border-b border-gray-200 pb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-bold text-sm flex items-center justify-center shrink-0 shadow">
                    {(blog.author || "SP")[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{blog.author || "Smart Panel Team"}</p>
                    <p className="text-[11px] text-gray-500">{blog.authorRole || "Smart Panel Nepal"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>📅 {blog.publishedDate}</span>
                  <span>•</span>
                  <span>⏱ {blog.readTime || "5 min read"}</span>
                </div>
              </div>

              {/* Excerpt */}
              <p className="mt-6 text-sm sm:text-base text-gray-600 leading-relaxed font-medium italic border-l-4 border-brand-orange pl-4">
                {blog.excerpt}
              </p>

              {/* Article HTML Content */}
              <div
                className="mt-8 prose-article"
                dangerouslySetInnerHTML={{ __html: blog.content || "" }}
              />

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Topics &amp; Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-50 text-brand-blue border border-blue-200 text-[11px] font-semibold px-3 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Block */}
              <div className="mt-10 bg-gradient-to-br from-brand-blue to-brand-blue-dark text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <p className="text-amber-300 text-xs font-bold uppercase tracking-widest mb-1">Ready to Build Smarter?</p>
                  <h3 className="font-display font-bold text-xl leading-snug">Get a Free Quote for Smart Panel</h3>
                  <p className="text-white/80 text-xs mt-1">Factory direct from Bharatpur, Chitwan. Delivered across all 77 districts of Nepal.</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <a
                    href="tel:+9779851149804"
                    className="inline-flex items-center justify-center bg-brand-orange hover:bg-amber-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all shadow-md whitespace-nowrap"
                  >
                    📞 Call: +977-9851149804
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-5 py-2.5 rounded-lg border border-white/20 transition-all whitespace-nowrap"
                  >
                    Request Quotation →
                  </Link>
                </div>
              </div>

              {/* Back Link */}
              <div className="mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-brand-blue transition-colors"
                >
                  ← Back to All Articles
                </Link>
              </div>
            </article>

            {/* ─── Sidebar ─── */}
            <aside className="lg:col-span-4 space-y-6">
              {/* About Author Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="font-display font-bold text-sm text-brand-blue-dark mb-3">About the Author</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-brand-blue text-white font-extrabold text-base flex items-center justify-center shrink-0 shadow">
                    {(blog.author || "SP")[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{blog.author || "Smart Panel Team"}</p>
                    <p className="text-[11px] text-gray-500">{blog.authorRole}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Expert contributor at Prefab Panel Nepal Pvt. Ltd. — Nepal's ISO 9001:2015 certified EPS sandwich panel manufacturer.
                </p>
              </div>

              {/* Company Info Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm">
                <p className="text-amber-300 text-[10px] font-bold uppercase tracking-widest mb-1">ISO 9001:2015 Certified</p>
                <h3 className="font-display font-bold text-base text-white leading-tight">Smart Panel Nepal</h3>
                <p className="text-white/70 text-xs mt-2 leading-relaxed">
                  Nepal's premier manufacturer of EPS sandwich panels, solid panels, and EPS blocks. Factory in Bharatpur, Chitwan.
                </p>
                <div className="mt-4 space-y-2">
                  <a href="tel:+9779851149804" className="flex items-center gap-2 text-xs text-amber-300 font-bold hover:text-amber-200 transition-colors">
                    📞 +977-9851149804
                  </a>
                  <a href="mailto:info@prefabpanelnepal.com" className="flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors">
                    ✉ info@prefabpanelnepal.com
                  </a>
                  <p className="flex items-center gap-2 text-xs text-white/60">
                    📍 Pepsicola-32, Kathmandu
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="mt-4 block text-center text-xs font-bold bg-brand-orange hover:bg-amber-500 text-white py-2.5 rounded-lg transition-all"
                >
                  Contact Our Team →
                </Link>
              </div>

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <h3 className="font-display font-bold text-sm text-brand-blue-dark mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/blog/${rel.slug}`}
                        className="group flex items-center gap-3 hover:bg-gray-50 rounded-xl transition-colors"
                      >
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                          <Image
                            src={rel.image || "/images/prefab-house.webp"}
                            alt={rel.title}
                            fill
                            sizes="64px"
                            quality={60}
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-800 group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug">
                            {rel.title}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{rel.readTime || "4 min read"}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/blog"
                    className="mt-4 block text-center text-xs font-bold text-brand-blue hover:text-brand-orange transition-colors"
                  >
                    View All Articles →
                  </Link>
                </div>
              )}

              {/* Products Quick Link */}
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-5 shadow-sm">
                <h3 className="font-display font-bold text-sm text-brand-blue-dark mb-3">Smart Panel Products</h3>
                <div className="space-y-2 text-xs">
                  {[
                    { name: "EPS Sandwich Panel", href: "/products" },
                    { name: "Smart Solid Panel", href: "/products" },
                    { name: "Smart EPS Blocks", href: "/products" },
                  ].map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      className="flex items-center gap-2 text-gray-700 hover:text-brand-orange font-medium transition-colors py-1"
                    >
                      <span className="text-brand-orange text-[10px]">▶</span>
                      {p.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href="/products"
                  className="mt-4 block text-center text-xs font-bold bg-brand-blue hover:bg-brand-blue-dark text-white py-2.5 rounded-lg transition-all"
                >
                  View All Products →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
