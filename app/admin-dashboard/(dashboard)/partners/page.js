"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "name", label: "Client / Organization Name", required: true },
  { name: "logo", label: "Client / Partner Logo", type: "file", required: true },
  { name: "category", label: "Category / Sector (e.g. Government, Healthcare, Education, Commercial)" },
  { name: "website", label: "Website Link (Optional, e.g. https://...)" },
];

export default function AdminPartnersPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/partners"
      fields={FIELDS}
      uploadFolder="partners"
      title="Manage Trusted By / Client Logos"
    />
  );
}
