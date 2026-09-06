import Link from "next/link";
import { PhoneIcon, MailIcon, PinIcon, SocialIcon } from "./Icons";

export default function Footer({ settings }) {
  const socials = ["facebook", "instagram", "twitter", "youtube", "tiktok"];
  return (
    <footer className="bg-brand-green-dark text-white/90">
      <div className="container-page py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display text-xl font-extrabold text-white mb-3">
            {settings.companyName || "Smart Prefab Panel"}
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            {settings.aboutSummary}
          </p>
          <div className="flex gap-3 mt-4">
            {socials.map((s) => (
              <Link
                key={s}
                href={settings[s] || "#"}
                aria-label={s}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand-orange transition-colors"
              >
                <SocialIcon name={s} />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link className="hover:text-brand-orange" href="/about-us/mission-vision">Our Mission &amp; Vision</Link></li>
            <li><Link className="hover:text-brand-orange" href="/products">Products</Link></li>
            <li><Link className="hover:text-brand-orange" href="/dealership">Dealership</Link></li>
            <li><Link className="hover:text-brand-orange" href="/gallery">Gallery</Link></li>
            <li><Link className="hover:text-brand-orange" href="/catalogue">Catalogue</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link className="hover:text-brand-orange" href="/investor-relations">Investor Relations</Link></li>
            <li><Link className="hover:text-brand-orange" href="/notice">Notice</Link></li>
            <li><Link className="hover:text-brand-orange" href="/newsletter">Newsletter</Link></li>
            <li><Link className="hover:text-brand-orange" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-brand-orange" href="/admin">Admin Panel</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Get in Touch</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2"><PhoneIcon className="mt-0.5 shrink-0" /> {settings.phone}</li>
            <li className="flex items-start gap-2"><MailIcon className="mt-0.5 shrink-0" /> {settings.email}</li>
            <li className="flex items-start gap-2"><PinIcon className="mt-0.5 shrink-0" /> {settings.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="container-page flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/60">
          <span>&copy; {new Date().getFullYear()} {settings.companyName || "Smart Prefab Panel"}. All rights reserved.</span>
          <span>prefabpanelnepal.com</span>
        </div>
      </div>
    </footer>
  );
}
