"use client";

import { AdvantageIcon } from "@/components/Icons";

export default function AdvantageCard({ advantage }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
        <AdvantageIcon name={advantage.icon} />
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-brand-blue-dark text-sm sm:text-base leading-snug">
        {advantage.title}
      </h3>

      {/* Description — clamped to 4 lines on mobile, full on desktop */}
      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-4 sm:line-clamp-none">
        {advantage.description}
      </p>

      {/* Bottom accent — hidden on mobile to save space */}
      <div className="hidden sm:block mt-auto pt-3 border-t border-gray-100">
        <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
          Smart Prefab Panel
        </span>
      </div>
    </div>
  );
}
