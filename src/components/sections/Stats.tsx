"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 500, suffix: "+", label: "Vehículos Detallados", color: "#3B82F6" },
  { value: 98, suffix: "%", label: "Clientes Satisfechos", color: "#8B5CF6" },
  { value: 5, suffix: "+", label: "Años de Experiencia", color: "#EAB308" },
  { value: 1, suffix: " Día", label: "Entrega Express", color: "#EC4899" },
];

function AnimatedCounter({
  value,
  suffix,
  color,
  active,
}: {
  value: number;
  suffix: string;
  color: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
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
  }, [active, value]);

  return (
    <span className="font-bebas tabular-nums" style={{ color }}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 overflow-hidden bg-midnight">
      <div className="section-divider" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/[0.05]"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-center group px-6"
            >
              {/* Number */}
              <div className="relative text-[clamp(3.5rem,7vw,6.5rem)] leading-none mb-1 inline-block">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  color={stat.color}
                  active={inView}
                />
                {/* Glow behind */}
                <motion.div
                  animate={inView ? { opacity: 0.1 } : { opacity: 0 }}
                  transition={{ delay: i * 0.12 + 0.6, duration: 1 }}
                  className="absolute inset-0 blur-3xl pointer-events-none"
                  style={{ background: stat.color }}
                />
              </div>

              {/* Label */}
              <p className="font-space text-chrome/40 text-xs tracking-wider uppercase mt-1">
                {stat.label}
              </p>

              {/* Underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ delay: i * 0.12 + 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-3 h-px w-12"
                style={{
                  background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                  transformOrigin: "center",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider" />
    </section>
  );
}
