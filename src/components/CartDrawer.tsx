"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    product,
    quantity,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    mrpTotal,
    savingsTotal,
    addToCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-dehi-charcoal/60 backdrop-blur-sm z-50 transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-dehi-ivory z-50 shadow-2xl flex flex-col justify-between border-l border-dehi-gold/30"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-dehi-gold/20">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-dehi-gold-dark" />
                <h2 className="text-lg font-serif font-medium text-dehi-charcoal">
                  Your Cart
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-dehi-gold/20 font-bold text-dehi-charcoal">
                  {quantity}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-dehi-charcoal/60 hover:text-dehi-charcoal rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {quantity > 0 ? (
                <div className="space-y-6">
                  {/* Single Product Card */}
                  <div className="flex gap-4 p-4 rounded-xl bg-dehi-cream/70 border border-dehi-gold/25 relative">
                    <div className="relative w-20 h-24 bg-dehi-ivory rounded-lg border border-dehi-gold/20 p-2 shrink-0 flex items-center justify-center">
                      <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-serif text-base font-medium text-dehi-charcoal">
                            {product.name}
                          </h3>
                          <span className="text-xs text-dehi-charcoal/60 block">
                            Size: {product.size}
                          </span>
                        </div>
                        <button
                          onClick={removeFromCart}
                          className="text-dehi-charcoal/40 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-dehi-ivory rounded-full px-2.5 py-1 border border-dehi-gold/30">
                          <button
                            onClick={() => updateQuantity(quantity - 1)}
                            className="text-dehi-charcoal hover:text-dehi-gold p-0.5"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-dehi-charcoal">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(quantity + 1)}
                            className="text-dehi-charcoal hover:text-dehi-gold p-0.5"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-bold text-dehi-charcoal">
                            {formatPrice(subtotal)}
                          </div>
                          <div className="text-[11px] text-dehi-charcoal/50 line-through">
                            {formatPrice(mrpTotal)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Savings banner */}
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between font-medium">
                    <span>Special Launch Offer applied</span>
                    <span className="font-bold">Save {formatPrice(savingsTotal)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-dehi-charcoal/60 p-2">
                    <ShieldCheck className="w-4 h-4 text-dehi-gold-dark" />
                    <span>Free shipping included with launch orders</span>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-dehi-gold/15 flex items-center justify-center text-dehi-charcoal mb-4">
                    <ShoppingBag className="w-7 h-7 text-dehi-gold-dark" />
                  </div>
                  <h3 className="font-serif text-lg text-dehi-charcoal mb-2">
                    Your cart is currently empty
                  </h3>
                  <p className="text-xs text-dehi-charcoal/60 max-w-xs mb-6 font-light">
                    Add Dehi Body Wash to begin your gentle everyday shower routine.
                  </p>
                  <button
                    onClick={() => addToCart(1)}
                    className="px-6 py-2.5 rounded-full bg-dehi-charcoal text-dehi-ivory text-xs font-semibold hover:bg-dehi-gold hover:text-dehi-charcoal transition-colors"
                  >
                    Add Dehi Body Wash — {formatPrice(product.price)}
                  </button>
                </div>
              )}
            </div>

            {/* Footer with Checkout CTA */}
            {quantity > 0 && (
              <div className="p-5 border-t border-dehi-gold/20 bg-dehi-cream/50 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-dehi-charcoal/70 text-xs">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-dehi-charcoal/70 text-xs">
                    <span>Launch Savings</span>
                    <span className="text-emerald-700 font-medium">- {formatPrice(savingsTotal)}</span>
                  </div>
                  <div className="flex justify-between text-dehi-charcoal/70 text-xs">
                    <span>Estimated Shipping</span>
                    <span className="text-emerald-700 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-dehi-charcoal pt-2 border-t border-dehi-gold/20">
                    <span>Total Amount</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-dehi-charcoal hover:bg-dehi-gold hover:text-dehi-charcoal text-dehi-ivory text-sm font-semibold tracking-wide shadow-luxury transition-all duration-300 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <p className="text-[11px] text-center text-dehi-charcoal/50">
                  Encrypted 256-bit Indian payment gateway checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
