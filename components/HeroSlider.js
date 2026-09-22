"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

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

  const slide = slides[index];

  return (
    <section
      className="relative bg-slate-900 text-white overflow-hidden"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
      }}
    >
      {/* Background images — priority on first slide for LCP */}
      <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[580px]">
        {slides.map((s, i) => (
          <div
            key={s.id ?? i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={s.image || "/images/prefab-house.jpg"}
              alt={s.title || "Smart Prefab Panel"}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          </div>
        ))}

        {/* Arrow buttons — desktop only */}
        {count > 1 && (
          <>
            <button onClick={prev} aria-label="Previous slide" className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-brand-orange text-white border border-white/20 items-center justify-center transition-all shadow-lg">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={next} aria-label="Next slide" className="hidden lg:flex absolute right-5 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-brand-orange text-white border border-white/20 items-center justify-center transition-all shadow-lg">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </>
        )}

        {/* Content */}
        <div className="relative z-20 container-page py-10 sm:py-16 lg:py-24">
          <div className="max-w-2xl flex flex-col items-start">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-blue/80 text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 border border-blue-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse shrink-0" />
              SMART PREFAB PANEL • NEPAL&apos;S LEADER
            </div>

            {/* Title */}
            <h1 className="font-display text-[1.75rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight drop-shadow-md">
              {slide?.title}
            </h1>

            {/* Subtitle */}
            {slide?.subtitle && (
              <p className="mt-3 sm:mt-4 text-gray-200 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">
                {slide.subtitle}
              </p>
            )}

            {/* CTAs */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href={slide?.ctaHref || "/products"} className="inline-flex items-center justify-center bg-brand-orange hover:bg-[#d9820f] text-white font-bold text-sm px-7 py-3 rounded-lg shadow-lg transition-all text-center">
                {slide?.ctaLabel || "Our Services"} &rarr;
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold text-sm px-7 py-3 rounded-lg transition-all text-center">
                Talk to Our Team
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-300">
              <span className="flex items-center gap-1.5"><span className="text-brand-orange font-bold">✓</span> Seismic Code Certified</span>
              <span className="flex items-center gap-1.5"><span className="text-brand-orange font-bold">✓</span> 124 kg/m³ Density</span>
              <span className="flex items-center gap-1.5"><span className="text-brand-orange font-bold">✓</span> 50% Faster Build</span>
            </div>

            {/* Dots — inside content flow */}
            {count > 1 && (
              <div className="mt-5 flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id ?? i}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-7 bg-brand-orange" : "w-2 bg-white/40 hover:bg-white/70"}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
