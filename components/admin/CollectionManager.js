"use client";

import { useEffect, useState } from "react";

const emptyFromFields = (fields) =>
  fields.reduce((acc, f) => ({ ...acc, [f.name]: "" }), {});

export default function CollectionManager({ apiPath, fields, uploadFolder, title }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyFromFields(fields));
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch(apiPath);
    const data = await res.json();
    setItems(data.items || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiPath]);

  function handleChange(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleFileUpload(name, file) {
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", uploadFolder || "gallery");
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (data.url) handleChange(name, data.url);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { ...form, id: editingId } : form;
    const res = await fetch(apiPath, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setError("Could not save. Please check the required fields.");
      return;
    }
    setForm(emptyFromFields(fields));
    setEditingId(null);
    load();
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm(fields.reduce((acc, f) => ({ ...acc, [f.name]: item[f.name] ?? "" }), {}));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyFromFields(fields));
  }

  async function handleDelete(id) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await fetch(`${apiPath}?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-brand-green-dark mb-6">{title}</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-emerald-900/10 rounded-lg p-6 mb-8 space-y-4">
        <h2 className="font-semibold text-brand-green-dark">
          {editingId ? "Edit item" : "Add new item"}
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {f.label}
                {f.required && <span className="text-red-500"> *</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  required={f.required}
                  rows={3}
                  value={form[f.name] || ""}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
                />
              ) : f.type === "file" ? (
                <div>
                  <input
                    type="file"
                    accept={f.accept || "image/*"}
                    onChange={(e) => handleFileUpload(f.name, e.target.files[0])}
                    className="text-sm"
                  />
                  {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
                  {form[f.name] && (
                    <p className="text-xs text-brand-green mt-1 break-all">Saved: {form[f.name]}</p>
                  )}
                </div>
              ) : (
                <input
                  type={f.type || "text"}
                  required={f.required}
                  value={form[f.name] || ""}
                  onChange={(e) => handleChange(f.name, e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
                />
              )}
            </div>
          ))}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" className="btn-primary">
            {editingId ? "Save Changes" : "Add Item"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="btn-outline">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white border border-emerald-900/10 rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-6 text-sm text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">No items yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-brand-cream text-brand-green-dark text-left">
              <tr>
                {fields.slice(0, 3).map((f) => (
                  <th key={f.name} className="px-4 py-3 font-semibold">{f.label}</th>
                ))}
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id}>
                  {fields.slice(0, 3).map((f) => (
                    <td key={f.name} className="px-4 py-3 text-gray-700 max-w-[220px] truncate">
                      {String(item[f.name] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => startEdit(item)} className="text-brand-green font-medium mr-4 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 font-medium hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
