"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Sparkles, Shield, Sofa, TrendingUp, Wrench, Car } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    Icon: Sparkles,
    title: "Pulido de Vehículos",
    tag: "Exterior",
    price: "Desde $80.000",
    desc: "Eliminamos micro-rayones, oxidación y contaminación de la pintura con técnicas profesionales de pulido. Restauramos el brillo original de tu carrocería.",
    color: "#3B82F6",
  },
  {
    num: "02",
    Icon: Shield,
    title: "Sellado Cerámico",
    tag: "Premium ✦",
    price: "Desde $160.000",
    desc: "Recubrimiento nanotecnológico con marcas Carpro, Koch Chemie y Sonax. Protección duradera contra UV, lluvia ácida y agentes químicos. Hidrofóbico extremo.",
    color: "#8B5CF6",
    featured: true,
  },
  {
    num: "03",
    Icon: Sofa,
    title: "Full Interior",
    tag: "Interior",
    price: "Desde $70.000",
    desc: "Limpieza profunda del habitáculo: tapizados, plásticos, cuero, moqueta y techo. Desinfección y acondicionamiento con productos Vonixx y AutoAmerica.",
    color: "#EC4899",
  },
  {
    num: "04",
    Icon: TrendingUp,
    title: "Servicio Pre-Venta",
    tag: "Valor",
    price: "Desde $120.000",
    desc: "Preparación integral diseñada para maximizar el precio de venta de tu vehículo. Interior + exterior + descontaminación completa.",
    color: "#EAB308",
  },
  {
    num: "05",
    Icon: Wrench,
    title: "Mantención Automotriz",
    tag: "Mantención",
    price: "Desde $120.000",
    desc: "Cuidado preventivo y correctivo del motor con lubricantes y filtros de categoría profesional. Diagnóstico incluido.",
    color: "#84CC16",
  },
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });

  return (
    <section id="servicios" style={{ background: "#040412", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.5) 40%, rgba(59,130,246,0.5) 60%, transparent 100%)",
      }} />

      <div style={{ maxWidth: "82rem", margin: "0 auto", padding: "6rem 1.5rem 5rem" }}>

        {/* Header */}
        <div ref={headRef} style={{ marginBottom: "4rem" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "var(--font-space)", fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#3B82F6", marginBottom: "1rem" }}
          >
            ¿Qué hacemos?
          </motion.p>
          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: 80 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(3rem,8vw,7rem)", lineHeight: 0.95, margin: 0, color: "#fff" }}
            >
              NUESTROS{" "}
              <span style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                SERVICIOS
              </span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "rgba(203,213,225,0.4)", marginTop: "1rem", margin: "1rem 0 0" }}
          >
            Solo taller · Retiro y entrega con conductor asignado disponible · Grúa con recargo
          </motion.p>
        </div>

        {/* Editorial list */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {SERVICES.map((svc, i) => {
            const isActive = active === i;
            const { Icon } = svc;
            return (
              <motion.div
                key={svc.num}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                style={{ position: "relative", borderBottom: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", cursor: "default" }}
              >
                <motion.div
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(90deg, ${svc.color}12 0%, transparent 60%)`,
                    transformOrigin: "left", pointerEvents: "none",
                  }}
                />

                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "clamp(16px,3vw,40px)", padding: "1.6rem 1rem" }}>
                  {/* Number */}
                  <span style={{
                    fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1,
                    color: svc.color, opacity: isActive ? 1 : 0.22, transition: "opacity 0.35s",
                    minWidth: "3rem", flexShrink: 0,
                  }}>
                    {svc.num}
                  </span>

                  <div style={{ width: 1, height: 44, flexShrink: 0, background: svc.color, opacity: isActive ? 0.55 : 0.1, transition: "opacity 0.35s" }} />

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px,2vw,20px)", flexWrap: "wrap" }}>
                      <h3 style={{
                        fontFamily: "var(--font-bebas)", fontSize: "clamp(1.6rem,3.5vw,3rem)", lineHeight: 1,
                        color: isActive ? "#fff" : "rgba(255,255,255,0.8)", transition: "color 0.35s", margin: 0,
                      }}>
                        {svc.title}
                      </h3>
                      <span style={{ fontFamily: "var(--font-space)", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: svc.color, flexShrink: 0 }}>
                        {svc.tag}
                      </span>
                      {/* Price badge */}
                      <span style={{
                        fontFamily: "var(--font-space)", fontSize: 11, fontWeight: 700,
                        color: svc.color, flexShrink: 0,
                        background: `${svc.color}12`, border: `1px solid ${svc.color}25`,
                        padding: "2px 8px", borderRadius: 999,
                        opacity: isActive ? 1 : 0.5, transition: "opacity 0.35s",
                      }}>
                        {svc.price}
                      </span>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          key="desc"
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          style={{ fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.75, color: "rgba(203,213,225,0.5)", maxWidth: "42rem", margin: 0, overflow: "hidden" }}
                        >
                          {svc.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Icon + arrow */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                    <Icon size={20} style={{ color: svc.color, opacity: isActive ? 1 : 0.18, transition: "opacity 0.35s" }} />
                    <motion.span
                      animate={{ x: isActive ? 5 : 0, opacity: isActive ? 1 : 0.15 }}
                      transition={{ duration: 0.25 }}
                      style={{ color: svc.color, fontSize: 20, lineHeight: 1 }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Retiro y entrega highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: "2.5rem",
            padding: "1.25rem 1.75rem",
            borderRadius: 16,
            background: "rgba(6,182,212,0.05)",
            border: "1px solid rgba(6,182,212,0.15)",
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

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="#contacto"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0.85rem 1.75rem", borderRadius: 999,
              fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 500,
              color: "rgba(203,213,225,0.55)", border: "1px solid rgba(255,255,255,0.1)",
              textDecoration: "none",
            }}
          >
            Consultar por un servicio →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
