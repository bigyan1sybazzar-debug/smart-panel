import { notFound } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ServiceImageGallery from "@/components/ServiceImageGallery";
import { readDB } from "@/lib/db";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export function generateMetadata({ params }) {
  const { servicesList, settings } = readDB();
  const service = servicesList.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found" };

  const companyName = settings?.companyName || "Smart Prefab Panel";
  const primaryImage = (Array.isArray(service.images) && service.images.length > 0)
    ? service.images[0]
    : (service.image || "/images/prefab-house.webp");

  return {
    title: `${service.name} in Nepal | ${companyName}`,
    description: service.summary || service.content?.substring(0, 160),
    keywords: [`${service.name} Nepal`, `Prefab ${service.name}`, "Smart Prefab Panel", "Nepal Prefabricated Construction"],
    openGraph: {
      title: `${service.name} in Nepal | ${companyName}`,
      description: service.summary,
      images: [primaryImage],
    },
  };
}

export default function ServiceDetailPage({ params }) {
  const { servicesList, settings } = readDB();
  const service = servicesList.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const others = servicesList.filter((s) => s.slug !== params.slug);
  const images = Array.isArray(service.images) && service.images.length > 0
    ? service.images
    : (service.image ? [service.image] : []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.summary,
    "provider": {
      "@type": "LocalBusiness",
      "name": settings?.companyName || "Smart Prefab Panel",
      "telephone": settings?.phone || "01-4111704"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nepal"
    }
  };

  return (
    <div>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <PageHero crumb="Services" title={service.name} subtitle={service.summary} />
      <div className="container-page py-16 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-6">
          <ServiceImageGallery images={images} serviceName={service.name} />
          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">{service.content}</p>
          <div className="pt-4">
            <Link href="/contact" className="btn-primary">Request a Quote &rarr;</Link>
          </div>
        </div>
        <div>
          <h3 className="font-display font-bold text-brand-blue-dark mb-4 text-lg">Other Services</h3>
          <ul className="space-y-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="block bg-brand-cream/80 rounded-lg px-4 py-3 text-sm font-medium text-gray-800 hover:bg-brand-blue hover:text-white transition-colors">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

