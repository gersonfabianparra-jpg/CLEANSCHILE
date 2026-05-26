"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 500, suffix: "+", label: "Vehículos Detallados", color: "#3B82F6" },
  { value: 98, suffix: "%", label: "Clientes Satisfechos", color: "#8B5CF6" },
  { value: 5, suffix: "+", label: "Años de Experiencia", color: "#EAB308" },
  { value: 1, suffix: " Día", label: "Entrega Express", color: "#EC4899" },
];

function Counter({ value, suffix, color, active }: { value: number; suffix: string; color: string; active: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let n = 0;
    const dur = 2000, step = 14;
    const inc = value / (dur / step);
    const t = setInterval(() => {
      n += inc;
      if (n >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(n));
    }, step);
    return () => clearInterval(t);
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
      {/* Top / bottom dividers */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.25), rgba(139,92,246,0.25), transparent)" }} />

      {/* Background ghost text */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", userSelect: "none",
      }}>
        <span style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "28vw",
          color: "rgba(255,255,255,0.012)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}>
          DATOS
        </span>
      </div>

      <div ref={ref} style={{ maxWidth: "82rem", margin: "0 auto", padding: "5rem 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
        }}
          className="grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "3rem 2rem",
                textAlign: "center",
                position: "relative",
                borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Colored top accent bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.12 + 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: 48, height: 2,
                  background: s.color,
                  transformOrigin: "center",
                }}
              />

              {/* Giant number */}
              <div style={{ position: "relative", lineHeight: 1, marginBottom: "0.75rem" }}>
                <div style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}>
                  <Counter value={s.value} suffix={s.suffix} color={s.color} active={inView} />
                </div>
                {/* Glow */}
                <motion.div
                  animate={inView ? { opacity: 0.08 } : { opacity: 0 }}
                  transition={{ delay: i * 0.12 + 0.6, duration: 1 }}
                  style={{
                    position: "absolute", inset: 0,
                    background: s.color,
                    filter: "blur(40px)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Label */}
              <p style={{
                fontFamily: "var(--font-space)",
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(203,213,225,0.35)",
                margin: 0,
              }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), rgba(59,130,246,0.25), transparent)" }} />
    </section>
  );
}
