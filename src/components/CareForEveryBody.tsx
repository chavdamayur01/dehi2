"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { DEHI_PRODUCT } from "@/types";

const WORDS = [
  { word: "Gentle", sub: "Formulated without harsh sulfates to respect skin lipids." },
  { word: "Fresh", sub: "Awakens the senses with subtle herbal vitality." },
  { word: "Hydrating", sub: "Preserves natural moisture balance through every shower." },
  { word: "Everyday", sub: "Designed as an effortless staple for modern Indian routines." },
];

export default function CareForEveryBody() {
  return (
    <section className="py-28 bg-dehi-ivory relative overflow-hidden">
      {/* Decorative Gold Circular Accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-dehi-gold/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Transparent Product Angle with ambient shadow */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-64 sm:w-80 h-[380px] sm:h-[480px]">
              <Image
                src={DEHI_PRODUCT.images.angle2}
                alt="Dehi Body Wash Care for Every Body"
                fill
                sizes="(max-width: 768px) 280px, 360px"
                className="object-contain filter drop-shadow-[0_25px_30px_rgba(31,29,27,0.18)]"
              />
            </div>
          </div>

          {/* RIGHT: Large Editorial Words */}
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-dehi-gold-dark block mb-3">
              THE ESSENCE
            </span>
            <h2 className="heading-section font-serif font-normal text-dehi-charcoal mb-10">
              Care for Every Body
            </h2>

            <div className="space-y-8">
              {WORDS.map((item, index) => (
                <motion.div
                  key={item.word}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group pb-6 border-b border-dehi-gold/20 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 cursor-default"
                >
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-dehi-charcoal group-hover:text-dehi-gold-dark transition-colors duration-300">
                    {item.word}
                  </h3>
                  <p className="text-sm text-dehi-charcoal/70 font-light max-w-sm sm:text-right">
                    {item.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
