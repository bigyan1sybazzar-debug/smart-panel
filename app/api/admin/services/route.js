import { NextResponse } from "next/server";
import { readDB, updateDB } from "@/lib/db";

export async function GET() {
  const { servicesList } = readDB();
  return NextResponse.json({ servicesList });
}

export async function PUT(request) {
  const { servicesList } = await request.json();
  if (!Array.isArray(servicesList)) {
    return NextResponse.json({ error: "servicesList must be an array" }, { status: 400 });
  }
  updateDB((data) => {
    data.servicesList = servicesList;
  });
  return NextResponse.json({ ok: true });
}
