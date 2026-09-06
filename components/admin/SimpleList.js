"use client";

import { useEffect, useState } from "react";

export default function SimpleList({ apiPath, columns, title, emptyLabel = "No entries yet." }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  async function handleDelete(id) {
    if (!confirm("Delete this entry?")) return;
    await fetch(`${apiPath}?id=${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-brand-green-dark">{title}</h1>
        <span className="text-sm text-gray-500">{items.length} total</span>
      </div>
      <div className="bg-white border border-emerald-900/10 rounded-lg overflow-x-auto">
        {loading ? (
          <p className="p-6 text-sm text-gray-500">Loading...</p>
        ) : items.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">{emptyLabel}</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-brand-cream text-brand-green-dark text-left">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-semibold whitespace-nowrap">{c.label}</th>
                ))}
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((item) => (
                <tr key={item.id}>
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-gray-700 max-w-[260px]">
                      {c.key === "date"
                        ? new Date(item[c.key]).toLocaleString()
                        : String(item[c.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
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
