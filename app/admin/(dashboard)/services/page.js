"use client";

import { useEffect, useState } from "react";

export default function AdminServicesPage() {
  const [services, setServices] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetch("/api/admin/services")
      .then((r) => r.json())
      .then((d) => setServices(d.servicesList));
  }, []);

  function update(slug, field, value) {
    setServices((list) => list.map((s) => (s.slug === slug ? { ...s, [field]: value } : s)));
  }

  async function handleSave() {
    setStatus("saving");
    await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ servicesList: services }),
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  if (!services) return <p className="text-sm text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-brand-green-dark">Services Content</h1>
        <button onClick={handleSave} disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving..." : "Save All Changes"}
        </button>
      </div>
      {status === "saved" && <p className="text-sm text-brand-green font-medium">Saved!</p>}

      {services.map((s) => (
        <section key={s.slug} className="bg-white border border-emerald-900/10 rounded-lg p-6 space-y-3">
          <h2 className="font-semibold text-brand-green-dark">{s.name}</h2>
          <p className="text-xs text-gray-400">/services/{s.slug}</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Summary</label>
            <textarea
              rows={2}
              value={s.summary}
              onChange={(e) => update(s.slug, "summary", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
            <textarea
              rows={5}
              value={s.content}
              onChange={(e) => update(s.slug, "content", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </div>
        </section>
      ))}
    </div>
  );
}
