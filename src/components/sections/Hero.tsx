"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Zap, Wrench, MapPin } from "lucide-react";

/* Spark particles */
type Spark = { id: number; x: number; y: number; size: number; color: string; delay: number; duration: number };
const COLORS = ["#3B82F6", "#8B5CF6", "#06B6D4", "#EAB308", "#EC4899", "#CBD5E1"];
const SPARKS: Spark[] = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  delay: Math.random() * 10,
  duration: Math.random() * 10 + 12,
}));

/* Light beam angles */
const BEAMS = [
  { angle: -35, opacity: 0.06, width: 180, delay: 0 },
  { angle: -20, opacity: 0.1, width: 120, delay: 0.5 },
  { angle: -5, opacity: 0.07, width: 200, delay: 1 },
  { angle: 12, opacity: 0.09, width: 150, delay: 0.3 },
  { angle: 28, opacity: 0.06, width: 160, delay: 0.8 },
];

export function Hero({ tagline }: { tagline?: string }) {
  const heroTagline = tagline || "Preservamos la estética, el valor y el rendimiento de tu vehículo.";
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, -120]);
  const opacity = useTransform(scrollY, [400, 1100], [1, 0]);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "radial-gradient(ellipse 120% 80% at 50% -10%, #0D0D3A 0%, #04040F 50%, #020208 100%)",
      }}
    >
      {/* ── Background layers ── */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>

        {/* Split background photos — left / right halves */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("/header/header-left.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: "inset(0 50% 0 0)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("/header/header-right.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          clipPath: "inset(0 0 0 50%)",
        }} />

        {/* Gradient overlay to keep content legible over the photos */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 90% 70% at 50% 45%, rgba(4,4,15,0.94) 0%, rgba(4,4,15,0.75) 45%, rgba(4,4,15,0.35) 75%, rgba(4,4,15,0.15) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(2,2,8,0.55) 0%, rgba(2,2,8,0.1) 20%, rgba(2,2,8,0.1) 70%, rgba(2,2,8,0.75) 100%)",
        }} />

        {/* Deep blue atmospheric glow — top */}
        <div style={{
          position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: "80vw", height: "60vh",
          background: "radial-gradient(ellipse, rgba(30,30,120,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />

        {/* Spotlight blobs */}
        <motion.div
          className="hero-blobs animate-spotlight-1"
          style={{
            position: "absolute",
            width: 900, height: 900,
            left: "10%", top: "-15%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0.07) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          className="hero-blobs animate-spotlight-2"
          style={{
            position: "absolute",
            width: 700, height: 700,
            right: "5%", top: "10%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          className="hero-blobs animate-spotlight-3"
          style={{
            position: "absolute",
            width: 600, height: 600,
            left: "50%", bottom: "-10%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />

        {/* Light beams — radiating from center-top like studio spotlights */}
        {BEAMS.map((b, i) => (
          <motion.div
            key={i}
            className="hero-beams"
            initial={{ opacity: 0 }}
            animate={{ opacity: b.opacity }}
            transition={{ delay: b.delay + 1, duration: 1.5 }}
            style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              width: b.width,
              height: "85vh",
              background: "linear-gradient(180deg, rgba(200,210,255,0.9) 0%, rgba(100,140,255,0.3) 30%, transparent 80%)",
              transformOrigin: "top center",
              transform: `rotate(${b.angle}deg)`,
              filter: "blur(18px)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Scan line */}
        <motion.div
          className="hero-scan"
          style={{
            position: "absolute", left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), rgba(139,92,246,0.4), transparent)",
            top: 0,
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />

        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }} />

        {/* Particles */}
        {SPARKS.map((s) => (
          <motion.div
            key={s.id}
            className="hero-particles"
            style={{
              position: "absolute",
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size,
              borderRadius: "50%",
              backgroundColor: s.color,
              boxShadow: `0 0 ${s.size * 5}px ${s.color}`,
            }}
            animate={{ y: [0, -100, -220], x: [0, (Math.random() - 0.5) * 60], opacity: [0, 0.8, 0], scale: [0, 1.2, 0] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: [0.22, 1, 0.36, 1], repeatDelay: Math.random() * 2 }}
          />
        ))}

        {/* Film grain overlay */}
        <div className="hero-grain" style={{
          position: "absolute", inset: "-30%",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.038,
          pointerEvents: "none",
          animation: "grain 0.4s steps(1) infinite",
        }} />

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(0deg, #020208 0%, transparent 100%)" }} />
      </div>

      {/* ── Main content ── */}
      <motion.div
        className="gpu rsp-hero-content"
        style={{ y, opacity, position: "relative", zIndex: 10, maxWidth: "80rem", margin: "0 auto", padding: "7rem 1.5rem 0", textAlign: "center" }}
      >
        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0.5rem 1.1rem", borderRadius: 999,
            border: "1px solid rgba(234,179,8,0.25)",
            background: "rgba(234,179,8,0.06)",
            fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 600,
            color: "rgba(253,224,71,0.85)", letterSpacing: "0.08em",
          }}
        >
          <MapPin size={13} />
          La Cisterna, Santiago de Chile
        </motion.div>

        {/* Título */}
        <div style={{ overflow: "hidden", marginTop: "1.5rem" }}>
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ fontFamily: "var(--font-bebas)", margin: 0, lineHeight: 1.05 }}
          >
            {/* Línea 1 — servicios, protagonista */}
            <span style={{ display: "block", fontSize: "clamp(2.4rem, 7vw, 4.6rem)", letterSpacing: "-0.01em" }}>
              <span style={{ color: "#C89116" }}>
                Detallado
              </span>
              <span style={{ color: "rgba(203,213,225,0.4)" }}> y </span>
              <span style={{ color: "#2AA9C4" }}>
                Mantenimiento
              </span>
            </span>

            {/* Línea 2 — contexto, subordinada */}
            <span style={{
              display: "block", fontSize: "clamp(1.2rem, 3.2vw, 2.2rem)",
              letterSpacing: "0.03em", marginTop: "0.5rem",
              color: "rgba(226,232,240,0.5)", fontWeight: 400,
            }}>
              automotriz en Santiago de Chile
            </span>
          </motion.h1>
        </div>

        {/* Neon separator */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 3, width: 120, margin: "1.5rem auto 0",
            background: "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #F97316 70%, transparent 100%)",
            boxShadow: "0 0 24px rgba(6,182,212,0.5), 0 0 48px rgba(249,115,22,0.3)",
          }}
        />

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.8)", fontSize: "clamp(15px,1.6vw,19px)", maxWidth: 480, margin: "1.5rem auto 0", lineHeight: 1.7 }}
        >
          {heroTagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16, marginTop: "2.5rem" }}
        >
          {/* Primary — Detailing */}
          <a href="#contacto" style={{ position: "relative", display: "inline-block" }}>
            <span style={{
              position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: 10,
              padding: "1rem 2rem",
              borderRadius: 999,
              fontFamily: "var(--font-space)", fontWeight: 700, fontSize: 13,
              color: "#0a0a0a",
              background: "linear-gradient(135deg, #EAB308 0%, #FDE047 50%, #EAB308 100%)",
              boxShadow: "0 0 40px rgba(234,179,8,0.4)",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}>
              <Zap size={15} />
              Cotizar Detailing Automotriz
            </span>
            {/* Pulse ring */}
            <span style={{
              position: "absolute", inset: 0, borderRadius: 999,
              border: "1px solid rgba(249,115,22,0.5)",
              animation: "pulse-ring 2.5s ease-out infinite",
            }} />
          </a>

          {/* Secondary — Mantenimiento */}
          <a
            href="#contacto"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "1rem 2rem",
              borderRadius: 999,
              fontFamily: "var(--font-space)", fontWeight: 700, fontSize: 13,
              color: "#67E8F9",
              border: "1px solid rgba(6,182,212,0.4)",
              background: "rgba(6,182,212,0.06)",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}
          >
            <Wrench size={15} />
            Cotizar Mantenimiento Automotriz
          </a>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.7 }}
          style={{ fontFamily: "var(--font-inter)", fontSize: 12.5, color: "rgba(203,213,225,0.45)", marginTop: "1.25rem" }}
        >
          Cotiza <span style={{ color: "rgba(253,224,71,0.75)", fontWeight: 600 }}>100% Gratis</span> el servicio ideal para tu vehículo. Te respondemos en menos de 12hrs hábiles.
        </motion.p>

        {/* Mini stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 32, marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            { num: "400+", label: "Autos detallados" },
            { num: "5★", label: "Valoración promedio" },
            { num: "1 Día", label: "Entrega express" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{
                fontFamily: "var(--font-bebas)", fontSize: "1.5rem",
                background: "linear-gradient(105deg, #A16207 0%, #EAB308 40%, #FDE047 60%, #EAB308 80%, #A16207 100%)",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "shimmer 3s linear infinite",
                margin: 0,
              }}>
                {num}
              </p>
              <p style={{ fontFamily: "var(--font-space)", fontSize: 10, color: "rgba(203,213,225,0.3)", letterSpacing: "0.15em", textTransform: "uppercase", margin: 0 }}>
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}>
          <ArrowDown size={18} style={{ color: "rgba(203,213,225,0.2)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
