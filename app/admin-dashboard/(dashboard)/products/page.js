"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "name", label: "Product Name", required: true },
  { name: "category", label: "Category", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Product Image", type: "file" },
];

export default function AdminProductsPage() {
  return (
    <CollectionManager
      apiPath="/api/admin/collection/products"
      fields={FIELDS}
      uploadFolder="products"
      title="Manage Products"
    />
  );
}
