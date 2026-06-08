"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

const PHOTOS = [
  "/trabajos/resultados/IMG_1152.jpg",
  "/trabajos/resultados/IMG_1329.jpg",
  "/trabajos/resultados/IMG_1671.jpg",
  "/trabajos/resultados/IMG_1960.jpg",
  "/trabajos/resultados/IMG_3239.jpg",
  "/trabajos/resultados/IMG_3664.jpg",
  "/trabajos/resultados/IMG_3724.jpg",
  "/trabajos/resultados/IMG_3999.jpg",
  "/trabajos/resultados/IMG_4306.jpg",
  "/trabajos/resultados/IMG_4347.jpg",
  "/trabajos/resultados/IMG_4371.jpg",
  "/trabajos/resultados/IMG_4375.jpg",
  "/trabajos/resultados/IMG_4486.jpg",
];

export function Gallery() {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <section style={{ position: "relative", background: "#030310", padding: "3rem 1.5rem", overflow: "hidden" }}>
      <div style={{ maxWidth: "82rem", margin: "0 auto" }}>

        {/* Header + Toggle */}
        <div ref={headRef} style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-space)", fontSize: 10, color: "rgba(6,182,212,0.7)", letterSpacing: "0.45em", textTransform: "uppercase", margin: "0 0 6px" }}>
            Nuestros trabajos
          </p>
          <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,4vw,3.5rem)", lineHeight: 1, margin: "0 0 1.5rem", color: "#fff" }}>
            GALERÍA DE{" "}
            <span style={{
              background: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              RESULTADOS
            </span>
          </h2>

          <button
            onClick={() => setOpen((v) => !v)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "0.9rem 2rem", borderRadius: 999,
              background: open ? "rgba(6,182,212,0.12)" : "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15))",
              border: `1px solid ${open ? "rgba(6,182,212,0.4)" : "rgba(6,182,212,0.25)"}`,
              fontFamily: "var(--font-space)", fontSize: 14, fontWeight: 700,
              color: "#06B6D4",
              cursor: "pointer", transition: "all 0.3s",
              letterSpacing: "0.04em",
              boxShadow: "0 0 30px rgba(6,182,212,0.1)",
            }}
          >
            <span style={{ fontSize: 16 }}>🖼</span>
            {open ? "Ocultar galería" : `Ver ${PHOTOS.length} trabajos realizados`}
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ fontSize: 12 }}>
              ▼
            </motion.span>
          </button>
        </div>

        {/* Collapsible grid */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingTop: "2rem" }}>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "rgba(203,213,225,0.3)", margin: "0 0 1.5rem", textAlign: "center" }}>
                  Haz clic en cualquier foto para verla en detalle
                </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}>
          {PHOTOS.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelected(src)}
              style={{
                position: "relative",
                aspectRatio: i % 5 === 0 ? "4/5" : i % 3 === 0 ? "16/9" : "4/3",
                borderRadius: 16,
                overflow: "hidden",
                cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Image
                src={src}
                alt={`Trabajo ${i + 1}`}
                fill
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {/* Hover overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "rgba(0,0,0,0)",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.3s",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.35)";
                  const img = e.currentTarget.previousSibling as HTMLImageElement;
                  if (img) img.style.transform = "scale(1.05)";
                  const icon = e.currentTarget.querySelector("svg")?.parentElement;
                  if (icon) icon.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0)";
                  const img = e.currentTarget.previousSibling as HTMLImageElement;
                  if (img) img.style.transform = "scale(1)";
                  const icon = e.currentTarget.querySelector("svg")?.parentElement;
                  if (icon) icon.style.opacity = "0";
                }}
              >
                <div style={{
                  opacity: 0, transition: "opacity 0.3s",
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <ZoomIn size={20} style={{ color: "#fff" }} />
                </div>
              </div>
            </motion.div>
          ))}
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 100,
              background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "2rem",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative", maxWidth: "90vw", maxHeight: "90vh",
                borderRadius: 20, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <img
                src={selected}
                alt="Resultado"
                style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", display: "block" }}
              />
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: "absolute", top: 12, right: 12,
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff",
                }}
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
