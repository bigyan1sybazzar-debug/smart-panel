import Link from "next/link";
import { PhoneIcon, MailIcon, PinIcon, SocialIcon } from "./Icons";

export default function TopBar({ settings }) {
  const socials = ["facebook", "instagram", "twitter", "youtube", "tiktok"];
  return (
    <div className="hidden md:block bg-brand-blue text-white border-b border-white/10">
      <div className="container-page flex items-center justify-between py-2 text-sm text-white">
        <div className="flex items-center gap-6">
          <a href={`tel:${settings.phone.split(" / ")[0]}`} className="flex items-center gap-2 font-medium hover:text-brand-orange">
            <PhoneIcon /> {settings.phone}
          </a>
          <a href={`mailto:${settings.email}`} className="flex items-center gap-2 font-medium hover:text-brand-orange">
            <MailIcon /> {settings.email}
          </a>
          <span className="flex items-center gap-2 font-medium">
            <PinIcon /> {settings.address.split(",").slice(0, 2).join(",")}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <Link
              key={s}
              href={settings[s] || "#"}
              aria-label={s}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-brand-orange transition-colors"
            >
              <SocialIcon name={s} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

