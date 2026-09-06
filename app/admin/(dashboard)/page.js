"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CARDS = [
  { key: "heroSlides", label: "Homepage Slides", href: "/admin/slides" },
  { key: "products", label: "Products", href: "/admin/products" },
  { key: "gallery", label: "Gallery Photos", href: "/admin/gallery" },
  { key: "notices", label: "Notices", href: "/admin/notices" },
  { key: "investorRelations", label: "Investor Documents", href: "/admin/investor" },
  { key: "catalogue", label: "Catalogue Files", href: "/admin/catalogue" },
  { key: "messages", label: "Contact Messages", href: "/admin/messages" },
  { key: "newsletterSubs", label: "Newsletter Subscribers", href: "/admin/subscribers" },
  { key: "dealershipInquiries", label: "Dealership Leads", href: "/admin/dealership-leads" },
];

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/collection/slides").then((r) => r.json()),
      fetch("/api/admin/collection/products").then((r) => r.json()),
      fetch("/api/admin/collection/gallery").then((r) => r.json()),
      fetch("/api/admin/collection/notices").then((r) => r.json()),
      fetch("/api/admin/collection/investor").then((r) => r.json()),
      fetch("/api/admin/collection/catalogue").then((r) => r.json()),
      fetch("/api/admin/messages").then((r) => r.json()),
      fetch("/api/admin/subscribers").then((r) => r.json()),
      fetch("/api/admin/dealership-leads").then((r) => r.json()),
    ]).then(([slides, products, gallery, notices, investorRelations, catalogue, messages, newsletterSubs, dealershipInquiries]) => {
      setCounts({
        heroSlides: slides.items.length,
        products: products.items.length,
        gallery: gallery.items.length,
        notices: notices.items.length,
        investorRelations: investorRelations.items.length,
        catalogue: catalogue.items.length,
        messages: messages.items.length,
        newsletterSubs: newsletterSubs.items.length,
        dealershipInquiries: dealershipInquiries.items.length,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-brand-green-dark mb-2">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-8">
        Manage every page of prefabpanelnepal.com from here — content, products, media and leads.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {CARDS.map((c) => (
          <Link key={c.key} href={c.href} className="bg-white border border-emerald-900/10 rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="text-3xl font-display font-extrabold text-brand-green-dark">
              {counts ? counts[c.key] : "–"}
            </div>
            <div className="text-sm text-gray-500 mt-1">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
