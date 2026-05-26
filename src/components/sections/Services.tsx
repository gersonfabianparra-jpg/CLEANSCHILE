"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Sparkles, Shield, Sofa, TrendingUp, Wrench, Car } from "lucide-react";
import Image from "next/image";

const SERVICES = [
  {
    num: "01", Icon: Sparkles, title: "Pulido de Vehículos", tag: "Exterior", price: "Desde $80.000",
    desc: "Eliminamos micro-rayones, oxidación y contaminación de la pintura con técnicas profesionales de pulido. Restauramos el brillo original de tu carrocería.",
    color: "#3B82F6",
    photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=85",
  },
  {
    num: "02", Icon: Shield, title: "Sellado Cerámico", tag: "Premium ✦", price: "Desde $160.000",
    desc: "Recubrimiento nanotecnológico con marcas Carpro, Koch Chemie y Sonax. Protección duradera contra UV, lluvia ácida y agentes químicos. Hidrofóbico extremo.",
    color: "#8B5CF6", featured: true,
    photo: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&auto=format&fit=crop&q=85",
  },
  {
    num: "03", Icon: Sofa, title: "Full Interior", tag: "Interior", price: "Desde $70.000",
    desc: "Limpieza profunda del habitáculo: tapizados, plásticos, cuero, moqueta y techo. Desinfección y acondicionamiento con productos Vonixx y AutoAmerica.",
    color: "#EC4899",
    photo: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=1200&auto=format&fit=crop&q=85",
  },
  {
    num: "04", Icon: TrendingUp, title: "Servicio Pre-Venta", tag: "Valor", price: "Desde $120.000",
    desc: "Preparación integral diseñada para maximizar el precio de venta de tu vehículo. Interior + exterior + descontaminación completa.",
    color: "#EAB308",
    photo: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=85",
  },
  {
    num: "05", Icon: Wrench, title: "Mantención Automotriz", tag: "Mantención", price: "Desde $120.000",
    desc: "Cuidado preventivo y correctivo del motor con lubricantes y filtros de categoría profesional. Diagnóstico incluido.",
    color: "#84CC16",
    photo: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&auto=format&fit=crop&q=85",
  },
];

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(SERVICES.length - 1, Math.floor(v * SERVICES.length)));
  });

  const svc = SERVICES[active];

  return (
    <section id="servicios">
      {/* ── Pinned scroll section ── */}
      <div
        ref={containerRef}
        style={{ position: "relative", height: `${(SERVICES.length + 1) * 100}vh` }}
      >
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          display: "grid", gridTemplateColumns: "38% 62%",
          overflow: "hidden", background: "#040412",
        }}>

          {/* Left panel — pinned indicator */}
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            padding: "0 3rem", position: "relative", borderRight: "1px solid rgba(255,255,255,0.05)",
          }}>
            {/* Section label */}
            <p style={{ fontFamily: "var(--font-space)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(203,213,225,0.3)", marginBottom: "2rem" }}>
              ¿Qué hacemos?
            </p>

            {/* Giant number */}
            <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={active}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -80, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "var(--font-bebas)", fontSize: "clamp(5rem,10vw,9rem)",
                    lineHeight: 1, margin: 0, color: svc.color,
                    filter: `drop-shadow(0 0 40px ${svc.color}50)`,
                  }}
                >
                  {svc.num}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Service list nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {SERVICES.map((s, i) => (
                <div
                  key={s.num}
                  style={{
                    padding: "0.9rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", gap: 14,
                    transition: "all 0.4s",
                  }}
                >
                  <motion.div
                    animate={{ scale: i === active ? 1.4 : 1, backgroundColor: i === active ? s.color : "rgba(255,255,255,0.12)" }}
                    style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0 }}
                  />
                  <span style={{
                    fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 600,
                    color: i === active ? "#fff" : "rgba(203,213,225,0.3)",
                    transition: "color 0.4s",
                    letterSpacing: "0.03em",
                  }}>
                    {s.title}
                  </span>
                  {i === active && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                        marginLeft: "auto", fontFamily: "var(--font-space)", fontSize: 11,
                        fontWeight: 700, color: s.color, flexShrink: 0,
                      }}
                    >
                      {s.price}
                    </motion.span>
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "rgba(255,255,255,0.04)" }}>
              <motion.div
                style={{
                  width: "100%",
                  background: `linear-gradient(180deg, #06B6D4, ${svc.color})`,
                  height: `${((active + 1) / SERVICES.length) * 100}%`,
                  transition: "height 0.5s ease, background 0.5s ease",
                }}
              />
            </div>
          </div>

          {/* Right panel — photo + details */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={svc.photo}
                  alt={svc.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="62vw"
                  priority={active === 0}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(105deg, rgba(4,4,18,0.82) 0%, rgba(4,4,18,0.3) 55%, rgba(4,4,18,0.5) 100%)",
                }} />
                {/* Top color accent */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 4,
                  background: `linear-gradient(90deg, ${svc.color}, transparent)`,
                  opacity: 0.9,
                }} />
              </motion.div>
            </AnimatePresence>

            {/* Text content */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "3rem" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span style={{
                    fontFamily: "var(--font-space)", fontSize: 10, letterSpacing: "0.35em",
                    textTransform: "uppercase", color: svc.color, display: "block", marginBottom: "0.75rem",
                  }}>
                    {svc.tag}
                  </span>
                  <h2 style={{
                    fontFamily: "var(--font-bebas)", fontSize: "clamp(2.5rem,5vw,4.5rem)",
                    lineHeight: 0.95, color: "#fff", margin: "0 0 1rem",
                  }}>
                    {svc.title}
                  </h2>
                  <p style={{
                    fontFamily: "var(--font-inter)", fontSize: 15, lineHeight: 1.75,
                    color: "rgba(203,213,225,0.6)", maxWidth: "38rem", margin: "0 0 1.75rem",
                  }}>
                    {svc.desc}
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <span style={{
                      fontFamily: "var(--font-space)", fontSize: 14, fontWeight: 700,
                      color: svc.color, background: `${svc.color}15`,
                      border: `1px solid ${svc.color}30`,
                      padding: "8px 20px", borderRadius: 999,
                    }}>
                      {svc.price}
                    </span>
                    <a
                      href="#contacto"
                      style={{
                        fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 600,
                        color: "#fff", background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        padding: "8px 20px", borderRadius: 999, textDecoration: "none",
                      }}
                    >
                      Cotizar →
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Retiro y entrega strip ── */}
      <div style={{ background: "#040412", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "82rem", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              padding: "1.25rem 1.75rem", borderRadius: 16,
              background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.15)",
              display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
            }}
          >
            <Car size={20} style={{ color: "#06B6D4", flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 600, color: "#06B6D4", margin: "0 0 2px" }}>
                Servicio de Retiro y Entrega
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "rgba(203,213,225,0.45)", margin: 0 }}>
                Conductor asignado disponible · Servicio de grúa con recargo · Solo taller La Cisterna
              </p>
            </div>
            <a
              href="#contacto"
              style={{
                marginLeft: "auto", fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 600,
                color: "#06B6D4", textDecoration: "none", flexShrink: 0,
                border: "1px solid rgba(6,182,212,0.3)", padding: "0.4rem 1rem", borderRadius: 999,
              }}
            >
              Consultar →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
