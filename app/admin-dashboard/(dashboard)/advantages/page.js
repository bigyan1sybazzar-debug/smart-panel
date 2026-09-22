"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const ICON_OPTIONS = [
  "heat", "feather", "sound", "wrench", "quake",
  "space", "cost", "fire", "shield", "bolt", "star", "check",
];

const FIELDS = [
  { name: "title", label: "Advantage Title", required: true },
  {
    name: "icon",
    label: `Icon Key (choose one: ${ICON_OPTIONS.join(", ")})`,
    required: true,
  },
  { name: "description", label: "Description", type: "textarea", required: true },
];

export default function AdminAdvantagesPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/advantages"
      fields={FIELDS}
      title="Manage Key Advantages"
    />
  );
}
