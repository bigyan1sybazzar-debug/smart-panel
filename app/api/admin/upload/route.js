import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ALLOWED_FOLDERS = ["gallery", "products", "notices", "investor", "catalogue", "slides", "team", "testimonials", "services", "blogs"];

export const dynamic = "force-dynamic";

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

  const rawName = file.name.replace(/\.[^/.]+$/, ""); // strip existing extension
  const safeName = rawName.replace(/[^a-zA-Z0-9_-]/g, "_");
  const isPdf = file.name.toLowerCase().endsWith(".pdf");

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  fs.mkdirSync(dir, { recursive: true });

  if (isPdf) {
    const fileName = `${Date.now()}-${safeName}.pdf`;
    fs.writeFileSync(path.join(dir, fileName), buffer);
    return NextResponse.json({ ok: true, url: `/uploads/${folder}/${fileName}` });
  }

  try {
    const fileName = `${Date.now()}-${safeName}.webp`;
    const targetPath = path.join(dir, fileName);

    // Resize if oversized and encode to optimized WebP
    await sharp(buffer)
      .rotate() // Auto-orient based on EXIF
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(targetPath);

    return NextResponse.json({ ok: true, url: `/uploads/${folder}/${fileName}` });
  } catch (err) {
    console.error("Image processing error:", err);
    // Fallback in case of raw file saving
    const fallbackName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    fs.writeFileSync(path.join(dir, fallbackName), buffer);
    return NextResponse.json({ ok: true, url: `/uploads/${folder}/${fallbackName}` });
  }
}
