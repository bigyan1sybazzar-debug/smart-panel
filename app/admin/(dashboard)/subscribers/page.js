"use client";

import SimpleList from "@/components/admin/SimpleList";

const COLUMNS = [
  { key: "email", label: "Email" },
  { key: "date", label: "Subscribed" },
];

export default function AdminSubscribersPage() {
  return (
    <SimpleList
      apiPath="/api/admin/subscribers"
      columns={COLUMNS}
      title="Newsletter Subscribers"
      emptyLabel="No subscribers yet."
    />
  );
}
