"use client";

import { AdvantageIcon } from "@/components/Icons";

export default function AdvantageCard({ advantage }) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 sm:p-5 flex flex-col items-center text-center gap-2 sm:gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
        <AdvantageIcon name={advantage.icon} />
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-brand-blue-dark text-xs sm:text-sm leading-snug text-center">
        {advantage.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed text-center line-clamp-3 sm:line-clamp-none">
        {advantage.description}
      </p>
    </div>
  );
}
