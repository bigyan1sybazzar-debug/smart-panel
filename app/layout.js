import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import { readDB } from "@/lib/db";
import Script from "next/script";

export const dynamic = "force-dynamic";

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
            default: settings?.metaTitle || "Smart Panel Nepal | Prefab Panel Nepal Pvt. Ltd. | The Smart Way to Build",
            template: `%s | ${settings?.companyName || "Smart Panel"} Nepal`,
        },
        description: settings?.metaDescription || settings?.aboutSummary,
        keywords: settings?.metaKeywords?.split(",").map((k) => k.trim()) || [
            "Smart Panel Nepal",
            "Prefab Panel Nepal Pvt. Ltd.",
            "Smart Sandwich Panel",
            "Smart Solid Panel",
            "Smart EPS Block",
            "Prefab House Price in Nepal",
            "Government District Rate List Nepal",
            "Earthquake Resistant Building Nepal",
        ],
        authors: [
            { name: settings?.companyName || "Smart Panel Nepal" },
            { name: settings?.legalName || "Prefab Panel Nepal Pvt. Ltd." }
        ],
        creator: settings?.companyName || "Smart Panel Nepal",
        publisher: settings?.legalName || "Prefab Panel Nepal Pvt. Ltd.",
        formatDetection: { email: true, address: true, telephone: true },
        alternates: {
            canonical: "/",
        },
        openGraph: {
            title: settings?.metaTitle || "Smart Panel Nepal | The Smart Way to Build",
            description: settings?.metaDescription || settings?.aboutSummary,
            url: domain,
            siteName: "Smart Panel Nepal (Prefab Panel Nepal Pvt. Ltd.)",
            images: [
                {
                    url: settings?.ogImage || "/images/prefab-house.jpg",
                    width: 1200,
                    height: 630,
                    alt: "Smart Panel Nepal - The Smart Way to Build",
                },
            ],
            locale: "en_NP",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: settings?.metaTitle || "Smart Panel Nepal | The Smart Way to Build",
            description: settings?.metaDescription || settings?.aboutSummary,
            images: [settings?.ogImage || "/images/prefab-house.jpg"],
        },
        icons: {
            icon: [
                { url: "/images/logo-icon.png" },
                { url: "/favicon.ico" }
            ],
            shortcut: "/images/logo-icon.png",
            apple: "/images/logo-icon.png",
        },
        verification: settings?.googleVerificationCode
            ? { google: settings.googleVerificationCode }
            : undefined,
    };
}

export default function RootLayout({ children }) {
    const { settings, servicesList = [] } = readDB();
    const domain = settings?.domain ? `https://${settings.domain.replace(/^https?:\/\//, "")}` : "https://prefabpanelnepal.com";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "Organization"],
        "name": "Smart Panel",
        "legalName": "Prefab Panel Nepal Pvt. Ltd.",
        "slogan": "The Smart Way to Build",
        "image": `${domain}${settings?.ogImage || "/images/prefab-house.jpg"}`,
        "@id": domain,
        "url": domain,
        "telephone": ["+977-9851149804", "+977-9709084173"],
        "email": settings?.email || "info@prefabpanelnepal.com",
        "priceRange": "NPR 191 - 495 / sq. ft.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Pepsicola-32, Madhyapur Thimi",
            "addressLocality": "Madhyapur Thimi, Kathmandu Valley",
            "addressRegion": "Bagmati",
            "addressCountry": "NP"
        },
        "location": [
            {
                "@type": "Place",
                "name": "Smart Panel Corporate Headquarters",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Pepsicola-32, Madhyapur Thimi",
                    "addressLocality": "Kathmandu Valley",
                    "addressCountry": "NP"
                }
            },
            {
                "@type": "Place",
                "name": "Smart Panel Manufacturing Plant",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Darai Tole-8, Bharatpur",
                    "addressLocality": "Chitwan",
                    "addressCountry": "NP"
                }
            }
        ],
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
            settings?.facebook || "https://facebook.com/smartpanelnepal",
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
                <link rel="icon" type="image/png" href="/images/logo-icon.png" />
                <link rel="apple-touch-icon" href="/images/logo-icon.png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className="font-sans overflow-x-hidden">
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-HCV8C3MX6H"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-HCV8C3MX6H');
                    `}
                </Script>
                <Header settings={settings} servicesList={servicesList} />
                <main>{children}</main>
                <Footer settings={settings} />
                <WhatsAppWidget settings={settings} />
            </body>
        </html>
    );
}
