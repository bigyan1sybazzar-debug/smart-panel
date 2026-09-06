import { NextResponse } from "next/server";
import { readDB, updateDB, newId } from "@/lib/db";

export async function POST(request) {
  const { email } = await request.json();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { newsletterSubs = [] } = readDB();
  if (newsletterSubs.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
    return NextResponse.json({ error: "Already subscribed" }, { status: 409 });
  }

  updateDB((data) => {
    data.newsletterSubs = data.newsletterSubs || [];
    data.newsletterSubs.unshift({ id: newId(), email, date: new Date().toISOString() });
  });

  return NextResponse.json({ ok: true });
}
