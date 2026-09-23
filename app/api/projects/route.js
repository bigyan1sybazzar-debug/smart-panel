import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { projects = [], gallery = [] } = readDB();
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get("status")?.toLowerCase() || "all";
    const categoryFilter = searchParams.get("category")?.toLowerCase() || "all";

    // Use projects if available, otherwise fallback to gallery
    const source = projects.length > 0 ? projects : gallery;

    let items = source.map((item, idx) => ({
      id: item.id || `prj-${idx}`,
      title: item.title || "Smart Panel Project",
      status: item.status || "Completed",
      category: item.category || "Completed Project",
      location: item.location || item.subtitle || "Nepal",
      time: item.time || "",
      image: item.image || "/images/prefab-house.jpg",
      description:
        item.description ||
        item.summary ||
        "Built with Smart Panel — lightweight, insulated, and earthquake-ready.",
    }));

    if (statusFilter !== "all") {
      items = items.filter((item) => {
        const itemStatus = (item.status || "").toLowerCase().replace(/[^a-z]/g, "");
        const target = statusFilter.replace(/[^a-z]/g, "");
        return itemStatus.includes(target) || target.includes(itemStatus);
      });
    }

    if (categoryFilter !== "all") {
      items = items.filter((item) =>
        (item.category || "").toLowerCase().includes(categoryFilter)
      );
    }

    return NextResponse.json({
      items,
      total: items.length,
      counts: {
        all: source.length,
        ongoing: source.filter((p) =>
          (p.status || "").toLowerCase().includes("going")
        ).length,
        completed: source.filter(
          (p) =>
            !(p.status || "").toLowerCase().includes("going")
        ).length,
      },
    });
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json({ error: "Failed to load projects" }, { status: 500 });
  }
}
