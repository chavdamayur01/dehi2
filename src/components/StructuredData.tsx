import React from "react";
import { DEHI_PRODUCT } from "@/types";

export default function StructuredData() {
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: DEHI_PRODUCT.name,
    image: [
      "https://dehiindia.com/images/product.png",
      "https://dehiindia.com/images/productangel2.png",
      "https://dehiindia.com/images/productdifferntangle.png",
      "https://dehiindia.com/images/productangle4.png",
    ],
    description: DEHI_PRODUCT.description,
    sku: "DEHI-BW-200ML",
    brand: {
      "@type": "Brand",
      name: "Dehi",
    },
    manufacturer: {
      "@type": "Organization",
      name: "R I ENTERPRISE",
    },
    offers: {
      "@type": "Offer",
      url: "https://dehiindia.com",
      priceCurrency: "INR",
      price: DEHI_PRODUCT.price,
      priceValidUntil: "2027-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "R I ENTERPRISE",
      },
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dehi",
    legalName: "R I ENTERPRISE",
    url: "https://dehiindia.com",
    logo: "https://dehiindia.com/images/logo.png",
    email: "dehiindia0@gmail.com",
    sameAs: [
      "https://instagram.com/dehiindia",
      "https://facebook.com/dehiindia",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "dehiindia0@gmail.com",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
