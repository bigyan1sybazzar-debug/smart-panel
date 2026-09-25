"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductsCatalogue({ products }) {
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

                {/* Responsive grid — 1 on mobile, 3 on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                    {products.map((p) => (
                        <div
                            key={p.id}
                            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="h-48 sm:h-48 w-full overflow-hidden relative bg-gray-50 shrink-0">
                                <Image
                                    src={p.image || "/images/sandwich-panel.jpg"}
                                    alt={p.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-2.5 left-2.5 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md shadow-sm z-10">
                                    {p.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5 flex flex-col flex-1">
                                <Link href={`/products/${p.id}`}>
                                    <h3 className="font-display font-bold text-base sm:text-base text-brand-blue-dark hover:text-brand-orange transition-colors leading-tight line-clamp-2">
                                        {p.name}
                                    </h3>
                                </Link>

                                {p.sizes && (
                                    <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded inline-block mt-2 self-start max-w-full break-words line-clamp-2">
                                        Sizes: {p.sizes}
                                    </p>
                                )}

                                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                                    {p.description}
                                </p>

                                {/* Buttons pinned to bottom */}
                                <div className="grid grid-cols-2 gap-2 mt-auto pt-4">
                                    <Link
                                        href={`/products/${p.id}`}
                                        className="block text-center text-xs font-bold text-brand-blue bg-blue-50 hover:bg-brand-blue hover:text-white py-2 px-2 rounded-lg transition-colors whitespace-nowrap"
                                    >
                                        View Specs
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="block text-center text-xs font-bold text-white bg-brand-orange hover:bg-[#d9820f] py-2 px-2 rounded-lg transition-colors whitespace-nowrap"
                                    >
                                        Quote →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}