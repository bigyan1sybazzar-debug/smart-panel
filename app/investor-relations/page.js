import PageHero from "@/components/PageHero";
import { readDB } from "@/lib/db";

export const metadata = { title: "Investor Relations" };

export default function InvestorRelationsPage() {
  const { investorRelations } = readDB();
  return (
    <div>
      <PageHero crumb="Shareholders" title="Investor Relations" subtitle="Annual reports, financial statements and disclosures for our shareholders." />
      <div className="container-page py-16 max-w-3xl">
        <div className="divide-y divide-emerald-900/10 border border-emerald-900/10 rounded-lg overflow-hidden">
          {investorRelations.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-5 bg-white">
              <div>
                <p className="font-semibold text-brand-green-dark">{doc.title}</p>
                <p className="text-xs text-gray-500 mt-1">{doc.date}</p>
              </div>
              {doc.file ? (
                <a href={doc.file} target="_blank" rel="noreferrer" className="btn-outline">View</a>
              ) : (
                <span className="text-sm text-gray-400">Coming soon</span>
              )}
            </div>
          ))}
          {investorRelations.length === 0 && (
            <p className="text-gray-500 p-5">No documents published yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
