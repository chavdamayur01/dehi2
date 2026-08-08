"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Leaf, Droplets, Heart, SunMedium } from "lucide-react";

const BENEFITS = [
  {
    num: "01",
    title: "Sulfate-Free",
    description: "Gentle cleansing without sulfates.",
    icon: Sparkles,
  },
  {
    num: "02",
    title: "Natural Herbal Ingredients",
    description: "Enriched with natural herbal ingredients.",
    icon: Leaf,
  },
  {
    num: "03",
    title: "Hydrating Formula",
    description: "Helps maintain your skin's natural moisture.",
    icon: Droplets,
  },
  {
    num: "04",
    title: "Cruelty-Free",
    description: "Cruelty-free body care.",
    icon: Heart,
  },
  {
    num: "05",
    title: "Suitable for Daily Use",
    description: "Designed for everyday shower care.",
    icon: SunMedium,
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-dehi-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-dehi-gold-dark block mb-2">
            The Philosophy of Care
          </span>
          <h2 className="heading-section font-serif font-normal text-dehi-charcoal mb-4">
            Everyday Care, Made Simple
          </h2>
          <p className="text-base text-dehi-charcoal/70 font-light">
            Thoughtfully crafted body care honoring gentle cleanliness and natural moisture balance.
          </p>
          <div className="w-16 h-0.5 bg-dehi-gold mx-auto mt-6" />
        </div>

        {/* 5 Minimal Benefit Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {BENEFITS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-6 rounded-xl bg-dehi-cream/40 border border-dehi-gold/25 hover:border-dehi-gold hover:bg-dehi-ivory transition-all duration-300 flex flex-col justify-between"
              >
                {/* Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-dehi-gold-dark/60">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-dehi-gold/10 flex items-center justify-center text-dehi-charcoal group-hover:bg-dehi-gold group-hover:text-dehi-charcoal transition-colors duration-300">
                      <Icon className="w-5 h-5 text-dehi-gold-dark group-hover:text-dehi-charcoal transition-colors" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-serif font-medium text-dehi-charcoal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-dehi-charcoal/75 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Subtle Bottom Gold Accent */}
                <div className="w-8 h-0.5 bg-dehi-gold/30 mt-6 group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
