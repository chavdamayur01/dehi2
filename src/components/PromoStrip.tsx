"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { DEHI_PRODUCT } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function PromoStrip() {
  return (
    <div className="relative z-20 bg-dehi-charcoal text-dehi-ivory py-3.5 px-4 overflow-hidden border-y border-dehi-gold/30">
      {/* Gold Shimmer Bar */}
      <div className="absolute inset-0 bg-gold-shimmer opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4 text-xs sm:text-sm font-medium tracking-wider">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-dehi-gold text-dehi-charcoal text-[11px] font-bold uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            15 AUGUST INDEPENDENCE DAY OFFER
          </span>

          <span className="text-dehi-ivory font-serif text-sm sm:text-base tracking-normal">
            Dehi Body Wash — <strong className="font-semibold text-dehi-gold">{formatPrice(DEHI_PRODUCT.price)}</strong>
          </span>

          <span className="text-dehi-ivory/50 line-through">
            MRP {formatPrice(DEHI_PRODUCT.mrp)}
          </span>

          <span className="text-emerald-400 font-semibold">
            Save {formatPrice(DEHI_PRODUCT.discount)}
          </span>
        </div>

        <Link
          href="/checkout"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-dehi-gold hover:text-white transition-colors uppercase tracking-widest group"
        >
          <span>Claim Offer</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
