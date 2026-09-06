import Link from "next/link";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export async function generateMetadata() {
  const { settings } = readDB();
  const companyName = settings?.companyName || "Smart Prefab Panel";
  return {
    title: `EPS & PUF Sandwich Panels & Prefab Building Products | ${companyName}`,
    description: "Browse high-density EPS sandwich wall panels, PUF cold storage panels, insulated roofing sheets, and galvanized steel framing manufactured in Nepal.",
    keywords: [
      "EPS Sandwich Wall Panel Nepal",
      "PUF Cold Storage Panel Nepal",
      "Insulated Roofing Sheet Nepal",
      "Prefab Steel Frame Nepal",
      "Sandwich Panel Manufacturer Nepal",
      "Smart Prefab Panel Products"
    ],
    openGraph: {
      title: `EPS & PUF Sandwich Panels & Prefab Products | ${companyName}`,
      description: "High performance earthquake-resistant sandwich panels and roofing solutions factory manufactured in Nepal.",
      images: ["/images/sandwich-panel.jpg"],
    },
  };
}

export default function ProductsPage() {
  const { products, settings } = readDB();
  const domain = settings?.domain ? `https://${settings.domain.replace(/^https?:\/\//, "")}` : "https://prefabpanelnepal.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Smart Prefab Panel Products",
    "description": "Certified EPS & PUF sandwich panels, roofing sheets, and structural components.",
    "itemListElement": products.map((p, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": p.name,
        "category": p.category,
        "description": p.description,
        "image": `${domain}${p.image || "/images/sandwich-panel.jpg"}`,
        "brand": {
          "@type": "Brand",
          "name": settings?.companyName || "Smart Prefab Panel"
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "NPR",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": settings?.companyName || "Smart Prefab Panel"
          }
        }
      }
    }))
  };

  return (
    <div>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <PageHero
        crumb="Catalogue"
        title="Our Products"
        subtitle="Engineered EPS & PUF sandwich panels, insulated roofing sheets and galvanized steel frame systems for high thermal efficiency and seismic protection."
      />
      <div className="container-page py-10 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {products.map((p) => (
            <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between items-center text-center">
              <div className="w-full">
                <div className="h-36 sm:h-56 overflow-hidden relative bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image || "/images/sandwich-panel.jpg"}
                    alt={`${p.name} - Smart Prefab Panel Nepal`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-brand-blue text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-sm">
                    {p.category}
                  </span>
                </div>
                <div className="p-3.5 sm:p-6 flex flex-col items-center text-center">
                  <span className="text-[10px] sm:text-xs font-bold text-brand-orange uppercase tracking-wider text-center">{p.category}</span>
                  <h2 className="font-display font-bold text-xs sm:text-lg text-brand-blue-dark mt-1 group-hover:text-brand-blue transition-colors text-center leading-tight break-words">
                    {p.name}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-gray-600 mt-2 leading-relaxed text-center">{p.description}</p>
                </div>
              </div>

              <div className="p-3.5 sm:p-6 pt-0 w-full flex justify-center">
                <Link
                  href={`/products/${p.id}`}
                  className="inline-flex items-center justify-center w-full bg-brand-cream hover:bg-brand-blue hover:text-white text-brand-blue-dark font-bold text-[11px] sm:text-xs py-2 sm:py-2.5 px-3 rounded-lg border border-blue-900/10 transition-colors text-center"
                >
                  View Specs &rarr;
                </Link>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-gray-500 col-span-full text-center py-10">Products will be listed here soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
