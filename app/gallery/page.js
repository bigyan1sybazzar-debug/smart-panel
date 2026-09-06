import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  const { gallery } = readDB();
  return (
    <div>
      <PageHero crumb="Our Work" title="Gallery" subtitle="A look at our factory, installations and completed projects across Nepal." />
      <div className="container-page py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((g) => (
          <div key={g.id} className="rounded-lg overflow-hidden border border-emerald-900/5 shadow-sm">
            <div className="h-56 bg-brand-cream flex items-center justify-center text-brand-green/50 text-sm">
              {g.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
              ) : (
                g.title
              )}
            </div>
            <div className="p-4">
              <p className="font-medium text-brand-green-dark text-sm">{g.title}</p>
            </div>
          </div>
        ))}
        {gallery.length === 0 && (
          <p className="text-gray-500 col-span-full">Gallery photos will appear here soon.</p>
        )}
      </div>
    </div>
  );
}
