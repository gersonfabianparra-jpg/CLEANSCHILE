"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CATEGORIES = ["Todo", "Exterior", "Interior", "Cerámica", "Pre-Venta"];

const WORKS = [
  {
    id: 1,
    category: "Cerámica",
    title: "Sellado Cerámico Koch Chemie",
    car: "BMW Serie 3 — Negro",
    img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop&q=80",
    span: "col-span-2",
    color: "#8B5CF6",
  },
  {
    id: 2,
    category: "Exterior",
    title: "Pulido y Corrección de Pintura",
    car: "Toyota Corolla — Rojo",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80",
    span: "col-span-1",
    color: "#3B82F6",
  },
  {
    id: 3,
    category: "Interior",
    title: "Full Interior Detailing",
    car: "Mercedes-Benz — Interior Cuero",
    img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=800&auto=format&fit=crop&q=80",
    span: "col-span-1",
    color: "#EC4899",
  },
  {
    id: 4,
    category: "Exterior",
    title: "Descontaminación y Pulido",
    car: "Honda Civic — Plata",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    span: "col-span-1",
    color: "#06B6D4",
  },
  {
    id: 5,
    category: "Pre-Venta",
    title: "Preparación Pre-Venta Completa",
    car: "Hyundai Tucson — Blanco",
    img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80",
    span: "col-span-1",
    color: "#EAB308",
  },
  {
    id: 6,
    category: "Cerámica",
    title: "Recubrimiento Carpro Cquartz",
    car: "Mazda CX-5 — Gris",
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80",
    span: "col-span-2",
    color: "#F97316",
  },
];

export function Work() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("Todo");

  const filtered = activeCategory === "Todo"
    ? WORKS
    : WORKS.filter((w) => w.category === activeCategory);

  return (
    <section id="trabajos" style={{ background: "#030310", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.4), rgba(6,182,212,0.4), transparent)",
      }} />

      <div ref={ref} style={{ maxWidth: "82rem", margin: "0 auto", padding: "6rem 1.5rem 5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            style={{ fontFamily: "var(--font-space)", fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#F97316", marginBottom: "1rem" }}
          >
            Resultados reales
          </motion.p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                initial={{ y: 80 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.95, margin: 0, color: "#fff" }}
              >
                NUESTRO{" "}
                <span style={{
                  background: "linear-gradient(135deg, #F97316 0%, #EAB308 50%, #06B6D4 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  TRABAJO
                </span>
              </motion.h2>
            </div>

            {/* Category filters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    fontFamily: "var(--font-space)", fontSize: 11, fontWeight: 600,
                    padding: "6px 14px", borderRadius: 999, border: "1px solid",
                    cursor: "pointer", transition: "all 0.25s",
                    background: activeCategory === cat ? "#F97316" : "transparent",
                    borderColor: activeCategory === cat ? "#F97316" : "rgba(255,255,255,0.12)",
                    color: activeCategory === cat ? "#000" : "rgba(203,213,225,0.5)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          className="grid-cols-1 md:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={work.span}
                style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: work.span === "col-span-2" ? "16/9" : "4/5", cursor: "default" }}
              >
                <Image
                  src={work.img}
                  alt={work.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Overlay gradient */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: `linear-gradient(180deg, transparent 30%, rgba(3,3,16,0.85) 100%)`,
                }} />

                {/* Color accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 3,
                  background: work.color,
                  opacity: 0.85,
                }} />

                {/* Category badge */}
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 700,
                  color: work.color, background: `${work.color}15`,
                  border: `1px solid ${work.color}30`,
                  padding: "4px 10px", borderRadius: 999,
                  letterSpacing: "0.15em", textTransform: "uppercase",
                }}>
                  {work.category}
                </div>

                {/* Info */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontFamily: "var(--font-bebas)", fontSize: "1.4rem", color: "#fff", margin: "0 0 4px", lineHeight: 1 }}>
                    {work.title}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "rgba(203,213,225,0.5)", margin: 0 }}>
                    {work.car}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "2rem", fontFamily: "var(--font-inter)", fontSize: 12, color: "rgba(203,213,225,0.25)" }}
        >
          Imágenes referenciales · Resultados reales disponibles en nuestro Instagram
        </motion.p>
      </div>
    </section>
  );
}
