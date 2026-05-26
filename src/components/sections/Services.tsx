"use client";

import { useRef, useState, MouseEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Droplets, Cpu, Armchair, Lightbulb, TrendingUp, Wrench } from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Detailing Exterior",
    tag: "Exterior",
    desc: "Protege y restaura el brillo original de la carrocería. Descontaminamos la pintura, eliminamos micro-rayones y aplicamos sellantes de alta calidad.",
    color: "#3B82F6",
    glow: "rgba(59,130,246,0.28)",
    index: "01",
  },
  {
    icon: Cpu,
    title: "Recubrimiento Cerámico",
    tag: "Premium",
    desc: "Protección de nivel nanotecnológico contra agentes químicos, rayos UV y manchas de agua. Brillo profundo e hidrofóbico extremo.",
    color: "#8B5CF6",
    glow: "rgba(139,92,246,0.28)",
    featured: true,
    index: "02",
  },
  {
    icon: Armchair,
    title: "Detailing Interior",
    tag: "Interior",
    desc: "Renovación profunda del habitáculo con desinfección, remoción de manchas y acondicionamiento profesional de plásticos, cuero y textiles.",
    color: "#EC4899",
    glow: "rgba(236,72,153,0.28)",
    index: "03",
  },
  {
    icon: Lightbulb,
    title: "Restauración de Faros",
    tag: "Restauración",
    desc: "Elimina el amarillamiento y opacidad para restaurar la capacidad de iluminación y la seguridad del vehículo.",
    color: "#06B6D4",
    glow: "rgba(6,182,212,0.28)",
    index: "04",
  },
  {
    icon: TrendingUp,
    title: "Preparación Pre-Venta",
    tag: "Valor",
    desc: "Preparación estratégica del vehículo diseñada para maximizar el atractivo comercial y el valor de mercado.",
    color: "#EAB308",
    glow: "rgba(234,179,8,0.28)",
    index: "05",
  },
  {
    icon: Wrench,
    title: "Mantención Automotriz",
    tag: "Mantención",
    desc: "Cuidado preventivo y técnico usando lubricantes y filtros premium para un rendimiento óptimo del motor.",
    color: "#84CC16",
    glow: "rgba(132,204,22,0.28)",
    index: "06",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: -x * 10 });
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.1s" : "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
      }}
      className="relative group rounded-2xl overflow-hidden"
    >
      {/* Glow border ring on hover */}
      <motion.div
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `0 0 0 1px ${service.color}45, 0 0 70px ${service.glow}` }}
      />

      {/* Card body */}
      <div
        className="relative p-7 rounded-2xl h-full border border-white/[0.06]"
        style={{
          background: hovered
            ? `radial-gradient(ellipse 220px 120px at 50% 0%, ${service.color}0A 0%, #0F0F24 65%)`
            : "#0F0F24",
          transition: "background 0.5s ease",
        }}
      >
        {/* Ghost index number */}
        <span
          className="absolute top-5 right-5 font-bebas text-7xl leading-none pointer-events-none select-none transition-opacity duration-500"
          style={{ color: service.color, opacity: hovered ? 0.07 : 0.03 }}
        >
          {service.index}
        </span>

        {/* Featured badge */}
        {service.featured && (
          <div
            className="absolute top-5 right-5 px-2.5 py-1 rounded-full text-[10px] font-space font-semibold tracking-wider uppercase z-10"
            style={{ background: `${service.color}18`, color: service.color, border: `1px solid ${service.color}35` }}
          >
            Destacado
          </div>
        )}

        {/* Icon */}
        <div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110"
          style={{ background: `${service.color}10`, border: `1px solid ${service.color}20` }}
        >
          <Icon size={22} style={{ color: service.color }} />
          <motion.div
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-xl"
            style={{ boxShadow: `0 0 28px ${service.glow}` }}
          />
        </div>

        {/* Tag */}
        <span
          className="inline-block text-[10px] font-space font-semibold tracking-[0.25em] uppercase mb-3"
          style={{ color: service.color }}
        >
          {service.tag}
        </span>

        {/* Title */}
        <h3 className="font-space font-bold text-white text-lg mb-3 leading-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="font-inter text-chrome/40 text-sm leading-relaxed mb-5">
          {service.desc}
        </p>

        {/* Arrow CTA */}
        <div
          className="flex items-center gap-2 text-xs font-space font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1"
          style={{ color: service.color }}
        >
          Saber más <span>→</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true });

  return (
    <section id="servicios" className="relative py-32 overflow-hidden" style={{ background: "#07071A" }}>
      {/* Background accent glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block font-space text-xs text-neon-blue tracking-[0.4em] uppercase mb-4"
          >
            ¿Qué hacemos?
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 70 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-[clamp(3rem,8vw,7rem)] leading-none"
            >
              NUESTROS{" "}
              <span className="gradient-text">SERVICIOS</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-inter text-chrome/40 text-base max-w-xl mx-auto mt-4"
          >
            Cada vehículo recibe atención individualizada con productos de categoría profesional.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-space text-sm font-medium text-chrome/60 border border-white/10 hover:border-neon-blue/30 hover:text-neon-blue transition-all duration-300"
          >
            Consulta por tu servicio →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
