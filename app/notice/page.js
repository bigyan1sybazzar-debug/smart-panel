import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Notice" };

export default function NoticePage() {
  const { notices } = readDB();
  return (
    <div>
      <PageHero crumb="Announcements" title="Notice Board" subtitle="Official notices, meeting announcements and public disclosures from Smart Prefab Panel." />
      <div className="container-page py-10 md:py-16 max-w-3xl space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="bg-brand-cream rounded-xl p-4 sm:p-6 border border-emerald-900/5 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold text-brand-orange bg-white px-3 py-1 rounded-full mb-2">{n.date}</span>
            <h2 className="font-display font-bold text-brand-green-dark text-sm sm:text-lg text-center leading-tight break-words">{n.title}</h2>
            {n.description && <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed text-center">{n.description}</p>}
            {n.file && (
              <a href={n.file} target="_blank" rel="noreferrer" className="inline-block mt-3 text-xs sm:text-sm font-semibold text-brand-orange text-center">
                View Attachment &rarr;
              </a>
            )}
          </div>
        ))}
        {notices.length === 0 && <p className="text-gray-500 text-center py-10">No notices published yet.</p>}
      </div>
    </div>
  );
}
