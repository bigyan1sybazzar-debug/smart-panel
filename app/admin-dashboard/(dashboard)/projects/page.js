"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "title", label: "Project Title", required: true },
  { name: "location", label: "Location", required: true },
  { name: "category", label: "Category", required: false, placeholder: "e.g. Healthcare, Education, Commercial" },
  { name: "time", label: "Build Type / Timeline", required: false, placeholder: "e.g. Rapid Build, Turnkey Assembly" },
  { name: "description", label: "Short Description", type: "textarea", required: false },
  { name: "image", label: "Photo", type: "file", required: true },
];

export default function AdminProjectsPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/projects"
      fields={FIELDS}
      uploadFolder="projects"
      title="Manage On-Going & Completed Projects"
    />
  );
}
