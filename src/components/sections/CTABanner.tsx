"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const items = ["DETAILING EXTERIOR", "CERÁMICA", "INTERIOR", "FAROS", "PRE-VENTA", "MANTENCIÓN"];

export function CTABanner() {
  const doubled = [...items, ...items, ...items, ...items];

  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      {/* GOLD background — the only bright section on the page */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #92400E 0%, #D97706 25%, #EAB308 55%, #FDE047 75%, #EAB308 90%, #CA8A04 100%)",
      }} />
      {/* Subtle dark overlay for depth */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
      {/* Noise texture effect via radial gradients */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,0,0,0.15) 0%, transparent 50%)",
      }} />

      {/* Marquee — service names in dark */}
      <div style={{ overflow: "hidden", paddingTop: "3.5rem", marginBottom: "0.5rem" }}>
        <div className="flex animate-marquee">
          {doubled.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <span style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(2.2rem,5vw,4rem)",
                color: "rgba(0,0,0,0.18)",
                letterSpacing: "0.08em",
                padding: "0 1.75rem",
                whiteSpace: "nowrap",
              }}>
                {item}
              </span>
              <span style={{ color: "rgba(0,0,0,0.15)", fontSize: 14, flexShrink: 0 }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ position: "relative", maxWidth: "56rem", margin: "0 auto", padding: "1.5rem 1.5rem 4.5rem", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2.8rem,6.5vw,6rem)",
            lineHeight: 0.92,
            color: "#000",
            margin: "0 0 1rem",
            letterSpacing: "0.01em",
          }}
        >
          ¿LISTO PARA<br />TRANSFORMAR<br />TU AUTO?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 15,
            color: "rgba(0,0,0,0.5)",
            marginBottom: "2.25rem",
          }}
        >
          Cotización gratuita · Respuesta en menos de 24h · La Cisterna, Santiago
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.38 }}
          style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.875rem" }}
        >
          <a
            href="#contacto"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "1rem 2rem",
              borderRadius: 999,
              fontFamily: "var(--font-space)",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              background: "#000",
              color: "#EAB308",
              textDecoration: "none",
            }}
          >
            <Zap size={15} />
            COTIZAR AHORA — GRATIS
          </a>

          <a
            href="https://wa.me/56952095222"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "1rem 2rem",
              borderRadius: 999,
              fontFamily: "var(--font-space)",
              fontSize: 13,
              fontWeight: 500,
              background: "rgba(0,0,0,0.12)",
              color: "rgba(0,0,0,0.75)",
              border: "1.5px solid rgba(0,0,0,0.2)",
              textDecoration: "none",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp directo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
