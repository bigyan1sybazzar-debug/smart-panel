"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectsShowcase({ initialProjects = [] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'ongoing' | 'completed'
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Dynamically load projects from /api/projects on mount to ensure fresh data
  useEffect(() => {
    let isMounted = true;
    async function loadProjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.items && data.items.length > 0) {
            setProjects(data.items);
          }
        }
      } catch (err) {
        console.error("Failed to dynamically load projects:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute available categories dynamically
  const categories = useMemo(() => {
    const cats = new Set();
    projects.forEach((p) => {
      if (p.category) cats.add(p.category.trim());
    });
    return ["all", ...Array.from(cats)];
  }, [projects]);

  // Compute counts dynamically
  const counts = useMemo(() => {
    const ongoing = projects.filter((p) =>
      (p.status || "").toLowerCase().includes("going")
    ).length;
    const completed = projects.filter(
      (p) => !(p.status || "").toLowerCase().includes("going")
    ).length;
    return {
      all: projects.length,
      ongoing,
      completed,
    };
  }, [projects]);

  // Filter projects based on activeTab and activeCategory
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const isOngoing = (p.status || "").toLowerCase().includes("going");
      if (activeTab === "ongoing" && !isOngoing) return false;
      if (activeTab === "completed" && isOngoing) return false;

      if (activeCategory !== "all" && p.category !== activeCategory) {
        return false;
      }
      return true;
    });
  }, [projects, activeTab, activeCategory]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-white relative">
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div className="text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
              Verified Sites Across Nepal
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-blue-dark">
              On-Going &amp; Completed Projects
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              Explore live construction sites and completed installations built with lightweight,
              earthquake-resistant, fireproof Smart Panels across Nepal.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/gallery"
              className="btn-outline text-xs sm:text-sm py-2 px-4 shrink-0 flex items-center gap-1.5"
            >
              <span>View Full Photo Gallery</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Dynamic Filter Controls */}
        <div className="space-y-4 mb-8">
          {/* Main Status Tabs: All, On-Going, Completed */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-gray-200 pb-3">
            <button
              onClick={() => {
                setActiveTab("all");
                setVisibleCount(8);
              }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "all"
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              <span>All Projects</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  activeTab === "all"
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("ongoing");
                setVisibleCount(8);
              }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "ongoing"
                  ? "bg-amber-500 text-white shadow-md shadow-amber-500/20"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span>On-Going</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  activeTab === "ongoing"
                    ? "bg-white/20 text-white"
                    : "bg-amber-200/80 text-amber-900"
                }`}
              >
                {counts.ongoing}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("completed");
                setVisibleCount(8);
              }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "completed"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/60"
              }`}
            >
              <span className="text-xs">✓</span>
              <span>Completed</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                  activeTab === "completed"
                    ? "bg-white/20 text-white"
                    : "bg-emerald-200/80 text-emerald-900"
                }`}
              >
                {counts.completed}
              </span>
            </button>

            {loading && (
              <span className="text-xs text-gray-500 ml-auto flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-spin" />
                Updating live...
              </span>
            )}
          </div>

          {/* Sub-Category Chips */}
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mr-1">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(8);
                  }}
                  className={`text-xs px-3 py-1 rounded-full transition-colors font-medium capitalize ${
                    activeCategory === cat
                      ? "bg-brand-blue-dark text-white font-semibold"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat === "all" ? "All Categories" : cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Project Grid */}
        {displayedProjects.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-sm">
              No projects found in this category or status.
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                setActiveCategory("all");
              }}
              className="mt-3 text-xs font-bold text-brand-blue underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {displayedProjects.map((prj) => {
              const isOngoing = (prj.status || "").toLowerCase().includes("going");

              return (
                <div
                  key={prj.id}
                  onClick={() => setSelectedProject(prj)}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Project Photo Container */}
                    <div className="h-48 w-full overflow-hidden relative bg-slate-100">
                      <Image
                        src={prj.image || "/images/prefab-house.jpg"}
                        alt={prj.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Status Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        {isOngoing ? (
                          <span className="inline-flex items-center gap-1.5 bg-amber-500/95 backdrop-blur-sm text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-80" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                            </span>
                            On-Going
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-emerald-600/95 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                            <span>✓</span>
                            Completed
                          </span>
                        )}
                      </div>

                      {/* Category Pill */}
                      {prj.category && (
                        <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded border border-white/20 truncate max-w-[130px] z-10">
                          {prj.category}
                        </span>
                      )}

                      {/* Quick Inspect Hover Hint */}
                      <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <span className="bg-white/90 backdrop-blur-sm text-brand-blue-dark text-[10px] font-bold px-2 py-1 rounded shadow flex items-center gap-1">
                          🔍 View Details
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-5">
                      <h3 className="font-display font-bold text-sm sm:text-base text-brand-blue-dark leading-snug group-hover:text-brand-orange transition-colors">
                        {prj.title}
                      </h3>

                      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1 font-medium text-gray-700">
                          <span className="text-brand-orange">📍</span> {prj.location || "Nepal"}
                        </span>
                        {prj.time && (
                          <span className="flex items-center gap-1 text-[11px] text-brand-blue font-semibold bg-blue-50 px-2 py-0.5 rounded">
                            <span>⏱</span> {prj.time}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-3">
                        {prj.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 sm:p-5 pt-0">
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-blue group-hover:text-brand-orange transition-colors flex items-center gap-1">
                        Project Overview &rarr;
                      </span>
                      <span className="text-[10px] text-gray-400">Click to preview</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More Button if there are more than visibleCount */}
        {filteredProjects.length > visibleCount && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 8)}
              className="btn-outline text-xs sm:text-sm py-2.5 px-6 font-bold"
            >
              Load More Projects ({filteredProjects.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* Dynamic Project Lightbox / Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="relative h-64 sm:h-80 w-full bg-gray-900">
                <Image
                  src={selectedProject.image || "/images/prefab-house.jpg"}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    {selectedProject.status?.toLowerCase().includes("going") ? (
                      <span className="bg-amber-500 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        On-Going Construction
                      </span>
                    ) : (
                      <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow">
                        ✓ Completed Project
                      </span>
                    )}
                    {selectedProject.category && (
                      <span className="bg-white/20 backdrop-blur-sm text-white text-[11px] px-2 py-0.5 rounded">
                        {selectedProject.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-4 bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 text-xs">
                  <div>
                    <span className="text-gray-500 block">Site Location:</span>
                    <span className="font-bold text-gray-800 flex items-center gap-1 mt-0.5">
                      📍 {selectedProject.location || "Nepal"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Status / Timeline:</span>
                    <span className="font-bold text-brand-blue flex items-center gap-1 mt-0.5">
                      ⏱ {selectedProject.time || selectedProject.status || "Completed"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                  <h4 className="font-display font-bold text-gray-900 text-sm">
                    Project Description &amp; Scope:
                  </h4>
                  <p>{selectedProject.description}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap gap-3 items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Built by <span className="font-bold text-brand-blue-dark">Prefab Panel Nepal Pvt. Ltd.</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/contact"
                      className="btn-primary text-xs py-2 px-4"
                      onClick={() => setSelectedProject(null)}
                    >
                      Inquire Similar Project
                    </Link>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="btn-outline text-xs py-2 px-4"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
