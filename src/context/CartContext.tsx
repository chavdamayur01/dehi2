"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { DEHI_PRODUCT, Product } from "@/types";

interface CartContextType {
  product: Product;
  quantity: number;
  isCartOpen: boolean;
  toastMessage: string | null;
  addToCart: (qty?: number) => void;
  updateQuantity: (qty: number) => void;
  removeFromCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  showToast: (message: string) => void;
  clearToast: () => void;
  subtotal: number;
  mrpTotal: number;
  savingsTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "dehi_cart_quantity_v1";

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
        if (!isNaN(parsed) && parsed > 0) {
          setQuantity(parsed);
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

  const addToCart = (qty = 1) => {
    setQuantity((prev) => Math.min(prev + qty, 10));
    showToast("Dehi Body Wash added to cart");
    setIsCartOpen(true);
  };

  const updateQuantity = (qty: number) => {
    if (qty <= 0) {
      setQuantity(0);
      showToast("Item removed from cart");
    } else {
      setQuantity(Math.min(qty, 10));
    }
  };

  const removeFromCart = () => {
    setQuantity(0);
    showToast("Item removed from cart");
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const subtotal = quantity * DEHI_PRODUCT.price;
  const mrpTotal = quantity * DEHI_PRODUCT.mrp;
  const savingsTotal = quantity * DEHI_PRODUCT.discount;

  return (
    <CartContext.Provider
      value={{
        product: DEHI_PRODUCT,
        quantity,
        isCartOpen,
        toastMessage,
        addToCart,
        updateQuantity,
        removeFromCart,
        openCart,
        closeCart,
        toggleCart,
        showToast,
        clearToast,
        subtotal,
        mrpTotal,
        savingsTotal,
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
