import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Chairperson's Message" };

export default function ChairpersonPage() {
  const { about } = readDB();
  const c = about.chairperson;

  return (
    <div>
      <PageHero crumb="About Us" title="Chairperson's Message" />
      <div className="container-page py-16 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1">
          <div className="aspect-[4/5] rounded-lg bg-brand-cream border border-emerald-900/5 flex items-center justify-center text-brand-green/40 text-sm">
            Chairperson Photo
          </div>
          <h3 className="font-display font-bold text-brand-green-dark mt-4">{c.name}</h3>
          <p className="text-sm text-gray-500">{c.title}</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-lg leading-relaxed text-gray-700 first-letter:text-4xl first-letter:font-display first-letter:font-extrabold first-letter:text-brand-green first-letter:mr-1">
            {c.message}
          </p>
          <p className="mt-8 font-display font-bold text-brand-green-dark">{c.name}</p>
          <p className="text-sm text-gray-500">{c.title}</p>
        </div>
      </div>
    </div>
  );
}
