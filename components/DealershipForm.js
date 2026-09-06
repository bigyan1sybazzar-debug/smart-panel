"use client";

import { useState } from "react";

export default function DealershipForm() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const form = e.target;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/dealership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md bg-brand-cream border border-brand-green/20 p-6 text-brand-green-dark">
        <p className="font-semibold">Application received.</p>
        <p className="text-sm mt-1">Our dealership team will contact you within 3–5 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-green-dark mb-1">Full Name</label>
          <input required name="name" className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-green-dark mb-1">Phone Number</label>
          <input required name="phone" type="tel" className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-green-dark mb-1">Email Address</label>
          <input required name="email" type="email" className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-green-dark mb-1">City / Location</label>
          <input required name="location" className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-green-dark mb-1">Tell us about your business</label>
        <textarea required name="message" rows={4} className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
        {status === "loading" ? "Submitting..." : "Apply for Dealership"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
    </form>
  );
}
