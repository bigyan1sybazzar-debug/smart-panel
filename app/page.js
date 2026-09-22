import Link from "next/link";
import { readDB } from "@/lib/db";
import NewsletterForm from "@/components/NewsletterForm";
import HeroSlider from "@/components/HeroSlider";
import FaqAccordion from "@/components/FaqAccordion";
import AdvantageCard from "@/components/AdvantageCard";

export default function HomePage() {
  const {
    settings,
    advantages,
    servicesList,
    products,
    notices,
    heroSlides,
    reviews,
    projects,
    processSteps,
    faqs,
    governmentRates = [],
    additionalRates = [],
    technicalData = [],
    installationTools = [],
    sectors = [],
  } = readDB();

  const demoReviews = reviews?.length ? reviews : [];
  const demoProjects = projects?.length ? projects : [];
  const demoSteps = processSteps?.length ? processSteps : [];

  return (
    <div>
      {/* 1. Hero Slider Section */}
      <HeroSlider
        slides={
          heroSlides && heroSlides.length
            ? heroSlides
            : [
                {
                  id: "default",
                  title: settings.heroTitle,
                  subtitle: settings.heroSubtitle,
                  image: "/images/prefab-house.jpg",
                  ctaLabel: "Explore Products",
                  ctaHref: "/products",
                },
              ]
        }
      />

      {/* Trust Badges Bar */}
      <div className="bg-slate-900 text-white py-4 border-b border-slate-800">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold">★ ISO 9001:2015</span>
            <span className="text-gray-300">Certified Company</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓ Government Approved</span>
            <span className="text-gray-300">District Rate List Listed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sky-400 font-bold">🏭 NPR 20 Crore Plant</span>
            <span className="text-gray-300">Bharatpur, Chitwan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-300 font-bold">📦 150,000+ sq. ft./yr</span>
            <span className="text-gray-300">Annual Production</span>
          </div>
        </div>
      </div>

      {/* 2. Key Advantages / Salient Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50/80">
        <div className="container-page">
          <div className="text-left sm:text-center sm:max-w-3xl sm:mx-auto mb-6 sm:mb-10">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Why Builders Choose Us</span>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl mt-1">Salient Features &amp; Advantages</h2>
            <div className="w-16 sm:w-20 h-1 bg-brand-orange sm:mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed w-full">
              Seismic strength isn&apos;t an add-on — it&apos;s built into every Smart Panel. Tested and certified for fire, thermal, sound, and impact resistance.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {advantages.map((a, idx) => (
              <AdvantageCard key={a.id} advantage={a} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Us / Company Profile Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/korean-house.jpg"
                alt="Smart Panel Nepal Manufacturing & Construction"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-amber-300 font-bold bg-white/20 px-2 py-0.5 rounded">
                  ISO 9001:2015 Certified
                </span>
                <p className="font-display text-base sm:text-xl font-bold mt-1.5">
                  Prefab Panel Nepal Pvt. Ltd. (Brand: Smart Panel)
                </p>
                <p className="text-xs text-white/80 mt-0.5">Manufacturing Plant: Darai Tole-8, Bharatpur, Chitwan</p>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-brand-blue text-white p-5 lg:p-6 rounded-2xl shadow-xl max-w-xs border-4 border-white">
              <p className="text-xl lg:text-2xl font-extrabold font-display text-amber-300">NPR 20 Crore</p>
              <p className="text-xs text-white/90 mt-1 font-medium">State-of-the-art plant with 150,000 sq. ft. annual output</p>
            </div>
          </div>

          <div className="lg:col-span-6 mt-4 lg:mt-0 flex flex-col items-start text-left">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold text-left">Our Story &amp; Leadership</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-blue-dark mt-1 leading-tight text-left">
              The Smart Way to Build in Nepal
            </h2>
            <p className="mt-3 sm:mt-4 text-gray-600 leading-relaxed text-xs sm:text-sm md:text-base text-left w-full">
              We started in 2024 with a simple goal: help Nepal build better. A year later, our plant in Bharatpur, Chitwan came online, backed by an NPR 20 crore investment. Today it turns out 150,000 sq. ft. of Smart Panel a year — lightweight, insulated, and ready for sites across the country.
            </p>
            <div className="mt-3 p-3.5 bg-blue-50/80 rounded-lg border-l-4 border-brand-blue w-full">
              <p className="text-xs sm:text-sm text-gray-800 italic">
                &quot;Smart, eco-friendly, earthquake-ready building material so every community can build faster, safer, and for less.&quot;
              </p>
              <p className="text-xs font-bold text-brand-blue mt-1">
                — Bimal Raj Gosai, CEO (Prefab Panel Nepal Pvt. Ltd.)
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 sm:gap-4 bg-brand-cream/80 p-4 sm:p-5 rounded-xl border border-blue-900/5 text-center w-full">
              <Stat number="NPR 20 Cr" label="Chitwan Plant Investment" />
              <Stat number="150,000" label="Sq. Ft. Annual Output" />
              <Stat number="≥3-4 Hrs" label="Fire Proof Rating" />
              <Stat number="77" label="Districts Served" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/about-us" className="btn-primary text-xs sm:text-sm py-2.5 px-5">
                Our Full Company Profile &rarr;
              </Link>
              <Link href="/contact" className="btn-outline text-xs sm:text-sm py-2.5 px-5">
                Visit Bharatpur Plant / Pepsicola HQ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Government District Rate List Section (HIGH TRUST & VALUE) */}
      <section className="py-8 sm:py-12 lg:py-16 bg-slate-900 text-white">
        <div className="container-page">
          <div className="text-left sm:text-center sm:max-w-3xl sm:mx-auto mb-6 sm:mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold bg-white/10 px-3 py-1 rounded-full">
              Proven Where It Counts
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2">
              Government District Rate List
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-brand-orange sm:mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Smart Panel is officially listed on the Government District Rate List — making it straightforward to specify and tender on public infrastructure, institutional developments, and private construction across Nepal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Rates Table */}
            <div className="lg:col-span-8 bg-slate-800/90 rounded-2xl p-4 sm:p-6 border border-slate-700 shadow-xl overflow-x-auto">
              <h3 className="font-display text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                <span>📋 Official Approved Panel Rates</span>
              </h3>
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[480px]">
                <thead>
                  <tr className="border-b border-slate-700 text-gray-400 text-xs uppercase tracking-wider bg-slate-800">
                    <th className="py-3 px-4">Panel Thickness</th>
                    <th className="py-3 px-4 text-amber-300">Government District Rate</th>
                    <th className="py-3 px-4">Recommended Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/60">
                  {governmentRates.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-700/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">{r.thickness}</td>
                      <td className="py-3.5 px-4 font-extrabold text-amber-400 text-sm sm:text-base">{r.rate}</td>
                      <td className="py-3.5 px-4 text-gray-300">{r.idealFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 pt-4 border-t border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {additionalRates.map((a, i) => (
                  <div key={i} className="bg-slate-900/60 p-3 rounded-lg border border-slate-700/50 flex justify-between items-center">
                    <span className="text-gray-300">{a.item}:</span>
                    <span className="font-bold text-emerald-400">{a.rate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Rates Matter Card */}
            <div className="lg:col-span-4 bg-gradient-to-br from-blue-900/50 to-emerald-950/50 p-6 rounded-2xl border border-blue-800/40 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Public &amp; Private Tender Ready</span>
                <h4 className="font-display text-lg font-bold text-white mt-1">Standardized Transparency</h4>
                <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                  Architects, civil engineers, and project managers can immediately specify Smart Panels in engineering estimates and government tenders without bureaucratic friction.
                </p>
                <div className="mt-4 space-y-2 text-xs text-gray-200">
                  <p className="flex items-center gap-2">✓ Verified quality and density tests</p>
                  <p className="flex items-center gap-2">✓ Standardized nationwide rates</p>
                  <p className="flex items-center gap-2">✓ Factory direct invoicing from Chitwan</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="tel:+9779851149804"
                  className="w-full block text-center bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs py-3 px-4 rounded-lg transition-all shadow-md"
                >
                  Call Sales Hotline (+977-9851149804)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Products Catalogue Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
            <div className="text-left">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Product Showcase</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-blue-dark mt-1">
                Our Smart Panel Products
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                4.5mm calcium silicate board skins, light EPS-cement core, and tongue-and-groove interlocking.
              </p>
            </div>
            <Link href="/products" className="btn-outline text-xs sm:text-sm py-2 px-4 self-start sm:self-auto">
              View All Products &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 w-full overflow-hidden relative bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image || "/images/sandwich-panel.jpg"}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-sm">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-base text-brand-blue-dark group-hover:text-brand-blue transition-colors leading-tight">
                      {p.name}
                    </h3>
                    {p.sizes && (
                      <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-2">
                        Sizes: {p.sizes}
                      </p>
                    )}
                    <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">{p.description}</p>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link
                    href="/contact"
                    className="block text-center text-xs font-bold text-brand-blue bg-blue-50 hover:bg-brand-blue hover:text-white py-2 px-3 rounded-lg transition-colors"
                  >
                    Request Quote &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Technical Data Specifications (From PDF Page 3) */}
      {technicalData.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 border-t border-b border-gray-200/70">
          <div className="container-page">
            <div className="text-left sm:text-center sm:max-w-3xl sm:mx-auto mb-6 sm:mb-10">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Tested &amp; Certified</span>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl mt-1">
                Technical Data — Sandwich Panel
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-brand-orange sm:mx-auto mt-3 mb-4 rounded-full" />
              <p className="text-gray-600 text-xs sm:text-sm">
                Comprehensive laboratory and structural metrics for Smart Sandwich Panels across 50mm, 75mm, 100mm, and 120mm dimensions.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px]">
                <thead>
                  <tr className="bg-brand-blue text-white text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6">Technical Specification</th>
                    <th className="py-3.5 px-3 text-center">50 mm</th>
                    <th className="py-3.5 px-3 text-center">75 mm</th>
                    <th className="py-3.5 px-3 text-center">100 mm</th>
                    <th className="py-3.5 px-3 text-center">120 mm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {technicalData.map((t, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                      <td className="py-3 px-4 sm:px-6 font-medium text-gray-800">{t.property}</td>
                      <td className="py-3 px-3 text-center font-bold text-gray-700">{t.v50}</td>
                      <td className="py-3 px-3 text-center font-bold text-gray-700">{t.v75}</td>
                      <td className="py-3 px-3 text-center font-bold text-gray-700">{t.v100}</td>
                      <td className="py-3 px-3 text-center font-bold text-gray-700">{t.v120}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 7. Built for Every Builder (Sectors) */}
      {sectors.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="container-page">
            <div className="text-left sm:text-center sm:max-w-2xl sm:mx-auto mb-6 sm:mb-10">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Applications</span>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl mt-1">Built for Every Builder</h2>
              <div className="w-16 sm:w-20 h-1 bg-brand-orange sm:mx-auto mt-3 rounded-full" />
              <p className="text-xs sm:text-sm text-gray-600 mt-3 text-left sm:text-center w-full">
                Engineered to bring value across high-rise, institutional, agricultural, and residential construction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {sectors.map((sec, idx) => (
                <div
                  key={idx}
                  className="bg-brand-cream/60 rounded-2xl p-5 sm:p-6 border border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-blue text-white font-bold flex items-center justify-center mb-3">
                    {idx + 1}
                  </div>
                  <h3 className="font-display font-bold text-base text-brand-blue-dark mb-2">{sec.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{sec.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. On-Site Installation (Five Tools) */}
      {installationTools.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-slate-900 text-white">
          <div className="container-page">
            <div className="text-left sm:text-center sm:max-w-3xl sm:mx-auto mb-6 sm:mb-10">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Rapid Assembly</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold mt-1">
                On-Site Installation with 5 Familiar Tools
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-brand-orange sm:mx-auto mt-3 mb-4 rounded-full" />
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                No heavy cranes or long learning curve. A standard Smart Panel crew gets to work immediately with five familiar job-site tools.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {installationTools.map((tool, idx) => (
                <div key={idx} className="bg-slate-800 p-4 sm:p-5 rounded-xl border border-slate-700 text-center flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-brand-orange/20 text-brand-orange font-extrabold flex items-center justify-center text-sm mb-2">
                    0{idx + 1}
                  </div>
                  <h3 className="font-display font-bold text-sm text-white mb-1">{tool.name}</h3>
                  <p className="text-[11px] text-gray-400 leading-snug">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Completed Projects Showcase (PDF Page 4) */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
            <div className="text-left">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Our Work Across Nepal</span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-blue-dark mt-1">
                On-Going &amp; Completed Projects
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Trusted by hospitals, schools, hydropower projects, and cinemas nationwide.
              </p>
            </div>
            <Link href="/gallery" className="btn-outline text-xs sm:text-sm py-2 px-4 self-start sm:self-auto">
              View Full Gallery &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {demoProjects.map((prj) => (
              <div
                key={prj.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={prj.image}
                    alt={prj.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-2.5 right-2.5 bg-brand-orange text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                    {prj.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-brand-blue-dark leading-tight">
                      {prj.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">📍 {prj.location}</p>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{prj.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Client Testimonials (With KTM Builders Pvt. Ltd. quote from PDF) */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 border-t border-b border-gray-200">
        <div className="container-page">
          <div className="text-left sm:text-center sm:max-w-2xl sm:mx-auto mb-6 sm:mb-10">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">What Clients Say</span>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl mt-1">Verified Testimonials</h2>
            <div className="w-16 sm:w-20 h-1 bg-brand-orange sm:mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {demoReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 text-xs mb-3">{"★".repeat(rev.rating || 5)}</div>
                  <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                    &quot;{rev.review}&quot;
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-brand-blue-dark">{rev.name}</h4>
                  <p className="text-[11px] text-gray-500">{rev.role}</p>
                  <p className="text-[11px] text-brand-orange font-semibold">{rev.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Frequently Asked Questions (FAQ) Section */}
      <section className="py-10 md:py-16 lg:py-20 bg-white">
        <div className="container-page">
          <div className="text-left sm:text-center sm:max-w-2xl sm:mx-auto mb-8 sm:mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Got Questions?</span>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl mt-1">Frequently Asked Questions</h2>
            <div className="w-16 sm:w-20 h-1 bg-brand-orange sm:mx-auto mt-3 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-600 mt-3 text-left sm:text-center w-full">
              Everything you need to know about Smart Panel specifications, government rates, and factory direct ordering.
            </p>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* 12. Direct Contact Call to Action Banner */}
      <section className="bg-brand-blue text-white py-12 border-t border-brand-blue-dark">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">Let&apos;s Build a Smart Tomorrow</span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold mt-1">
              Ready to Order or Inquire About Smart Panels?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-2">
              Contact our sales hotline: +977-9851149804 / +977-9709084173 or email info@prefabpanelnepal.com
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:+9779851149804"
              className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold text-xs sm:text-sm py-3 px-6 rounded-lg transition-all shadow-md"
            >
              📞 Call Direct Hotline
            </a>
            <Link
              href="/dealership"
              className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm py-3 px-6 rounded-lg border border-white/20 transition-all"
            >
              Become a Dealer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="text-center flex flex-col items-center justify-center">
      <div className="font-display text-xl sm:text-2xl font-extrabold text-brand-blue text-center">{number}</div>
      <div className="text-[11px] sm:text-xs font-medium text-gray-600 mt-1 text-center">{label}</div>
    </div>
  );
}
