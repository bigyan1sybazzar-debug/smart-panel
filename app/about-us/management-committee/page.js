import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Management Committee" };

export default function ManagementPage() {
  const { about } = readDB();

  return (
    <div>
      <PageHero crumb="About Us" title="Management Committee" subtitle="The leadership team responsible for day-to-day operations across manufacturing, sales and finance." />
      <div className="container-page py-10 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {about.management.map((m) => (
          <div key={m.id} className="bg-brand-cream/60 rounded-xl p-4 border border-emerald-900/5 text-center flex flex-col items-center">
            <div className="aspect-square rounded-full bg-brand-cream border border-emerald-900/5 mx-auto w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-brand-green/40 text-xs mb-3">
              Photo
            </div>
            <h3 className="font-display font-bold text-brand-green-dark text-xs sm:text-base text-center leading-tight break-words">{m.name}</h3>
            <p className="text-[11px] sm:text-sm text-brand-orange font-medium text-center mt-0.5">{m.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
