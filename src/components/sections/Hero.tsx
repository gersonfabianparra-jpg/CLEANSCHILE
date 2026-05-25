"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, Shield, Zap } from "lucide-react";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 10,
  color: ["#0066FF", "#7B2FFF", "#FF006E", "#00E5FF", "#C9A84C"][Math.floor(Math.random() * 5)],
}));

function Particle({ p }: { p: typeof PARTICLES[0] }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        backgroundColor: p.color,
        boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
      }}
      animate={{
        y: [0, -120, -240],
        x: [0, Math.random() * 60 - 30, Math.random() * 120 - 60],
        opacity: [0, 0.8, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: p.duration,
        delay: p.delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

const words = ["DETAILING", "PROTECCIÓN", "PERFECCIÓN"];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black-deep"
      id="inicio"
    >
      {/* Animated mesh gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 60% 50% at 20% 40%, rgba(0,102,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 20%, rgba(123,47,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 60% 80%, rgba(255,0,110,0.12) 0%, transparent 60%)",
              "radial-gradient(ellipse 60% 50% at 70% 60%, rgba(0,102,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 20% 80%, rgba(123,47,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 40% 20%, rgba(255,0,110,0.12) 0%, transparent 60%)",
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,229,255,0.15) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(123,47,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 20% 60%, rgba(255,0,110,0.12) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        {/* Particles */}
        {PARTICLES.map((p) => (
          <Particle key={p.id} p={p} />
        ))}
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Hero content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        style={{ y, opacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-gold/20 text-gold text-xs font-space font-medium mb-8"
        >
          <Sparkles size={12} className="animate-pulse" />
          <span className="tracking-widest uppercase">Taller Premium · La Cisterna, Santiago</span>
          <Sparkles size={12} className="animate-pulse" />
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-bebas text-[clamp(5rem,18vw,17rem)] leading-none tracking-tight text-white"
          >
            CLEANS
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-bebas text-[clamp(5rem,18vw,17rem)] leading-none tracking-tight gradient-text-gold"
          >
            CHILE
          </motion.h1>
        </div>

        {/* Rotating words */}
        <div className="flex items-center justify-center gap-4 mb-8 overflow-hidden">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-space text-white/50 text-sm tracking-[0.4em] uppercase"
          >
            Detailing & Mantención Automotriz
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60"
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="font-inter text-white/50 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-10"
        >
          Transformamos tu vehículo con técnicas de última generación.
          Desde decontaminación hasta recubrimiento cerámico.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contacto"
            className="relative group px-8 py-4 rounded-full font-space font-semibold text-sm overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-electric-blue via-electric-purple to-electric-pink opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="absolute inset-0 bg-gradient-to-r from-electric-blue via-electric-purple to-electric-pink opacity-0 group-hover:opacity-100 blur-lg transition-opacity" />
            <span className="relative flex items-center gap-2">
              <Zap size={15} />
              Cotizar Ahora — Es Gratis
            </span>
          </a>
          <a
            href="#servicios"
            className="px-8 py-4 rounded-full font-space font-medium text-sm text-white/70 hover:text-white transition-colors border border-white/10 hover:border-white/20 backdrop-blur-sm"
          >
            Ver Servicios
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-14"
        >
          {[
            { icon: Shield, label: "Productos Premium" },
            { icon: Sparkles, label: "Mismo Día" },
            { icon: Zap, label: "Cotización Gratuita" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={14} className="text-gold" />
              <span className="font-space text-white/40 text-xs tracking-wide">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-space text-white/25 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} className="text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}
