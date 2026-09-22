"use client";

import { useEffect, useState } from "react";

function newMember() {
  return { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), name: "", position: "", image: "" };
}

export default function AdminAboutPage() {
  const [about, setAbout] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetch("/api/admin/about")
      .then((r) => r.json())
      .then((d) => setAbout(d.about));
  }, []);

  async function handleSave() {
    setStatus("saving");
    await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(about),
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  function updateMember(listKey, id, field, value) {
    setAbout({
      ...about,
      [listKey]: about[listKey].map((m) => (m.id === id ? { ...m, [field]: value } : m)),
    });
  }

  function addMember(listKey) {
    setAbout({ ...about, [listKey]: [...about[listKey], newMember()] });
  }

  function removeMember(listKey, id) {
    setAbout({ ...about, [listKey]: about[listKey].filter((m) => m.id !== id) });
  }

  if (!about) return <p className="text-sm text-gray-500">Loading...</p>;

  return (
    <div className="space-y-8 max-w-4xl">
      <h1 className="text-xl font-bold text-brand-green-dark">About Content</h1>

      <section className="bg-white border border-emerald-900/10 rounded-lg p-6 space-y-4">
        <h2 className="font-semibold text-brand-green-dark">Chairperson's Message</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              value={about.chairperson.name}
              onChange={(e) => setAbout({ ...about, chairperson: { ...about.chairperson, name: e.target.value } })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              value={about.chairperson.title}
              onChange={(e) => setAbout({ ...about, chairperson: { ...about.chairperson, title: e.target.value } })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            rows={5}
            value={about.chairperson.message}
            onChange={(e) => setAbout({ ...about, chairperson: { ...about.chairperson, message: e.target.value } })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
          />
        </div>
      </section>

      <section className="bg-white border border-emerald-900/10 rounded-lg p-6 space-y-4">
        <h2 className="font-semibold text-brand-green-dark">Mission & Vision</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
          <textarea
            rows={3}
            value={about.mission}
            onChange={(e) => setAbout({ ...about, mission: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
          <textarea
            rows={3}
            value={about.vision}
            onChange={(e) => setAbout({ ...about, vision: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
          />
        </div>
      </section>

      <MemberEditor
        title="Board of Directors"
        listKey="boardOfDirectors"
        members={about.boardOfDirectors}
        onUpdate={updateMember}
        onAdd={addMember}
        onRemove={removeMember}
      />

      <MemberEditor
        title="Management Committee"
        listKey="management"
        members={about.management}
        onUpdate={updateMember}
        onAdd={addMember}
        onRemove={removeMember}
      />

      <button onClick={handleSave} disabled={status === "saving"} className="btn-primary disabled:opacity-60">
        {status === "saving" ? "Saving..." : "Save All Changes"}
      </button>
      {status === "saved" && <span className="ml-3 text-sm text-brand-green font-medium">Saved!</span>}
    </div>
  );
}

function MemberEditor({ title, listKey, members, onUpdate, onAdd, onRemove }) {
  return (
    <section className="bg-white border border-emerald-900/10 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-brand-green-dark">{title}</h2>
        <button onClick={() => onAdd(listKey)} className="btn-outline text-sm py-1.5 px-3">
          + Add Member
        </button>
      </div>
      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="grid sm:grid-cols-[1fr_1fr_auto] gap-3 items-center">
            <input
              placeholder="Name"
              value={m.name}
              onChange={(e) => onUpdate(listKey, m.id, "name", e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
            <input
              placeholder="Position"
              value={m.position}
              onChange={(e) => onUpdate(listKey, m.id, "position", e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none"
            />
            <button onClick={() => onRemove(listKey, m.id)} className="text-red-600 text-sm font-medium">
              Remove
            </button>
          </div>
        ))}
        {members.length === 0 && <p className="text-sm text-gray-400">No members added yet.</p>}
      </div>
    </section>
  );
}
