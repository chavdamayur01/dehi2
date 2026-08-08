"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function WhyDehi() {
  return (
    <section id="about" className="py-28 relative overflow-hidden bg-dehi-cream">
      {/* Background with Ambient Warm Lighting */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/home.png"
          alt="Dehi Heritage Backdrop"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25 filter sepia-[0.25] contrast-95"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dehi-cream via-dehi-cream/90 to-dehi-softcream/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dehi-gold/15 border border-dehi-gold/40 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-dehi-gold-dark" />
              <span className="text-[11px] font-semibold tracking-[0.2em] text-dehi-charcoal uppercase">
                THE DEHI DISTINCTION
              </span>
            </div>

            <h2 className="heading-section font-serif font-normal text-dehi-charcoal leading-tight mb-8">
              Luxury isn&apos;t imported. <br />
              <span className="italic text-dehi-brown font-light">
                It&apos;s rooted in India&apos;s soil.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-dehi-charcoal/85 font-light leading-relaxed mb-8">
              Dehi brings together a modern body-care experience with an Indian natural-care spirit — created for simple, everyday freshness.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-dehi-gold/30">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-dehi-gold-dark block mb-1">
                  Gentle Formulation
                </span>
                <p className="text-sm text-dehi-charcoal/70 font-light">
                  Free from harsh sulfates and parabens, respecting your skin&apos;s natural balance every day.
                </p>
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-dehi-gold-dark block mb-1">
                  Indian Craftsmanship
                </span>
                <p className="text-sm text-dehi-charcoal/70 font-light">
                  Conceived and blended in India with meticulous attention to moisture and texture.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4 flex justify-center"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-dehi-ivory/80 backdrop-blur-md border border-dehi-gold/40 shadow-luxury max-w-sm">
              <span className="text-xs font-mono uppercase tracking-widest text-dehi-gold-dark/80 block mb-2">
                R I ENTERPRISE
              </span>
              <h3 className="font-serif text-2xl text-dehi-charcoal mb-4">
                &ldquo;Care for every Body&rdquo;
              </h3>
              <p className="text-sm text-dehi-charcoal/75 font-light leading-relaxed mb-6">
                A commitment to transparent, gentle bathing rituals designed for Indian lifestyles and climates.
              </p>
              <div className="w-12 h-0.5 bg-dehi-gold" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
