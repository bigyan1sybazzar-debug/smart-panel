import { NextResponse } from "next/server";
import { readDB, updateDB } from "@/lib/db";

export async function GET() {
  const { dealershipInquiries } = readDB();
  return NextResponse.json({ items: dealershipInquiries || [] });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  updateDB((data) => {
    data.dealershipInquiries = (data.dealershipInquiries || []).filter((d) => d.id !== id);
  });
  return NextResponse.json({ ok: true });
}
