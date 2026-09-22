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
      {/* Slides */}
      <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[580px]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
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
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
          </div>
        ))}

        {/* Content — sits on top of all slides */}
        <div className="relative z-20 container-page flex items-start pt-8 pb-20 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24 min-h-[420px] sm:min-h-[500px] lg:min-h-[580px]">
          <div className="max-w-2xl w-full flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-blue/90 border border-blue-400/30 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 sm:mb-5 backdrop-blur-sm shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse shrink-0" />
              <span>SMART PREFAB PANEL • NEPAL&apos;S LEADER</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-[1.75rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
              {slides[index]?.title}
            </h1>

            {/* Subtitle */}
            {slides[index]?.subtitle && (
              <p className="mt-2 sm:mt-4 text-gray-200 text-[13px] sm:text-base md:text-lg max-w-xl leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                {slides[index].subtitle}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href={slides[index]?.ctaHref || "/products"}
                className="inline-flex items-center justify-center gap-2 bg-brand-orange hover:bg-[#d9820f] text-white font-extrabold text-sm sm:text-base px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-center"
              >
                {slides[index]?.ctaLabel || "Explore Products"} &rarr;
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-sm sm:text-base px-6 py-3 rounded-lg backdrop-blur-md transition-all hover:-translate-y-0.5 text-center"
              >
                Talk to Our Team
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-5 sm:mt-8 pt-4 sm:pt-6 border-t border-white/15 flex flex-wrap gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-300 w-full">
              <div className="flex items-center gap-1.5">
                <span className="text-brand-orange font-extrabold text-sm">✓</span>
                <span>Seismic Code Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-brand-orange font-extrabold text-sm">✓</span>
                <span>124 kg/m³ Density</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-brand-orange font-extrabold text-sm">✓</span>
                <span>50% Faster Build</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dots — below content, at very bottom of section */}
      {count > 1 && (
        <>
          {/* Arrow buttons — desktop only */}
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

          {/* Dots — safe zone at bottom, never overlaps content */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-slate-950/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-7 bg-brand-orange shadow" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
