"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, GraduationCap, Target, Heart } from "lucide-react";

const values = [
  { icon: Target, label: "Precisión", desc: "Cada detalle importa. Trabajamos con estándares de la industria automotriz de alto rendimiento." },
  { icon: Award, label: "Calidad", desc: "Solo usamos productos de categoría profesional, pH-neutros y certificados." },
  { icon: GraduationCap, label: "Expertise", desc: "Formación continua en las últimas técnicas de detailing y nanotecnología." },
  { icon: Heart, label: "Pasión", desc: "Fundada por amor al mundo automotriz. Tu vehículo lo tratamos como si fuera el nuestro." },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="nosotros" className="relative py-32 bg-black overflow-hidden">
      {/* Large bg text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-bebas text-[20vw] text-white/[0.015] leading-none select-none pointer-events-none">
        CEO
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="inline-block font-space text-xs text-electric-pink tracking-[0.4em] uppercase mb-4"
            >
              Quiénes somos
            </motion.span>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: 60 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-bebas text-[clamp(3rem,7vw,6rem)] leading-none"
              >
                NICOLÁS<br />
                <span className="gradient-text-gold">RAMÍREZ</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/20 mb-6"
            >
              <GraduationCap size={14} className="text-electric-blue" />
              <span className="font-space text-electric-blue text-xs font-medium">Ingeniero Industrial · CEO & Fundador</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-inter text-white/50 text-base leading-relaxed mb-5"
            >
              Nicolás fundó CleanSchile después de experimentar en carne propia la falta de opciones de calidad en el mercado automotriz chileno. Como Ingeniero Industrial, aplicó metodologías de procesos y control de calidad al mundo del detailing.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-inter text-white/50 text-base leading-relaxed mb-8"
            >
              Hoy, CleanSchile es sinónimo de excelencia en La Cisterna, con cientos de clientes satisfechos que confían su vehículo a nuestro equipo.
            </motion.p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-4 rounded-xl bg-black-card border border-white/5 group hover:border-white/10 transition-all"
                  >
                    <Icon size={18} className="text-gold mb-2" />
                    <p className="font-space font-semibold text-white text-sm mb-1">{v.label}</p>
                    <p className="font-inter text-white/35 text-xs leading-relaxed">{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Decorative card */}
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-black-card border border-white/5">
              {/* Gradient fill as placeholder for photo */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 via-electric-purple/20 to-electric-pink/10" />

              {/* Animated circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-electric-blue/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-electric-purple/10"
              />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-electric-blue via-electric-purple to-electric-pink opacity-80 flex items-center justify-center">
                  <span className="font-bebas text-4xl text-white">NR</span>
                </div>
                <p className="font-bebas text-2xl text-white tracking-wider">NICOLÁS RAMÍREZ</p>
                <p className="font-space text-white/50 text-xs tracking-widest uppercase">CEO · CleanSchile</p>
              </div>

              {/* Bottom overlay card */}
              <div className="absolute bottom-0 left-0 right-0 p-6 glass-dark">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-space font-semibold text-white text-sm">Ing. Industrial</p>
                    <p className="font-inter text-white/40 text-xs">Fundador & CEO</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bebas text-2xl text-gold">5+</p>
                    <p className="font-inter text-white/40 text-xs">años exp.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 p-4 rounded-2xl glass-dark border border-gold/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <Award size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-space font-semibold text-white text-sm">500+</p>
                  <p className="font-inter text-white/40 text-xs">Vehículos</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
