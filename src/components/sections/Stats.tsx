"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Vehículos Detallados", color: "#0066FF" },
  { value: 98, suffix: "%", label: "Clientes Satisfechos", color: "#7B2FFF" },
  { value: 5, suffix: "+", label: "Años de Experiencia", color: "#C9A84C" },
  { value: 1, suffix: " Día", label: "Entrega Express", color: "#FF006E" },
];

function AnimatedCounter({ value, suffix, color }: { value: number; suffix: string; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = value / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-bebas tabular-nums" style={{ color }}>
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Separator lines */}
      <div className="section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group"
            >
              {/* Number */}
              <div className="text-[clamp(3rem,7vw,6rem)] leading-none mb-2 relative">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} color={stat.color} />
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ background: stat.color }}
                />
              </div>

              {/* Label */}
              <p className="font-space text-white/40 text-xs tracking-wider uppercase">
                {stat.label}
              </p>

              {/* Underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.12 + 0.4, duration: 0.5 }}
                className="mx-auto mt-3 h-px w-12"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
}
