"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export default function BlogListClient({ initialBlogs = [] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = new Set();
    initialBlogs.forEach((b) => {
      if (b.category) cats.add(b.category.trim());
    });
    return ["all", ...Array.from(cats)];
  }, [initialBlogs]);

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((b) => {
      if (
        activeCategory !== "all" &&
        (b.category || "").toLowerCase() !== activeCategory.toLowerCase()
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = (b.title || "").toLowerCase().includes(q);
        const matchesExcerpt = (b.excerpt || "").toLowerCase().includes(q);
        const matchesCategory = (b.category || "").toLowerCase().includes(q);
        const matchesAuthor = (b.author || "").toLowerCase().includes(q);
        const matchesTags = Array.isArray(b.tags)
          ? b.tags.some((t) => t.toLowerCase().includes(q))
          : (b.tags || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesExcerpt && !matchesCategory && !matchesAuthor && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [initialBlogs, activeCategory, searchQuery]);

  const featuredPost = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const remainingPosts = filteredBlogs.length > 0 ? filteredBlogs.slice(1) : [];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/80 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-2 rounded-xl transition-all font-bold whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat === "all" ? "All Articles" : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72 shrink-0">
          <input
            type="text"
            placeholder="Search guides & topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue outline-none bg-gray-50/50"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300 p-8">
          <p className="text-gray-600 font-bold text-base">No articles found.</p>
          <p className="text-xs text-gray-400 mt-1">Try searching for a different keyword or category.</p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 text-xs font-bold text-brand-blue underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          {/* Featured Article Card */}
          {featuredPost && (
            <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-auto min-h-[280px] bg-gray-900 overflow-hidden">
                <Image
                  src={featuredPost.image || "/images/prefab-house.webp"}
                  alt={featuredPost.title}
                  fill
                  quality={75}
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-brand-orange text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    ★ Featured Article
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="bg-blue-50 text-brand-blue font-bold px-2.5 py-0.5 rounded-md text-[11px]">
                      {featuredPost.category}
                    </span>
                    <span>•</span>
                    <span>{featuredPost.readTime || "5 min read"}</span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`}>
                    <h2 className="font-display font-bold text-xl sm:text-2xl lg:text-3xl text-brand-blue-dark group-hover:text-brand-orange transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-brand-blue text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {(featuredPost.author || "SP")[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800 leading-tight">{featuredPost.author || "Smart Panel Team"}</p>
                      <p className="text-[10px] text-gray-500">{featuredPost.publishedDate}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue group-hover:text-brand-orange transition-colors"
                  >
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Articles Grid */}
          {remainingPosts.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-xl text-brand-blue-dark mb-6">More Articles &amp; Technical Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {remainingPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-48 sm:h-52 w-full bg-gray-100 overflow-hidden">
                        <Image
                          src={post.image || "/images/prefab-house.webp"}
                          alt={post.title}
                          fill
                          quality={70}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-108 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mb-2">
                          <span>{post.publishedDate}</span>
                          <span>•</span>
                          <span>{post.readTime || "4 min read"}</span>
                        </div>

                        <Link href={`/blog/${post.slug}`}>
                          <h4 className="font-display font-bold text-base sm:text-lg text-brand-blue-dark group-hover:text-brand-orange transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h4>
                        </Link>

                        <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium truncate max-w-[140px]">
                          By {post.author || "Smart Panel"}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-xs font-bold text-brand-blue group-hover:text-brand-orange transition-colors flex items-center gap-1"
                        >
                          Read Article &rarr;
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
