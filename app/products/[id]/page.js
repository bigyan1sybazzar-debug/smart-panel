import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

// Force server-render on every request so admin DB edits show immediately
export const dynamic = "force-dynamic";

export function generateMetadata({ params }) {
  const { products, settings } = readDB();
  const product = products.find((p) => String(p.id) === String(params.id));
  if (!product) return { title: "Product Not Found" };

  const companyName = settings?.companyName || "Smart Prefab Panel";
  return {
    title: `${product.name} in Nepal | Specs, Sizes & Pricing | ${companyName}`,
    description: `${product.name} manufactured in Bharatpur, Chitwan by ${companyName}. ${product.description.slice(0, 150)}...`,
    keywords: [
      product.name,
      `${product.name} Nepal`,
      `${product.category} Price Nepal`,
      "Smart Prefab Panel",
      "Prefab Panel Nepal",
      "Earthquake Resistant Building Material"
    ],
    openGraph: {
      title: `${product.name} | ${companyName}`,
      description: product.description,
      images: [product.image || "/images/sandwich-panel.jpg"],
    },
  };
}

export default function ProductDetailPage({ params }) {
  const { products, settings, governmentRates = [], technicalData = [] } = readDB();
  const product = products.find((p) => String(p.id) === String(params.id));
  if (!product) notFound();

  const domain = settings?.domain ? `https://${settings.domain.replace(/^https?:\/\//, "")}` : "https://prefabpanelnepal.com";
  const primaryPhone = settings?.phone?.split(" / ")[0] || "+977-9851149804";
  const cleanPhone = primaryPhone.replace(/[^0-9+]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(`Hello Smart Panel Nepal, I would like to inquire about pricing and specifications for ${product.name}.`)}`;

  const otherProducts = products.filter((p) => String(p.id) !== String(params.id));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `${domain}${product.image || "/images/sandwich-panel.jpg"}`,
    "description": product.description,
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "Smart Panel"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": settings?.legalName || "Prefab Panel Nepal Pvt. Ltd.",
      "url": domain
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "NPR",
      "lowPrice": "191",
      "highPrice": "495",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  // Try to parse admin-supplied specs first, then fall back to hardcoded
  const getSpecs = () => {
    // If admin provided specs as JSON string, parse and use them
    if (product.specs) {
      try {
        const parsed = typeof product.specs === "string" ? JSON.parse(product.specs) : product.specs;
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        // fall through to hardcoded
      }
    }
    // Hardcoded fallback for original 4 products
    if (product.id === "3") {
      return [
        { label: "Core Material", value: "Virgin EPS Beads + High-Grade OPC Cement" },
        { label: "Standard Sizes", value: "100×200×600mm, 150×200×600mm, 200×200×600mm" },
        { label: "Surface Density", value: "450 – 550 kg/m³ (approx. 1/3 of clay bricks)" },
        { label: "Compressive Strength", value: "≥ 3.5 – 5.0 MPa" },
        { label: "Thermal Conductivity", value: "≤ 0.12 W/(m·K) (High Thermal Resistance)" },
        { label: "Acoustic Insulation", value: "≥ 38 – 45 dB Sound Transmission Reduction" },
        { label: "Moisture Absorption", value: "≤ 8% (Water Repellent & Mould Resistant)" },
        { label: "Manufacturing Facility", value: "Darai Tole-8, Bharatpur, Chitwan, Nepal" },
      ];
    } else if (product.id === "1") {
      return [
        { label: "Facing Boards", value: "4.5mm High-Density Calcium Silicate Board (Both Sides)" },
        { label: "Core Composition", value: "Expanded Polystyrene (EPS) + OPC Cement Core" },
        { label: "Interlocking System", value: "Tongue and Groove (Male-Female joint)" },
        { label: "Available Thicknesses", value: "50mm, 75mm, 100mm, 120mm" },
        { label: "Standard Dimensions", value: "Length: 2400 / 2700 / 3000 mm | Width: 610 mm" },
        { label: "Fire Resistance", value: "Up to 4 Hours (Non-combustible A1 Class)" },
        { label: "Sound Insulation", value: "35 dB to 48 dB depending on thickness" },
        { label: "Compliance Standard", value: "ISO 9001:2015 & Nepal District Rate List Approved" },
      ];
    } else if (product.id === "2") {
      return [
        { label: "Structure", value: "Mesh-Reinforced EPS Concrete Core" },
        { label: "Finishing", value: "Direct Cement Plaster or Gypsum Putty Applied On-Site" },
        { label: "Available Thicknesses", value: "50mm, 75mm, 100mm, 120mm" },
        { label: "Length & Width", value: "2400/2700/3000 mm × 610 mm" },
        { label: "Impact Resistance", value: "≥ 10 – 15 times impact without crack" },
        { label: "Hanging Strength", value: "≥ 1200 – 1500 N single point capacity" },
        { label: "Recommended Use", value: "High-traffic partition walls, exterior compound walls" },
        { label: "Factory Warranty", value: "Guaranteed Against Structural Defect" },
      ];
    } else if (product.id === "4") {
      return [
        { label: "Material Grade", value: "High-Tensile Galvanized Light Gauge Steel (G550 / Z275)" },
        { label: "Coating", value: "Corrosion-Proof Heavy Zinc Galvanization" },
        { label: "Components", value: "U-Channels, C-Studs, Anchor Angles, Track Profiles" },
        { label: "Accessories", value: "Expansion Bolts, Self-Drilling Screws, Joint Crack Mesh" },
        { label: "Custom Sizing", value: "Engineered to Architectural CAD Blueprints" },
        { label: "Seismic Rating", value: "Nepal National Building Code (NBC) Compliant" },
        { label: "Durability", value: "Rust-proof, Termite-proof, Weather resistant" },
        { label: "Origin", value: "Precision roll-formed at Bharatpur, Chitwan plant" },
      ];
    }
    return [];
  };


  const specs = getSpecs();

  return (
    <div>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <PageHero
        crumb="Products &amp; Catalogue"
        title={product.name}
        subtitle={`${product.category} • Engineered in Nepal for seismic safety, thermal comfort, and rapid construction.`}
      />

      {/* Main Product Showcase Section */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left: Product Image & Highlights */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="relative h-72 sm:h-96 md:h-[420px] w-full rounded-2xl overflow-hidden border border-gray-100 shadow-lg bg-gray-50 group">
                <Image
                  src={product.image || "/images/sandwich-panel.jpg"}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-md z-10">
                  {product.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1.5 rounded-md shadow-md z-10 flex items-center gap-1.5">
                  <span>★</span> ISO 9001:2015 Verified
                </div>
              </div>

              {/* Quick Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-xl">
                  <span className="text-brand-orange text-lg font-bold block mb-1">🛡️</span>
                  <span className="text-[11px] font-bold text-gray-800 block">Earthquake Safe</span>
                  <span className="text-[10px] text-gray-500">60% Weight Drop</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-xl">
                  <span className="text-brand-blue text-lg font-bold block mb-1">🌡️</span>
                  <span className="text-[11px] font-bold text-gray-800 block">Thermal Barrier</span>
                  <span className="text-[10px] text-gray-500">All-Season Comfort</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-xl">
                  <span className="text-amber-500 text-lg font-bold block mb-1">🔥</span>
                  <span className="text-[11px] font-bold text-gray-800 block">Fire Rated</span>
                  <span className="text-[10px] text-gray-500">Up to 4 Hours</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-xl">
                  <span className="text-emerald-500 text-lg font-bold block mb-1">⚡</span>
                  <span className="text-[11px] font-bold text-gray-800 block">Fast Assembly</span>
                  <span className="text-[10px] text-gray-500">50% Shorter Build</span>
                </div>
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full mb-3 border border-orange-200/60">
                  <span>Factory Direct • Bharatpur Plant</span>
                </div>

                <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-blue-dark leading-tight">
                  {product.name}
                </h1>

                {product.sizes && (
                  <div className="mt-3 inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-lg">
                    📏 Dimensions: {product.sizes}
                  </div>
                )}
                {product.price && (
                  <div className="mt-2 inline-block bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold px-3 py-1.5 rounded-lg ml-2">
                    💰 Starting from: {product.price}
                  </div>
                )}

                <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {product.description}
                </p>

                {/* Government Rate Notice banner */}
                <div className="mt-6 bg-slate-900 text-white p-4 rounded-xl border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                      Official Government Listing
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-200">
                      Approved on Government District Rate List (Starts from NPR 191/sq. ft.)
                    </span>
                  </div>
                  <Link
                    href="/notice"
                    className="text-xs font-bold text-amber-300 hover:text-white underline underline-offset-4 shrink-0"
                  >
                    View Notice &rarr;
                  </Link>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="btn-primary text-center justify-center font-bold text-sm py-3 px-6 shadow-md"
                  >
                    Request Factory Quote &rarr;
                  </Link>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm py-3 px-6 rounded-md shadow-md transition-colors"
                  >
                    <span>💬</span> Chat on WhatsApp
                  </a>

                  <a
                    href={`tel:${cleanPhone}`}
                    className="btn-outline text-center justify-center font-bold text-sm py-3 px-5"
                  >
                    📞 Call Sales
                  </a>
                </div>
              </div>

              {/* Manufacturer Assurance Box */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Direct Delivery to all 77 Districts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>On-Site Technical Supervision</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Commercial &amp; Residential Orders</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Detailed Technical Specifications Table */}
      {specs.length > 0 && (
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container-page">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
              Engineering Data &amp; Testing
            </span>
            <h2 className="section-title text-2xl sm:text-3xl mt-1">
              Technical Specifications
            </h2>
            <div className="w-16 h-1 bg-brand-orange mt-2 mb-3 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-600">
              Verified physical and mechanical test parameters for {product.name} manufactured under ISO 9001:2015 Quality Management standards.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-brand-blue text-white uppercase text-[11px] tracking-wider">
                  <th className="py-3.5 px-4 sm:px-6 w-1/3">Specification Parameter</th>
                  <th className="py-3.5 px-4 sm:px-6">Test Standard / Certified Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {specs.map((s, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-800">{s.label || s.name}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-gray-600 font-medium">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Download Technical Docs */}
          <div className="mt-8 bg-blue-50/80 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-base text-brand-blue-dark">
                Need Detailed Engineering Drawings &amp; Test Certificates?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Download our complete technical catalogue and official test sheets for structural calculations and municipal approvals.
              </p>
            </div>
            <Link
              href="/catalogue"
              className="btn-outline bg-white hover:bg-brand-blue hover:text-white shrink-0 text-xs sm:text-sm py-2.5 px-5"
            >
              Browse Catalogue &rarr;
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Related Products Carousel / Grid */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
                More Prefab Products
              </span>
              <h2 className="section-title text-2xl sm:text-3xl mt-1">
                Other Building Materials
              </h2>
            </div>
            <Link href="/products" className="btn-outline text-xs py-2 px-4">
              View All Products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 w-full relative overflow-hidden bg-gray-50">
                    <Image
                      src={p.image || "/images/sandwich-panel.jpg"}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-brand-blue text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-base text-brand-blue-dark group-hover:text-brand-blue transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link
                    href={`/products/${p.id}`}
                    className="block text-center text-xs font-bold text-brand-blue bg-blue-50 hover:bg-brand-blue hover:text-white py-2 px-3 rounded-lg transition-colors"
                  >
                    View Product Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
