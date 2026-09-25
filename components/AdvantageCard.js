"use client";

import { useState } from "react";
const advantageImages = {
  // 1. Seismic Safety & Resilience (icon: "quake")
  quake: "https://blog.oshaonlinecenter.com/wp-content/uploads/2025/02/iStock-2202944165.webp",

  // 2. Speed & Lower Cost (icon: "wrench")
  wrench: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDEJjekmieSj2xw_-EprSSoRpYcxvt0lnFs7BLJCjT5A&s=10",

  // 3. Certified & Approved (icon: "shield") — approval badge
  shield: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDDoeSdjJt9lpAwyJ_tXdksUF9O5Zr57Zob3_GGR3EIA&s=10",

  // 4. Green Construction (icon: "feather")
  feather: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMB7VQ3wdAqD7rhTysRY42KG_ryXuAiOMjiJDKZgrdLDAsvz_8lwiYwI4&s=10",

  // 5. Thermal Resistant & Insulation (icon: "heat") — thermovision image
  heat: "https://media.istockphoto.com/id/517995089/photo/thermovision-image-on-house.jpg?s=612x612&w=0&k=20&c=9EGdYRvzqaGSkRE0U7U2Lih9Pj7Khs7rt-YcwRU_qDI=",

  // 6. Fire Proof Time Limit (icon: "fire")
  fire: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8q-v0IAAQiEIMB7qiiYxpEBE7cNnYVmJJS1xler1xv7cNevG4BOfYiU&s=10",

  // 7. Sound Insulation (icon: "sound")
  sound: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREcb6_3rhMF2tbtJoV7bXx0lKeod9UCDkKhunZ6uB5vA&s=10",

  // 8. Space & Cost Saving (icon: "space") — minimal interior
  space: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop&q=80",

  // 9. Water & Moisture Resistant (icon: "water") — CHANGED
  water: "https://static.vecteezy.com/system/resources/previews/067/665/684/non_2x/leakproof-glyph-icon-illustration-vector.jpg",


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