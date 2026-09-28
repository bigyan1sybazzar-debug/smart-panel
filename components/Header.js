"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import TopBar from "./TopBar";
import { ChevronDown, MenuIcon, CloseIcon, PhoneIcon, PinIcon } from "./Icons";

export default function Header({ settings, servicesList = [] }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(null);
  const closeTimer = useRef(null);

  const serviceChildren =
    servicesList && servicesList.length > 0
      ? servicesList.map((s) => ({
        label: s.name,
        href: `/services/${s.slug}`,
      }))
      : [
        { label: "Earthquake Resistant Construction", href: "/services/earthquake-resistant-structure" },
        { label: "Smart Sandwich Panel Installation", href: "/services/smart-sandwich-panel-solutions" },
        { label: "Smart Solid Panel Wall Systems", href: "/services/smart-solid-panel-construction" },
        { label: "Turnkey Prefab Residential & Commercial Homes", href: "/services/prefab-house" },
        { label: "Smart EPS Construction Blocks", href: "/services/smart-eps-blocks" },
        { label: "Wall & Roof Insulation Systems", href: "/services/wall-roof-solutions" },
      ];

  const NAV = [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about-us",
      children: [
        { label: "CEO's Message", href: "/about-us/chairperson-message" },
        { label: "Our Mission & Vision", href: "/about-us/mission-vision" },
        { label: "Board of Directors", href: "/about-us/board-of-directors" },
        { label: "Management Committee", href: "/about-us/management-committee" },
      ],
    },
    { label: "Services", href: "/services", children: serviceChildren },
    { label: "Products", href: "/products" },
    { label: "Dealership", href: "/dealership" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blogs", href: "/blog" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "Notice", href: "/notice" },
    { label: "Contact", href: "/contact" },
  ];

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

  const primaryPhone =
    settings?.phone?.split(" / ")[0] || "+977-9851149804";
  const telHref = `tel:${primaryPhone.replace(/[^0-9+]/g, "")}`;
  const mailHref = `mailto:${settings?.email || "info@prefabpanelnepal.com"}`;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <TopBar settings={settings} />

      {/* === Middle White Bar === */}
      <div className="border-b border-gray-100 bg-white py-3">
        <div className="container-page flex items-center justify-between gap-4">
          <Logo />

          {/* Desktop right info — compact */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Location — Corporate Office */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                <PinIcon className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] leading-tight">
                <p className="font-bold text-gray-800">Pepsicola-32,</p>
                <p className="text-gray-500 font-medium">Kathmandu</p>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            {/* Phone + Email */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center shrink-0">
                <PhoneIcon className="w-3.5 h-3.5" />
              </div>
              <div className="text-[11px] leading-tight">
                <a
                  href={telHref}
                  className="font-bold text-gray-800 hover:text-brand-blue block no-underline whitespace-nowrap"
                >
                  {primaryPhone}
                </a>
                <a
                  href={mailHref}
                  className="text-gray-500 hover:text-brand-blue block font-medium no-underline whitespace-nowrap"
                >
                  {settings?.email || "info@prefabpanelnepal.com"}
                </a>
              </div>
            </div>

            {/* Contact button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#2b8a3e] hover:bg-[#237032] text-white font-bold text-[11px] px-4 py-2 rounded transition-colors uppercase tracking-wider shadow-sm hover:shadow no-underline whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-brand-blue p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* === Desktop Navigation === */}
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
                className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-extrabold tracking-wider uppercase whitespace-nowrap transition-colors border-r border-white/10 no-underline ${isActive(item)
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
                      className="block px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-blue-50 hover:text-brand-blue transition-colors no-underline"
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

      {/* === Mobile Navigation === */}
      {mobileOpen && (
        <nav className="lg:hidden bg-brand-blue max-h-[80vh] overflow-y-auto border-t border-white/10 shadow-2xl">
          {/* Quick Actions */}
          <div className="p-4 bg-brand-blue-dark border-b border-white/10 flex items-center gap-3">
            <a
              href={telHref}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs py-2.5 rounded-lg border border-white/20 no-underline"
            >
              <PhoneIcon className="w-3.5 h-3.5" /> Call Us
            </a>
            <Link
              href="/contact"
              className="flex-1 inline-flex items-center justify-center bg-[#2b8a3e] text-white font-bold text-xs py-2.5 rounded-lg uppercase tracking-wide no-underline"
            >
              Contact Us
            </Link>
          </div>

          {NAV.map((item) => (
            <div key={item.label} className="border-b border-white/10">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className={`flex-1 px-5 py-3.5 text-xs font-extrabold uppercase tracking-wider no-underline ${isActive(item)
                    ? "bg-brand-orange text-white"
                    : "text-white hover:bg-white/10"
                    }`}
                >
                  {item.label}
                </Link>

                {item.children && (
                  <button
                    className="px-5 py-3.5 text-white"
                    onClick={() =>
                      setMobileSubOpen(
                        mobileSubOpen === item.label ? null : item.label
                      )
                    }
                    aria-label={`Toggle ${item.label} submenu`}
                  >
                    <ChevronDown
                      className="w-4 h-4 transition-transform duration-200"
                      style={{
                        transform:
                          mobileSubOpen === item.label
                            ? "rotate(180deg)"
                            : "none",
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
                      className="block px-8 py-2.5 text-xs font-semibold text-white/90 hover:text-brand-orange hover:bg-white/5 transition-colors no-underline"
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