"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export default function GalleryClient({ gallery }) {
  const [lightbox, setLightbox] = useState(null); // { index, item }

  const open = (index) => setLightbox({ index, item: gallery[index] });
  const close = () => setLightbox(null);

  const prev = useCallback(() => {
    if (!lightbox) return;
    const newIdx = (lightbox.index - 1 + gallery.length) % gallery.length;
    setLightbox({ index: newIdx, item: gallery[newIdx] });
  }, [lightbox, gallery]);

  const next = useCallback(() => {
    if (!lightbox) return;
    const newIdx = (lightbox.index + 1) % gallery.length;
    setLightbox({ index: newIdx, item: gallery[newIdx] });
  }, [lightbox, gallery]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <>
      {/* Grid */}
      <div className="container-page py-10 md:py-16 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {gallery.map((g, idx) => (
          <button
            key={g.id}
            onClick={() => open(idx)}
            className="gallery-card group rounded-xl overflow-hidden border border-emerald-900/5 shadow-sm bg-white text-center flex flex-col items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label={`View ${g.title || "gallery image"} in full size`}
          >
            <div className="h-36 sm:h-56 w-full bg-brand-cream flex items-center justify-center text-brand-green/50 text-xs relative overflow-hidden">
              {g.image ? (
                <>
                  <Image
                    src={g.image}
                    alt={g.title || "Gallery image"}
                    fill
                    priority={idx < 6}
                    loading={idx < 6 ? "eager" : "lazy"}
                    quality={75}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* zoom icon overlay */}
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15zM10.5 7.5v6m-3-3h6" />
                    </svg>
                  </span>
                </>
              ) : (
                <span>{g.title}</span>
              )}
            </div>
            <div className="p-3 sm:p-4 text-center w-full">
              <p className="font-medium text-brand-green-dark text-xs sm:text-sm text-center leading-tight break-words">
                {g.title}
              </p>
            </div>
          </button>
        ))}

        {gallery.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-10">
            Gallery photos will appear here soon.
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="lightbox-overlay"
          onClick={close}
        >
          {/* Close */}
          <button
            className="lightbox-close"
            onClick={close}
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {gallery.length > 1 && (
            <button
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Image panel */}
          <div
            className="lightbox-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-img-wrap">
              <Image
                src={lightbox.item.image}
                alt={lightbox.item.title || "Gallery image"}
                fill
                quality={90}
                sizes="(max-width: 768px) 95vw, 85vw"
                className="object-contain"
                priority
              />
            </div>
            {lightbox.item.title && (
              <p className="lightbox-caption">{lightbox.item.title}</p>
            )}
            <p className="lightbox-counter">
              {lightbox.index + 1} / {gallery.length}
            </p>
          </div>

          {/* Next */}
          {gallery.length > 1 && (
            <button
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-6 h-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
