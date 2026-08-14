"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { QUANTITY_PRICING } from "@/types";
import { formatPrice } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Product", href: "#product" },
  { name: "Benefits", href: "#benefits" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { quantity, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-dehi-ivory/95 backdrop-blur-md shadow-sm border-b border-dehi-gold/20 py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: Dehi Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-dehi-gold"
              aria-label="Dehi Home"
            >
              <div className="relative w-28 h-10 sm:w-32 sm:h-11 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo.png"
                  alt="Dehi Body Wash Logo"
                  fill
                  sizes="(max-width: 768px) 120px, 140px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* CENTER: Desktop Nav Links */}
            <nav
              className="hidden md:flex items-center gap-8 lg:gap-10"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="text-sm tracking-widest uppercase font-medium text-dehi-charcoal/80 hover:text-dehi-charcoal hover:text-gold-gradient transition-colors duration-200 relative group cursor-pointer"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-dehi-gold transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* RIGHT: Cart & Buy Now Button */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={openCart}
                className="relative p-2.5 rounded-full text-dehi-charcoal hover:text-dehi-gold hover:bg-dehi-cream/70 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-dehi-gold"
                aria-label={`Open Cart (${quantity} items)`}
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                {quantity > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-dehi-gold text-dehi-charcoal text-xs font-bold flex items-center justify-center shadow-sm"
                  >
                    {quantity}
                  </motion.span>
                )}
              </button>

              <Link
                href="/checkout"
                className="hidden sm:inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-dehi-charcoal text-dehi-ivory text-sm font-medium tracking-wide hover:bg-dehi-gold hover:text-dehi-charcoal shadow-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-dehi-gold"
              >
                <span>Buy Now</span>
                <span className="text-xs text-dehi-gold group-hover:text-dehi-charcoal">|</span>
                <span className="font-semibold">{formatPrice(QUANTITY_PRICING[1])}</span>
              </Link>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-dehi-charcoal hover:text-dehi-gold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dehi-gold"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Framer Motion Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-dehi-charcoal/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-dehi-ivory z-50 shadow-2xl p-6 flex flex-col justify-between md:hidden border-l border-dehi-gold/30"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-dehi-gold/20">
                  <div className="relative w-28 h-10">
                    <Image
                      src="/images/logo.png"
                      alt="Dehi Logo"
                      fill
                      sizes="120px"
                      className="object-contain object-left"
                    />
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-dehi-charcoal/70 hover:text-dehi-charcoal"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex flex-col gap-5 mt-8">
                  {NAV_LINKS.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleLinkClick(link.href)}
                      className="text-left text-lg font-serif tracking-wider text-dehi-charcoal hover:text-dehi-gold py-2 border-b border-dehi-gold/10 transition-colors flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 text-dehi-gold/50" />
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-dehi-gold/20 space-y-3">
                <Link
                  href="/checkout"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-dehi-charcoal text-dehi-ivory text-sm font-medium tracking-wide shadow-md hover:bg-dehi-gold hover:text-dehi-charcoal transition-colors"
                >
                  <span>Buy Now — {formatPrice(QUANTITY_PRICING[1])}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-center text-dehi-charcoal/60 tracking-wider">
                  Care for every Body • 200 mL
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
