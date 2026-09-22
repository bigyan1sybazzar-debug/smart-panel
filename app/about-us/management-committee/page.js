import Image from "next/image";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Management Committee | Smart Panel Nepal" };

export default function ManagementPage() {
  const { about } = readDB();

  return (
    <div>
      <PageHero crumb="About Us" title="Management Committee" subtitle="The leadership team responsible for day-to-day operations across manufacturing, sales and finance." />
      <div className="container-page py-10 md:py-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {about.management.map((m) => (
          <div key={m.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="relative aspect-square rounded-full overflow-hidden w-28 h-28 sm:w-36 sm:h-36 mb-4 ring-4 ring-brand-blue/10 bg-gray-100 shadow-sm">
              <Image
                src={m.image || "/images/team/manager-1.jpg"}
                alt={m.name}
                fill
                sizes="(max-width: 640px) 120px, 150px"
                className="object-cover"
              />
            </div>
            <h3 className="font-display font-bold text-brand-blue-dark text-xs sm:text-base text-center leading-tight break-words">{m.name}</h3>
            <p className="text-[11px] sm:text-xs text-brand-orange font-semibold text-center mt-1">{m.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
