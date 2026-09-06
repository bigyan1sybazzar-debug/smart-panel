"use client";

import SimpleList from "@/components/admin/SimpleList";

const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "message", label: "Message" },
  { key: "date", label: "Received" },
];

export default function AdminMessagesPage() {
  return (
    <SimpleList
      apiPath="/api/admin/messages"
      columns={COLUMNS}
      title="Contact Messages"
      emptyLabel="No messages submitted yet."
    />
  );
}
