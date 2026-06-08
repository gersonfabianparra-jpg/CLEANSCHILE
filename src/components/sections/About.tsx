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
              style={{ display: "inline-block", fontFamily: "var(--font-space)", fontSize: 11, color: "#06B6D4", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}
            >
              Sobre Nosotros
            </motion.span>

            <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
              <motion.h2
                initial={{ y: 60 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.2rem,5vw,4.2rem)", lineHeight: 1.05, margin: 0, color: "#fff" }}
              >
                MISIÓN CLARA:{" "}
                <span style={{
                  background: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 60%, #8B5CF6 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  SER TU TALLER DE CONFIANZA.
                </span>
              </motion.h2>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 999,
                background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
                marginBottom: "1.75rem",
              }}
            >
              <GraduationCap size={14} style={{ color: "#3B82F6" }} />
              <span style={{ fontFamily: "var(--font-space)", fontSize: 11, color: "#3B82F6", fontWeight: 600 }}>
                Ing. Industrial · Universidad Andrés Bello · CEO &amp; Fundador
              </span>
            </motion.div>

            {[
              <>Yo también probé alternativas de talleres para <strong style={{ color: "rgba(203,213,225,0.85)" }}>Detallar y Mantener</strong> mi auto, pero siempre quedaba insatisfecho con el servicio. Por eso decidí fundar <strong style={{ color: "#06B6D4" }}>Cleanschile</strong>.</>,
              <>Para quienes sufran lo mismo, ahora tienen una <strong style={{ color: "rgba(203,213,225,0.85)" }}>opción de confianza al precio justo.</strong></>,
              <>Aquí no se trata solo de lavar o pulir. Se trata de <strong style={{ color: "rgba(203,213,225,0.85)" }}>restaurar, proteger y cuidar tu auto como si fuera nuestro.</strong> Utilizamos productos de alto nivel, aplicación técnica refinada y nos tomamos el tiempo necesario para asegurar un resultado profesional.</>,
              <>Gracias por confiar en Cleanschile. Estamos aquí para ayudarte a <strong style={{ color: "rgba(203,213,225,0.85)" }}>cuidar y elevar la estética de tu auto</strong>, con atención personalizada y resultados reales.</>,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "rgba(203,213,225,0.5)", lineHeight: 1.85, marginBottom: "1rem" }}
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.75 }}
              style={{ marginBottom: "2rem" }}
            >
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(203,213,225,0.35)", margin: "0 0 2px" }}>
                Nicolás Ramírez, Ing. Industrial.
              </p>
              <p style={{ fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 700, color: "#06B6D4", letterSpacing: "0.08em", margin: 0, textTransform: "uppercase" }}>
                CEO Cleanschile.
              </p>
            </motion.div>

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
              <Image
                src="/nicolas-perfil.png"
                alt="Nicolás Ramírez — CEO Cleanschile"
                fill
                style={{
                  objectFit: "cover", objectPosition: "center top",
                  filter: "contrast(1.08) brightness(0.88) saturate(0.8)",
                }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Color grade overlay — cool cinematic tint */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(160deg, rgba(6,12,40,0.35) 0%, rgba(6,182,212,0.06) 50%, rgba(4,4,18,0.82) 100%)",
                mixBlendMode: "multiply",
              }} />

              {/* Bottom fade */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(4,4,18,0.85) 100%)",
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
