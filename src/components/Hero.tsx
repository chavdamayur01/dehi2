"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Leaf, Droplets, Heart, ArrowRight } from "lucide-react";
import { DEHI_PRODUCT } from "@/types";
import { formatPrice } from "@/lib/utils";

const BADGES = [
  {
    icon: Sparkles,
    label: "Sulfate-Free",
    position: "top-8 -left-4 sm:-left-8",
    delay: 0.2,
  },
  {
    icon: Leaf,
    label: "Herbal Care",
    position: "top-1/4 -right-4 sm:-right-8",
    delay: 0.35,
  },
  {
    icon: Droplets,
    label: "Hydrating",
    position: "bottom-1/3 -left-4 sm:-left-6",
    delay: 0.5,
  },
  {
    icon: Heart,
    label: "Cruelty-Free",
    position: "bottom-8 -right-4 sm:-right-6",
    delay: 0.65,
  },
];

export default function Hero() {
  const scrollToProduct = () => {
    const el = document.getElementById("product");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Background with Ambient Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/home.png"
          alt="Dehi Natural Luxury Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 mix-blend-multiply filter contrast-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dehi-ivory/80 via-dehi-cream/70 to-dehi-ivory" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-dehi-gold/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: Editorial Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dehi-gold/15 border border-dehi-gold/40 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-dehi-gold-rich animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-dehi-charcoal uppercase">
                PROUDLY MADE IN INDIA
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="heading-hero font-serif font-normal text-dehi-charcoal tracking-tight mb-6">
              Gentle Care. <br />
              <span className="italic font-light text-dehi-brown">
                Everyday Freshness.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-dehi-charcoal/80 font-light leading-relaxed max-w-xl mb-8">
              {DEHI_PRODUCT.description}
            </p>

            {/* Price Area */}
            <div className="flex flex-wrap items-baseline gap-3 sm:gap-4 p-4 rounded-xl bg-dehi-cream/60 border border-dehi-gold/25 backdrop-blur-sm mb-8 w-full sm:w-auto">
              <div className="flex items-baseline gap-2">
                <span className="text-xs sm:text-sm text-dehi-charcoal/60 uppercase tracking-wider">
                  MRP
                </span>
                <span className="text-sm sm:text-base text-dehi-charcoal/50 line-through">
                  {formatPrice(DEHI_PRODUCT.mrp)}
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-serif font-semibold text-dehi-charcoal">
                {formatPrice(DEHI_PRODUCT.price)}
              </span>
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded-md bg-dehi-botanical/15 text-dehi-botanical border border-dehi-botanical/30">
                Save {formatPrice(DEHI_PRODUCT.discount)}
              </span>
              <span className="text-xs text-dehi-charcoal/60 font-medium ml-auto sm:ml-2">
                Size: {DEHI_PRODUCT.size}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-dehi-charcoal text-dehi-ivory text-base font-medium tracking-wide shadow-luxury-gold hover:bg-dehi-gold hover:text-dehi-charcoal transition-all duration-300 transform hover:-translate-y-0.5 group"
              >
                <span>Buy Now — {formatPrice(DEHI_PRODUCT.price)}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={scrollToProduct}
                className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-dehi-cream/80 text-dehi-charcoal text-base font-medium tracking-wide border border-dehi-gold/40 hover:bg-dehi-ivory hover:border-dehi-gold transition-all duration-200 cursor-pointer"
              >
                Explore Product
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Transparent Product with Floating Badges & Glow */}
          <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
            {/* Ambient Background Aura */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-dehi-gold/20 via-dehi-softcream to-transparent blur-2xl" />

            {/* Decorative Gold Circular Ring */}
            <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-dehi-gold/30 pointer-events-none" />
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-dashed border-dehi-gold/20 pointer-events-none animate-spin-slow" />

            {/* Floating Product Image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-64 sm:w-80 md:w-96 h-[380px] sm:h-[480px] md:h-[540px] z-10 flex items-center justify-center drop-shadow-2xl"
            >
              <Image
                src={DEHI_PRODUCT.images.main}
                alt="Dehi Body Wash 200mL Bottle and Packaging"
                fill
                priority
                sizes="(max-width: 768px) 280px, (max-width: 1200px) 380px, 420px"
                className="object-contain filter drop-shadow-[0_25px_35px_rgba(31,29,27,0.22)]"
              />
            </motion.div>

            {/* 4 Floating Feature Badges */}
            {BADGES.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: badge.delay }}
                  className={`absolute ${badge.position} z-20 hidden xs:flex items-center gap-2 px-3.5 py-2 rounded-full bg-dehi-ivory/95 backdrop-blur-md border border-dehi-gold/40 shadow-luxury hover:border-dehi-gold hover:scale-105 transition-all`}
                >
                  <div className="w-6 h-6 rounded-full bg-dehi-gold/15 flex items-center justify-center text-dehi-charcoal">
                    <Icon className="w-3.5 h-3.5 text-dehi-gold-dark" />
                  </div>
                  <span className="text-xs font-medium text-dehi-charcoal tracking-wide whitespace-nowrap">
                    {badge.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
