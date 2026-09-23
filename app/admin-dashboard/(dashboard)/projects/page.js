"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "title", label: "Project Title", required: true },
  {
    name: "status",
    label: "Project Status",
    type: "select",
    options: [
      { value: "Completed", label: "Completed" },
      { value: "On-Going", label: "On-Going" },
    ],
    required: true,
  },
  { name: "category", label: "Category (e.g. Healthcare, Commercial, Education, Residential)", required: true },
  { name: "location", label: "Location (e.g. Bharatpur, Chitwan)", required: true },
  { name: "time", label: "Timeline / Completion Info (e.g. Completed 2025 or Under Construction)", required: false },
  { name: "image", label: "Project Photo", type: "file", required: true },
  { name: "description", label: "Short Description", type: "textarea", required: false },
];

export default function AdminProjectsPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/projects"
      fields={FIELDS}
      uploadFolder="gallery"
      title="Manage On-Going & Completed Projects Showcase"
    />
  );
}
