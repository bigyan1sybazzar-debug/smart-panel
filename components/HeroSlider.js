"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const count = slides.length;

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const goTo = useCallback((i) => {
    setIndex(((i % count) + count) % count);
  }, [count]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const startTimer = useCallback(() => {
    if (count <= 1) return;
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, 6000);
  }, [count]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
      startTimer();
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    handleSwipe();
  };

  const onMouseDown = (e) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
    touchEndX.current = e.clientX;
  };

  const onMouseMove = (e) => {
    if (isDragging.current) {
      touchEndX.current = e.clientX;
    }
  };

  const onMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      handleSwipe();
    }
  };

  if (count === 0) return null;

  const slide = slides[index];

  return (
    <section
      className="relative bg-slate-900 text-white overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseEnter={() => clearInterval(timerRef.current)}
      onMouseLeave={() => {
        isDragging.current = false;
        startTimer();
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {/* Background images — priority on first slide for LCP */}
      <div className="relative min-h-[340px] sm:min-h-[420px] lg:min-h-[480px]">
        {slides.map((s, i) => (
          <div
            key={s.id ?? i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={s.image || "/images/prefab-house.jpg"}
              alt={s.title || "Smart Prefab Panel"}
              fill
              className="object-cover object-center pointer-events-none"
              priority={i === 0}
              sizes="100vw"
              quality={80}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/85" />
          </div>
        ))}

        {/* Content */}
        <div className="relative z-20 container-page py-8 sm:py-12 lg:py-16 pointer-events-auto">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-brand-blue/85 text-white text-[9.5px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-widest px-2.5 sm:px-3 py-1 rounded-full mb-3 border border-blue-400/20 whitespace-nowrap shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse shrink-0" />
              <span>SMART PREFAB PANEL • NEPAL&apos;S LEADER</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-[1.6rem] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-md text-center">
              {slide?.title}
            </h1>

            {/* Subtitle */}
            {slide?.subtitle && (
              <p className="mt-2.5 sm:mt-3 text-gray-200 text-xs sm:text-base md:text-lg max-w-xl leading-relaxed text-center">
                {slide.subtitle}
              </p>
            )}

            {/* CTAs */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center items-center">
              <Link href={slide?.ctaHref || "/products"} className="inline-flex items-center justify-center bg-brand-orange hover:bg-[#d9820f] text-white font-bold text-sm px-7 py-2.5 rounded-lg shadow-lg transition-all text-center w-full sm:w-auto">
                {slide?.ctaLabel || "Our Services"} &rarr;
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/25 font-semibold text-sm px-7 py-2.5 rounded-lg transition-all text-center w-full sm:w-auto">
                Talk to Our Team
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-300">
              <span className="flex items-center gap-1.5"><span className="text-brand-orange font-bold">✓</span> Seismic Code Certified</span>
              <span className="flex items-center gap-1.5"><span className="text-brand-orange font-bold">✓</span> 124 kg/m³ Density</span>
              <span className="flex items-center gap-1.5"><span className="text-brand-orange font-bold">✓</span> 50% Faster Build</span>
            </div>

            {/* Dots — desktop only, hidden on mobile */}
            {count > 1 && (
              <div className="mt-5 hidden sm:flex items-center justify-center gap-2">
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

