import Image from "next/image";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Mission & Vision | Smart Panel Nepal",
  description: "Our corporate mission and vision to lead Nepal's construction transition toward sustainable, pre-engineered, and earthquake-resilient building technologies.",
};

export default function MissionVisionPage() {
  const { about } = readDB();

  return (
    <div>
      <PageHero
        crumb="About Us"
        title="Our Mission & Vision"
        subtitle="Guiding Nepal towards safer, greener, and earthquake-resilient construction for every community."
      />
      <div className="container-page py-12 md:py-16 grid md:grid-cols-2 gap-8 md:gap-10">
        {/* Mission Card */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="h-56 w-full relative overflow-hidden bg-gray-100">
            <Image
              src="/images/about/mission.jpg"
              alt="Smart Panel Mission - Eco-friendly and Safe Building"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded">
              Core Purpose
            </span>
          </div>
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-brand-blue-dark mb-3">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {about.mission}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs font-semibold text-brand-blue">
              ✓ 50% Faster Construction • Zero Topsoil Use • High Seismic Absorption
            </div>
          </div>
        </div>

        {/* Vision Card */}
        <div className="bg-brand-blue text-white rounded-2xl overflow-hidden border border-blue-900 shadow-sm flex flex-col justify-between">
          <div className="h-56 w-full relative overflow-hidden bg-slate-900">
            <Image
              src="/images/about/vision.jpg"
              alt="Smart Panel Vision - Future of Construction in Nepal"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/80 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 bg-amber-400 text-slate-900 text-xs font-extrabold px-3 py-1 rounded">
              Long-term Outlook
            </span>
          </div>
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-white mb-3">Our Vision</h2>
              <p className="text-white/90 leading-relaxed text-sm sm:text-base">
                {about.vision}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-semibold text-amber-300">
              ★ ISO 9001:2015 Certified • 150,000 sq. ft. Annual Chitwan Output
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
