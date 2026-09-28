import Link from "next/link";
import { PhoneIcon, MailIcon, PinIcon, SocialIcon } from "./Icons";

export default function TopBar({ settings }) {
  const socials = ["facebook", "instagram", "youtube", "tiktok"];
  const primaryPhone = settings?.phone?.split(" / ")[0] || "+977-9851149804";

  const corporate = "Pepsicola-32, Kathmandu";
  const factory = "Bharatpur, Chitwan";

  return (
    <div className="hidden md:block bg-brand-blue text-white border-b border-white/10 overflow-hidden">
      <div className="container-page flex items-center justify-between py-2 text-xs text-white gap-4">
        {/* LEFT — Contact info */}
        <div className="flex items-center gap-5 min-w-0">
          {/* ISO badge — compact */}
          <span className="inline-flex items-center gap-1 font-bold text-amber-300 text-[10px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded whitespace-nowrap">
            ★ ISO 9001:2015
          </span>

          {/* Phone */}
          <a
            href={`tel:${primaryPhone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-1.5 font-medium hover:text-brand-orange shrink-0 no-underline"
          >
            <PhoneIcon className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">{primaryPhone}</span>
          </a>

          {/* Email — shortened */}
          <a
            href={`mailto:${settings?.email || "info@prefabpanelnepal.com"}`}
            className="hidden lg:flex items-center gap-1.5 font-medium hover:text-brand-orange shrink-0 no-underline"
          >
            <MailIcon className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">info@prefabpanelnepal.com</span>
          </a>

          {/* Locations — combined into ONE compact block */}
          <div className="hidden xl:flex items-center gap-2 text-[11px] text-white/80 min-w-0">
            <PinIcon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              <span className="font-semibold text-white/95">Corporate:</span>{" "}
              {corporate}
              <span className="mx-2 text-white/40">•</span>
              <span className="font-semibold text-white/95">Factory:</span>{" "}
              {factory}
            </span>
          </div>
        </div>

        {/* RIGHT — Socials */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-white/60 hidden lg:inline whitespace-nowrap">
            Follow:
          </span>
          {socials.map((s) => (
            <Link
              key={s}
              href={
                settings?.[s] ||
                (s === "facebook" ? "https://facebook.com/smartpanelnepal" : "#")
              }
              aria-label={s}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-brand-orange transition-colors no-underline"
            >
              <SocialIcon name={s} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}