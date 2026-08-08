"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Feather } from "lucide-react";

export default function IndiaBrandStory() {
  return (
    <section className="py-24 bg-dehi-softcream relative border-t border-dehi-gold/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dehi-ivory border border-dehi-gold/40 mb-6">
            <Compass className="w-3.5 h-3.5 text-dehi-gold-dark" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-dehi-charcoal uppercase">
              CONSCIOUS INDIAN LUXURY
            </span>
          </div>

          <h2 className="heading-section font-serif font-normal text-dehi-charcoal mb-6">
            Luxury Crafted in India
          </h2>

          <p className="text-base sm:text-lg text-dehi-charcoal/80 font-light leading-relaxed mb-12">
            Dehi was founded to celebrate gentle cleanliness rooted in authentic natural heritage. We believe real luxury is honest, soothing, and accessible — crafted with care for everyday Indian life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-xl bg-dehi-ivory border border-dehi-gold/25 shadow-xs"
            >
              <Feather className="w-5 h-5 text-dehi-gold-dark mb-4" />
              <h3 className="font-serif text-lg text-dehi-charcoal mb-2">
                Pure Formulation
              </h3>
              <p className="text-xs text-dehi-charcoal/70 font-light leading-relaxed">
                Zero parabens and sulfates. Crafted to leave skin feeling genuinely refreshed and soft.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-6 rounded-xl bg-dehi-ivory border border-dehi-gold/25 shadow-xs"
            >
              <Sparkles className="w-5 h-5 text-dehi-gold-dark mb-4" />
              <h3 className="font-serif text-lg text-dehi-charcoal mb-2">
                Honest Pricing
              </h3>
              <p className="text-xs text-dehi-charcoal/70 font-light leading-relaxed">
                Premium quality body care direct from R I ENTERPRISE without artificial markups.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-6 rounded-xl bg-dehi-ivory border border-dehi-gold/25 shadow-xs"
            >
              <Compass className="w-5 h-5 text-dehi-gold-dark mb-4" />
              <h3 className="font-serif text-lg text-dehi-charcoal mb-2">
                Everyday Routine
              </h3>
              <p className="text-xs text-dehi-charcoal/70 font-light leading-relaxed">
                Thoughtfully sized at 200 mL to be your dependable daily shower companion.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
