"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MenuIcon, CloseIcon } from "@/components/Icons";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/about", label: "About Content" },
  { href: "/admin/services", label: "Services Content" },
  { href: "/admin/slides", label: "Homepage Slider" },
  { href: "/admin/advantages", label: "Key Advantages" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/notices", label: "Notices" },
  { href: "/admin/investor", label: "Investor Relations" },
  { href: "/admin/catalogue", label: "Catalogue" },
  { href: "/admin/messages", label: "Contact Messages" },
  { href: "/admin/subscribers", label: "Newsletter Subscribers" },
  { href: "/admin/dealership-leads", label: "Dealership Leads" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <div className="lg:hidden flex items-center justify-between bg-brand-green-dark text-white px-4 py-3">
        <span className="font-display font-bold">Smart Prefab Panel Admin</span>
        <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      <aside className={`${open ? "block" : "hidden"} lg:block bg-brand-green-dark text-white w-full lg:w-64 lg:min-h-screen lg:shrink-0`}>
        <div className="hidden lg:block px-6 py-6 font-display font-bold text-lg border-b border-white/10">
          Smart Prefab Panel Admin
        </div>
        <nav className="py-2">
          {NAV.map((item) => {
            const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-6 py-3 text-sm font-medium ${
                  active ? "bg-brand-orange text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="block w-full text-left px-6 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white border-t border-white/10 mt-2"
          >
            Log Out
          </button>
          <Link
            href="/"
            className="block px-6 py-3 text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white"
          >
            &larr; Back to Website
          </Link>
        </nav>
      </aside>
    </>
  );
}
