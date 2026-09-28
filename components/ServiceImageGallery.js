"use client";

import { useState } from "react";
import Image from "next/image";

export default function ServiceImageGallery({ images = [], serviceName = "Service" }) {
  const imageList = Array.isArray(images) && images.length > 0 ? images : [];
  const [activeIdx, setActiveIdx] = useState(0);

  if (imageList.length === 0) return null;

  const currentImage = imageList[activeIdx] || imageList[0];

  return (
    <div className="space-y-3">
      {/* Featured Main Image */}
      <div className="rounded-2xl overflow-hidden shadow-md h-72 sm:h-96 md:h-[420px] relative bg-gray-100 border border-gray-100">
        <Image
          src={currentImage}
          alt={`${serviceName} - Photo ${activeIdx + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover transition-all duration-300"
          priority
        />
        {imageList.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
            {activeIdx + 1} / {imageList.length} Photos
          </div>
        )}
      </div>

      {/* Thumbnails if multiple pictures */}
      {imageList.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {imageList.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`relative h-16 sm:h-20 w-24 sm:w-28 shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeIdx === i
                  ? "border-brand-orange shadow-md scale-105"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${serviceName} thumbnail ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
