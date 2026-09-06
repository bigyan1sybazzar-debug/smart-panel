import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ALLOWED_FOLDERS = ["gallery", "products", "notices", "investor", "catalogue", "slides"];

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const folder = formData.get("folder") || "gallery";

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const fileName = `${Date.now()}-${safeName}`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, fileName), buffer);

  return NextResponse.json({ ok: true, url: `/uploads/${folder}/${fileName}` });
}
