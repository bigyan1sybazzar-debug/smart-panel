import Link from "next/link";
import { readDB } from "@/lib/db";
import NewsletterForm from "@/components/NewsletterForm";
import HeroSlider from "@/components/HeroSlider";
import FaqAccordion from "@/components/FaqAccordion";
import AdvantageCard from "@/components/AdvantageCard";

export default function HomePage() {
  const { settings, advantages, servicesList, products, notices, heroSlides, reviews, projects, processSteps, faqs } = readDB();

  const demoReviews = reviews?.length ? reviews : [
    {
      id: "r1",
      name: "Er. Rabin Adhikari",
      role: "Commercial Project Manager",
      location: "Kathmandu, Nepal",
      rating: 5,
      avatar: "https://i.pravatar.cc/80?img=12",
      review: "We used Smart Prefab Panel's EPS Sandwich Panels for a 3-story office building rebuilding project in Kathmandu. The heat insulation and structural strength exceeded our expectations, and construction took less than 3 weeks!",
      project: "3-Story Commercial Office"
    },
    {
      id: "r2",
      name: "Sunita Gurung",
      role: "Resort Owner",
      location: "Pokhara, Nepal",
      rating: 5,
      avatar: "https://i.pravatar.cc/80?img=47",
      review: "Our modular lakeside cabins built with Smart Prefab Panel look stunning and keep guests warm in winter and cool in summer. Fast delivery, professional engineering team, and affordable factory direct price!",
      project: "Eco Resort Cabins"
    },
    {
      id: "r3",
      name: "Mahesh Shrestha",
      role: "Industrial Facility Director",
      location: "Chitwan, Nepal",
      rating: 5,
      avatar: "https://i.pravatar.cc/80?img=68",
      review: "The PUF Cold Storage panels delivered by Smart Prefab Panel maintain exact temperature control and saved us over 35% on electricity bills. Highly recommended for commercial prefab construction in Nepal.",
      project: "Cold Storage Unit"
    }
  ];

  const demoProjects = projects || [
    {
      id: "p1",
      title: "3-Story Korean Villa",
      location: "Budhanilkantha, Kathmandu",
      category: "Residential",
      time: "18 Days",
      image: "/images/korean-house.jpg",
      description: "Earthquake resistant 3-story luxury villa constructed with 75mm EPS wall and roof sandwich panels."
    },
    {
      "id": "p2",
      title: "Sarankot Eco Resort Cabins",
      location: "Pokhara, Kaski",
      category: "Hospitality",
      time: "14 Days",
      image: "/images/prefab-house.jpg",
      description: "Modular scenic eco-resort cabins built with thermal insulated EPS sandwich panel walling."
    },
    {
      "id": "p3",
      title: "Agro Cold Storage Warehouse",
      location: "Bharatpur, Chitwan",
      category: "Industrial",
      time: "21 Days",
      image: "/images/sandwich-panel.jpg",
      description: "High-density PUF panel cold storage unit engineered for strict climate control and energy savings."
    },
    {
      "id": "p4",
      title: "Modular Commercial Complex",
      location: "Itahari, Sunsari",
      category: "Commercial",
      time: "12 Days",
      image: "/uploads/slides/1788705567899-138000974030903._Lucias_Garden_photo_300dpi_w1728.avif",
      description: "Turnkey commercial office building featuring galvanized light steel structure and insulated roof cladding."
    }
  ];

  const demoSteps = processSteps || [
    {
      step: "01",
      title: "Architectural Design & Customization",
      description: "Our engineers work with client blueprints to design seismic-certified steel framing and precise panel layouts."
    },
    {
      step: "02",
      title: "Precision Factory Manufacturing",
      description: "High-density EPS and PUF sandwich panels are manufactured under strict Korean quality control standards."
    },
    {
      step: "03",
      title: "Rapid On-Site Frame & Panel Assembly",
      description: "Pre-engineered components are transported to site and assembled within days using direct-screw steel fasteners."
    },
    {
      step: "04",
      title: "Quality Inspection & Handover",
      description: "Thorough thermal, sound, and weather-seal testing conducted prior to final keys handover."
    }
  ];

  return (
    <div>
      {/* 1. Hero Slider Section */}
      <HeroSlider slides={heroSlides && heroSlides.length ? heroSlides : [
        {
          id: "default",
          title: settings.heroTitle,
          subtitle: settings.heroSubtitle,
          image: "/images/prefab-house.jpg",
          ctaLabel: "View Our Products",
          ctaHref: "/products",
        },
      ]} />

      {/* 2. Key Advantages Section */}
      <section className="py-20 bg-gray-50/70">
        <div className="container-page">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Why Choose Us</span>
            <h2 className="section-title text-3xl md:text-4xl mt-1">Our Key Advantages</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mt-4 mb-5 rounded-full" />
            <p className="text-gray-500 text-base leading-relaxed">
              Built on Korean engineering standards, delivering faster, stronger, and smarter construction across Nepal.
            </p>
          </div>

          {/* Advantages Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {advantages.map((a, idx) => (
              <AdvantageCard key={a.id} advantage={a} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Us / Who We Are Section */}
      <section className="py-20">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/korean-house.jpg"
                alt="Smart Prefab Panel Architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-wider text-brand-orange font-bold">Prefab Innovation</span>
                <p className="font-display text-xl font-bold mt-1">Korean Design &amp; Seismic Engineering</p>
              </div>
            </div>
            {/* Floating Badge */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-brand-blue text-white p-6 rounded-2xl shadow-xl max-w-xs border-4 border-white">
              <p className="text-3xl font-extrabold font-display">100%</p>
              <p className="text-xs text-white/90 mt-1 font-medium">Earthquake Resistant &amp; Thermally Insulated Construction</p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Who We Are</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-brand-blue-dark mt-2 leading-tight">
              {settings.companyName}
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed text-base">{settings.aboutSummary}</p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4 sm:gap-6 bg-brand-cream/80 p-6 rounded-xl border border-blue-900/5">
              <Stat number="10+" label="Years of Experience" />
              <Stat number="500+" label="Projects Completed" />
              <Stat number="124kg/m³" label="Panel Density" />
              <Stat number="77" label="Districts Served" />
            </div>

            <div className="mt-8">
              <Link href="/about-us/mission-vision" className="btn-primary">Learn More About Us &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Showcase Section */}
      <section className="py-20 bg-gray-50/70">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">What We Provide</span>
            <h2 className="section-title text-3xl md:text-4xl mt-1">Our Services</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {servicesList.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div className="h-52 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.image || "/images/prefab-house.jpg"}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-brand-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    Service
                  </span>
                </div>
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-xl text-brand-blue-dark group-hover:text-brand-blue transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{s.summary}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-sm font-bold text-brand-orange group-hover:translate-x-1 transition-transform">
                    <span>Read more</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Products Catalogue Section */}
      <section className="py-20">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Product Showcase</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-brand-blue-dark mt-1">Our Products</h2>
            </div>
            <Link href="/products" className="btn-outline self-start sm:self-auto">View All Products &rarr;</Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                <div className="h-56 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image || "/images/sandwich-panel.jpg"}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-brand-blue text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-sm">
                    {p.category}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-brand-blue-dark group-hover:text-brand-blue transition-colors">{p.name}</h3>
                    {p.description && <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{p.description}</p>}
                  </div>
                  <Link href="/products" className="inline-block mt-4 text-xs font-bold text-brand-orange hover:underline">
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Construction Process Section */}
      <section className="py-20 bg-brand-cream/60 border-t border-gray-100">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">How We Build</span>
            <h2 className="section-title text-3xl md:text-4xl mt-1">Our Construction Process</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
            <p className="text-sm text-gray-600 mt-4">Engineered step-by-step from blueprint design to rapid on-site assembly across Nepal.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {demoSteps.map((st) => (
              <div key={st.step} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all relative">
                <span className="text-4xl font-extrabold font-display text-brand-blue/20 block mb-3">
                  {st.step}
                </span>
                <h3 className="font-display font-bold text-lg text-brand-blue-dark mb-2">{st.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Projects Portfolio Showcase Section */}
      <section className="py-20">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Our Work Across Nepal</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-brand-blue-dark mt-1">Featured Projects</h2>
            </div>
            <Link href="/gallery" className="btn-outline self-start sm:self-auto">View Full Gallery &rarr;</Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {demoProjects.map((prj) => (
              <div key={prj.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="h-52 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={prj.image} alt={prj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-3 right-3 bg-brand-orange text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                    {prj.time} Build
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-brand-blue uppercase tracking-wide">{prj.category}</span>
                    <h3 className="font-display font-bold text-lg text-brand-blue-dark mt-1 group-hover:text-brand-blue transition-colors">{prj.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 font-medium">📍 {prj.location}</p>
                    <p className="text-xs text-gray-600 mt-3 line-clamp-2 leading-relaxed">{prj.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Comparison Table Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Why Switch to Prefab?</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-1">Smart Prefab vs Traditional Construction</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/20 text-xs font-bold uppercase tracking-wider text-gray-300 bg-white/5">
                  <th className="py-4 px-6">Feature / Factor</th>
                  <th className="py-4 px-6 text-brand-orange">Smart Prefab Panel</th>
                  <th className="py-4 px-6 text-gray-400">Traditional Brick &amp; Concrete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Construction Speed</td>
                  <td className="py-4 px-6 text-brand-orange font-bold">7 - 15 Days Complete</td>
                  <td className="py-4 px-6 text-gray-400">4 - 8 Months</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Earthquake Safety</td>
                  <td className="py-4 px-6 text-brand-orange font-bold">Direct Screwed Light Steel Frame (Seismic Code)</td>
                  <td className="py-4 px-6 text-gray-400">Heavy Rigid Masonry (High Cracking Risk)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Thermal Insulation</td>
                  <td className="py-4 px-6 text-brand-orange font-bold">100% EPS &amp; PUF Sealed Core</td>
                  <td className="py-4 px-6 text-gray-400">Low (High AC/Heating Bills)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Foundation Load</td>
                  <td className="py-4 px-6 text-brand-orange font-bold">Ultra-light (124 kg/m³)</td>
                  <td className="py-4 px-6 text-gray-400">Heavy (Requires Costly Deep Foundation)</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-white">Weather &amp; Fire Protection</td>
                  <td className="py-4 px-6 text-brand-orange font-bold">Fire-Retardant &amp; UV Galvanized Steel</td>
                  <td className="py-4 px-6 text-gray-400">Prone to Seepage &amp; Dampness</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. Client Reviews / Testimonials Section */}
      <section className="py-20 bg-gray-50/80 border-t border-b border-gray-100">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Client Testimonials</span>
            <h2 className="section-title text-3xl md:text-4xl mt-1">What Our Clients Say Across Nepal</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 inline-flex px-4 py-1.5 rounded-full shadow-xs">
              <span className="text-amber-400 text-sm">★★★★★</span>
              <span>4.9 / 5.0 Rating based on 150+ Verified Prefab Projects</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {demoReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Avatar on top */}
                <div className="flex items-center gap-3 mb-5">
                  {rev.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-brand-blue/20 shadow-sm"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-brand-blue/10 text-brand-blue font-extrabold text-lg flex items-center justify-center shrink-0 border border-brand-blue/20">
                      {rev.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-display font-bold text-sm text-brand-blue-dark">{rev.name}</h3>
                    <p className="text-xs text-gray-500">{rev.role}</p>
                    <p className="text-xs text-brand-orange font-semibold">{rev.location}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 text-amber-400 text-sm mb-3">
                  {"★".repeat(rev.rating || 5)}
                </div>

                {/* Quote */}
                <p className="text-sm text-gray-600 leading-relaxed italic flex-1">
                  &quot;{rev.review}&quot;
                </p>

                {/* Project tag */}
                {rev.project && (
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <span className="text-xs font-bold text-brand-blue bg-blue-50 px-3 py-1 rounded-full">
                      📋 {rev.project}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Frequently Asked Questions (FAQ) Section */}
      <section className="py-20 bg-white">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Got Questions?</span>
            <h2 className="section-title text-3xl md:text-4xl mt-1">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-brand-orange mx-auto mt-4 rounded-full" />
            <p className="text-sm text-gray-600 mt-4">Common queries about prefab house price, insulation, and earthquake safety in Nepal.</p>
          </div>

          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* 11. Notices & Newsletter Section */}
      {notices?.length > 0 && (
        <section className="py-20 bg-brand-cream/60 border-t border-gray-100">
          <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Latest Disclosure</span>
              <h2 className="font-display text-3xl font-extrabold text-brand-blue-dark mt-1 mb-7">Official Notices</h2>
              <div className="space-y-4">
                {notices.slice(0, 3).map((n) => (
                  <div key={n.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold text-brand-blue-dark text-base">{n.title}</h3>
                      {n.description && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{n.description}</p>}
                    </div>
                    <span className="text-xs font-semibold text-brand-blue bg-brand-cream px-3 py-1 rounded-full shrink-0">{n.date}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/notice" className="btn-outline">View All Notices &rarr;</Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-brand-blue-dark rounded-2xl p-8 md:p-10 text-white flex flex-col justify-center shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Stay Connected</span>
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-1 mb-3">Newsletter Subscription</h3>
                <p className="text-white/80 text-sm mb-6 leading-relaxed">Subscribe to receive regular updates on prefab construction tech, investor notices and product releases.</p>
                <NewsletterForm variant="inline" />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div className="font-display text-3xl font-extrabold text-brand-blue">{number}</div>
      <div className="text-xs font-medium text-gray-600 mt-1">{label}</div>
    </div>
  );
}

