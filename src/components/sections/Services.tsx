"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Droplets, Cpu, Armchair, Lightbulb, TrendingUp, Wrench } from "lucide-react";

const SERVICES = [
  {
    num: "01",
    Icon: Droplets,
    title: "Detailing Exterior",
    tag: "Exterior",
    desc: "Protege y restaura el brillo original de la carrocería. Descontaminamos la pintura, eliminamos micro-rayones y aplicamos sellantes de alta calidad.",
    color: "#3B82F6",
  },
  {
    num: "02",
    Icon: Cpu,
    title: "Recubrimiento Cerámico",
    tag: "Premium ✦",
    desc: "Protección de nivel nanotecnológico contra agentes químicos, rayos UV y manchas de agua. Brillo profundo e hidrofóbico extremo que dura años.",
    color: "#8B5CF6",
    featured: true,
  },
  {
    num: "03",
    Icon: Armchair,
    title: "Detailing Interior",
    tag: "Interior",
    desc: "Renovación profunda del habitáculo con desinfección, remoción de manchas y acondicionamiento profesional de plásticos, cuero y textiles.",
    color: "#EC4899",
  },
  {
    num: "04",
    Icon: Lightbulb,
    title: "Restauración de Faros",
    tag: "Restauración",
    desc: "Elimina el amarillamiento y opacidad para restaurar la capacidad de iluminación y la seguridad del vehículo.",
    color: "#06B6D4",
  },
  {
    num: "05",
    Icon: TrendingUp,
    title: "Preparación Pre-Venta",
    tag: "Valor",
    desc: "Preparación estratégica del vehículo diseñada para maximizar el atractivo comercial y el valor de mercado.",
    color: "#EAB308",
  },
  {
    num: "06",
    Icon: Wrench,
    title: "Mantención Automotriz",
    tag: "Mantención",
    desc: "Cuidado preventivo y técnico usando lubricantes y filtros premium para un rendimiento óptimo del motor.",
    color: "#84CC16",
  },
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });

  return (
    <section
      id="servicios"
      style={{ background: "#040412", position: "relative", overflow: "hidden" }}
    >
      {/* Top accent line */}
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
            style={{
              fontFamily: "var(--font-space)",
              fontSize: 11,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "#3B82F6",
              marginBottom: "1rem",
            }}
          >
            ¿Qué hacemos?
          </motion.p>

          <div style={{ overflow: "hidden" }}>
            <motion.h2
              initial={{ y: 80 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3rem,8vw,7rem)",
                lineHeight: 0.95,
                margin: 0,
                color: "#fff",
              }}
            >
              NUESTROS{" "}
              <span style={{
                background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                SERVICIOS
              </span>
            </motion.h2>
          </div>
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
                {/* Hover fill — slides from left */}
                <motion.div
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(90deg, ${svc.color}12 0%, transparent 60%)`,
                    transformOrigin: "left",
                    pointerEvents: "none",
                  }}
                />

                <div style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(16px,3vw,40px)",
                  padding: "1.6rem 1rem",
                }}>
                  {/* Number */}
                  <span style={{
                    fontFamily: "var(--font-bebas)",
                    fontSize: "clamp(2rem,4vw,3.5rem)",
                    lineHeight: 1,
                    color: svc.color,
                    opacity: isActive ? 1 : 0.22,
                    transition: "opacity 0.35s",
                    minWidth: "3rem",
                    flexShrink: 0,
                  }}>
                    {svc.num}
                  </span>

                  {/* Vertical rule */}
                  <div style={{
                    width: 1, height: 44, flexShrink: 0,
                    background: svc.color,
                    opacity: isActive ? 0.55 : 0.1,
                    transition: "opacity 0.35s",
                  }} />

                  {/* Title + description */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(8px,2vw,20px)", flexWrap: "wrap" }}>
                      <h3 style={{
                        fontFamily: "var(--font-bebas)",
                        fontSize: "clamp(1.6rem,3.5vw,3rem)",
                        lineHeight: 1,
                        color: isActive ? "#ffffff" : "rgba(255,255,255,0.8)",
                        transition: "color 0.35s",
                        margin: 0,
                      }}>
                        {svc.title}
                      </h3>
                      <span style={{
                        fontFamily: "var(--font-space)",
                        fontSize: 10,
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: svc.color,
                        flexShrink: 0,
                      }}>
                        {svc.tag}
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
                          style={{
                            fontFamily: "var(--font-inter)",
                            fontSize: 14,
                            lineHeight: 1.75,
                            color: "rgba(203,213,225,0.5)",
                            maxWidth: "42rem",
                            margin: 0,
                            overflow: "hidden",
                          }}
                        >
                          {svc.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Icon + arrow */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
                    <Icon
                      size={20}
                      style={{
                        color: svc.color,
                        opacity: isActive ? 1 : 0.18,
                        transition: "opacity 0.35s",
                      }}
                    />
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          <a
            href="#contacto"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0.85rem 1.75rem",
              borderRadius: 999,
              fontFamily: "var(--font-space)",
              fontSize: 13,
              fontWeight: 500,
              color: "rgba(203,213,225,0.55)",
              border: "1px solid rgba(255,255,255,0.1)",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            Consultar por un servicio →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
