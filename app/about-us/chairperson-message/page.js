import Image from "next/image";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Chairperson's Message | Smart Panel Nepal" };

export default function ChairpersonPage() {
  const { about } = readDB();
  const c = about.chairperson;

  return (
    <div>
      <PageHero crumb="About Us" title="CEO Message" />
      <div className="container-page py-12 md:py-16 grid md:grid-cols-3 gap-8 md:gap-12 items-start">
        <div className="md:col-span-1 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
          <div className="aspect-[4/5] rounded-xl overflow-hidden relative shadow-inner bg-gray-100 mb-4">
            <Image
              src={c.image || "/images/team/chairperson.jpg"}
              alt={c.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              priority
            />
          </div>
          <h3 className="font-display font-bold text-lg text-brand-blue-dark">{c.name}</h3>
          <p className="text-xs sm:text-sm text-brand-orange font-semibold mt-0.5">{c.title}</p>
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
