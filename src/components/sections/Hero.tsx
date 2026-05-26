"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowDown, Zap } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

const ROTATING_WORDS = ["Detailing", "Protección", "Perfección", "Excelencia", "Precisión"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ position: "relative", display: "inline-block", overflow: "hidden", height: "1.1em", verticalAlign: "bottom" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-block",
            background: "linear-gradient(105deg, #A16207 0%, #EAB308 25%, #FDE047 50%, #EAB308 75%, #A16207 100%)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s linear infinite",
          }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* Spark particles */
type Spark = { id: number; x: number; y: number; size: number; color: string; delay: number; duration: number };
const COLORS = ["#3B82F6", "#8B5CF6", "#06B6D4", "#EAB308", "#EC4899", "#CBD5E1"];
const SPARKS: Spark[] = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  delay: Math.random() * 10,
  duration: Math.random() * 8 + 8,
}));

/* Light beam angles */
const BEAMS = [
  { angle: -35, opacity: 0.06, width: 180, delay: 0 },
  { angle: -20, opacity: 0.1, width: 120, delay: 0.5 },
  { angle: -5, opacity: 0.07, width: 200, delay: 1 },
  { angle: 12, opacity: 0.09, width: 150, delay: 0.3 },
  { angle: 28, opacity: 0.06, width: 160, delay: 0.8 },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, -180]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

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

        {/* Deep blue atmospheric glow — top */}
        <div style={{
          position: "absolute", top: "-20%", left: "50%", transform: "translateX(-50%)",
          width: "80vw", height: "60vh",
          background: "radial-gradient(ellipse, rgba(30,30,120,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />

        {/* Spotlight blobs */}
        <motion.div
          className="animate-spotlight-1"
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
          className="animate-spotlight-2"
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
          className="animate-spotlight-3"
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
            style={{
              position: "absolute",
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size,
              borderRadius: "50%",
              backgroundColor: s.color,
              boxShadow: `0 0 ${s.size * 5}px ${s.color}`,
            }}
            animate={{ y: [0, -140, -280], x: [0, (Math.random() - 0.5) * 80], opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeOut" }}
          />
        ))}

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 200, background: "linear-gradient(0deg, #020208 0%, transparent 100%)" }} />
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y, opacity, position: "relative", zIndex: 10, maxWidth: "80rem", margin: "0 auto", padding: "7rem 1.5rem 0", textAlign: "center" }}
      >
        {/* Badge — logo + tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 40 }}
        >
          <div style={{ height: 1, width: 40, background: "linear-gradient(90deg, transparent, #06B6D4)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LogoMark size={28} />
            <span style={{ fontFamily: "var(--font-space)", fontSize: 11, letterSpacing: "0.35em", color: "rgba(203,213,225,0.5)", textTransform: "uppercase" as const }}>
              Taller Premium · La Cisterna
            </span>
          </div>
          <div style={{ height: 1, width: 40, background: "linear-gradient(270deg, transparent, #06B6D4)" }} />
        </motion.div>

        {/* CLEANS */}
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(5.5rem, 20vw, 19rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
              margin: 0,
              background: "linear-gradient(135deg, #94A3B8 0%, #F1F5F9 25%, #CBD5E1 50%, #F8FAFC 70%, #94A3B8 100%)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            CLEANS
          </motion.h1>
        </div>

        {/* CHILE */}
        <div style={{ overflow: "hidden" }}>
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(5.5rem, 20vw, 19rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.01em",
              margin: 0,
              background: "linear-gradient(105deg, #A16207 0%, #EAB308 25%, #FDE047 50%, #EAB308 75%, #A16207 100%)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s linear infinite",
            }}
          >
            CHILE
          </motion.h1>
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, margin: "2rem 0" }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 1, flex: 1, maxWidth: 120, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.5))", transformOrigin: "right" }}
          />
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.85 }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", boxShadow: "0 0 20px #3B82F6, 0 0 60px rgba(59,130,246,0.4)" }} />
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ fontFamily: "var(--font-space)", fontSize: 13, color: "rgba(203,213,225,0.45)", letterSpacing: "0.3em", textTransform: "uppercase", margin: 0 }}
          >
            <RotatingWord /> Automotriz
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.85 }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#EAB308", boxShadow: "0 0 20px #EAB308, 0 0 60px rgba(234,179,8,0.4)" }} />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: 1, flex: 1, maxWidth: 120, background: "linear-gradient(270deg, transparent, rgba(234,179,8,0.5))", transformOrigin: "left" }}
          />
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.4)", fontSize: "clamp(14px,1.5vw,18px)", maxWidth: 420, margin: "0 auto 2.5rem", lineHeight: 1.7 }}
        >
          Nanotecnología y precisión. Tu vehículo transformado al nivel que merece.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 16 }}
        >
          {/* Primary */}
          <a href="#contacto" style={{ position: "relative", display: "inline-block" }}>
            <span style={{
              position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: 10,
              padding: "1rem 2rem",
              borderRadius: 999,
              fontFamily: "var(--font-space)", fontWeight: 700, fontSize: 13,
              color: "#fff",
              background: "linear-gradient(135deg, #EAB308 0%, #FDE047 50%, #EAB308 100%)",
              boxShadow: "0 0 40px rgba(234,179,8,0.4)",
              textDecoration: "none",
              letterSpacing: "0.03em",
            }}>
              <Zap size={15} />
              Cotizar Ahora
            </span>
            {/* Pulse ring */}
            <span style={{
              position: "absolute", inset: 0, borderRadius: 999,
              border: "1px solid rgba(249,115,22,0.5)",
              animation: "pulse-ring 2.5s ease-out infinite",
            }} />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/56952095222"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "1rem 2rem",
              borderRadius: 999,
              fontFamily: "var(--font-space)", fontSize: 13,
              color: "rgba(203,213,225,0.55)",
              border: "1px solid rgba(255,255,255,0.1)",
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#25D366" }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp directo
          </a>
        </motion.div>

        {/* Mini stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 32, marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {[
            { num: "300+", label: "Autos detallados" },
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
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={18} style={{ color: "rgba(203,213,225,0.2)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
