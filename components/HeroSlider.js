"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const count = slides.length;

  const goTo = useCallback((i) => {
    setIndex(((i % count) + count) % count);
  }, [count]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (count <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [count]);

  if (count === 0) return null;

  return (
    <section
      className="relative bg-slate-900 text-white overflow-hidden"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
      }}
    >
      <div className="relative min-h-[380px] sm:min-h-[480px] lg:min-h-[580px] flex items-center">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === index ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
            aria-hidden={i !== index}
          >
            {/* Background image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image || "/images/prefab-house.jpg"}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/65 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

            {/* Content */}
            <div className="container-page relative z-20 h-full flex items-center py-10 sm:py-14 lg:py-20">
              <div className="max-w-2xl w-full flex flex-col items-start">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-brand-blue/90 border border-blue-400/30 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 sm:mb-5 backdrop-blur-sm shadow-md">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse shrink-0" />
                  <span>SMART PREFAB PANEL • NEPAL&apos;S LEADER</span>
                </div>

                {/* Title */}
                <h1 className="font-display text-[1.65rem] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md break-words">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                {slide.subtitle && (
                  <p className="mt-3 sm:mt-5 text-gray-200 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal drop-shadow-sm">
                    {slide.subtitle}
                  </p>
                )}

                {/* CTAs */}
                <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
                  <Link
                    href={slide.ctaHref || "/products"}
                    className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-[#d9820f] text-white font-extrabold text-sm px-6 py-3 sm:py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-center"
                  >
                    {slide.ctaLabel || "Explore Products"} &rarr;
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm px-6 py-3 sm:py-3.5 rounded-lg backdrop-blur-md transition-all hover:-translate-y-0.5 text-center"
                  >
                    Talk to Our Team
                  </Link>
                </div>

                {/* Trust Highlights */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/15 text-xs sm:text-sm text-gray-300 w-full">
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange font-extrabold">✓</span>
                    <span>Seismic Code Certified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange font-extrabold">✓</span>
                    <span>124 kg/m³ Density</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-brand-orange font-extrabold">✓</span>
                    <span>50% Faster Build</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Controls */}
      {count > 1 && (
        <>
          {/* Arrow Buttons — desktop only */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-brand-orange text-white border border-white/20 backdrop-blur-md items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-slate-900/60 hover:bg-brand-orange text-white border border-white/20 backdrop-blur-md items-center justify-center transition-all duration-300 shadow-lg hover:scale-110"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-brand-orange shadow" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
