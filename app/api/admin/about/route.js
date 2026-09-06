import { NextResponse } from "next/server";
import { readDB, updateDB } from "@/lib/db";

export async function GET() {
  const { about } = readDB();
  return NextResponse.json({ about });
}

export async function PUT(request) {
  const body = await request.json();
  updateDB((data) => {
    data.about = { ...data.about, ...body };
  });
  return NextResponse.json({ ok: true });
}
