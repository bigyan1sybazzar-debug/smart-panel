import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = {
  title: "Prefab & Smart Panel Construction Services | Smart Panel Nepal",
  description: "Explore our prefabricated building services in Nepal: earthquake-resistant construction, sandwich panel installation, turnkey prefab homes, and wall & roof insulation systems.",
};

export default function ServicesPage() {
  const { servicesList } = readDB();

  return (
    <div>
      <PageHero
        crumb="What We Do"
        title="Our Services"
        subtitle="From earthquake resistant structures to fully prefabricated homes, we cover the full range of panel-based construction."
      />
      <div className="container-page py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesList.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-gray-100">
                  <Image
                    src={s.image || "/images/prefab-house.jpg"}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-3 left-3 bg-brand-blue text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded shadow">
                    Engineering Service
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <h2 className="font-display font-bold text-brand-blue-dark text-base sm:text-lg group-hover:text-brand-orange transition-colors leading-tight">
                    {s.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                    {s.summary}
                  </p>
                </div>
              </div>
              <div className="p-5 sm:p-6 pt-0">
                <span className="inline-flex items-center text-xs sm:text-sm font-bold text-brand-orange group-hover:translate-x-1 transition-transform">
                  Explore Service Specifications &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
