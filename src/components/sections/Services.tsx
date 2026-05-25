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
    color: "#0066FF",
    glow: "rgba(0,102,255,0.25)",
    gradient: "from-[#0066FF]/10 to-transparent",
  },
  {
    icon: Cpu,
    title: "Recubrimiento Cerámico",
    tag: "Premium",
    desc: "Protección de nivel nanotecnológico contra agentes químicos, rayos UV y manchas de agua. Brillo profundo e hidrofóbico extremo.",
    color: "#7B2FFF",
    glow: "rgba(123,47,255,0.25)",
    gradient: "from-[#7B2FFF]/10 to-transparent",
    featured: true,
  },
  {
    icon: Armchair,
    title: "Detailing Interior",
    tag: "Interior",
    desc: "Renovación profunda del habitáculo con desinfección, remoción de manchas y acondicionamiento profesional de plásticos, cuero y textiles.",
    color: "#FF006E",
    glow: "rgba(255,0,110,0.25)",
    gradient: "from-[#FF006E]/10 to-transparent",
  },
  {
    icon: Lightbulb,
    title: "Restauración de Faros",
    tag: "Restauración",
    desc: "Elimina el amarillamiento y opacidad para restaurar la capacidad de iluminación y la seguridad del vehículo.",
    color: "#00E5FF",
    glow: "rgba(0,229,255,0.25)",
    gradient: "from-[#00E5FF]/10 to-transparent",
  },
  {
    icon: TrendingUp,
    title: "Preparación Pre-Venta",
    tag: "Valor",
    desc: "Preparación estratégica del vehículo diseñada para maximizar el atractivo comercial y el valor de mercado.",
    color: "#C9A84C",
    glow: "rgba(201,168,76,0.25)",
    gradient: "from-[#C9A84C]/10 to-transparent",
  },
  {
    icon: Wrench,
    title: "Mantención Automotriz",
    tag: "Mantención",
    desc: "Cuidado preventivo y técnico usando lubricantes y filtros premium para un rendimiento óptimo del motor.",
    color: "#00FF88",
    glow: "rgba(0,255,136,0.25)",
    gradient: "from-[#00FF88]/10 to-transparent",
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
    setTilt({ x: y * 12, y: -x * 12 });
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? "transform 0.1s" : "transform 0.5s ease",
      }}
      className={`relative group rounded-2xl p-7 overflow-hidden border ${
        service.featured
          ? "border-[#7B2FFF]/40"
          : "border-white/5 hover:border-white/10"
      } bg-black-card`}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Featured badge */}
      {service.featured && (
        <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-space font-semibold tracking-wider uppercase"
          style={{ background: `${service.color}20`, color: service.color, border: `1px solid ${service.color}30` }}>
          Destacado
        </div>
      )}

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 60px ${service.glow}` }}
      />

      {/* Icon */}
      <div
        className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${service.color}15`, border: `1px solid ${service.color}20` }}
      >
        <Icon size={22} style={{ color: service.color }} />
        <motion.div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
          style={{ boxShadow: `0 0 20px ${service.color}40` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Tag */}
      <span
        className="inline-block text-[10px] font-space font-semibold tracking-[0.2em] uppercase mb-3"
        style={{ color: service.color }}
      >
        {service.tag}
      </span>

      {/* Title */}
      <h3 className="font-space font-bold text-white text-lg mb-3 leading-tight">
        {service.title}
      </h3>

      {/* Description */}
      <p className="font-inter text-white/45 text-sm leading-relaxed">
        {service.desc}
      </p>

      {/* Bottom arrow */}
      <motion.div
        className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: service.color }}
      >
        <span className="font-space text-xs font-medium">Saber más</span>
        <motion.span
          animate={hovered ? { x: 4 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >→</motion.span>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true });

  return (
    <section id="servicios" className="relative py-32 bg-black-deep overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-electric-purple/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block font-space text-xs text-electric-blue tracking-[0.4em] uppercase mb-4"
          >
            ¿Qué hacemos?
          </motion.span>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-[clamp(3rem,8vw,7rem)] leading-none text-white"
            >
              NUESTROS{" "}
              <span className="gradient-text">SERVICIOS</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-inter text-white/40 text-base max-w-xl mx-auto mt-4"
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
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-space text-sm font-medium text-white border border-white/10 hover:border-gold/30 hover:text-gold transition-all duration-300"
          >
            Consulta por tu servicio →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
