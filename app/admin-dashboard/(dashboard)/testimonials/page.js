"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "name", label: "Client / Company Name", required: true },
  { name: "role", label: "Role / Designation (e.g. Structural Engineer, Principal)", required: true },
  { name: "location", label: "Location (e.g. Kathmandu, Chitwan)", required: true },
  { name: "project", label: "Project Title (e.g. Hospital Health Post Facility)" },
  { name: "rating", label: "Rating (1 to 5)", type: "number" },
  { name: "avatar", label: "Client Photo / Avatar", type: "file" },
  { name: "projectImage", label: "Project / Site Photo", type: "file" },
  { name: "review", label: "Testimonial Review Quote", type: "textarea", required: true },
];

export default function AdminTestimonialsPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/testimonials"
      fields={FIELDS}
      uploadFolder="testimonials"
      title="Manage Verified Testimonials"
    />
  );
}
