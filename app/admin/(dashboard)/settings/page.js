"use client";

import { useEffect, useState } from "react";

const GENERAL_FIELDS = [
  { name: "companyName", label: "Company Name" },
  { name: "domain", label: "Domain (e.g. prefabpanelnepal.com)" },
  { name: "phone", label: "Phone Number(s)" },
  { name: "email", label: "Email Address" },
  { name: "address", label: "Address" },
  { name: "facebook", label: "Facebook URL" },
  { name: "instagram", label: "Instagram URL" },
  { name: "twitter", label: "Twitter / X URL" },
  { name: "youtube", label: "YouTube URL" },
  { name: "tiktok", label: "TikTok URL" },
  { name: "heroTitle", label: "Homepage Hero Title", type: "textarea" },
  { name: "heroSubtitle", label: "Homepage Hero Subtitle", type: "textarea" },
  { name: "aboutSummary", label: "About Summary (used on homepage & footer)", type: "textarea" },
];

const SEO_FIELDS = [
  { name: "metaTitle", label: "Default Meta Title (Google Search)", hint: "Appears in Google search results title." },
  { name: "metaDescription", label: "Meta Description (Search Snippet)", type: "textarea", hint: "Summary shown under title on Google (150-160 characters recommended)." },
  { name: "metaKeywords", label: "Target SEO Keywords", type: "textarea", hint: "Comma separated keywords targeting Nepal prefab searches (e.g. EPS Sandwich Panel Nepal, Prefab House Price)." },
  { name: "ogImage", label: "Social Share / OpenGraph Image URL", hint: "Image shown when sharing links on Facebook, WhatsApp or LinkedIn." },
  { name: "googleVerificationCode", label: "Google Site Verification Code", hint: "Used for Google Search Console indexing." },
  { name: "googleAnalyticsId", label: "Google Analytics / Tag Manager ID", hint: "e.g., G-XXXXXXX" },
];

export default function AdminSettingsPage() {
  const [form, setForm] = useState(null);
  const [activeTab, setActiveTab] = useState("seo");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => setForm(d.settings));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2500);
  }

  if (!form) return <p className="text-sm text-gray-500 p-4">Loading settings...</p>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-blue-dark">Website &amp; SEO Settings</h1>
          <p className="text-xs text-gray-500 mt-1">Manage global search engine optimization &amp; site branding.</p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab("seo")}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === "seo" ? "bg-brand-blue text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            SEO &amp; Ranking Controls
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("general")}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === "general" ? "bg-brand-blue text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            General &amp; Contact Info
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm space-y-6">
        {activeTab === "seo" && (
          <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4 text-xs text-brand-blue-dark">
              <p className="font-bold mb-1">🔍 Competitor SEO Tip for Nepal Prefab Market:</p>
              <p>Target key terms like <em>&quot;EPS Sandwich Panel Price in Nepal&quot;</em>, <em>&quot;Earthquake Resistant Prefab House Nepal&quot;</em>, and <em>&quot;PUF Panel Supplier Kathmandu&quot;</em> to rank above local competitors on Google search.</p>
            </div>

            {SEO_FIELDS.map((f) => (
              <div key={f.name}>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">
                  {f.label}
                </label>
                {f.hint && <p className="text-[11px] text-gray-500 mb-1.5">{f.hint}</p>}
                {f.type === "textarea" ? (
                  <textarea
                    rows={3}
                    value={form[f.name] || ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                ) : (
                  <input
                    value={form[f.name] || ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "general" && (
          <div className="grid sm:grid-cols-2 gap-5">
            {GENERAL_FIELDS.map((f) => (
              <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide mb-1.5">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={2}
                    value={form[f.name] || ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                ) : (
                  <input
                    value={form[f.name] || ""}
                    onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
          <button type="submit" disabled={status === "saving"} className="btn-primary disabled:opacity-60">
            {status === "saving" ? "Saving Changes..." : "Save SEO & Site Settings"}
          </button>
          {status === "saved" && <span className="text-sm text-green-600 font-bold">✓ Settings Saved Successfully!</span>}
        </div>
      </form>
    </div>
  );
}

