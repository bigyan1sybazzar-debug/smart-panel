"use client";

import { useState } from "react";

export default function FaqAccordion({ faqs }) {
  const [openId, setOpenId] = useState(faqs?.[0]?.id || null);

  function toggle(id) {
    setOpenId(openId === id ? null : id);
  }

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((f) => {
        const isOpen = openId === f.id;
        return (
          <div
            key={f.id}
            className={`bg-white rounded-xl border transition-all ${
              isOpen ? "border-brand-blue shadow-md" : "border-gray-200 shadow-xs hover:border-gray-300"
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(f.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-display font-bold text-gray-800 text-sm md:text-base hover:text-brand-blue transition-colors"
            >
              <span>{f.question}</span>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-bold text-base transition-colors ${
                isOpen ? "bg-brand-blue text-white" : "bg-gray-100 text-brand-blue"
              }`}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-sm text-gray-600 border-t border-gray-100 leading-relaxed bg-blue-50/20">
                {f.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
