"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, GraduationCap, Target, Heart } from "lucide-react";
import Image from "next/image";

const VALUES = [
  { icon: Target, label: "Precisión", desc: "Cada detalle importa. Trabajamos con estándares de la industria automotriz de alto rendimiento.", color: "#3B82F6" },
  { icon: Award, label: "Calidad", desc: "Solo usamos productos de categoría profesional, pH-neutros y certificados de marcas líderes.", color: "#EAB308" },
  { icon: GraduationCap, label: "Expertise", desc: "Formación continua en las últimas técnicas de detailing y nanotecnología cerámica.", color: "#8B5CF6" },
  { icon: Heart, label: "Pasión", desc: "\"Trato tu vehículo como si fuera el mío.\" — Nicolás Ramírez", color: "#EC4899" },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="nosotros" style={{ position: "relative", background: "#040412", overflow: "hidden" }}>
      {/* Ghost text */}
      <div style={{
        position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)",
        fontFamily: "var(--font-bebas)", fontSize: "20vw", color: "rgba(255,255,255,0.013)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap",
      }}>
        2018
      </div>

      <div ref={ref} style={{ position: "relative", maxWidth: "82rem", margin: "0 auto", padding: "8rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
          className="grid-cols-1 lg:grid-cols-2">

          {/* Left */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              style={{ display: "inline-block", fontFamily: "var(--font-space)", fontSize: 11, color: "#EC4899", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}
            >
              Quiénes somos
            </motion.span>

            <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
              <motion.h2
                initial={{ y: 60 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.95, margin: 0, color: "#fff" }}
              >
                NICOLÁS<br />
                <span style={{
                  background: "linear-gradient(135deg, #A16207 0%, #EAB308 50%, #FDE047 75%, #EAB308 90%, #CA8A04 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  RAMÍREZ
                </span>
              </motion.h2>
            </div>

            {/* UNAB badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 999,
                background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
                marginBottom: "1.5rem",
              }}
            >
              <GraduationCap size={14} style={{ color: "#3B82F6" }} />
              <span style={{ fontFamily: "var(--font-space)", fontSize: 11, color: "#3B82F6", fontWeight: 600 }}>
                Ing. Industrial · Universidad Andrés Bello · CEO &amp; Fundador
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: "rgba(203,213,225,0.5)", lineHeight: 1.8, marginBottom: "1.25rem" }}
            >
              Nicolás fundó CleanSchile en 2018 después de experimentar en carne propia la falta de opciones de calidad en el mercado automotriz chileno. Como Ingeniero Industrial de la Universidad Andrés Bello, aplicó metodologías de procesos y control de calidad al mundo del detailing.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: "rgba(203,213,225,0.5)", lineHeight: 1.8, marginBottom: "2.5rem" }}
            >
              Hoy, con más de 300 vehículos atendidos y 5 marcas premium de referencia, CleanSchile es sinónimo de excelencia en La Cisterna.
            </motion.p>

            {/* Values grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      const rx = ((e.clientY - r.top) / r.height - 0.5) * -14;
                      const ry = ((e.clientX - r.left) / r.width - 0.5) * 14;
                      e.currentTarget.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
                    }}
                    style={{
                      padding: "1rem 1.1rem", borderRadius: 16,
                      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease",
                      cursor: "default",
                    }}
                  >
                    <Icon size={17} style={{ color: v.color, marginBottom: 8 }} />
                    <p style={{ fontFamily: "var(--font-space)", fontWeight: 600, color: "#fff", fontSize: 13, margin: "0 0 4px" }}>{v.label}</p>
                    <p style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.35)", fontSize: 12, lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right — Visual card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "relative" }}
          >
            <div style={{
              position: "relative", aspectRatio: "3/4", borderRadius: 32, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              {/* Real car photo */}
              <Image
                src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=85"
                alt="Detailing profesional CleanSchile"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(4,4,18,0.15) 0%, rgba(4,4,18,0.7) 100%)",
              }} />

              {/* Top accent line matching logo cyan */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, #06B6D4, #F97316)",
              }} />

              {/* Bottom info strip */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem 1.5rem",
                background: "rgba(4,4,18,0.82)", backdropFilter: "blur(24px)",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div>
                  <p style={{ fontFamily: "var(--font-space)", fontWeight: 600, color: "#fff", fontSize: 13, margin: "0 0 2px" }}>Ing. Industrial</p>
                  <p style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.4)", fontSize: 11, margin: 0 }}>Fundador &amp; CEO · desde 2018</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{
                    fontFamily: "var(--font-bebas)", fontSize: "2rem", margin: "0 0 2px",
                    background: "linear-gradient(135deg, #EAB308, #FDE047)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>5+</p>
                  <p style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.4)", fontSize: 11, margin: 0 }}>años exp.</p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute", bottom: -20, left: -20,
                padding: "14px 18px", borderRadius: 20,
                background: "rgba(4,4,18,0.88)", backdropFilter: "blur(24px)",
                border: "1px solid rgba(234,179,8,0.2)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Award size={18} style={{ color: "#EAB308" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-space)", fontWeight: 700, color: "#fff", fontSize: 14, margin: "0 0 2px" }}>300+</p>
                  <p style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.4)", fontSize: 11, margin: 0 }}>Vehículos</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
