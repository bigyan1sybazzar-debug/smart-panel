import { NextResponse } from "next/server";
import { updateDB, newId } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const entry = {
    id: newId(),
    name,
    email,
    phone: phone || "",
    message,
    date: new Date().toISOString(),
  };

  updateDB((data) => {
    data.messages = data.messages || [];
    data.messages.unshift(entry);
  });

  return NextResponse.json({ ok: true });
}
