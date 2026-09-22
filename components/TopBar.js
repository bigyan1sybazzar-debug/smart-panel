import Link from "next/link";
import { PhoneIcon, MailIcon, PinIcon, SocialIcon } from "./Icons";

export default function TopBar({ settings }) {
  const socials = ["facebook", "instagram", "youtube", "tiktok"];
  const primaryPhone = settings?.phone?.split(" / ")[0] || "+977-9851149804";

  return (
    <div className="hidden md:block bg-brand-blue text-white border-b border-white/10 overflow-hidden">
      <div className="container-page flex items-center justify-between py-2 text-xs sm:text-sm text-white">
        <div className="flex items-center gap-4 lg:gap-6 min-w-0">
          <span className="inline-flex items-center gap-1.5 font-bold text-amber-300 text-[11px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
            ★ ISO 9001:2015 Certified
          </span>
          <a
            href={`tel:${primaryPhone.replace(/[^0-9+]/g, "")}`}
            className="flex items-center gap-1.5 font-medium hover:text-brand-orange shrink-0"
          >
            <PhoneIcon /> {settings?.phone || "+977-9851149804"}
          </a>
          <a
            href={`mailto:${settings?.email || "info@prefabpanelnepal.com"}`}
            className="flex items-center gap-1.5 font-medium hover:text-brand-orange truncate"
          >
            <MailIcon /> {settings?.email || "info@prefabpanelnepal.com"}
          </a>
          <span className="hidden xl:flex items-center gap-1.5 font-medium text-white/80 shrink-0 text-xs">
            <PinIcon /> Pepsicola, Kathmandu          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="text-[11px] text-white/70 hidden lg:inline">Follow us:</span>
          {socials.map((s) => (
            <Link
              key={s}
              href={settings?.[s] || (s === "facebook" ? "https://facebook.com/smartpanelnepal" : "#")}
              aria-label={s}
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-brand-orange transition-colors"
            >
              <SocialIcon name={s} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
