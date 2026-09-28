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
      image: "/images/prefab-house.webp",
      images: ["/images/prefab-house.webp"],
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Service Photos / Gallery</label>
              <label className="cursor-pointer bg-brand-green/10 hover:bg-brand-green/20 text-brand-green text-xs font-semibold px-2.5 py-1.5 rounded transition-colors inline-flex items-center gap-1">
                <span>+ Add Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const files = Array.from(e.target.files || []);
                    if (files.length === 0) return;
                    for (const file of files) {
                      const fd = new FormData();
                      fd.append("file", file);
                      fd.append("folder", "services");
                      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                      const d = await res.json();
                      if (d.url) {
                        setServices((list) =>
                          list.map((item, i) => {
                            if (i !== idx) return item;
                            const currentImgs = Array.isArray(item.images) && item.images.length > 0 
                              ? item.images 
                              : (item.image ? [item.image] : []);
                            const newImgs = [...currentImgs, d.url];
                            return { ...item, images: newImgs, image: newImgs[0] };
                          })
                        );
                      }
                    }
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            {/* Thumbnail list */}
            {(() => {
              const currentImages = Array.isArray(s.images) && s.images.length > 0
                ? s.images
                : (s.image ? [s.image] : []);

              if (currentImages.length === 0) {
                return (
                  <p className="text-xs text-gray-400 italic mb-2">No images added yet. Click "+ Add Images" to upload photos for this service.</p>
                );
              }

              return (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-3">
                  {currentImages.map((imgUrl, imgIdx) => (
                    <div key={imgIdx} className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-video">
                      <img src={imgUrl} alt={`Service ${idx + 1} photo ${imgIdx + 1}`} className="w-full h-full object-cover" />
                      {imgIdx === 0 && (
                        <span className="absolute top-1 left-1 bg-brand-green text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                          Main / Cover
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                        {imgIdx > 0 && (
                          <button
                            type="button"
                            title="Set as Cover"
                            onClick={() => {
                              const newImgs = [...currentImages];
                              const [moved] = newImgs.splice(imgIdx, 1);
                              newImgs.unshift(moved);
                              setServices((list) =>
                                list.map((item, i) =>
                                  i === idx ? { ...item, images: newImgs, image: newImgs[0] } : item
                                )
                              );
                            }}
                            className="bg-white/90 hover:bg-white text-gray-800 text-[10px] p-1 rounded font-bold"
                          >
                            ★ Cover
                          </button>
                        )}
                        <button
                          type="button"
                          title="Delete photo"
                          onClick={() => {
                            const newImgs = currentImages.filter((_, i) => i !== imgIdx);
                            setServices((list) =>
                              list.map((item, i) =>
                                i === idx ? { ...item, images: newImgs, image: newImgs[0] || "" } : item
                              )
                            );
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white text-[10px] p-1 rounded font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            <p className="text-[11px] text-gray-400">
              Tip: The first image is used as the service card cover picture on the website. Hover over an image to make it cover or delete it.
            </p>
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
