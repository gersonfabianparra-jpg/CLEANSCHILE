"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Sofa, TrendingUp, Wrench, Lightbulb, Droplets, Star, Bike } from "lucide-react";
import Image from "next/image";

type ServiceContent = { title: string; desc: string; price: string };

const SERVICES_BASE = [
  { num: "01", Icon: Sparkles,   tag: "Exterior",   color: "#3B82F6", photo: "/servicios/detallado-exterior/foto.jpg",  title: "Detallado Exterior",    desc: "Protegemos y devolvemos el brillo original a la carrocería. Descontaminamos la pintura, eliminamos micro-rayas y aplicamos selladores de alta calidad para un acabado espejo duradero.", price: "Desde $80.000" },
  { num: "02", Icon: Shield,     tag: "Premium ✦",  color: "#8B5CF6", photo: "/servicios/sellado-ceramico/foto.jpg",     title: "Sellado Cerámico",      desc: "Máxima protección de nivel nanotecnológico contra agentes químicos, rayos UV y marcas de agua. Aporta un brillo profundo insuperable y propiedades hidrofóbicas extremas.", price: "Desde $160.000" },
  { num: "03", Icon: Sofa,       tag: "Interior",   color: "#EC4899", photo: "/servicios/detallado-interior/foto.jpg",  title: "Detallado Interior",    desc: "Una renovación profunda y detallada del habitáculo. Desinfectamos, eliminamos manchas difíciles y acondicionamos plásticos, cuero y textiles con productos de grado profesional.", price: "Desde $70.000" },
  { num: "04", Icon: Lightbulb,  tag: "Llantas",    color: "#EAB308", photo: "/servicios/pulido-focos/foto.jpg",        title: "Limpieza y Pulido de Llantas", desc: "Recupera el brillo y la estética de tus llantas con una limpieza profunda y pulido de alta precisión. Eliminamos suciedad incrustada, óxido y manchas para un resultado impecable.", price: "Desde $35.000" },
  { num: "05", Icon: TrendingUp, tag: "Valor",      color: "#84CC16", photo: "/servicios/pre-venta/foto.jpg",           title: "Tratamiento Pre-Venta", desc: "Preparamos tu vehículo de manera estratégica para destacar en el mercado. Un refresco estético completo diseñado para maximizar su valor comercial y acelerar la venta.", price: "Desde $120.000" },
  { num: "06", Icon: Wrench,     tag: "Mantención", color: "#06B6D4", photo: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&auto=format&fit=crop&q=85", title: "Mantención Automotriz", desc: "Cuidado preventivo y técnico para asegurar el rendimiento óptimo de tu motor. Servicios de mantenimiento express realizados con lubricantes y filtros de grado premium.", price: "Desde $120.000" },
  { num: "07", Icon: Droplets,   tag: "Invierno",   color: "#38BDF8", photo: "/servicios/pack-proteccion-invierno/foto.jpg", title: "Pack Protección Invierno", desc: "Escudo hidrofóbico en pintura y vidrios que repele el agua de lluvia. Protege tu vehículo de la humedad y el frío con una barrera de nanotecnología de alto rendimiento.", price: "Desde $60.000" },
  { num: "08", Icon: Star,       tag: "Lavado",     color: "#F472B6", photo: "/servicios/lavado-boutique/foto.jpg",           title: "Lavado Boutique",           desc: "Limpieza de alta precisión y cuidado minucioso para un acabado impecable. Cada rincón de tu vehículo tratado con los mejores productos y técnicas de detailing profesional.", price: "Desde $25.000" },
  { num: "09", Icon: Bike,       tag: "Motos",      color: "#F97316", photo: "/servicios/detallado-motocicletas/foto.jpg",    title: "Detallado Motocicletas",    desc: "Tratamiento estético de alta precisión y cuidado minucioso para un acabado impecable en dos ruedas. Restauramos y protegemos cada detalle de tu moto con productos de grado profesional.", price: "Desde $70.000" },
];

export function Services({ content }: { content?: ServiceContent[] }) {
  const SERVICES = SERVICES_BASE.map((s, i) => ({
    ...s,
    title: content?.[i]?.title || s.title,
    desc:  content?.[i]?.desc  || s.desc,
    price: content?.[i]?.price || s.price,
  }));
  const searchParams = useSearchParams();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const s = searchParams.get("s");
    if (s !== null) {
      const idx = parseInt(s);
      if (!isNaN(idx) && idx >= 0 && idx < SERVICES.length) setActive(idx);
    }
  }, [searchParams]);
  const svc = SERVICES[active];

  return (
    <section id="servicios">
      {/* ── Tab-based services panel ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "38% 62%",
        height: "100vh", overflow: "hidden", background: "#040412",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
        className="rsp-services-wrap"
      >
        {/* Left panel */}
        <div className="rsp-services-left" style={{
          display: "flex", flexDirection: "column", justifyContent: "center",
          padding: "0 3rem", position: "relative",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}>
          <p style={{ fontFamily: "var(--font-space)", fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(203,213,225,0.6)", marginBottom: "2rem" }}>
            ¿Qué hacemos?
          </p>

          {/* Giant number */}
          <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -48, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--font-bebas)", fontSize: "clamp(4rem,9vw,8rem)",
                  lineHeight: 1, margin: 0, color: svc.color,
                  filter: `drop-shadow(0 0 32px ${svc.color}50)`,
                }}
              >
                {svc.num}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Clickable service list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SERVICES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.num}
                  onClick={() => setActive(i)}
                  style={{
                    padding: "0.85rem 0",
                    minHeight: "3.2rem",
                    borderTop: "none", borderLeft: "none", borderRight: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    display: "flex", alignItems: "center", gap: 14,
                    background: "none",
                    cursor: "pointer", textAlign: "left", width: "100%",
                    transition: "all 0.25s",
                  }}
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1.5 : 1,
                      backgroundColor: isActive ? s.color : "rgba(255,255,255,0.12)",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0 }}
                  />
                  <span style={{
                    fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 600,
                    color: isActive ? "#fff" : "rgba(203,213,225,0.7)",
                    transition: "color 0.3s", letterSpacing: "0.02em",
                  }}>
                    {s.title}
                  </span>
                  {isActive && (
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
                </button>
              );
            })}
          </div>

          {/* Left progress bar */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "rgba(255,255,255,0.04)" }}>
            <motion.div
              animate={{ height: `${((active + 1) / SERVICES.length) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "100%", background: `linear-gradient(180deg, #06B6D4, ${svc.color})` }}
            />
          </div>
        </div>

        {/* Right panel — photo */}
        <div className="rsp-services-right" style={{ position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.97, filter: "blur(4px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "absolute", inset: 0 }}
            >
              <Image
                src={svc.photo}
                alt={svc.title}
                fill
                style={{ objectFit: "cover", filter: "brightness(1.18) contrast(1.06) saturate(1.15)" }}
                sizes="62vw"
                priority={active === 0}
              />
              {/* Diagonal dark overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(105deg, rgba(4,4,18,0.92) 0%, rgba(4,4,18,0.55) 55%, rgba(4,4,18,0.65) 100%)",
              }} />
              {/* Bottom gradient so text always pops */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(0deg, rgba(4,4,18,0.88) 0%, rgba(4,4,18,0.4) 45%, transparent 70%)",
              }} />
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 4,
                background: `linear-gradient(90deg, ${svc.color}, transparent)`,
              }} />
            </motion.div>
          </AnimatePresence>

          {/* Content overlay */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "3rem" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span style={{ fontFamily: "var(--font-space)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: svc.color, display: "block", marginBottom: "0.6rem" }}>
                  {svc.tag}
                </span>
                <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.5rem,4.5vw,4.2rem)", lineHeight: 0.95, color: "#fff", margin: "0 0 1rem" }}>
                  {svc.title}
                </h2>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.9)", maxWidth: "36rem", margin: "0 0 1.5rem" }}>
                  {svc.desc}
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <span style={{
                    fontFamily: "var(--font-space)", fontSize: 14, fontWeight: 700,
                    color: svc.color, background: `${svc.color}15`,
                    border: `1px solid ${svc.color}35`, padding: "8px 20px", borderRadius: 999,
                  }}>
                    {svc.price}
                  </span>
                  {active === 1 ? (
                    <a
                      href="/sellado-ceramico"
                      style={{
                        fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 600,
                        color: "#fff", background: "rgba(139,92,246,0.15)",
                        border: "1px solid rgba(139,92,246,0.35)",
                        padding: "8px 20px", borderRadius: 999, textDecoration: "none",
                      }}
                    >
                      Ver Detalle →
                    </a>
                  ) : (
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
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </section>
  );
}
