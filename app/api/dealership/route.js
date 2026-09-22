import { NextResponse } from "next/server";
import { updateDB, newId } from "@/lib/db";
import { sendDealershipNotification } from "@/lib/mail";

export async function POST(request) {
  try {
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

    // Send email notification via cPanel SMTP asynchronously
    sendDealershipNotification({ name, email, phone, location, message }).catch((err) => {
      console.error("Error triggering dealership notification:", err);
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Dealership API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
