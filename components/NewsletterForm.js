"use client";

import { useState } from "react";

export default function NewsletterForm({ variant = "default" }) {
  const [status, setStatus] = useState("idle");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none"
        />
        <button type="submit" disabled={status === "loading"} className="btn-primary whitespace-nowrap disabled:opacity-60">
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
        {status === "success" && <p className="text-sm text-brand-green sm:ml-2 self-center">Subscribed!</p>}
        {status === "error" && <p className="text-sm text-red-600 sm:ml-2 self-center">Already subscribed or invalid email.</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium text-brand-green-dark mb-1">Email Address</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none"
        />
      </div>
      <button type="submit" disabled={status === "loading"} className="btn-primary disabled:opacity-60">
        {status === "loading" ? "Subscribing..." : "Subscribe to Newsletter"}
      </button>
      {status === "success" && <p className="text-sm text-brand-green font-medium">You're subscribed. Thank you!</p>}
      {status === "error" && <p className="text-sm text-red-600">Could not subscribe — email may already be registered.</p>}
    </form>
  );
}
