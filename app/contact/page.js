import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { readDB } from "@/lib/db";
import { PhoneIcon, MailIcon, PinIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact & Factory Location | Smart Panel Nepal",
  description:
    "Contact Smart Panel (Prefab Panel Nepal Pvt. Ltd.). Corporate office in Pepsicola-32, Kathmandu and NPR 20 Cr manufacturing plant in Darai Tole, Bharatpur, Chitwan. Direct sales: +977-9851149804.",
};

export default function ContactPage() {
  const { settings } = readDB();

  const corporate =
    settings?.corporateOffice || "Pepsicola-32, Kathmandu, Nepal";
  const factory =
    settings?.factoryAddress || "Darai Tole, Bharatpur, Chitwan, Nepal";
  const email = settings?.email || "info@prefabpanelnepal.com";

  // === Corporate Office — EXACT coordinates ===
  const corporateLatLng = "27.68369618622218,85.35604196639132";
  const corporateMapEmbed = `https://www.google.com/maps?q=${corporateLatLng}&z=18&output=embed`;
  const corporateDirections = `https://www.google.com/maps/dir/?api=1&destination=${corporateLatLng}`;
  const corporateShortLink = "https://maps.app.goo.gl/ke9Gi1pkxTh8wNsT6";

  // === Manufacturing Plant — exact coordinates ===
  const factoryLatLng = "27.66325,84.43216";
  const factoryMapEmbed = `https://www.google.com/maps?q=${factoryLatLng}&z=15&output=embed`;
  const factoryDirections = `https://www.google.com/maps/dir/?api=1&destination=${factoryLatLng}`;

  return (
    <div>
      <PageHero
        crumb="Get In Touch"
        title="Contact Smart Panel"
        subtitle="Reach our direct sales hotline, visit our corporate headquarters in Pepsicola, or schedule a tour of our manufacturing facility in Bharatpur, Chitwan."
      />

      <div className="container-page py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* === LEFT — Inquiry Form === */}
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
            Fast Response
          </span>
          <h2 className="font-display text-2xl font-extrabold text-brand-blue-dark mb-4 mt-1">
            Send an Inquiry / Quotation Request
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
            Need pricing for your project or looking to become a local dealer?
            Submit your details below and an engineering consultant will reach
            out within 24 hours.
          </p>
          <ContactForm />
        </div>

        {/* === RIGHT — Contact Info === */}
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">
            Direct Channels
          </span>
          <h2 className="font-display text-2xl font-extrabold text-brand-blue-dark mb-6 mt-1">
            Official Contact Information
          </h2>

          <div className="space-y-3 mb-8">
            {/* Direct Sales Hotlines */}
            <div className="flex items-start gap-3 p-4 bg-blue-50/70 rounded-xl border border-blue-100">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0">
                <PhoneIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Direct Sales Hotlines
                </p>
                <div className="mt-1 space-y-0.5">
                  <a
                    href="tel:+9779851149804"
                    className="font-bold text-brand-blue hover:text-blue-800 text-sm block no-underline"
                  >
                    +977-9851149804
                  </a>
                  <a
                    href="tel:+9779709084173"
                    className="font-bold text-brand-blue hover:text-blue-800 text-sm block no-underline"
                  >
                    +977-9709084173
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MailIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Official Email
                </p>
                <a
                  href={`mailto:${email}`}
                  className="font-bold text-gray-800 hover:text-brand-blue text-sm block mt-1 no-underline break-all"
                >
                  {email}
                </a>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="flex items-start gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                <PinIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Corporate Headquarters
                </p>
                <p className="font-medium text-gray-800 text-sm mt-1">
                  {corporate}
                </p>
                <a
                  href={corporateShortLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-blue hover:text-blue-800 font-semibold mt-1 inline-flex items-center gap-1 no-underline"
                >
                  📍 Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Manufacturing Plant */}
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0">
                <PinIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Manufacturing Plant (NPR 20 Cr Facility)
                </p>
                <p className="font-medium text-gray-800 text-sm mt-1">
                  {factory}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Annual Capacity: 150,000+ sq. ft.
                </p>
              </div>
            </div>
          </div>

          {/* === Maps — Two Locations === */}
          <div className="space-y-4">
            {/* Corporate Office Map */}
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                Corporate Office — Pepsicola-32, Kathmandu
              </p>
              <div className="rounded-xl overflow-hidden border border-gray-200 h-48 shadow-sm">
                <iframe
                  title="Corporate Office Location"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={corporateMapEmbed}
                />
              </div>
              <a
                href={corporateDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-blue-800 no-underline"
              >
                🧭 Get Directions
              </a>
            </div>

            {/* Factory Map */}
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-700 inline-block" />
                Manufacturing Plant — Bharatpur, Chitwan
              </p>
              <div className="rounded-xl overflow-hidden border border-gray-200 h-48 shadow-sm">
                <iframe
                  title="Factory Location"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={factoryMapEmbed}
                />
              </div>
              <a
                href={factoryDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue hover:text-blue-800 no-underline"
              >
                🧭 Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}