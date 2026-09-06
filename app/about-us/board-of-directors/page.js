import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Board of Directors" };

export default function BoardPage() {
  const { about } = readDB();

  return (
    <div>
      <PageHero crumb="About Us" title="Board of Directors" subtitle="Meet the board guiding Smart Prefab Panel's long-term strategy and governance." />
      <div className="container-page py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {about.boardOfDirectors.map((m) => (
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
