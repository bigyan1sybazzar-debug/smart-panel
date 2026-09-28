"use client";

import { useState } from "react";
import Image from "next/image";

const advantageImages = {
  // 1. Seismic Safety & Resilience
  quake: "/images/img/istockphoto-1007936248-612x612.webp",

  // 2. Speed & Lower Cost
  wrench: "/images/img/Cost_Savings.webp",

  // 3. Certified & Approved
  shield: "/images/img/images.webp",

  // 4. Green Construction
  feather: "/images/img/green.webp",

  // 5. Thermal Resistant & Insulation
  heat: "/images/img/images (4).webp",

  // 6. Fire Proof Time Limit
  fire: "/images/img/fire-resistant-seal-logo-vector.webp",

  // 7. Sound Insulation
  sound: "/images/img/images (3).webp",

  // 8. Space & Cost Saving
  space:
    "/images/img/cost-savings-seal-badge-cost-savings-label-sticker-vector-sign-cost-savings-label-sticker-vector-sign-cost-savings-seal-badge-463898354.webp",

  // 9. Water & Moisture Resistant
  water: "/images/img/leakproof-glyph-icon-illustration-vector.webp",

  // Fallback
  cost: "/images/img/Cost_Savings.webp",
};

export default function AdvantageCard({ advantage, idx }) {
  const [imgError, setImgError] = useState(false);

  // Guard — silently skip if data is missing
  if (!advantage) return null;

  const imgSrc = advantageImages[advantage.icon] || advantageImages.cost;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 sm:p-5 flex flex-col items-center text-center gap-2 sm:gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Circular image with ring */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-blue-100 group-hover:ring-brand-orange transition-all duration-300 bg-blue-50 shrink-0">
        {!imgError ? (
          <Image
            src={imgSrc}
            alt={advantage.title || "Advantage"}
            fill
            sizes="64px"
            quality={75}
            onError={() => setImgError(true)}
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl">
            🏗️
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-brand-blue-dark text-xs sm:text-sm leading-snug text-center">
        {advantage.title || "Advantage"}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-[11px] sm:text-xs leading-relaxed text-center line-clamp-3 sm:line-clamp-none">
        {advantage.description || ""}
      </p>
    </div>
  );
}