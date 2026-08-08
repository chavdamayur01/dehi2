"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DEHI_PRODUCT } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        if (rect.bottom < 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-dehi-ivory/95 backdrop-blur-lg border-t border-dehi-gold/30 shadow-2xl py-3 px-4 sm:hidden safe-bottom-padding"
        >
          <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
            <div>
              <div className="text-xs font-semibold text-dehi-charcoal">
                {DEHI_PRODUCT.name}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold text-dehi-charcoal">
                  {formatPrice(DEHI_PRODUCT.price)}
                </span>
                <span className="text-[11px] text-dehi-charcoal/50 line-through">
                  {formatPrice(DEHI_PRODUCT.mrp)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-dehi-charcoal text-dehi-ivory text-xs font-semibold tracking-wide hover:bg-dehi-gold hover:text-dehi-charcoal transition-colors shadow-md"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
