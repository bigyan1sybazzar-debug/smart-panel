"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "title", label: "Project Title", required: true },
  { name: "location", label: "Location", required: false },
  { name: "category", label: "Category", required: false },
  { name: "description", label: "Short Description", type: "textarea", required: false },
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