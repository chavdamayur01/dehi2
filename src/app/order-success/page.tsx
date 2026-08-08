"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { CheckCircle2, ArrowRight, ShieldCheck, Mail, Package } from "lucide-react";
import { DEHI_PRODUCT } from "@/types";
import { formatPrice } from "@/lib/utils";

interface StoredOrder {
  orderId: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    pincode: string;
  };
  productName: string;
  size: string;
  quantity: number;
  total: number;
  paymentMethod: string;
  timestamp: string;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    // Fire subtle luxury confetti
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#C5A059", "#FAF6F0", "#3B4D3C"],
    });

    try {
      const saved = localStorage.getItem("dehi_last_order");
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch {
      // Ignore
    }
  }, []);

  const orderId = order?.orderId || "DEHI-884920";
  const qty = order?.quantity || 1;
  const total = order?.total || DEHI_PRODUCT.price;

  return (
    <div className="min-h-screen bg-dehi-ivory text-dehi-charcoal flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-3xl mx-auto w-full">
        {/* Brand Header */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="relative w-32 h-10">
            <Image
              src="/images/logo.png"
              alt="Dehi Body Wash"
              fill
              sizes="130px"
              className="object-contain"
            />
          </Link>
        </div>

        {/* Confirmation Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-dehi-cream/70 border border-dehi-gold/30 shadow-luxury text-center">
          {/* Animated Success Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-dehi-gold/20 text-dehi-gold-dark flex items-center justify-center mx-auto mb-6 shadow-inner-gold">
            <CheckCircle2 className="w-10 h-10 text-dehi-gold-dark" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-dehi-gold-dark block mb-2">
            Order Confirmed
          </span>

          <h1 className="heading-section font-serif font-normal text-dehi-charcoal mb-4">
            Thank you for choosing Dehi.
          </h1>

          <p className="text-sm sm:text-base text-dehi-charcoal/70 font-light max-w-md mx-auto mb-8">
            Your order for gentle everyday shower care has been received and registered under Order Reference{" "}
            <strong className="font-mono text-dehi-charcoal font-semibold">{orderId}</strong>.
          </p>

          {/* Receipt Breakdown Box */}
          <div className="p-6 rounded-2xl bg-dehi-ivory border border-dehi-gold/25 text-left mb-8 max-w-lg mx-auto">
            <div className="flex gap-4 pb-5 border-b border-dehi-gold/20">
              <div className="relative w-16 h-20 rounded-lg bg-dehi-cream/50 border border-dehi-gold/20 p-1 shrink-0 flex items-center justify-center">
                <Image
                  src={DEHI_PRODUCT.images.main}
                  alt={DEHI_PRODUCT.name}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-base font-medium text-dehi-charcoal">
                    {DEHI_PRODUCT.name}
                  </h3>
                  <p className="text-xs text-dehi-charcoal/60">
                    Volume: {DEHI_PRODUCT.size}
                  </p>
                </div>
                <div className="flex justify-between items-baseline text-xs">
                  <span className="text-dehi-charcoal/70">Quantity: {qty}</span>
                  <span className="font-bold text-dehi-charcoal text-sm">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2 text-xs text-dehi-charcoal/70">
              <div className="flex justify-between">
                <span>Shipping Status</span>
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" />
                  Preparing for Dispatch
                </span>
              </div>
              <div className="flex justify-between">
                <span>Direct Support</span>
                <a href="mailto:dehiindia0@gmail.com" className="text-dehi-gold-dark hover:underline">
                  dehiindia0@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Return CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-dehi-charcoal hover:bg-dehi-gold hover:text-dehi-charcoal text-dehi-ivory text-sm font-semibold tracking-wide shadow-md transition-all duration-300 group"
            >
              <span>Return to Store</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-dehi-gold/20 flex items-center justify-center gap-2 text-xs text-dehi-charcoal/60">
            <ShieldCheck className="w-4 h-4 text-dehi-gold-dark" />
            <span>R I ENTERPRISE • Dehi India Official Store</span>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-dehi-charcoal/50 mt-12">
        © 2026 R I ENTERPRISE. All rights reserved. • Dehi – Care for Every Body.
      </footer>
    </div>
  );
}
