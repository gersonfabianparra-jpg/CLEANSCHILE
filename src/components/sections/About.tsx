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

      <div ref={ref} className="rsp-inner" style={{ position: "relative", maxWidth: "82rem", margin: "0 auto", padding: "8rem 1.5rem" }}>
        <div className="rsp-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>

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
                      const rx = ((e.clientY - r.top) / r.height - 0.5) * -12;
                      const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
                      e.currentTarget.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
                    }}
                    style={{
                      padding: "1rem 1.1rem", borderRadius: 16,
                      background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
                      transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease",
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
            <div className="rsp-photo-card" style={{
              position: "relative", aspectRatio: "3/4", borderRadius: 32, overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              {/* Person placeholder photo */}
              <Image
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=85"
                alt="Nicolás Ramírez — CEO CleanSchile"
                fill
                style={{ objectFit: "cover", objectPosition: "center top" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(4,4,18,0.05) 30%, rgba(4,4,18,0.75) 100%)",
              }} />

              {/* Top accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "linear-gradient(90deg, #06B6D4, #F97316)",
              }} />

              {/* UNAB badge top-right */}
              <div style={{
                position: "absolute", top: 16, right: 16,
                background: "rgba(4,4,18,0.75)", backdropFilter: "blur(12px)",
                border: "1px solid rgba(6,182,212,0.25)",
                borderRadius: 10, padding: "6px 12px",
                display: "flex", alignItems: "center", gap: 7,
              }}>
                <GraduationCap size={12} style={{ color: "#06B6D4" }} />
                <span style={{ fontFamily: "var(--font-space)", fontSize: 10, color: "rgba(203,213,225,0.8)", fontWeight: 600, letterSpacing: "0.05em" }}>U. Andrés Bello</span>
              </div>

              {/* Floating name badge — center bottom */}
              <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                  style={{
                    padding: "10px 22px", borderRadius: 999,
                    background: "rgba(4,4,18,0.85)", backdropFilter: "blur(20px)",
                    border: "1px solid rgba(6,182,212,0.25)",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                    whiteSpace: "nowrap",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>
                    Nicolás Ramírez
                  </span>
                  <span style={{ fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 600, color: "#06B6D4", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    CEO
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
