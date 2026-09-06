"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "title", label: "Catalogue Title", required: true },
  { name: "file", label: "Catalogue File (PDF)", type: "file", accept: "application/pdf", required: true },
];

export default function AdminCataloguePage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/catalogue"
      fields={FIELDS}
      uploadFolder="catalogue"
      title="Manage Catalogue"
    />
  );
}
