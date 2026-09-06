import Link from "next/link";
import { PhoneIcon, MailIcon, PinIcon, SocialIcon } from "./Icons";

export default function TopBar({ settings }) {
  const socials = ["facebook", "instagram", "twitter", "youtube", "tiktok"];
  return (
    <div className="hidden md:block bg-brand-blue text-white border-b border-white/10 overflow-hidden">
      <div className="container-page flex items-center justify-between py-2 text-xs sm:text-sm text-white">
        <div className="flex items-center gap-4 lg:gap-6 min-w-0">
          <a href={`tel:${settings.phone.split(" / ")[0]}`} className="flex items-center gap-1.5 font-medium hover:text-brand-orange shrink-0">
            <PhoneIcon /> {settings.phone.split(" / ")[0]}
          </a>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-1.5 font-medium hover:text-brand-orange truncate">
            <MailIcon /> {settings.email}
          </a>
          <span className="hidden xl:flex items-center gap-1.5 font-medium shrink-0">
            <PinIcon /> {settings.address.split(",").slice(0, 2).join(",")}
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {socials.map((s) => (
            <Link
              key={s}
              href={settings[s] || "#"}
              aria-label={s}
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

