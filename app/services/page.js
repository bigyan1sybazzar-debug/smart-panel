import Link from "next/link";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  const { servicesList } = readDB();
  return (
    <div>
      <PageHero crumb="What We Do" title="Our Services" subtitle="From earthquake resistant structures to fully prefabricated homes, we cover the full range of panel-based construction." />
      <div className="container-page py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="bg-brand-cream rounded-lg p-6 border border-emerald-900/5 hover:shadow-md transition-shadow">
            <h2 className="font-display font-bold text-brand-green-dark text-lg">{s.name}</h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{s.summary}</p>
            <span className="inline-block mt-3 text-sm font-semibold text-brand-orange">Read more &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
