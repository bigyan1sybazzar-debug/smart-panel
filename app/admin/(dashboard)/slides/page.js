"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "title", label: "Slide Title", required: true, type: "textarea" },
  { name: "subtitle", label: "Subtitle", type: "textarea" },
  { name: "ctaLabel", label: "Button Text", required: true },
  { name: "ctaHref", label: "Button Link (e.g. /products)", required: true },
  { name: "image", label: "Background Image (optional)", type: "file" },
];

export default function AdminSlidesPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/slides"
      fields={FIELDS}
      uploadFolder="slides"
      title="Manage Homepage Slider"
    />
  );
}
