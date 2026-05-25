"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const items = ["DETAILING EXTERIOR", "CERÁMICA", "INTERIOR", "FAROS", "PRE-VENTA", "MANTENCIÓN"];

export function CTABanner() {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <section className="relative py-20 overflow-hidden bg-black">
      {/* Gradient border top/bottom */}
      <div className="section-divider mb-0" />

      {/* BG gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-electric-purple/5 to-electric-pink/5" />

      {/* Marquee ticker */}
      <div className="overflow-hidden mb-10">
        <div className="flex animate-marquee gap-0">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center shrink-0">
              <span className="font-bebas text-4xl md:text-5xl text-white/8 tracking-widest px-8 whitespace-nowrap">
                {item}
              </span>
              <Zap size={16} className="text-gold/20 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-bebas text-[clamp(2.5rem,6vw,5rem)] leading-none text-white mb-4"
        >
          ¿LISTO PARA{" "}
          <span className="gradient-text">TRANSFORMAR</span>
          {" "}TU AUTO?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-inter text-white/40 text-base mb-8"
        >
          Cotización gratuita · Respuesta en menos de 24h · Santiago, Chile
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contacto"
            className="relative group px-8 py-4 rounded-full font-space font-semibold text-sm text-black overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold to-gold-light group-hover:brightness-110 transition-all" />
            <span className="relative flex items-center gap-2">
              <Zap size={15} />
              Cotizar Ahora — Gratis
            </span>
          </a>
          <a
            href="https://wa.me/56952095222"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full font-space font-medium text-sm text-white/70 hover:text-white border border-white/10 hover:border-white/20 transition-all"
          >
            WhatsApp directo
          </a>
        </motion.div>
      </div>

      <div className="section-divider mt-10" />
    </section>
  );
}
