"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Toast() {
  const { toastMessage, clearToast } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -15, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-dehi-charcoal/95 text-dehi-ivory backdrop-blur-md rounded-lg shadow-luxury-lg border border-dehi-gold/30"
          role="status"
          aria-live="polite"
        >
          <div className="w-6 h-6 rounded-full bg-dehi-gold/20 flex items-center justify-center text-dehi-gold">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <p className="text-sm font-medium tracking-wide">{toastMessage}</p>
          <button
            onClick={clearToast}
            className="ml-2 text-dehi-ivory/60 hover:text-dehi-ivory transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
