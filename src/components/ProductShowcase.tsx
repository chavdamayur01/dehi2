"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, Check } from "lucide-react";
import { DEHI_PRODUCT, QUANTITY_OFFERS, ValidQuantity, getQuantityPricing } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const ANGLES = [
  { id: "main", src: DEHI_PRODUCT.images.main, label: "Front View" },
  { id: "angle2", src: DEHI_PRODUCT.images.angle2, label: "Side Angle" },
  { id: "differentAngle", src: DEHI_PRODUCT.images.differentAngle, label: "Detail Angle" },
];

export default function ProductShowcase() {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0);
  const [selectedQty, setSelectedQty] = useState<ValidQuantity>(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const { addToCart } = useCart();

  const activePricing = getQuantityPricing(selectedQty);

  const handleAddToCart = () => {
    addToCart(selectedQty);
  };

  return (
    <section id="product" className="py-20 lg:py-28 bg-dehi-softcream/60 relative overflow-hidden">
      {/* Subtle Botanical / Gold background decorative blurs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-dehi-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-dehi-botanical/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-dehi-gold-dark block mb-2">
            Signature Creation
          </span>
          <h2 className="heading-section font-serif font-normal text-dehi-charcoal mb-4">
            Meet Dehi Body Wash
          </h2>
          <p className="text-base sm:text-lg text-dehi-charcoal/70 font-light">
            {DEHI_PRODUCT.shortDescription}
          </p>
          <div className="w-16 h-0.5 bg-dehi-gold mx-auto mt-6" />
        </div>

        {/* 2-Column Product Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Multi-Angle Interactive Gallery */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Main Interactive Stage with Decorative Gold Frame */}
            <div
              className="relative w-full max-w-md h-[400px] sm:h-[480px] flex items-center justify-center cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              {/* Gold Decorative Corner Lines */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-dehi-gold/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-dehi-gold/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-dehi-gold/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-dehi-gold/40" />

              {/* Ambient radial glow */}
              <div className="absolute inset-0 bg-radial from-dehi-cream to-transparent opacity-80 rounded-2xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAngleIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: 1,
                    scale: isZoomed ? 1.08 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full p-6 flex items-center justify-center"
                >
                  <Image
                    src={ANGLES[activeAngleIndex].src}
                    alt={`Dehi Body Wash - ${ANGLES[activeAngleIndex].label}`}
                    fill
                    sizes="(max-width: 768px) 320px, 450px"
                    className="object-contain filter drop-shadow-[0_20px_30px_rgba(31,29,27,0.18)]"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex items-center gap-4 mt-6">
              {ANGLES.map((angle, idx) => (
                <button
                  key={angle.id}
                  onClick={() => setActiveAngleIndex(idx)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 p-2 rounded-xl border transition-all duration-200 bg-dehi-ivory/80 cursor-pointer ${
                    activeAngleIndex === idx
                      ? "border-dehi-gold shadow-luxury-gold ring-1 ring-dehi-gold"
                      : "border-dehi-gold/30 opacity-70 hover:opacity-100 hover:border-dehi-gold/60"
                  }`}
                  aria-label={`View ${angle.label}`}
                >
                  <Image
                    src={angle.src}
                    alt={angle.label}
                    fill
                    sizes="96px"
                    className="object-contain p-1"
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-dehi-charcoal/50 tracking-wider uppercase mt-2">
              Hover to zoom • Click angle to view
            </p>
          </div>

          {/* RIGHT: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-dehi-gold-dark mb-2">
              PREMIUM EVERYDAY BODY CARE
            </span>

            <h3 className="text-3xl sm:text-4xl font-serif text-dehi-charcoal mb-3">
              {DEHI_PRODUCT.name}
            </h3>

            <p className="text-sm font-medium text-dehi-brown mb-4">
              Size: {DEHI_PRODUCT.size}
            </p>

            <p className="text-base text-dehi-charcoal/80 font-light leading-relaxed mb-6">
              {DEHI_PRODUCT.description}
            </p>

            {/* Price & Quantity Offer Box */}
            <div className="w-full p-5 sm:p-6 rounded-2xl bg-dehi-ivory border border-dehi-gold/30 shadow-luxury mb-8">
              {/* Header Price Info */}
              <div className="flex items-baseline justify-between mb-5 pb-4 border-b border-dehi-gold/20">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-dehi-charcoal">
                    {formatPrice(activePricing.price)}
                  </span>
                  {selectedQty === 1 ? (
                    <span className="text-base text-dehi-charcoal/50 line-through">
                      {formatPrice(DEHI_PRODUCT.mrp)}
                    </span>
                  ) : (
                    <span className="text-base text-dehi-charcoal/50 line-through">
                      {formatPrice(activePricing.baseTotal)}
                    </span>
                  )}
                </div>
                {selectedQty > 1 ? (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-dehi-botanical/15 text-dehi-botanical border border-dehi-botanical/30">
                    Save {formatPrice(activePricing.savings)}
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-dehi-botanical/15 text-dehi-botanical border border-dehi-botanical/30">
                    Save {formatPrice(DEHI_PRODUCT.discount)}
                  </span>
                )}
              </div>

              {/* Quantity Offers Selector */}
              <div className="space-y-3 mb-6">
                <span className="block text-xs font-bold uppercase tracking-wider text-dehi-charcoal/80">
                  Choose Your Quantity
                </span>

                <div className="grid grid-cols-1 gap-2.5">
                  {QUANTITY_OFFERS.map((offer) => {
                    const isSelected = selectedQty === offer.quantity;
                    return (
                      <button
                        key={offer.quantity}
                        type="button"
                        onClick={() => setSelectedQty(offer.quantity)}
                        className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-dehi-softcream border-dehi-gold shadow-luxury-gold ring-1 ring-dehi-gold"
                            : "bg-dehi-ivory/80 border-dehi-gold/25 hover:border-dehi-gold/50 hover:bg-dehi-softcream/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
                              isSelected
                                ? "border-dehi-gold-dark bg-dehi-gold-dark"
                                : "border-dehi-gold/50 bg-dehi-ivory"
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-dehi-ivory" />}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-dehi-charcoal block">
                              {offer.title}
                            </span>
                            <span className="text-xs text-dehi-charcoal/60">
                              {offer.quantity === 1
                                ? "Single Bottle (200 mL)"
                                : `${offer.quantity} × Dehi Body Wash (200 mL)`}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-sm font-bold text-dehi-charcoal">
                            {formatPrice(offer.price)}
                          </div>
                          {offer.savingsLabel ? (
                            <span className="text-[11px] font-bold text-emerald-700 block">
                              {offer.savingsLabel}
                            </span>
                          ) : (
                            <span className="text-[11px] text-dehi-charcoal/50 block">
                              Base Price
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-dehi-cream hover:bg-dehi-ivory text-dehi-charcoal text-sm font-medium border border-dehi-gold/50 shadow-sm transition-all duration-200 group cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-dehi-gold-dark group-hover:scale-110 transition-transform" />
                  <span>Add to Cart</span>
                </button>

                <Link
                  href="/checkout"
                  onClick={() => addToCart(selectedQty)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-dehi-charcoal hover:bg-dehi-gold hover:text-dehi-charcoal text-dehi-ivory text-sm font-medium shadow-md transition-all duration-200 group"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Launch Badges */}
            <div className="grid grid-cols-2 gap-4 w-full text-xs text-dehi-charcoal/70">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dehi-ivory/60 border border-dehi-gold/20">
                <Truck className="w-4 h-4 text-dehi-gold-dark shrink-0" />
                <span>Pan-India Fast Dispatch</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dehi-ivory/60 border border-dehi-gold/20">
                <ShieldCheck className="w-4 h-4 text-dehi-gold-dark shrink-0" />
                <span>100% Genuine Formula</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
