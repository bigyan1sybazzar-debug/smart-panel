import Link from "next/link";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Smart Panel | Prefab Panel Nepal Pvt. Ltd.",
  description:
    "Learn about Smart Panel (Prefab Panel Nepal Pvt. Ltd.), an ISO 9001:2015 certified company with an NPR 20 Cr plant in Bharatpur, Chitwan producing 150,000 sq. ft. annually.",
};

const LINKS = [
  { href: "/about-us/chairperson-message", label: "CEO & Leadership Message", desc: "A message from our CEO Bimal Raj Gosai on our vision for Nepal's construction." },
  { href: "/about-us/mission-vision", label: "Our Mission & Vision", desc: "What drives us and our commitment to seismic-safe, green construction." },
  { href: "/about-us/board-of-directors", label: "Board of Directors", desc: "The strategic leadership guiding Prefab Panel Nepal Pvt. Ltd." },
  { href: "/about-us/management-committee", label: "Management Committee", desc: "The operational team overseeing plant manufacturing and nationwide distribution." },
];

const SISTER_ORGS = [
  {
    name: "KTM Builders Pvt. Ltd.",
    logo: "/images/ktm-builders.jpeg",
    tagline: "Construction & Development",
    description:
      "Civil construction and project development partner delivering residential, commercial, and institutional builds across Nepal.",
  },
  {
    name: "Smart Infra Pvt. Ltd.",
    logo: "/images/smart-infta.jpeg",
    tagline: "Infrastructure & Engineering",
    description:
      "Infrastructure and engineering arm focused on pre-engineered structures, seismic-resilient systems, and modern construction technology.",
  },
];

export default function AboutUsPage() {
  const { settings, about } = readDB();
  const values = about?.whatWeStandFor || [];

  return (
    <div>
      <PageHero
        crumb="About Us"
        title="About Smart Panel"
        subtitle={settings.aboutSummary}
      />

      {/* Story & Company Overview */}
      <section className="container-page py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Our Story</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-blue-dark mt-1">
              Building a Safer, Faster &amp; Greener Nepal
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
              {about.story || "We started in 2024 with a simple goal: help Nepal build better. A year later, our plant in Bharatpur, Chitwan came online, backed by an NPR 20 crore investment. Today it turns out 150,000 sq. ft. of Smart Panel a year — lightweight, insulated, and ready for sites across the country."}
            </p>
            <p className="mt-3 text-gray-600 leading-relaxed text-sm sm:text-base">
              Our flagship panel wraps a light EPS-and-cement core in 4.5mm non-asbestos calcium silicate board on both faces. A tongue-and-groove edge means every panel locks into the next — fast to install, clean to finish, and tested to withstand high seismic impact.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-gray-700">
              <span className="bg-blue-50 text-brand-blue px-3 py-1.5 rounded-md">✓ ISO 9001:2015 Certified</span>
              <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-md">✓ Government District Rate Listed</span>
              <span className="bg-amber-50 text-amber-800 px-3 py-1.5 rounded-md">✓ NPR 20 Cr Chitwan Facility</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-brand-cream/80 p-6 sm:p-8 rounded-2xl border border-gray-200">
            <h3 className="font-display text-lg font-bold text-brand-blue-dark mb-4">Corporate Factsheet</h3>
            <dl className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-gray-200/80 pb-2">
                <dt className="text-gray-500 font-medium">Brand Name:</dt>
                <dd className="font-bold text-brand-blue-dark">Smart Panel</dd>
              </div>
              <div className="flex justify-between border-b border-gray-200/80 pb-2">
                <dt className="text-gray-500 font-medium">Legal Entity:</dt>
                <dd className="font-bold text-brand-blue-dark">Prefab Panel Nepal Pvt. Ltd.</dd>
              </div>
              <div className="flex justify-between border-b border-gray-200/80 pb-2">
                <dt className="text-gray-500 font-medium">Leadership:</dt>
                <dd className="font-bold text-brand-blue-dark">Bimal Raj Gosai, CEO</dd>
              </div>
              <div className="flex justify-between border-b border-gray-200/80 pb-2">
                <dt className="text-gray-500 font-medium">Quality System:</dt>
                <dd className="font-bold text-amber-700">ISO 9001:2015 Certified</dd>
              </div>
              <div className="flex justify-between border-b border-gray-200/80 pb-2">
                <dt className="text-gray-500 font-medium">Plant Investment:</dt>
                <dd className="font-bold text-emerald-700">NPR 20 Crore</dd>
              </div>
              <div className="flex justify-between border-b border-gray-200/80 pb-2">
                <dt className="text-gray-500 font-medium">Annual Capacity:</dt>
                <dd className="font-bold text-gray-800">150,000 sq. ft. / year</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 font-medium">Headquarters:</dt>
                <dd className="font-bold text-gray-800 text-right">Pepsicola-32, Kathmandu, Nepal</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* What We Stand For */}
        {values.length > 0 && (
          <div className="mt-12 pt-10 border-t border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Our Principles</span>
              <h2 className="font-display text-2xl font-extrabold text-brand-blue-dark mt-1">What We Stand For</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold text-sm mb-3">
                    0{i + 1}
                  </div>
                  <h3 className="font-display font-bold text-base text-brand-blue-dark mb-2">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Links */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="bg-brand-cream/70 rounded-xl p-4 sm:p-5 border border-gray-200 hover:shadow-md transition-all flex flex-col justify-between no-underline"
            >
              <div>
                <h3 className="font-display font-bold text-brand-blue-dark text-xs sm:text-base leading-tight">
                  {l.label}
                </h3>
                <p className="text-[11px] sm:text-xs text-gray-600 mt-2 leading-relaxed">{l.desc}</p>
              </div>
              <span className="inline-block mt-3 text-xs font-bold text-brand-orange">
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          Sister Organizations Section
          ============================================================ */}
      <section className="bg-gray-50 border-t border-gray-200 py-12 lg:py-16">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
              Our Group
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-brand-blue-dark mt-1">
              Sister Organizations
            </h2>
            <div className="w-16 h-1 bg-brand-orange mx-auto mt-3 mb-4 rounded-full" />
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Smart Panel is part of a growing group of construction and infrastructure companies working together to build a stronger Nepal.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            {SISTER_ORGS.map((org) => (
              <div
                key={org.name}
                className="group bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 text-center flex flex-col items-center"
              >
                {/* Logo */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-4 overflow-hidden group-hover:border-brand-orange/40 transition-colors">
                  <img
                    src={org.logo}
                    alt={`${org.name} logo`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <span className="text-[10px] uppercase tracking-widest font-bold text-brand-orange">
                  {org.tagline}
                </span>

                <h3 className="font-display font-bold text-brand-blue-dark text-base sm:text-lg mt-1.5">
                  {org.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                  {org.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}