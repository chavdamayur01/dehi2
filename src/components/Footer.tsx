"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Instagram, Facebook, ArrowUpRight, ShieldCheck } from "lucide-react";
import { DEHI_PRODUCT } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-dehi-charcoal text-dehi-ivory border-t border-dehi-gold/30 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-dehi-gold/20">
          {/* Col 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="relative w-36 h-12 mb-4">
              <Image
                src="/images/logo.png"
                alt="Dehi Body Wash"
                fill
                sizes="144px"
                className="object-contain object-left filter brightness-110"
              />
            </div>
            <p className="font-serif italic text-lg text-dehi-gold mb-3">
              &ldquo;Care for every Body&rdquo;
            </p>
            <p className="text-xs text-dehi-ivory/70 font-light leading-relaxed mb-6 max-w-sm">
              Conscious Indian body care formulated without harsh sulfates or parabens. Gentle cleansing crafted for everyday Indian routines.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/dehiindia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dehi-charcoal-light border border-dehi-gold/30 flex items-center justify-center text-dehi-gold hover:bg-dehi-gold hover:text-dehi-charcoal transition-colors"
                aria-label="Dehi Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/dehiindia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dehi-charcoal-light border border-dehi-gold/30 flex items-center justify-center text-dehi-gold hover:bg-dehi-gold hover:text-dehi-charcoal transition-colors"
                aria-label="Dehi Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:dehiindia0@gmail.com"
                className="w-9 h-9 rounded-full bg-dehi-charcoal-light border border-dehi-gold/30 flex items-center justify-center text-dehi-gold hover:bg-dehi-gold hover:text-dehi-charcoal transition-colors"
                aria-label="Email Dehi"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-dehi-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-dehi-ivory/80 font-light">
              <li>
                <button
                  onClick={() => scrollTo("hero")}
                  className="hover:text-dehi-gold transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("product")}
                  className="hover:text-dehi-gold transition-colors text-left"
                >
                  Product Details
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("benefits")}
                  className="hover:text-dehi-gold transition-colors text-left"
                >
                  Key Benefits
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("about")}
                  className="hover:text-dehi-gold transition-colors text-left"
                >
                  About Dehi
                </button>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-dehi-gold transition-colors inline-flex items-center gap-1"
                >
                  <span>Checkout</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-dehi-gold" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Highlights (2.5 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-dehi-gold mb-5">
              Product
            </h4>
            <div className="space-y-2 text-sm text-dehi-ivory/80 font-light">
              <p className="font-medium text-dehi-ivory">{DEHI_PRODUCT.name}</p>
              <p className="text-xs text-dehi-ivory/60">Volume: {DEHI_PRODUCT.size}</p>
              <p className="text-xs text-dehi-gold font-semibold">
                Independence Day Offer: {formatPrice(DEHI_PRODUCT.price)}
              </p>
              <div className="pt-2">
                <Link
                  href="/checkout"
                  className="text-xs uppercase tracking-widest text-dehi-gold hover:underline"
                >
                  Order Now →
                </Link>
              </div>
            </div>
          </div>

          {/* Col 4: Corporate & Contact (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-dehi-gold mb-5">
              Brand & Contact
            </h4>
            <div className="space-y-3 text-xs text-dehi-ivory/80 font-light leading-relaxed">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-dehi-ivory/50 block">
                  Company
                </span>
                <span className="font-medium text-dehi-ivory">R I ENTERPRISE</span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-dehi-ivory/50 block">
                  Official Email
                </span>
                <a
                  href="mailto:dehiindia0@gmail.com"
                  className="text-dehi-gold hover:underline"
                >
                  dehiindia0@gmail.com
                </a>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>100% Secure Indian E-Commerce</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-dehi-ivory/60 font-light">
          <p>© {new Date().getFullYear()} R I ENTERPRISE. All rights reserved.</p>
          <p className="font-serif italic text-dehi-gold/80">
            Dehi – Care for Every Body.
          </p>
        </div>
      </div>
    </footer>
  );
}
