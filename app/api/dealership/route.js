import { NextResponse } from "next/server";
import { updateDB, newId } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();
  const { name, email, phone, location, message } = body;

  if (!name || !email || !phone || !location) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entry = {
    id: newId(),
    name,
    email,
    phone,
    location,
    message: message || "",
    date: new Date().toISOString(),
  };

  updateDB((data) => {
    data.dealershipInquiries = data.dealershipInquiries || [];
    data.dealershipInquiries.unshift(entry);
  });

  return NextResponse.json({ ok: true });
}
