"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.target;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError("Something went wrong. Please try again or call us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md bg-brand-cream border border-brand-green/20 p-6 text-brand-green-dark">
        <p className="font-semibold">Message sent.</p>
        <p className="text-sm mt-1">Thank you for reaching out — our team will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-brand-green-dark mb-1">Full Name</label>
          <input required name="name" type="text" className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-green-dark mb-1">Phone Number</label>
          <input required name="phone" type="tel" className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-green-dark mb-1">Email Address</label>
        <input required name="email" type="email" className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-brand-green-dark mb-1">Message</label>
        <textarea required name="message" rows={5} className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none" />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
