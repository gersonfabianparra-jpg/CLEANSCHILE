"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

type Pair = {
  before: string;
  after: string;
  label: string;
  service: string;
};

// Agrega aquí cada par de imágenes
const PAIRS: Pair[] = [
  {
    before:  "/trabajos/IMG_5104.jpg",
    after:   "/trabajos/IMG_5114.jpg",
    label:   "Corrección de Pintura",
    service: "Detallado Exterior",
  },
  {
    before:  "/trabajos/D68BCFA9-3A41-43B7-A0FC-B26EA40E958A.jpg",
    after:   "/trabajos/0F863A68-4AF8-4DEF-8D11-25D31188C82B.jpg",
    label:   "Limpieza de Tapizado",
    service: "Detallado Interior",
  },
  {
    before:  "/trabajos/5C13D4A1-5D9B-4AC7-8872-5B971785337D.jpg",
    after:   "/trabajos/D5753914-8839-411F-B54D-C0B89F34781F.jpg",
    label:   "Limpieza de Motor",
    service: "Mantención Automotriz",
  },
  {
    before:  "/trabajos/5D667D31-1105-4F99-B5F8-3EBE38AD267C.jpg",
    after:   "/trabajos/0203023A-DDED-4AD7-910E-E26910A13C6E.jpg",
    label:   "Pulido de Rines",
    service: "Detallado Exterior",
  },
  {
    before:  "/trabajos/E9F818F8-F820-4A5B-A0A3-86B7BC2C990B.jpg",
    after:   "/trabajos/A27CB263-7521-40FC-A74B-125954107EA7.jpg",
    label:   "Pulido de Focos",
    service: "Pulido de Focos",
  },
];

function SliderCard({ pair, index }: { pair: Pair; index: number }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(2, Math.min(clientX - rect.left, rect.width - 2));
    setPos((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => { window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up); };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "flex", flexDirection: "column", gap: 12 }}
    >
      {/* Slider */}
      <div
        ref={containerRef}
        onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
        onMouseMove={(e) => { if (dragging.current) move(e.clientX); }}
        onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX); }}
        onTouchMove={(e) => { if (dragging.current) move(e.touches[0].clientX); }}
        style={{
          position: "relative", aspectRatio: "4/3", borderRadius: 20, overflow: "hidden",
          cursor: "ew-resize", userSelect: "none",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* After (right side — full) */}
        <Image src={pair.after} alt="Después" fill style={{ objectFit: "cover" }} sizes="(max-width:768px) 100vw, 33vw" />

        {/* Before (left side — clipped) */}
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={pair.before} alt="Antes" fill style={{ objectFit: "cover" }} sizes="(max-width:768px) 100vw, 33vw" />
        </div>

        {/* Divider */}
        <div style={{
          position: "absolute", top: 0, bottom: 0,
          left: `${pos}%`, transform: "translateX(-50%)",
          width: 2, background: "rgba(255,255,255,0.9)",
          boxShadow: "0 0 12px rgba(255,255,255,0.5)",
          pointerEvents: "none",
        }}>
          {/* Handle */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 36, height: 36, borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 2px 16px rgba(0,0,0,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 7H1M1 7L3 5M1 7L3 9" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 7H13M13 7L11 5M13 7L11 9" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ANTES label */}
        <div style={{
          position: "absolute", top: 12, left: 14,
          fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 700,
          color: "#fff", letterSpacing: "0.15em",
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
          padding: "3px 10px", borderRadius: 999,
          opacity: pos > 15 ? 1 : 0, transition: "opacity 0.2s",
        }}>
          ANTES
        </div>

        {/* DESPUÉS label */}
        <div style={{
          position: "absolute", top: 12, right: 14,
          fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 700,
          color: "#fff", letterSpacing: "0.15em",
          background: "rgba(6,182,212,0.55)", backdropFilter: "blur(8px)",
          padding: "3px 10px", borderRadius: 999,
          opacity: pos < 85 ? 1 : 0, transition: "opacity 0.2s",
        }}>
          DESPUÉS
        </div>
      </div>

      {/* Info */}
      <div>
        <p style={{ fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 600, color: "#fff", margin: "0 0 2px" }}>{pair.label}</p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(203,213,225,0.35)", margin: 0 }}>{pair.service}</p>
      </div>
    </motion.div>
  );
}

export function BeforeAfter() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-80px" });

  if (PAIRS.length === 0) return null;

  return (
    <section style={{ position: "relative", background: "#040412", padding: "7rem 1.5rem", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: 800, height: 400, pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(234,179,8,0.03) 0%, transparent 65%)",
      }} />

      <div style={{ maxWidth: "82rem", margin: "0 auto" }}>
        {/* Header */}
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.span
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ display: "inline-block", fontFamily: "var(--font-space)", fontSize: 10, color: "rgba(234,179,8,0.65)", letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: "0.9rem" }}
          >
            Resultados reales
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.4rem,6vw,4.8rem)", lineHeight: 1, margin: "0 0 1rem", color: "#fff" }}
          >
            ANTES &{" "}
            <span style={{
              background: "linear-gradient(135deg, #A16207 0%, #EAB308 50%, #FDE047 75%, #EAB308 90%, #CA8A04 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              DESPUÉS
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "rgba(203,213,225,0.4)", margin: 0 }}
          >
            Arrastra el divisor para comparar el resultado
          </motion.p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
          {PAIRS.map((pair, i) => (
            <SliderCard key={i} pair={pair} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
