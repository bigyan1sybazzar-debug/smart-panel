import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Our Mission & Vision" };

export default function MissionVisionPage() {
  const { about } = readDB();

  return (
    <div>
      <PageHero crumb="About Us" title="Our Mission & Vision" />
      <div className="container-page py-16 grid md:grid-cols-2 gap-8">
        <div className="bg-brand-cream rounded-lg p-8 border border-emerald-900/5">
          <h2 className="font-display text-2xl font-extrabold text-brand-green-dark mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">{about.mission}</p>
        </div>
        <div className="bg-brand-green-dark text-white rounded-lg p-8">
          <h2 className="font-display text-2xl font-extrabold mb-3">Our Vision</h2>
          <p className="text-white/85 leading-relaxed">{about.vision}</p>
        </div>
      </div>
    </div>
  );
}
