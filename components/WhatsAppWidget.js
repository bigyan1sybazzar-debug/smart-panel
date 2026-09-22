"use client";

import { useState } from "react";

export default function WhatsAppWidget({ settings }) {
  const [showTooltip, setShowTooltip] = useState(true);

  const rawNumber = settings?.whatsapp || settings?.phone || "+977-9851149804";
  // Extract digits for wa.me URL
  const cleanPhone = rawNumber.split("/")[0].replace(/[^0-9]/g, "");
  // Ensure Nepal country code 977 if entered as local 98XXXXXXXX
  const waNumber = cleanPhone.startsWith("977")
    ? cleanPhone
    : cleanPhone.length === 10
    ? `977${cleanPhone}`
    : cleanPhone;

  const defaultMsg = encodeURIComponent(
    "Hello Smart Panel Nepal! I am interested in your prefab products and would like to get a quote/specifications."
  );
  const whatsappUrl = `https://wa.me/${waNumber}?text=${defaultMsg}`;

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 pointer-events-auto select-none">
      {/* Pop-up Chat Card */}
      {showTooltip && (
        <div className="relative bg-white rounded-2xl shadow-2xl border border-emerald-100 p-3.5 max-w-[260px] sm:max-w-[280px] animate-fade-in-up">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Close WhatsApp chat popup"
            className="absolute top-2 right-2 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center text-xs transition-colors"
          >
            &times;
          </button>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              Smart Panel Online
            </span>
          </div>
          <p className="text-xs text-gray-700 leading-snug">
            👋 Need instant pricing, catalogue or technical help? Chat directly with us on WhatsApp!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center justify-center gap-1.5 w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-xs transition-colors"
          >
            Start WhatsApp Chat &rarr;
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Smart Panel on WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        {/* Glow pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none group-hover:opacity-0" />
        {/* WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10"
        >
          <path d="M16 2a13.9 13.9 0 0 0-12 21l-1.9 6.9 7.2-1.9A13.9 13.9 0 1 0 16 2zm0 25.5c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.3 1.1 1.2-4.2-.3-.5A11.5 11.5 0 1 1 16 27.5zm6.3-8.6c-.3-.2-2-.9-2.3-1-.3-.1-.6-.2-.8.2s-1 1.2-1.2 1.4c-.2.2-.4.2-.7.1a9 9 0 0 1-5.3-4.6c-.2-.4 0-.6.2-.8l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6s-.8-2-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.7.1-1.1.5-.4.4-1.5 1.5-1.5 3.6s1.5 4.2 1.7 4.5c.2.3 3 4.6 7.3 6.4 1 .4 1.8.7 2.4.9 1 .3 2 .3 2.8.2.8-.1 2.5-1 2.8-2 .4-.9.4-1.8.3-2s-.5-.3-.8-.4z" />
        </svg>
      </a>
    </aside>
  );
}
