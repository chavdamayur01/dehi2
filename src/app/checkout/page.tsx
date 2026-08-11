"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  ShieldCheck,
  Plus,
  Minus,
  CheckCircle2,
  Lock,
  Truck,
  Sparkles,
  AlertCircle,
  Clock,
  X,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { ValidQuantity, QUANTITY_PRICING, getQuantityPricing } from "@/types";
import { formatPrice, validateEmail, validatePhone, validatePincode } from "@/lib/utils";

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface ConfirmedOrderState {
  orderId: string;
  quantity: number;
  totalPrice: number;
  customerName: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { product, quantity, updateQuantity, resetCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrderState | null>(null);

  const effectiveQty = (Math.max(1, Math.min(3, quantity > 0 ? quantity : 1))) as ValidQuantity;
  const pricing = getQuantityPricing(effectiveQty);
  const effectiveSubtotal = pricing.price;
  const effectiveMrp = effectiveQty * product.mrp;
  const effectiveSavings = effectiveMrp - effectiveSubtotal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your full name";
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.address.trim() || formData.address.trim().length < 6) {
      newErrors.address = "Please enter your complete delivery address";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!validatePincode(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit Indian PIN code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        quantity: effectiveQty,
      };

      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Unable to send your order right now. Please try again in a moment.");
      }

      // Success
      const orderSummary: ConfirmedOrderState = {
        orderId: data.orderNumber || data.orderId || `DEHI-${Date.now().toString().slice(-6)}`,
        quantity: data.quantity || effectiveQty,
        totalPrice: data.totalPrice || effectiveSubtotal,
        customerName: formData.fullName.trim(),
      };

      setConfirmedOrder(orderSummary);

      try {
        localStorage.setItem(
          "dehi_last_order",
          JSON.stringify({
            orderId: orderSummary.orderId,
            customer: formData,
            productName: product.name,
            size: product.size,
            quantity: orderSummary.quantity,
            total: orderSummary.totalPrice,
            timestamp: new Date().toISOString(),
          })
        );
      } catch {
        // Ignore
      }

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#C5A059", "#FAF6F0", "#3B4D3C"],
        });
      } catch {
        // Ignore
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unable to send your order right now. Please try again in a moment.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDone = () => {
    resetCart();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-dehi-ivory text-dehi-charcoal pb-24">
      {/* Checkout Top Bar */}
      <header className="sticky top-0 z-30 bg-dehi-ivory/95 backdrop-blur-md border-b border-dehi-gold/20 py-4 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-dehi-charcoal/75 hover:text-dehi-charcoal transition-colors group p-1"
              aria-label="Back to Store"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Store</span>
            </Link>

            <div className="h-4 w-[1px] bg-dehi-gold/30 hidden sm:block" />

            <Link href="/" className="relative w-24 h-8 sm:w-28 sm:h-9">
              <Image
                src="/images/logo.png"
                alt="Dehi"
                fill
                sizes="112px"
                className="object-contain object-left"
              />
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-xs tracking-wider">
            <span className="text-dehi-charcoal/40 hidden xs:inline">01 Cart</span>
            <span className="text-dehi-charcoal/30 hidden xs:inline">›</span>
            <span className="font-semibold text-dehi-charcoal flex items-center gap-1.5 px-3 py-1 rounded-full bg-dehi-gold/20 border border-dehi-gold/40">
              <span className="w-1.5 h-1.5 rounded-full bg-dehi-gold-dark animate-pulse" />
              02 Delivery Details & Confirmation
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-dehi-charcoal">
            Customer Details & Delivery
          </h1>
          <p className="text-xs sm:text-sm text-dehi-charcoal/60 mt-1 font-light">
            Enter your delivery information below to place your order directly with R I ENTERPRISE.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Customer Details Form (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* Card 1: Delivery Details */}
              <div className="p-6 sm:p-8 rounded-2xl bg-dehi-cream/60 border border-dehi-gold/30 shadow-luxury mb-6">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-dehi-gold/20">
                  <h2 className="font-serif text-xl text-dehi-charcoal flex items-center gap-2">
                    <span>1. Customer & Delivery Information</span>
                  </h2>
                  <span className="text-xs text-dehi-gold-dark font-medium uppercase tracking-wider">
                    Required
                  </span>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-dehi-charcoal/80 mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Aarav Sharma"
                      className={`w-full px-4 py-3 rounded-xl bg-dehi-ivory border text-sm text-dehi-charcoal placeholder-dehi-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dehi-gold/50 transition-all ${
                        errors.fullName ? "border-red-400 bg-red-50/30" : "border-dehi-gold/30"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone & Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-dehi-charcoal/80 mb-1.5"
                      >
                        Mobile Number *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3.5 text-xs text-dehi-charcoal/60 font-medium">
                          +91
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength={10}
                          placeholder="9876543210"
                          className={`w-full pl-12 pr-4 py-3 rounded-xl bg-dehi-ivory border text-sm text-dehi-charcoal placeholder-dehi-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dehi-gold/50 transition-all ${
                            errors.phone ? "border-red-400 bg-red-50/30" : "border-dehi-gold/30"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-dehi-charcoal/80 mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="aarav@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-dehi-ivory border text-sm text-dehi-charcoal placeholder-dehi-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dehi-gold/50 transition-all ${
                          errors.email ? "border-red-400 bg-red-50/30" : "border-dehi-gold/30"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-xs font-semibold uppercase tracking-wider text-dehi-charcoal/80 mb-1.5"
                    >
                      Flat / House No. / Street / Area *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Flat 402, Lotus Residency, MG Road"
                      className={`w-full px-4 py-3 rounded-xl bg-dehi-ivory border text-sm text-dehi-charcoal placeholder-dehi-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dehi-gold/50 transition-all ${
                        errors.address ? "border-red-400 bg-red-50/30" : "border-dehi-gold/30"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-red-600 mt-1">{errors.address}</p>
                    )}
                  </div>

                  {/* City, State, Pincode */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-xs font-semibold uppercase tracking-wider text-dehi-charcoal/80 mb-1.5"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Mumbai"
                        className={`w-full px-4 py-3 rounded-xl bg-dehi-ivory border text-sm text-dehi-charcoal placeholder-dehi-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dehi-gold/50 transition-all ${
                          errors.city ? "border-red-400 bg-red-50/30" : "border-dehi-gold/30"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-red-600 mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="block text-xs font-semibold uppercase tracking-wider text-dehi-charcoal/80 mb-1.5"
                      >
                        State *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Maharashtra"
                        className={`w-full px-4 py-3 rounded-xl bg-dehi-ivory border text-sm text-dehi-charcoal placeholder-dehi-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dehi-gold/50 transition-all ${
                          errors.state ? "border-red-400 bg-red-50/30" : "border-dehi-gold/30"
                        }`}
                      />
                      {errors.state && (
                        <p className="text-xs text-red-600 mt-1">{errors.state}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="pincode"
                        className="block text-xs font-semibold uppercase tracking-wider text-dehi-charcoal/80 mb-1.5"
                      >
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={6}
                        placeholder="400001"
                        className={`w-full px-4 py-3 rounded-xl bg-dehi-ivory border text-sm text-dehi-charcoal placeholder-dehi-charcoal/40 focus:outline-none focus:ring-2 focus:ring-dehi-gold/50 transition-all ${
                          errors.pincode ? "border-red-400 bg-red-50/30" : "border-dehi-gold/30"
                        }`}
                      />
                      {errors.pincode && (
                        <p className="text-xs text-red-600 mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Banner with Try Again */}
              {submitError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <div>
                      <p className="font-semibold">{submitError}</p>
                      <p className="text-red-700 font-light">Please check your details and try again.</p>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-full bg-dehi-charcoal hover:bg-dehi-gold hover:text-dehi-charcoal text-dehi-ivory text-base font-semibold tracking-wide shadow-luxury-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-75 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-dehi-ivory border-t-transparent rounded-full animate-spin" />
                    <span>Sending Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order — {formatPrice(effectiveSubtotal)}</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-dehi-cream/70 border border-dehi-gold/30 shadow-luxury">
                <h2 className="font-serif text-xl text-dehi-charcoal pb-4 mb-6 border-b border-dehi-gold/20">
                  Order Summary
                </h2>

                {/* Product details */}
                <div className="flex gap-4 pb-6 border-b border-dehi-gold/20">
                  <div className="relative w-20 h-24 rounded-xl bg-dehi-ivory border border-dehi-gold/20 p-2 shrink-0 flex items-center justify-center">
                    <Image
                      src={product.images.main}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-medium text-dehi-charcoal">
                        {product.name}
                      </h3>
                      <span className="text-xs text-dehi-charcoal/60">
                        Volume: {product.size}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-dehi-ivory rounded-full px-2.5 py-1 border border-dehi-gold/30">
                        <button
                          type="button"
                          onClick={() => updateQuantity(Math.max(effectiveQty - 1, 1))}
                          disabled={effectiveQty <= 1}
                          className="text-dehi-charcoal hover:text-dehi-gold p-0.5 disabled:opacity-40 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-dehi-charcoal">
                          {effectiveQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(Math.min(effectiveQty + 1, 3))}
                          disabled={effectiveQty >= 3}
                          className="text-dehi-charcoal hover:text-dehi-gold p-0.5 disabled:opacity-40 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-bold text-dehi-charcoal">
                          {formatPrice(effectiveSubtotal)}
                        </div>
                        {effectiveQty > 1 ? (
                          <div className="text-[11px] text-emerald-700 font-semibold">
                            Save {formatPrice(pricing.savings)}
                          </div>
                        ) : (
                          <div className="text-[11px] text-dehi-charcoal/50 line-through">
                            {formatPrice(effectiveMrp)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-6 text-xs text-dehi-charcoal/80">
                  <div className="flex justify-between">
                    <span>Item Price ({effectiveQty} unit{effectiveQty > 1 ? "s" : ""})</span>
                    <span>{formatPrice(effectiveSubtotal)}</span>
                  </div>

                  <div className="flex justify-between text-emerald-800 font-medium">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Special Launch Discount
                    </span>
                    <span>- {formatPrice(effectiveSavings)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-emerald-700 font-bold">FREE</span>
                  </div>

                  <div className="pt-4 border-t border-dehi-gold/20 flex justify-between items-baseline text-base font-serif font-bold text-dehi-charcoal">
                    <span>Total Amount</span>
                    <span className="text-xl text-dehi-charcoal">
                      {formatPrice(effectiveSubtotal)}
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-dehi-gold/20 space-y-2.5 text-xs text-dehi-charcoal/70">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-dehi-gold-dark shrink-0" />
                    <span>Dispatches directly from R I ENTERPRISE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-dehi-gold-dark shrink-0" />
                    <span>100% Genuine Indian Body Care Formula</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SUCCESS POPUP MODAL */}
      <AnimatePresence>
        {confirmedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dehi-charcoal/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-dehi-ivory rounded-3xl p-6 sm:p-8 shadow-2xl border border-dehi-gold/40 text-center my-auto z-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="success-title"
            >
              {/* Success Badge Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-dehi-gold/20 text-dehi-gold-dark flex items-center justify-center mx-auto mb-5 shadow-inner-gold">
                <CheckCircle2 className="w-10 h-10 text-dehi-gold-dark" />
              </div>

              {/* Status pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wider uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Order sent to Dehi</span>
              </div>

              {/* Heading */}
              <h2
                id="success-title"
                className="font-serif text-2xl sm:text-3xl text-dehi-charcoal mb-2 font-normal"
              >
                Order Request Received! 🎉
              </h2>

              <p className="text-sm text-dehi-charcoal/80 font-medium mb-1">
                Thank you for choosing Dehi Body Wash.
              </p>

              <p className="text-xs sm:text-sm text-dehi-charcoal/70 font-light max-w-sm mx-auto mb-6 leading-relaxed">
                Your order details have been successfully received.
                <br />
                <strong className="font-semibold text-dehi-charcoal">
                  Our team will contact you directly within 24 hours to confirm your order.
                </strong>
              </p>

              {/* Order Summary Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-dehi-cream/70 border border-dehi-gold/30 text-left mb-6 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-dehi-gold/20 text-xs">
                  <span className="text-dehi-charcoal/60 uppercase tracking-wider font-semibold">
                    Order Reference
                  </span>
                  <span className="font-mono font-bold text-dehi-charcoal">
                    {confirmedOrder.orderId}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium text-dehi-charcoal block">
                      Dehi Body Wash (200 mL)
                    </span>
                    <span className="text-xs text-dehi-charcoal/60">
                      Quantity: {confirmedOrder.quantity}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold font-serif text-base text-dehi-charcoal">
                      {formatPrice(confirmedOrder.totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-dehi-gold/20 flex items-center justify-between text-xs text-dehi-charcoal/70">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-dehi-gold-dark" />
                    Direct Manual Confirmation
                  </span>
                  <span className="text-emerald-700 font-medium">Free Shipping</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleDone}
                className="w-full py-3.5 px-8 rounded-full bg-dehi-charcoal hover:bg-dehi-gold hover:text-dehi-charcoal text-dehi-ivory text-sm font-semibold tracking-wide shadow-luxury transition-all duration-300 cursor-pointer"
              >
                Done
              </button>

              <p className="text-[11px] text-dehi-charcoal/50 mt-4">
                R I ENTERPRISE • &ldquo;Care for every Body&rdquo;
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
