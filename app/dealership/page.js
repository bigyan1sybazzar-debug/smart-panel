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
      <div className="container-page py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-brand-green-dark mb-6">Why Partner With Smart Prefab Panel</h2>
          <div className="space-y-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-brand-orange mt-2 shrink-0" />
                <div>
                  <h3 className="font-semibold text-brand-green-dark">{b.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{b.desc}</p>
                </div>
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
