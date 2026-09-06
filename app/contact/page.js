import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { readDB } from "@/lib/db";
import { PhoneIcon, MailIcon, PinIcon } from "@/components/Icons";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  const { settings } = readDB();
  return (
    <div>
      <PageHero crumb="Get In Touch" title="Contact Us" subtitle="Have a question about our products or services? Send us a message and our team will respond promptly." />
      <div className="container-page py-16 grid lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl font-extrabold text-brand-green-dark mb-6">Send a Message</h2>
          <ContactForm />
        </div>
        <div>
          <h2 className="font-display text-2xl font-extrabold text-brand-green-dark mb-6">Contact Details</h2>
          <div className="space-y-5 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green-dark text-white flex items-center justify-center shrink-0"><PhoneIcon /></div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-brand-green-dark">{settings.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green-dark text-white flex items-center justify-center shrink-0"><MailIcon /></div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-brand-green-dark">{settings.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-green-dark text-white flex items-center justify-center shrink-0"><PinIcon /></div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium text-brand-green-dark">{settings.address}</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border border-emerald-900/10 h-64">
            <iframe
              title="Location map"
              className="w-full h-full"
              loading="lazy"
              src={`https://www.google.com/maps?q=${encodeURIComponent(settings.address)}&output=embed`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
