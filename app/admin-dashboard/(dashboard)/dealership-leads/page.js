"use client";

import SimpleList from "@/components/admin/SimpleList";

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "location", label: "Location" },
  { key: "date", label: "Applied" },
];

export default function AdminDealershipLeadsPage() {
  return (
    <SimpleList
      apiPath="/api/admin/dealership-leads"
      columns={COLUMNS}
      title="Dealership Applications"
      emptyLabel="No dealership applications yet."
    />
  );
}
