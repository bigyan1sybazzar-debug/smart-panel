import PageHero from "@/components/PageHero";
import DealershipForm from "@/components/DealershipForm";

export const metadata = { title: "Dealership" };

const BENEFITS = [
  { title: "Exclusive Territory", desc: "Protected sales area for authorized dealers in your district." },
  { title: "Training & Support", desc: "Technical training on installation, sales and after-sales support." },
  { title: "Marketing Materials", desc: "Catalogues, samples and promotional materials supplied by us." },
  { title: "Competitive Margins", desc: "Attractive dealer pricing on all product categories." },
];

export default function DealershipPage() {
  return (
    <div>
      <PageHero crumb="Partner With Us" title="Become a Dealer" subtitle="Join our growing dealer network and bring earthquake-resistant, energy-efficient building solutions to your community." />
      <div className="container-page py-10 md:py-16 grid lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-brand-green-dark mb-6 text-center lg:text-left">Why Partner With Smart Prefab Panel</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-brand-cream rounded-xl p-3.5 sm:p-5 border border-emerald-900/5 text-center flex flex-col items-center">
                <div className="w-2 h-2 rounded-full bg-brand-orange mb-2 shrink-0" />
                <h3 className="font-semibold text-brand-green-dark text-xs sm:text-base text-center leading-tight break-words">{b.title}</h3>
                <p className="text-[11px] sm:text-sm text-gray-600 mt-1 text-center leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-brand-cream rounded-lg p-8 border border-emerald-900/5">
          <h2 className="font-display text-xl font-extrabold text-brand-green-dark mb-5">Dealership Application</h2>
          <DealershipForm />
        </div>
      </div>
    </div>
  );
}
