import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PromoStrip from "@/components/PromoStrip";
import ProductShowcase from "@/components/ProductShowcase";
import Benefits from "@/components/Benefits";
import WhyDehi from "@/components/WhyDehi";
import CareForEveryBody from "@/components/CareForEveryBody";
import IndiaBrandStory from "@/components/IndiaBrandStory";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dehi-ivory text-dehi-charcoal flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PromoStrip />
        <ProductShowcase />
        <Benefits />
        <WhyDehi />
        <CareForEveryBody />
        <IndiaBrandStory />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
