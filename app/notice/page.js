import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Notice" };

export default function NoticePage() {
  const { notices } = readDB();
  return (
    <div>
      <PageHero crumb="Announcements" title="Notice Board" subtitle="Official notices, meeting announcements and public disclosures from Smart Prefab Panel." />
      <div className="container-page py-16 max-w-3xl space-y-4">
        {notices.map((n) => (
          <div key={n.id} className="bg-brand-cream rounded-lg p-6 border border-emerald-900/5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display font-bold text-brand-green-dark">{n.title}</h2>
              <span className="text-xs text-gray-500">{n.date}</span>
            </div>
            {n.description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{n.description}</p>}
            {n.file && (
              <a href={n.file} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm font-semibold text-brand-orange">
                View Attachment &rarr;
              </a>
            )}
          </div>
        ))}
        {notices.length === 0 && <p className="text-gray-500">No notices published yet.</p>}
      </div>
    </div>
  );
}
