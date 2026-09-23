import Image from "next/image";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Gallery" };

export default function GalleryPage() {
  const { gallery } = readDB();
  return (
    <div>
      <PageHero crumb="Our Work" title="Gallery" subtitle="A look at our factory, installations and completed projects across Nepal." />
      <div className="container-page py-10 md:py-16 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {gallery.map((g) => (
          <div key={g.id} className="rounded-xl overflow-hidden border border-emerald-900/5 shadow-sm bg-white text-center flex flex-col items-center">
            <div className="h-36 sm:h-56 w-full bg-brand-cream flex items-center justify-center text-brand-green/50 text-xs relative overflow-hidden">
              {g.image ? (
                <Image
                  src={g.image}
                  alt={g.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                  className="object-cover"
                />
              ) : (
                g.title
              )}
            </div>
            <div className="p-3 sm:p-4 text-center w-full">
              <p className="font-medium text-brand-green-dark text-xs sm:text-sm text-center leading-tight break-words">{g.title}</p>
            </div>
          </div>
        ))}
        {gallery.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-10">Gallery photos will appear here soon.</p>
        )}
      </div>
    </div>
  );
}
