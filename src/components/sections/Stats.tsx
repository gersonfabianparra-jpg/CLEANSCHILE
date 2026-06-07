"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 300, suffix: "+", label: "Vehículos Atendidos", color: "#3B82F6" },
  { value: 5,   suffix: "",  label: "Años de Experiencia", color: "#8B5CF6" },
  { value: 5,   suffix: "",  label: "Marcas Premium", color: "#EAB308" },
  { value: 1,   suffix: "",  label: "Entrega en el Día*", color: "#EC4899" },
];

function Counter({ value, suffix, color, active }: { value: number; suffix: string; color: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 2200;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4); // quartic easeOut — fast start, smooth decel
      setCount(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span style={{ color, fontFamily: "var(--font-bebas)", fontVariantNumeric: "tabular-nums" }}>
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #040412 0%, #060618 50%, #040412 100%)" }}>
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), rgba(139,92,246,0.25), transparent)" }} />

      {/* Ghost year — current year */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", userSelect: "none",
      }}>
        <span style={{ fontFamily: "var(--font-bebas)", fontSize: "28vw", color: "rgba(255,255,255,0.012)", lineHeight: 1, whiteSpace: "nowrap" }}>
          {new Date().getFullYear()}
        </span>
      </div>

      <div ref={ref} style={{ maxWidth: "82rem", margin: "0 auto" }}>
        <div className="rsp-stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "4rem 2rem",
                textAlign: "center",
                position: "relative",
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.12 + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: 48, height: 2, background: s.color, transformOrigin: "center",
                }}
              />
              <div style={{ position: "relative", lineHeight: 1, marginBottom: "0.75rem" }}>
                <div style={{ fontSize: "clamp(4rem,9vw,8rem)" }}>
                  <Counter value={s.value} suffix={s.suffix} color={s.color} active={inView} />
                </div>
                <motion.div
                  animate={inView ? { opacity: 0.08 } : { opacity: 0 }}
                  transition={{ delay: i * 0.12 + 0.6, duration: 1 }}
                  style={{ position: "absolute", inset: 0, background: s.color, filter: "blur(40px)", pointerEvents: "none" }}
                />
              </div>
              <p style={{ fontFamily: "var(--font-space)", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(203,213,225,0.7)", margin: 0 }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brands strip */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1.25rem 2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(16px,4vw,48px)", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "var(--font-space)", fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(203,213,225,0.25)" }}>
            Usamos
          </span>
          {["Storkar", "Carpro", "Sonax", "Alcance", "Soft99"].map((b) => (
            <span key={b} style={{ fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 600, color: "rgba(203,213,225,0.65)", letterSpacing: "0.05em", transition: "color 0.3s" }}>
              {b}
            </span>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), rgba(59,130,246,0.25), transparent)" }} />

      {/* Footnote */}
      <p style={{ fontFamily: "var(--font-inter)", fontSize: 10, color: "rgba(203,213,225,0.2)", textAlign: "center", padding: "0.5rem", margin: 0 }}>
        * En la mayoría de los casos. Tratamientos complejos pueden requerir 2–5 días.
      </p>
    </section>
  );
}
