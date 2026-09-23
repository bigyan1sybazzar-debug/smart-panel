import Image from "next/image";
import PageHero from "@/components/PageHero";
import DealershipForm from "@/components/DealershipForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Nationwide Dealership Programme | Smart Panel Nepal",
  description: "Join the Smart Panel dealer network across 77 districts of Nepal. Factory-direct pricing, technical support, protected territories, and high margin prefab solutions.",
};

const BENEFITS = [
  { title: "Exclusive Territory", desc: "Protected sales area for authorized dealers in your district." },
  { title: "Training & Support", desc: "Technical training on installation, sales and after-sales support." },
  { title: "Marketing Materials", desc: "Catalogues, samples and promotional materials supplied by us." },
  { title: "Competitive Margins", desc: "Attractive dealer pricing on all product categories." },
];

export default function DealershipPage() {
  return (
    <div>
      <PageHero
        crumb="Partner With Us"
        title="Become an Authorized Dealer"
        subtitle="Join Nepal's premier prefabricated panel manufacturer. Protected sales territories, factory-direct margins, and comprehensive engineering support."
      />
      <div className="container-page py-10 md:py-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-md relative h-56 sm:h-72 border border-gray-200">
            <Image
              src="/images/dealership/dealership-partner.jpg"
              alt="Smart Panel Dealership Logistics and Network"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold bg-brand-orange px-2.5 py-0.5 rounded">
                Nationwide Expansion 2026
              </span>
              <p className="font-display font-bold text-sm sm:text-base mt-1.5">
                Supplying All 77 Districts from Bharatpur, Chitwan
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-brand-blue-dark mb-4">
              Why Partner With Smart Panel
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="bg-brand-cream/80 rounded-xl p-4 border border-blue-900/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-orange mb-2" />
                  <h3 className="font-bold text-brand-blue-dark text-xs sm:text-sm">{b.title}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-600 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Fast Onboarding</span>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-brand-blue-dark mb-2 mt-1">
            Dealership Application
          </h2>
          <p className="text-xs text-gray-600 mb-6">
            Fill in your commercial details and our dealer relations manager will contact you within 24 hours.
          </p>
          <DealershipForm />
        </div>
      </div>
    </div>
  );
}
