"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsCatalogue({ products }) {
    const trackRef = useRef(null);
    const [page, setPage] = useState(0);
    const [perView, setPerView] = useState(3);

    useEffect(() => {
        const update = () => setPerView(window.innerWidth < 768 ? 2 : 3);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const totalPages = Math.max(1, Math.ceil(products.length / perView));

    const goTo = (p) => {
        const clamped = Math.max(0, Math.min(p, totalPages - 1));
        setPage(clamped);
        const track = trackRef.current;
        if (track) {
            const cardWidth = track.scrollWidth / Math.max(products.length, 1);
            track.scrollTo({
                left: clamped * perView * cardWidth,
                behavior: "smooth",
            });
        }
    };

    const onScroll = () => {
        const track = trackRef.current;
        if (!track) return;
        const cardWidth = track.scrollWidth / Math.max(products.length, 1);
        const current = Math.round(track.scrollLeft / (cardWidth * perView));
        if (current !== page) setPage(current);
    };

    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
            <div className="container-page">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
                    <div className="text-left">
                        <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
                            Product Showcase
                        </span>
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-blue-dark mt-1">
                            Our Smart Panel Products
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            4.5mm calcium silicate board skins, light EPS-cement core, and tongue-and-groove interlocking.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="btn-outline text-xs sm:text-sm py-2 px-4 self-start sm:self-auto"
                    >
                        View All Products &rarr;
                    </Link>
                </div>

                <div style={{ position: "relative" }}>
                    <div
                        ref={trackRef}
                        onScroll={onScroll}
                        className="products-scroll"
                        style={{
                            display: "flex",
                            gap: "1rem",
                            overflowX: "auto",
                            scrollSnapType: "x mandatory",
                            scrollbarWidth: "none",
                            msOverflowStyle: "none",
                            paddingBottom: "0.5rem",
                        }}
                    >
                        {products.map((p) => (
                            <div
                                key={p.id}
                                style={{
                                    flex: "0 0 auto",
                                    width: `calc((100% - ${(perView - 1) * 1}rem) / ${perView})`,
                                    scrollSnapAlign: "start",
                                }}
                            >
                                <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full">
                                    <div>
                                        <div className="h-48 w-full overflow-hidden relative bg-gray-50">
                                            <Image
                                                src={p.image || "/images/sandwich-panel.jpg"}
                                                alt={p.name}
                                                fill
                                                sizes="(max-width: 640px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-2.5 left-2.5 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-sm z-10">
                                                {p.category}
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <Link href={`/products/${p.id}`}>
                                                <h3 className="font-display font-bold text-base text-brand-blue-dark hover:text-brand-orange transition-colors leading-tight">
                                                    {p.name}
                                                </h3>
                                            </Link>
                                            {p.sizes && (
                                                <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-2">
                                                    Sizes: {p.sizes}
                                                </p>
                                            )}
                                            <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                                                {p.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                                        <Link
                                            href={`/products/${p.id}`}
                                            className="block text-center text-xs font-bold text-brand-blue bg-blue-50 hover:bg-brand-blue hover:text-white py-2 px-2.5 rounded-lg transition-colors"
                                        >
                                            View Specs &rarr;
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="block text-center text-xs font-bold text-white bg-brand-orange hover:bg-[#d9820f] py-2 px-2.5 rounded-lg transition-colors"
                                        >
                                            Quote &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => goTo(page - 1)}
                        aria-label="Previous products"
                        disabled={page === 0}
                        className="hidden md:flex"
                        style={{
                            position: "absolute",
                            top: "40%",
                            left: "-1.25rem",
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "9999px",
                            background: "#ffffff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            border: "1px solid #e5e7eb",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: page === 0 ? "not-allowed" : "pointer",
                            opacity: page === 0 ? 0.4 : 1,
                            zIndex: 10,
                        }}
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => goTo(page + 1)}
                        aria-label="Next products"
                        disabled={page >= totalPages - 1}
                        className="hidden md:flex"
                        style={{
                            position: "absolute",
                            top: "40%",
                            right: "-1.25rem",
                            width: "2.5rem",
                            height: "2.5rem",
                            borderRadius: "9999px",
                            background: "#ffffff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                            border: "1px solid #e5e7eb",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: page >= totalPages - 1 ? "not-allowed" : "pointer",
                            opacity: page >= totalPages - 1 ? 0.4 : 1,
                            zIndex: 10,
                        }}
                    >
                        ›
                    </button>

                    {totalPages > 1 && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "0.5rem",
                                marginTop: "1.25rem",
                            }}
                        >
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to page ${i + 1}`}
                                    style={{
                                        width: page === i ? "1.5rem" : "0.5rem",
                                        height: "0.5rem",
                                        borderRadius: "9999px",
                                        background: page === i ? "#f59e0b" : "#d1d5db",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}