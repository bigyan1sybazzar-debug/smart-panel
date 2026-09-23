"use client";

import CollectionManager from "@/components/admin/CollectionManager";

const FIELDS = [
  { name: "name", label: "Product Name", required: true },
  { name: "category", label: "Category (e.g. Sandwich Panel)", required: true },
  { name: "sizes", label: "Available Sizes / Dimensions", placeholder: "e.g. 50mm, 75mm, 100mm × 2400/2700/3000mm × 610mm" },
  { name: "price", label: "Starting Price (optional)", placeholder: "e.g. NPR 191 / sq. ft." },
  { name: "description", label: "Product Description", type: "textarea", required: true },
  { name: "specs", label: "Technical Specs (JSON array)", type: "textarea", placeholder: '[{"label":"Core Material","value":"EPS + Cement"},{"label":"Fire Rating","value":"≥ 4 Hours"}]' },
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
