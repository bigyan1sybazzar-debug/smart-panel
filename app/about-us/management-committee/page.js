import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Management Committee" };

export default function ManagementPage() {
  const { about } = readDB();

  return (
    <div>
      <PageHero crumb="About Us" title="Management Committee" subtitle="The leadership team responsible for day-to-day operations across manufacturing, sales and finance." />
      <div className="container-page py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {about.management.map((m) => (
          <div key={m.id} className="text-center">
            <div className="aspect-square rounded-full bg-brand-cream border border-emerald-900/5 mx-auto w-32 h-32 flex items-center justify-center text-brand-green/40 text-xs mb-4">
              Photo
            </div>
            <h3 className="font-display font-bold text-brand-green-dark">{m.name}</h3>
            <p className="text-sm text-brand-orange font-medium">{m.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
