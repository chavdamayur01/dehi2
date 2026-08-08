"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Building,
  Plus,
  Minus,
  CheckCircle2,
  Lock,
  Truck,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
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

export default function CheckoutPage() {
  const router = useRouter();
  const { product, quantity, updateQuantity, subtotal, savingsTotal } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiProvider, setUpiProvider] = useState<string>("gpay");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const effectiveQty = quantity > 0 ? quantity : 1;
  const effectiveSubtotal = effectiveQty * product.price;
  const effectiveMrp = effectiveQty * product.mrp;
  const effectiveSavings = effectiveQty * product.discount;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(firstErrorField);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      orderId: `DEHI-${Date.now().toString().slice(-6)}`,
      customer: formData,
      productName: product.name,
      size: product.size,
      quantity: effectiveQty,
      total: effectiveSubtotal,
      paymentMethod,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem("dehi_last_order", JSON.stringify(orderData));
    } catch {
      // Ignore
    }

    setTimeout(() => {
      router.push("/order-success");
    }, 900);
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
              aria-label="Back to Cart"
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
            <span className="font-semibold text-dehi-charcoal flex items-center gap-1 px-2.5 py-1 rounded-full bg-dehi-gold/20 border border-dehi-gold/40">
              <span className="w-1.5 h-1.5 rounded-full bg-dehi-gold-dark" />
              02 Details
            </span>
            <span className="text-dehi-charcoal/30 hidden xs:inline">›</span>
            <span className="text-dehi-charcoal/40 hidden xs:inline">03 Payment</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-dehi-charcoal">
            Secure Checkout
          </h1>
          <p className="text-xs sm:text-sm text-dehi-charcoal/60 mt-1 font-light">
            Fast, encrypted single-product checkout with pan-India dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: Customer Details & Payment Selector (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handleSubmit} noValidate>
              {/* Card 1: Delivery Details */}
              <div className="p-6 sm:p-8 rounded-2xl bg-dehi-cream/60 border border-dehi-gold/30 shadow-luxury mb-8">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-dehi-gold/20">
                  <h2 className="font-serif text-xl text-dehi-charcoal flex items-center gap-2">
                    <span>1. Customer & Shipping Details</span>
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

              {/* Card 2: Modular Payment Method Selector */}
              <div className="p-6 sm:p-8 rounded-2xl bg-dehi-cream/60 border border-dehi-gold/30 shadow-luxury mb-8">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-dehi-gold/20">
                  <h2 className="font-serif text-xl text-dehi-charcoal flex items-center gap-2">
                    <span>2. Select Payment Method</span>
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-Bit SSL</span>
                  </div>
                </div>

                {/* Method Options */}
                <div className="space-y-3 mb-6">
                  {/* UPI Option */}
                  <label
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "upi"
                        ? "bg-dehi-ivory border-dehi-gold ring-1 ring-dehi-gold shadow-sm"
                        : "bg-dehi-ivory/50 border-dehi-gold/20 hover:border-dehi-gold/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "upi"}
                        onChange={() => setPaymentMethod("upi")}
                        className="accent-dehi-gold w-4 h-4"
                      />
                      <Smartphone className="w-5 h-5 text-dehi-gold-dark" />
                      <div>
                        <div className="text-sm font-semibold text-dehi-charcoal">
                          UPI (Instant & Recommended)
                        </div>
                        <div className="text-xs text-dehi-charcoal/60">
                          Google Pay, PhonePe, Paytm, BHIM & Any UPI ID
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      FAST
                    </span>
                  </label>

                  {paymentMethod === "upi" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pl-8 pr-2 py-2 flex flex-wrap gap-2"
                    >
                      {["gpay", "phonepe", "paytm", "bhim"].map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiProvider(app)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase border transition-all ${
                            upiProvider === app
                              ? "bg-dehi-charcoal text-dehi-ivory border-dehi-charcoal"
                              : "bg-dehi-ivory text-dehi-charcoal border-dehi-gold/30 hover:border-dehi-gold"
                          }`}
                        >
                          {app === "gpay"
                            ? "Google Pay"
                            : app === "phonepe"
                            ? "PhonePe"
                            : app === "paytm"
                            ? "Paytm"
                            : "BHIM UPI"}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  {/* Card Option */}
                  <label
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "bg-dehi-ivory border-dehi-gold ring-1 ring-dehi-gold shadow-sm"
                        : "bg-dehi-ivory/50 border-dehi-gold/20 hover:border-dehi-gold/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="accent-dehi-gold w-4 h-4"
                      />
                      <CreditCard className="w-5 h-5 text-dehi-gold-dark" />
                      <div>
                        <div className="text-sm font-semibold text-dehi-charcoal">
                          Credit / Debit Card
                        </div>
                        <div className="text-xs text-dehi-charcoal/60">
                          Visa, Mastercard, RuPay, Maestro
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Net Banking Option */}
                  <label
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "netbanking"
                        ? "bg-dehi-ivory border-dehi-gold ring-1 ring-dehi-gold shadow-sm"
                        : "bg-dehi-ivory/50 border-dehi-gold/20 hover:border-dehi-gold/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === "netbanking"}
                        onChange={() => setPaymentMethod("netbanking")}
                        className="accent-dehi-gold w-4 h-4"
                      />
                      <Building className="w-5 h-5 text-dehi-gold-dark" />
                      <div>
                        <div className="text-sm font-semibold text-dehi-charcoal">
                          Net Banking
                        </div>
                        <div className="text-xs text-dehi-charcoal/60">
                          All Indian Major Banks Supported
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="p-3.5 rounded-xl bg-dehi-ivory/80 border border-dehi-gold/20 text-xs text-dehi-charcoal/70 flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-dehi-gold-dark shrink-0" />
                  <span>
                    Gateway integration ready. Payment will be processed securely on the next step.
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-full bg-dehi-charcoal hover:bg-dehi-gold hover:text-dehi-charcoal text-dehi-ivory text-base font-semibold tracking-wide shadow-luxury-lg transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-75 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-dehi-ivory border-t-transparent rounded-full animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Continue to Payment — {formatPrice(effectiveSubtotal)}</span>
                    <Lock className="w-4 h-4" />
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
                          className="text-dehi-charcoal hover:text-dehi-gold p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-dehi-charcoal">
                          {effectiveQty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(Math.min(effectiveQty + 1, 10))}
                          className="text-dehi-charcoal hover:text-dehi-gold p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-bold text-dehi-charcoal">
                          {formatPrice(effectiveSubtotal)}
                        </div>
                        <div className="text-[11px] text-dehi-charcoal/50 line-through">
                          {formatPrice(effectiveMrp)}
                        </div>
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
    </div>
  );
}
