"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "title", label: "Document Title", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "file", label: "Document (PDF)", type: "file", accept: "application/pdf", required: true },
];

export default function AdminInvestorPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/investor"
      fields={FIELDS}
      uploadFolder="investor"
      title="Manage Investor Relations Documents"
    />
  );
}
