"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DEHI_PRODUCT, Product, ValidQuantity, QUANTITY_PRICING, getQuantityPricing } from "@/types";

interface CartContextType {
  product: Product;
  quantity: number;
  isCartOpen: boolean;
  toastMessage: string | null;
  addToCart: (qty?: number) => void;
  setOfferQuantity: (qty: ValidQuantity) => void;
  updateQuantity: (qty: number) => void;
  removeFromCart: () => void;
  resetCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  subtotal: number;
  mrpTotal: number;
  savingsTotal: number;
  bundleSavings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "dehi_cart_quantity_v2";

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 3) {
          setQuantity(parsed as ValidQuantity);
        }
      }
    } catch {
      // Ignore localstorage errors in restricted environments
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, quantity.toString());
      } catch {
        // Ignore
      }
    }
  }, [quantity, isHydrated]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 3500);
  };

  const clearToast = () => setToastMessage(null);

  const setOfferQuantity = (qty: ValidQuantity) => {
    const validQty = Math.max(1, Math.min(3, qty)) as ValidQuantity;
    setQuantity(validQty);
  };

  const addToCart = (qty = 1) => {
    const targetQty = Math.max(1, Math.min(3, qty)) as ValidQuantity;
    setQuantity(targetQty);
    showToast(`Added ${targetQty} × Dehi Body Wash to cart`);
    setIsCartOpen(true);
  };

  const updateQuantity = (qty: number) => {
    if (qty <= 0) {
      setQuantity(0);
      showToast("Item removed from cart");
    } else {
      const clamped = Math.max(1, Math.min(3, qty)) as ValidQuantity;
      setQuantity(clamped);
    }
  };

  const removeFromCart = () => {
    setQuantity(0);
    showToast("Item removed from cart");
  };

  const resetCart = () => {
    setQuantity(1);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  // Pricing calculations based on single source of truth
  const isNotEmpty = quantity > 0;
  const activeQty = (Math.max(1, Math.min(3, quantity || 1))) as ValidQuantity;
  const pricingInfo = getQuantityPricing(activeQty);
  const subtotal = isNotEmpty ? pricingInfo.price : 0;
  const mrpTotal = isNotEmpty ? activeQty * DEHI_PRODUCT.mrp : 0;
  const bundleSavings = isNotEmpty ? pricingInfo.savings : 0;
  const savingsTotal = isNotEmpty ? mrpTotal - subtotal : 0;

  return (
    <CartContext.Provider
      value={{
        product: DEHI_PRODUCT,
        quantity,
        isCartOpen,
        toastMessage,
        addToCart,
        setOfferQuantity,
        updateQuantity,
        removeFromCart,
        resetCart,
        openCart,
        closeCart,
        toggleCart,
        showToast,
        clearToast,
        subtotal,
        mrpTotal,
        savingsTotal,
        bundleSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
