import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Catalogue" };

export default function CataloguePage() {
  const { catalogue } = readDB();
  return (
    <div>
      <PageHero crumb="Resources" title="Product Catalogue" subtitle="Download our latest product catalogues and technical specification sheets." />
      <div className="container-page py-16 space-y-4 max-w-2xl">
        {catalogue.map((c) => (
          <div key={c.id} className="flex items-center justify-between bg-brand-cream rounded-lg p-5 border border-emerald-900/5">
            <div>
              <p className="font-semibold text-brand-green-dark">{c.title}</p>
            </div>
            {c.file ? (
              <a href={c.file} target="_blank" rel="noreferrer" className="btn-primary">Download</a>
            ) : (
              <span className="text-sm text-gray-400">Coming soon</span>
            )}
          </div>
        ))}
        {catalogue.length === 0 && (
          <p className="text-gray-500">No catalogue files uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
