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
      <div className="container-page py-16 grid sm:grid-cols-2 gap-6">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="bg-brand-cream rounded-lg p-6 border border-emerald-900/5 hover:shadow-md transition-shadow">
            <h2 className="font-display font-bold text-brand-green-dark text-lg">{l.label}</h2>
            <p className="text-sm text-gray-600 mt-2">{l.desc}</p>
            <span className="inline-block mt-3 text-sm font-semibold text-brand-orange">Read more &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
