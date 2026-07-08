import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CursorContextProvider } from "@/components/cursor";
import PageTransitionEffect from "@/components/transition";
import { WithContext, Organization } from "schema-dts";
import { GoogleTagManager } from "@next/third-parties/google";
// import { Header } from "@/components/header";
// import { PageTransition } from "@/components/transition";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "allora co",
  description:
    "somos catalisadores que impulsionam os negócios dos nossos clientes",
};

const jsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Allora Company",
  alternateName: ["Allora Co", "Allora Results Club", "Allora"],
  url: "https://alloracompany.com",
  description:
    "allora results club - somos catalisadores que impulsionam os negócios dos nossos clientes",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Presidente Kennedy, 815, Salas 4 e 6",
    addressLocality: "São José",
    addressRegion: "SC",
    postalCode: "88101-001",
    addressCountry: "BR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55 11 94772-6952",
    contactType: "customer service",
    areaServed: "BR",
    availableLanguage: ["Portuguese"],
  },
  sameAs: [
    "https://instagram.com/alloracompany",
    "https://linkedin.com/company/alloracompany",
  ],
  founder: {
    "@type": "Person",
    name: "Pedro Pierotti",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CursorContextProvider>
      <html lang="en">
        <GoogleTagManager gtmId="GTM-K9NH8K63" />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
          <PageTransitionEffect>{children}</PageTransitionEffect>
        </body>
      </html>
    </CursorContextProvider>
  );
}
