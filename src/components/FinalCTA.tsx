"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { DEHI_PRODUCT } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-dehi-charcoal text-dehi-ivory relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dehi-gold/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: Text & Offer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dehi-gold/20 text-dehi-gold border border-dehi-gold/40 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              INDEPENDENCE DAY SPECIAL OFFER · 15 AUGUST
            </div>

            <h2 className="heading-section font-serif font-normal text-dehi-ivory mb-6">
              Bring Gentle Care Into Your Everyday Routine.
            </h2>

            <p className="text-base sm:text-lg text-dehi-ivory/80 font-light max-w-xl mb-8">
              Order today and experience the hydrating, sulfate-free comfort of Dehi Body Wash.
            </p>

            <div className="flex flex-wrap items-baseline gap-4 mb-8">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-dehi-gold">
                {formatPrice(DEHI_PRODUCT.price)}
              </span>
              <span className="text-lg text-dehi-ivory/50 line-through">
                {formatPrice(DEHI_PRODUCT.mrp)}
              </span>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Save {formatPrice(DEHI_PRODUCT.discount)}
              </span>
              <span className="text-sm text-dehi-ivory/70 ml-2">
                Size: {DEHI_PRODUCT.size}
              </span>
            </div>

            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-dehi-gold text-dehi-charcoal text-base font-semibold tracking-wide hover:bg-dehi-ivory hover:text-dehi-charcoal shadow-luxury-gold transition-all duration-300 transform hover:-translate-y-0.5 group"
            >
              <span>Buy Now — {formatPrice(DEHI_PRODUCT.price)}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* RIGHT: Product Presentation */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 sm:w-80 h-[360px] sm:h-[440px]">
              <Image
                src={DEHI_PRODUCT.images.differentAngle}
                alt="Dehi Body Wash Buy Now"
                fill
                sizes="(max-width: 768px) 260px, 340px"
                className="object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
