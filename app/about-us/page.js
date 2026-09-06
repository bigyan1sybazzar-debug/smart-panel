import Link from "next/link";
import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "About Us" };

const LINKS = [
  { href: "/about-us/chairperson-message", label: "Chairperson's Message", desc: "A message from our chairperson about our journey and purpose." },
  { href: "/about-us/mission-vision", label: "Our Mission & Vision", desc: "What drives us and where we are headed as a company." },
  { href: "/about-us/board-of-directors", label: "Board of Directors", desc: "Meet the board guiding Smart Prefab Panel's strategy." },
  { href: "/about-us/management-committee", label: "Management Committee", desc: "The leadership team running day-to-day operations." },
];

export default function AboutUsPage() {
  const { settings } = readDB();
  return (
    <div>
      <PageHero crumb="About Us" title="About Smart Prefab Panel" subtitle={settings.aboutSummary} />
      <div className="container-page py-10 md:py-16 grid grid-cols-2 gap-3 sm:gap-6">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="bg-brand-cream rounded-xl p-3.5 sm:p-6 border border-emerald-900/5 hover:shadow-md transition-all flex flex-col items-center text-center">
            <h2 className="font-display font-bold text-brand-green-dark text-xs sm:text-lg text-center leading-tight break-words">{l.label}</h2>
            <p className="text-[11px] sm:text-sm text-gray-600 mt-2 text-center leading-relaxed">{l.desc}</p>
            <span className="inline-block mt-3 text-xs sm:text-sm font-semibold text-brand-orange text-center">Read more &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
