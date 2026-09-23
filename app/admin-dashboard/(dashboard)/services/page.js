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

  function update(index, field, value) {
    setServices((list) =>
      list.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  }

  function addService() {
    const newService = {
      slug: `service-${Date.now().toString(36)}`,
      name: "New Service",
      image: "/images/prefab-house.jpg",
      summary: "Short summary of the new service.",
      content: "Full detailed description of the service and technical details."
    };
    setServices((list) => [...list, newService]);
  }

  function removeService(index) {
    if (!confirm("Are you sure you want to remove this service?")) return;
    setServices((list) => list.filter((_, i) => i !== index));
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-brand-green-dark">Services Content</h1>
          <p className="text-xs text-gray-500">Edit titles, URLs, photos and descriptions of your engineering services.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={addService} type="button" className="btn-outline text-sm py-2 px-3">
            + Add Service
          </button>
          <button onClick={handleSave} disabled={status === "saving"} className="btn-primary text-sm py-2 px-4 disabled:opacity-60">
            {status === "saving" ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>
      {status === "saved" && <p className="text-sm text-brand-green font-medium">✓ Saved successfully!</p>}

      {services.map((s, idx) => (
        <section key={s.slug || idx} className="bg-white border border-emerald-900/10 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Service #{idx + 1}
            </span>
            <button
              onClick={() => removeService(idx)}
              type="button"
              className="text-xs text-red-600 hover:text-red-700 font-semibold"
            >
              Remove Service
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Title / Name</label>
              <input
                value={s.name || ""}
                onChange={(e) => update(idx, "name", e.target.value)}
                placeholder="e.g. Earthquake Resistant Construction"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold focus:border-brand-green focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug <span className="text-xs text-gray-400">(/services/[slug])</span>
              </label>
              <input
                value={s.slug || ""}
                onChange={(e) => update(idx, "slug", e.target.value)}
                placeholder="e.g. earthquake-resistant-structure"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono text-gray-700 focus:border-brand-green focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Image</label>
            <div className="flex items-center gap-2 mb-1">
              {s.image && (
                <img src={s.image} alt="preview" className="w-14 h-10 rounded object-cover border border-gray-300 shrink-0" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const fd = new FormData();
                  fd.append("file", file);
                  fd.append("folder", "services");
                  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                  const d = await res.json();
                  if (d.url) update(idx, "image", d.url);
                }}
                className="text-xs block flex-1"
              />
            </div>
            <input
              placeholder="/images/prefab-house.jpg"
              value={s.image || ""}
              onChange={(e) => update(idx, "image", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-xs focus:border-brand-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Summary</label>
            <textarea
              rows={2}
              value={s.summary || ""}
              onChange={(e) => update(idx, "summary", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
            <textarea
              rows={5}
              value={s.content || ""}
              onChange={(e) => update(idx, "content", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </div>
        </section>
      ))}

      <div className="pt-2 flex justify-end">
        <button onClick={handleSave} disabled={status === "saving"} className="btn-primary disabled:opacity-60">
          {status === "saving" ? "Saving..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
