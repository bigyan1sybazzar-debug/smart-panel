import { NextResponse } from "next/server";
import { readDB, updateDB } from "@/lib/db";

export async function GET() {
  const { settings } = readDB();
  return NextResponse.json({ settings });
}

export async function PUT(request) {
  const body = await request.json();
  updateDB((data) => {
    data.settings = { ...data.settings, ...body };
  });
  return NextResponse.json({ ok: true });
}
