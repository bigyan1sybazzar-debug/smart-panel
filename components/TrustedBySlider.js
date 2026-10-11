"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function TrustedBySlider({ partners = [] }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Check scroll positions to enable/disable buttons
  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll, partners]);

  // Scroll by one card step
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const card = el.firstElementChild;
    const step = card ? card.offsetWidth + 16 : 220; // card width + gap
    const scrollAmount = direction === "next" ? step : -step;

    // Loop back to start if at the end, or end if at start
    if (direction === "next" && !canScrollRight) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === "prev" && !canScrollLeft) {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-play sliding every 3.5 seconds (pauses when hovered)
  useEffect(() => {
    if (isHovered || partners.length <= 2) return;
    const interval = setInterval(() => {
      scroll("next");
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered, canScrollRight, partners.length]);

  if (!partners || partners.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slider Controls Header / Floating Arrows */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <p className="text-xs sm:text-sm text-gray-500 font-medium">

        </p>

        {/* Navigation Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("prev")}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-white hover:bg-brand-blue hover:border-brand-blue flex items-center justify-center transition-all shadow-2xs hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Previous partners"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("next")}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-200 bg-white text-gray-700 hover:text-white hover:bg-brand-blue hover:border-brand-blue flex items-center justify-center transition-all shadow-2xs hover:shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Next partners"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sliding Carousel Track:
          - Mobile: 2.85 items visible
          - Tablet: 3.85 items visible
          - Desktop: 5 items visible
      */}
      <div
        ref={scrollRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex items-stretch gap-3 sm:gap-4 lg:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 [&::-webkit-scrollbar]:hidden"
      >
        {partners.map((partner, idx) => {
          const cardContent = (
            <div className="group h-full flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-white hover:bg-gradient-to-b hover:from-white hover:to-orange-50/30 border border-gray-100 hover:border-brand-orange/40 shadow-xs hover:shadow-md transition-all duration-300">
              {/* Circular Avatar / Logo Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden bg-white border-2 border-gray-100 group-hover:border-brand-orange shadow-xs group-hover:shadow-md transition-all duration-300 flex items-center justify-center p-2.5 sm:p-3 mb-3 shrink-0 ring-4 ring-transparent group-hover:ring-orange-100/60">
                {partner.logo ? (
                  <Image
                    src={partner.logo}
                    alt={partner.name || "Trusted Partner"}
                    fill
                    sizes="(max-width: 640px) 96px, 120px"
                    className="object-contain p-2 rounded-full group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-brand-cream flex items-center justify-center text-brand-blue-dark font-extrabold text-lg sm:text-xl">
                    {partner.name ? partner.name.charAt(0) : "★"}
                  </div>
                )}
              </div>

              {/* Partner Name */}
              <h3 className="font-display font-bold text-xs sm:text-sm text-brand-blue-dark group-hover:text-brand-orange transition-colors line-clamp-2 leading-tight">
                {partner.name}
              </h3>

              {/* Category / Sector */}
              {partner.category && (
                <span className="mt-1 text-[10px] sm:text-[11px] text-gray-500 font-medium line-clamp-1">
                  {partner.category}
                </span>
              )}
            </div>
          );

          return (
            <div
              key={partner.id || idx}
              className="
                snap-start shrink-0
                /* Mobile: 2.85 cards visible: (100% - 1.85 * 0.75rem) / 2.85 */
                w-[calc((100%-1.4rem)/2.85)]
                /* Tablet: 3.85 cards visible: (100% - 2.85 * 1rem) / 3.85 */
                sm:w-[calc((100%-2.85rem)/3.85)]
                /* Desktop: exactly 5 cards visible: (100% - 4 * 1.25rem) / 5 */
                lg:w-[calc((100%-5rem)/5)]
              "
            >
              {partner.website ? (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                  title={partner.name}
                >
                  {cardContent}
                </a>
              ) : (
                cardContent
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
