"use client";

import { useState } from "react";
const advantageImages = {
  // 1. Seismic Safety & Resilience (icon: "quake")
  quake: "./images/img/istockphoto-1007936248-612x612.jpg",

  // 2. Speed & Lower Cost (icon: "wrench")
  wrench: "./images/img/Cost_Savings.jpg",

  // 3. Certified & Approved (icon: "shield") — approval badge
  shield: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDDoeSdjJt9lpAwyJ_tXdksUF9O5Zr57Zob3_GGR3EIA&s=10",

  // 4. Green Construction (icon: "feather")
  feather: "./images/img/green.jpg",

  // 5. Thermal Resistant & Insulation (icon: "heat") — thermovision image
  heat: "./images/img/images (4).jpg",

  // 6. Fire Proof Time Limit (icon: "fire")
  fire: "./images/img/fire-resistant-seal-logo-vector.jpg",

  // 7. Sound Insulation (icon: "sound")
  sound: "./images/img/images (3).jpg",

  // 8. Space & Cost Saving (icon: "space") — minimal interior
  space: "./images/img/cost-savings-seal-badge-cost-savings-label-sticker-vector-sign-cost-savings-label-sticker-vector-sign-cost-savings-seal-badge-463898354.webp",

  // 9. Water & Moisture Resistant (icon: "water") — CHANGED
  water: "./images/img/leakproof-glyph-icon-illustration-vector.jpg",


};
export default function AdvantageCard({ advantage }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc = advantageImages[advantage.icon] || advantageImages.cost;

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm p-3.5 sm:p-5 flex flex-col items-center text-center gap-2 sm:gap-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      {/* Image — slightly bigger, circular, with ring */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-blue-100 group-hover:ring-brand-orange transition-all duration-300 bg-blue-50 shrink-0">
        {!imgError ? (
          <img
            src={imgSrc}
            alt={advantage.title}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xl">
            🏗️
          </div>
        )}
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