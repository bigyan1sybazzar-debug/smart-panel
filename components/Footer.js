import Link from "next/link";
import Image from "next/image";
import { PhoneIcon, MailIcon, PinIcon, SocialIcon } from "./Icons";

export default function Footer({ settings }) {
  const socials = ["facebook", "instagram", "twitter", "youtube", "tiktok"];
  return (
    <footer className="bg-brand-green-dark text-white/90">
      <div className="container-page py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="mb-4">
            <Link href="/" className="inline-block bg-white px-3.5 py-2 rounded-xl shadow-md hover:opacity-95 transition-opacity">
              <Image
                src="/images/logo.png"
                alt={settings?.companyName || "Smart Prefab Panel"}
                width={180}
                height={46}
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>
          </div>
          <p className="text-xs text-amber-300 font-bold uppercase tracking-wider mb-2">
            An ISO 9001:2015 Certified company
          </p>
          <p className="text-xs text-white/80 font-medium mb-3">
            Legal Entity: {settings?.legalName || "Prefab Panel Nepal Pvt. Ltd."}
          </p>
          <p className="text-xs text-white/70 leading-relaxed">
            {settings?.aboutSummary || "Nepal's premier manufacturer of lightweight, fire-rated, and earthquake-ready Smart Panels."}
          </p>
          <div className="flex gap-2.5 mt-4">
            {socials.map((s) => (
              <Link
                key={s}
                href={settings?.[s] || (s === "facebook" ? "https://facebook.com/smartpanelnepal" : "#")}
                aria-label={s}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange transition-colors"
              >
                <SocialIcon name={s} />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-1.5 text-sm">
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/about-us/mission-vision">Our Mission &amp; Vision</Link></li>
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/products">Smart Panel Products</Link></li>
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/dealership">Dealership Network</Link></li>
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/gallery">Completed Projects</Link></li>
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/catalogue">Catalogue &amp; Specs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-1.5 text-sm">
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/about-us">About Company Profile</Link></li>
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/about-us/chairperson-message">Leadership Message</Link></li>
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/notice">Government Rate Notices</Link></li>
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/newsletter">Newsletter</Link></li>
            <li><Link className="inline-block py-1 text-white/70 hover:text-brand-orange transition-colors" href="/contact">Contact &amp; Plant Location</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Direct Contact</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-white/80">
            <li className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 shrink-0 text-amber-300" />
              <div>
                <p className="font-bold text-white">Direct Sales Hotlines:</p>
                <a href="tel:+9779851149804" className="hover:text-amber-300 block">+977-9851149804</a>
                <a href="tel:+9779709084173" className="hover:text-amber-300 block">+977-9709084173</a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MailIcon className="mt-0.5 shrink-0 text-amber-300" />
              <div>
                <p className="font-bold text-white">Email:</p>
                <a href={`mailto:${settings?.email || "info@prefabpanelnepal.com"}`} className="hover:text-amber-300">
                  {settings?.email || "info@prefabpanelnepal.com"}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <PinIcon className="mt-0.5 shrink-0 text-amber-300" />
              <div>
                <p className="font-bold text-white">Headquarters:</p>
                <p>{settings?.corporateOffice || "Pepsicola -32, Kathmandu, Nepal"}</p>
                <p className="font-bold text-white mt-1">Manufacturing Plant:</p>
                <p>{settings?.factoryAddress || "Darai Tole-8, Bharatpur, Chitwan, Nepal"}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="container-page flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/60">
          <span>&copy; {new Date().getFullYear()} {settings?.legalName || "Prefab Panel Nepal Pvt. Ltd."} (Brand: {settings?.companyName || "Smart Panel"}). All rights reserved.</span>
          <span>{settings?.domain || "www.prefabpanelnepal.com"}</span>
        </div>
      </div>
    </footer>
  );
}
