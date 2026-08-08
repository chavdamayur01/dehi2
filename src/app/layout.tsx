import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Toast from "@/components/Toast";
import CartDrawer from "@/components/CartDrawer";
import MobileStickyBar from "@/components/MobileStickyBar";
import StructuredData from "@/components/StructuredData";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dehiindia.com"),
  title: "Dehi Body Wash | Gentle Care. Everyday Freshness.",
  description:
    "Discover Dehi Body Wash — a sulfate-free, paraben-free body wash enriched with natural herbal ingredients for gentle everyday freshness.",
  keywords: [
    "Dehi Body Wash",
    "Dehi",
    "Indian Body Care",
    "Sulfate-Free Body Wash",
    "Herbal Shower Gel",
    "Gentle Skin Cleanser",
    "R I ENTERPRISE",
  ],
  authors: [{ name: "R I ENTERPRISE" }],
  creator: "R I ENTERPRISE",
  publisher: "R I ENTERPRISE",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dehiindia.com",
    siteName: "Dehi",
    title: "Dehi Body Wash | Gentle Care. Everyday Freshness.",
    description:
      "Experience a refreshing shower with Dehi Body Wash. Sulfate-free, paraben-free, and enriched with natural herbal ingredients.",
    images: [
      {
        url: "/images/product.png",
        width: 1200,
        height: 1200,
        alt: "Dehi Body Wash 200mL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dehi Body Wash | Gentle Care. Everyday Freshness.",
    description:
      "Experience a refreshing shower with Dehi Body Wash. Sulfate-free, paraben-free, and enriched with natural herbal ingredients.",
    images: ["/images/product.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  alternates: {
    canonical: "https://dehiindia.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF6F0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="font-sans antialiased selection:bg-dehi-gold-light/40">
        <CartProvider>
          <StructuredData />
          <Toast />
          <CartDrawer />
          {children}
          <MobileStickyBar />
        </CartProvider>
      </body>
    </html>
  );
}
