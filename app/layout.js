import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { readDB } from "@/lib/db";

const display = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata() {
  const { settings } = readDB();
  const domain = settings?.domain ? `https://${settings.domain.replace(/^https?:\/\//, "")}` : "https://prefabpanelnepal.com";

  return {
    metadataBase: new URL(domain),
    title: {
      default: settings?.metaTitle || `${settings?.companyName || "Smart Prefab Panel"} | EPS & PUF Sandwich Panels & Prefab Homes Nepal`,
      template: `%s | ${settings?.companyName || "Smart Prefab Panel"}`,
    },
    description: settings?.metaDescription || settings?.aboutSummary,
    keywords: settings?.metaKeywords?.split(",").map((k) => k.trim()) || [
      "Smart Prefab Panel",
      "EPS Sandwich Panel Nepal",
      "PUF Panel Nepal",
      "Prefab House Price in Nepal",
      "Earthquake Resistant Building Nepal",
      "Prefabricated Construction Nepal",
    ],
    authors: [{ name: settings?.companyName || "Smart Prefab Panel Nepal" }],
    creator: settings?.companyName || "Smart Prefab Panel Nepal",
    publisher: settings?.companyName || "Smart Prefab Panel Nepal",
    formatDetection: { email: true, address: true, telephone: true },
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: settings?.metaTitle || settings?.companyName,
      description: settings?.metaDescription || settings?.aboutSummary,
      url: domain,
      siteName: settings?.companyName || "Smart Prefab Panel Nepal",
      images: [
        {
          url: settings?.ogImage || "/images/prefab-house.jpg",
          width: 1200,
          height: 630,
          alt: settings?.companyName || "Smart Prefab Panel Nepal",
        },
      ],
      locale: "en_NP",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings?.metaTitle || settings?.companyName,
      description: settings?.metaDescription || settings?.aboutSummary,
      images: [settings?.ogImage || "/images/prefab-house.jpg"],
    },
    verification: settings?.googleVerificationCode
      ? { google: settings.googleVerificationCode }
      : undefined,
  };
}

export default function RootLayout({ children }) {
  const { settings } = readDB();
  const domain = settings?.domain ? `https://${settings.domain.replace(/^https?:\/\//, "")}` : "https://prefabpanelnepal.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": settings?.companyName || "Smart Prefab Panel",
    "image": `${domain}${settings?.ogImage || "/images/prefab-house.jpg"}`,
    "@id": domain,
    "url": domain,
    "telephone": settings?.phone || "01-4111704 / 01-5929345",
    "email": settings?.email || "bigyan.neupane6@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings?.address || "Tinkune 32, Subidanagar",
      "addressLocality": "Kathmandu",
      "addressRegion": "Bagmati",
      "postalCode": "44600",
      "addressCountry": "NP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.6875,
      "longitude": 85.3486
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      settings?.facebook,
      settings?.instagram,
      settings?.twitter,
      settings?.youtube,
      settings?.tiktok
    ].filter(Boolean),
    "description": settings?.metaDescription || settings?.aboutSummary
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}

