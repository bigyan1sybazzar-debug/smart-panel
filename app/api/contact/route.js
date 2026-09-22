import { NextResponse } from "next/server";
import { updateDB, newId } from "@/lib/db";
import { sendContactNotification } from "@/lib/mail";

export async function POST(request) {
  try {
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

    // Send email notification via cPanel SMTP asynchronously
    sendContactNotification({ name, email, phone, message }).catch((err) => {
      console.error("Error triggering contact notification:", err);
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
