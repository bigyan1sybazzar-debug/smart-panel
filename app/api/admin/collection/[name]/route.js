import { NextResponse } from "next/server";
import { readDB, updateDB, newId } from "@/lib/db";

const ALLOWED = {
  products: "products",
  gallery: "gallery",
  notices: "notices",
  investor: "investorRelations",
  catalogue: "catalogue",
  slides: "heroSlides",
  advantages: "advantages",
};

function resolveKey(name) {
  return ALLOWED[name];
}

export async function GET(request, { params }) {
  const key = resolveKey(params.name);
  if (!key) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const data = readDB();
  return NextResponse.json({ items: data[key] || [] });
}

export async function POST(request, { params }) {
  const key = resolveKey(params.name);
  if (!key) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const body = await request.json();
  const item = { id: newId(), ...body };

  updateDB((data) => {
    data[key] = data[key] || [];
    data[key].unshift(item);
  });

  return NextResponse.json({ ok: true, item });
}

export async function PUT(request, { params }) {
  const key = resolveKey(params.name);
  if (!key) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  let updated = null;
  updateDB((data) => {
    data[key] = (data[key] || []).map((item) => {
      if (item.id === body.id) {
        updated = { ...item, ...body };
        return updated;
      }
      return item;
    });
  });

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, item: updated });
}

export async function DELETE(request, { params }) {
  const key = resolveKey(params.name);
  if (!key) return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  updateDB((data) => {
    data[key] = (data[key] || []).filter((item) => item.id !== id);
  });

  return NextResponse.json({ ok: true });
}
