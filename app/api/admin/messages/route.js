import { NextResponse } from "next/server";
import { readDB, updateDB } from "@/lib/db";

export async function GET() {
  const { messages } = readDB();
  return NextResponse.json({ items: messages || [] });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  updateDB((data) => {
    data.messages = (data.messages || []).filter((m) => m.id !== id);
  });
  return NextResponse.json({ ok: true });
}
