import { NextResponse } from "next/server";
import { readDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { blogs = [] } = readDB();
    const { searchParams } = new URL(request.url);
    const categoryFilter = searchParams.get("category")?.toLowerCase() || "all";
    const q = searchParams.get("q")?.toLowerCase() || "";

    let items = blogs.filter(b => (b.status || "Published").toLowerCase() === "published");

    if (categoryFilter !== "all") {
      items = items.filter(
        (b) => (b.category || "").toLowerCase().includes(categoryFilter)
      );
    }

    if (q) {
      items = items.filter(
        (b) =>
          (b.title || "").toLowerCase().includes(q) ||
          (b.excerpt || "").toLowerCase().includes(q) ||
          (b.category || "").toLowerCase().includes(q) ||
          (b.content || "").toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      items,
      total: items.length,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json({ error: "Failed to load blogs" }, { status: 500 });
  }
}
