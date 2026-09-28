import Link from "next/link";
import Image from "next/image";
import { readDB } from "@/lib/db";
import BlogListClient from "./BlogListClient";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const { settings } = readDB();
  const domain = settings?.domain
    ? `https://${settings.domain.replace(/^https?:\/\//, "")}`
    : "https://prefabpanelnepal.com";

  return {
    metadataBase: new URL(domain),
    title: "Prefab & Smart Panel Blogs, Technical Guides & Articles | Smart Panel Nepal",
    description:
      "Explore expert insights on seismic safety, building cost comparison, government rate lists, thermal insulation, and prefab EPS panel construction techniques in Nepal.",
    keywords: [
      "Smart Panel Nepal Blog",
      "Prefab Building Articles Nepal",
      "EPS Panel Earthquake Safety",
      "Building Cost Comparison Nepal",
      "Government District Rate List EPS",
      "Thermal Insulation Nepal",
      "Prefab House Construction Guide",
    ],
    alternates: {
      canonical: "/blog",
    },
    openGraph: {
      title: "Prefab Building Insights & Technical Articles | Smart Panel Nepal",
      description:
        "Expert guides on lightweight EPS sandwich panels, seismic safety, government rates, and modern construction in Nepal.",
      url: `${domain}/blog`,
      siteName: settings?.companyName || "Smart Panel Nepal",
      images: [
        {
          url: `${domain}/images/prefab-house.webp`,
          width: 1200,
          height: 630,
          alt: "Smart Panel Nepal Blogs & Building Insights",
        },
      ],
      type: "website",
    },
  };
}

export default function BlogListingPage() {
  const { blogs = [] } = readDB();
  const publishedBlogs = blogs.filter(
    (b) => (b.status || "Published").toLowerCase() === "published"
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1b75bc_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="container-page relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-blue/80 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 border border-blue-400/20">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span>KNOWLEDGE HUB &amp; ENGINEERING INSIGHTS</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Building Insights &amp; Prefab Guides
          </h1>
          <p className="mt-3 text-gray-300 text-xs sm:text-base leading-relaxed">
            Expert articles on seismic safety, EPS sandwich panel engineering, government district rates, cost comparisons, and modern construction practices in Nepal.
          </p>
        </div>
      </section>

      {/* Main Interactive Blog Section */}
      <div className="container-page py-10 sm:py-16">
        <BlogListClient initialBlogs={publishedBlogs} />
      </div>
    </div>
  );
}
