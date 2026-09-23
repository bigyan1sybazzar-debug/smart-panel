import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { readDB } from "@/lib/db";
import { PhoneIcon, MailIcon, PinIcon } from "@/components/Icons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact & Factory Location | Smart Panel Nepal",
  description: "Contact Smart Panel (Prefab Panel Nepal Pvt. Ltd.). Head office in Pepsicola-32, Kathmandu and NPR 20 Cr manufacturing plant in Bharatpur-8, Chitwan. Direct sales: +977-9851149804.",
};

export default function ContactPage() {
  const { settings } = readDB();
  return (
    <div>
      <PageHero
        crumb="Get In Touch"
        title="Contact Smart Panel"
        subtitle="Contact our direct sales hotline, visit our corporate headquarters in Pepsicola, or schedule a tour of our manufacturing facility in Bharatpur, Chitwan."
      />
      <div className="container-page py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Fast Response</span>
          <h2 className="font-display text-2xl font-extrabold text-brand-blue-dark mb-4 mt-1">Send an Inquiry / Quotation Request</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
            Need pricing for your project or looking to become a local dealer? Submit your details below and an engineering consultant will reach out within 24 hours.
          </p>
          <ContactForm />
        </div>

        <div>
          <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Direct Channels</span>
          <h2 className="font-display text-2xl font-extrabold text-brand-blue-dark mb-6 mt-1">Official Contact Information</h2>
          
          <div className="space-y-4 mb-8">
            {/* Direct Sales Hotlines */}
            <div className="flex items-start gap-3 p-4 bg-blue-50/70 rounded-xl border border-blue-100">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0">
                <PhoneIcon />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Direct Sales Hotlines</p>
                <div className="mt-1 space-y-0.5">
                  <a href="tel:+9779851149804" className="font-bold text-brand-blue hover:text-blue-800 text-sm block">
                    +977-9851149804
                  </a>
                  <a href="tel:+9779709084173" className="font-bold text-brand-blue hover:text-blue-800 text-sm block">
                    +977-9709084173
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MailIcon />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Official Email</p>
                <a href={`mailto:${settings?.email || "info@prefabpanelnepal.com"}`} className="font-bold text-gray-800 hover:text-brand-blue text-sm block mt-1">
                  {settings?.email || "info@prefabpanelnepal.com"}
                </a>
              </div>
            </div>

            {/* Corporate Office */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                <PinIcon />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Corporate Headquarters</p>
                <p className="font-medium text-gray-800 text-sm mt-1">
                  {settings?.corporateOffice || "Pepsicola -32, Madhyapur Thimi, Nepal"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Kathmandu / Bhaktapur Valley</p>
              </div>
            </div>

            {/* Manufacturing Plant */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0">
                <PinIcon />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Manufacturing Plant (NPR 20 Cr Facility)</p>
                <p className="font-medium text-gray-800 text-sm mt-1">
                  {settings?.factoryAddress || "Darai Tole-8, Bharatpur, Chitwan, Nepal"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Annual Capacity: 150,000+ sq. ft.</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-200 h-64 shadow-sm">
            <iframe
              title="Factory & Office Location Map"
              className="w-full h-full"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent("Bharatpur, Chitwan, Nepal")}&output=embed`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
