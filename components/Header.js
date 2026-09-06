"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import TopBar from "./TopBar";
import { ChevronDown, MenuIcon, CloseIcon, PhoneIcon, MailIcon, PinIcon } from "./Icons";

const NAV = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us",
    children: [
      { label: "Chairperson's Message", href: "/about-us/chairperson-message" },
      { label: "Our Mission & Vision", href: "/about-us/mission-vision" },
      { label: "Board of Directors", href: "/about-us/board-of-directors" },
      { label: "Management Committee", href: "/about-us/management-committee" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Earthquake Resistant Structure", href: "/services/earthquake-resistant-structure" },
      { label: "EPS Sandwich Panel in Nepal", href: "/services/eps-sandwich-panel" },
      { label: "Korean Design House in Nepal", href: "/services/korean-design-house" },
      { label: "Prefab house in Nepal", href: "/services/prefab-house" },
      { label: "Sandwich PUF Panel in Nepal", href: "/services/sandwich-puf-panel" },
      { label: "Wall & Roof Solutions", href: "/services/wall-roof-solutions" },
    ],
  },
  { label: "Products", href: "/products" },
  { label: "Dealership", href: "/dealership" },
  { label: "Gallery", href: "/gallery" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Investor Relations", href: "/investor-relations" },
  { label: "Notice", href: "/notice" },
  { label: "Newsletter", href: "/newsletter" },
  { label: "Contact", href: "/contact" },
];

export default function Header({ settings }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function isActive(item) {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  }

  function openWithDelay(label) {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  }
  function closeWithDelay() {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <TopBar settings={settings} />

      {/* Middle White Header Bar */}
      <div className="border-b border-gray-100 bg-white py-3.5">
        <div className="container-page flex items-center justify-between">
          <Logo />

          {/* Desktop Right Info Section */}
          <div className="hidden lg:flex items-center gap-7">
            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                <PinIcon />
              </div>
              <div className="text-xs leading-snug">
                <p className="font-bold text-gray-800">Bharatpur-8,</p>
                <p className="text-gray-500 font-medium">Chitwan, Nepal</p>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* Phone & Email */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                <PhoneIcon />
              </div>
              <div className="text-xs leading-snug">
                <a href={`tel:${settings?.phone?.split(" / ")[0] || "01-4111704"}`} className="font-bold text-gray-800 hover:text-brand-blue block">
                  +977 {settings?.phone?.split(" / ")[0] || "9709084173"}
                </a>
                <a href={`mailto:${settings?.email || "info@prefabpanelnepal.com"}`} className="text-gray-500 hover:text-brand-blue block">
                  {settings?.email || "info@prefabpanelnepal.com"}
                </a>
              </div>
            </div>

            {/* Green Contact Us Button */}
            <div className="ml-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#2b8a3e] hover:bg-[#237032] text-white font-bold text-xs px-5 py-2.5 rounded transition-all uppercase tracking-wider shadow-sm hover:shadow"
              >
                CONTACT US
              </Link>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden text-brand-blue p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-brand-blue shadow-inner">
        <div className="container-page flex items-center">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && openWithDelay(item.label)}
              onMouseLeave={() => item.children && closeWithDelay()}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-extrabold tracking-wider uppercase whitespace-nowrap transition-colors border-r border-white/10 ${
                  isActive(item)
                    ? "bg-brand-orange text-white"
                    : "text-white hover:bg-brand-blue-dark"
                }`}
              >
                {item.label}
                {item.children && <ChevronDown />}
              </Link>
              {item.children && openMenu === item.label && (
                <div className="absolute left-0 top-full min-w-[280px] bg-white shadow-xl border-t-2 border-brand-orange py-2 z-50 rounded-b-md">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden bg-brand-blue max-h-[80vh] overflow-y-auto border-t border-white/10 shadow-2xl">
          {/* Quick Mobile Actions */}
          <div className="p-4 bg-brand-blue-dark border-b border-white/10 flex items-center gap-3">
            <a
              href={`tel:${settings?.phone?.split(" / ")[0] || "01-4111704"}`}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 rounded-lg border border-white/20"
            >
              <PhoneIcon className="w-3.5 h-3.5" /> Call Us
            </a>
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center bg-[#2b8a3e] text-white font-bold text-xs py-2.5 rounded-lg uppercase tracking-wide"
            >
              Contact Us
            </Link>
          </div>

          {NAV.map((item) => (
            <div key={item.label} className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className={`flex-1 px-5 py-3.5 text-xs font-extrabold uppercase tracking-wider ${
                    isActive(item) ? "bg-brand-orange text-white" : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    className="px-5 py-3.5 text-white"
                    onClick={() =>
                      setMobileSubOpen(mobileSubOpen === item.label ? null : item.label)
                    }
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <ChevronDown
                      className="w-4 h-4 transition-transform duration-200"
                      style={{
                        transform: mobileSubOpen === item.label ? "rotate(180deg)" : "none",
                      }}
                    />
                  </button>
                )}
              </div>
              {item.children && mobileSubOpen === item.label && (
                <div className="bg-brand-blue-dark py-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-8 py-2.5 text-xs font-semibold text-white/90 hover:text-brand-orange hover:bg-white/5 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
