"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "title", label: "Photo Title", required: true },
  { name: "image", label: "Photo", type: "file", required: true },
];

export default function AdminGalleryPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/gallery"
      fields={FIELDS}
      uploadFolder="gallery"
      title="Manage Gallery"
    />
  );
}
