"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "title", label: "Notice Title", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "file", label: "Attachment (PDF)", type: "file", accept: "application/pdf" },
];

export default function AdminNoticesPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/notices"
      fields={FIELDS}
      uploadFolder="notices"
      title="Manage Notices"
    />
  );
}
