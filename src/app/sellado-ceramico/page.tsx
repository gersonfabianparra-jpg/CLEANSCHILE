"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sun, Droplets, Leaf, Shield, Sparkles, ChevronDown,
  Check, Star, ZoomIn, X, ArrowLeft, MessageCircle,
} from "lucide-react";
import Link from "next/link";

const WA_LINK =
  "https://wa.me/56952095222?text=Hola%20Cleanschile%2C%20me%20interesa%20cotizar%20el%20Sellado%20Cer%C3%A1mico%20para%20mi%20veh%C3%ADculo";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  {
    Icon: Sun,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.18)",
    title: "¿Cansado de ver cómo el sol opaca la pintura?",
    desc: "La radiación UV es el enemigo número uno del barniz. Degrada el color y lo deja opaco y sin vida.",
  },
  {
    Icon: Droplets,
    color: "#38BDF8",
    bg: "rgba(56,189,248,0.06)",
    border: "rgba(56,189,248,0.18)",
    title: "¿El lavado semanal se volvió una tortura?",
    desc: "La suciedad, los insectos y el barro se pegan con facilidad en la pintura sin protección.",
  },
  {
    Icon: Leaf,
    color: "#4ADE80",
    bg: "rgba(74,222,128,0.06)",
    border: "rgba(74,222,128,0.18)",
    title: "¿Temor a marcas de lavado y resina de árboles?",
    desc: "El día a día opaca la estética de tu auto. La resina y las marcas de lavado arruinan el acabado.",
  },
];

const BENEFITS = [
  {
    Icon: Droplets,
    color: "#38BDF8",
    title: "Efecto Hidrofóbico Extremo",
    desc: "El agua y la suciedad simplemente resbalan, haciendo que el lavado sea un 80% más rápido y fácil.",
  },
  {
    Icon: Shield,
    color: "#8B5CF6",
    title: "Protección UV y Química",
    desc: "Bloquea los rayos solares y resiste agentes corrosivos como resina de árboles, excremento de aves y lluvia ácida.",
  },
  {
    Icon: Sparkles,
    color: "#EAB308",
    title: "Brillo Profundo y Duradero",
    desc: "Resalta el color original con un acabado reflectivo y cristalino que no se va con los lavados.",
  },
];

const PROCESS_STEPS = [
  {
    num: "01",
    color: "#38BDF8",
    title: "Descontaminación Profunda",
    desc: "Eliminación exhaustiva de impurezas minerales y ferrosas en la pintura — lo que el lavado común no saca.",
  },
  {
    num: "02",
    color: "#8B5CF6",
    title: "Corrección de Pintura",
    desc: "Pulido técnico para eliminar microgiras (swirls) y marcas, dejando la superficie perfecta antes de sellar.",
  },
  {
    num: "03",
    color: "#EAB308",
    title: "Aplicación de Precisión",
    desc: "Aplicación manual en ambiente controlado, capa por capa, garantizando cobertura uniforme y perfecta.",
  },
  {
    num: "04",
    color: "#4ADE80",
    title: "Curado e Inspección Final",
    desc: "Tiempo de reposo e inspección final para asegurar un acabado homogéneo y de máxima adherencia.",
  },
];

const PACKS = [
  {
    name: "MEDIUM POLISH",
    tagline: "Protección cerámica en spray — hasta 18 meses",
    color: "#38BDF8",
    highlight: false,
    items: [
      "Descontaminado químico de llantas",
      "Lavado Snow Foam",
      "Descontaminado de pintura y vidrios",
      "Detail con un paso de pulido (reduce micro rayas)",
      "Aplicación sellador cerámico en spray de hasta 18 meses",
      "Pulido de ópticos y faroles",
      "Acondicionamiento de neumáticos, plásticos y molduras",
      "Cortesía: limpieza, aspirado y acondicionamiento interior",
    ],
    prices: [
      { label: "City Car / Sedan / Hatchback", price: "$110.000" },
      { label: "SUV · Camionetas", price: "$140.000" },
      { label: "SUV y Camionetas XL", price: "$180.000" },
    ],
  },
  {
    name: "CERÁMICO TOP GOLD",
    tagline: "Sellado cerámico profesional con curado UV",
    color: "#EAB308",
    highlight: true,
    items: [
      "Descontaminado químico de llantas",
      "Lavado Snow Foam",
      "Descontaminado de pintura y vidrios",
      "Corrección de pintura en dos pasos (pulido + abrillantado)",
      "Instalación sellado cerámico profesional",
      "Curado con lámpara UV",
      "Pulido de ópticos y faroles",
      "Acondicionamiento de neumáticos, plásticos y molduras",
      "Cortesía: limpieza, aspirado y acondicionamiento interior",
    ],
    prices: [
      { label: "City Car / Sedan / Hatchback", price: "$249.000" },
      { label: "SUV · Camionetas", price: "$279.000" },
      { label: "SUV y Camionetas XL", price: "$299.000" },
    ],
  },
];

const SLIDER_PAIRS = [
  {
    before: "/trabajos/IMG_5104.jpg",
    after: "/trabajos/IMG_5114.jpg",
    label: "Corrección de Pintura + Sellado",
  },
];

const GALLERY_IMGS = [
  "/trabajos/resultados/IMG_1152.jpg",
  "/trabajos/resultados/IMG_1329.jpg",
  "/trabajos/resultados/IMG_1671.jpg",
  "/trabajos/resultados/IMG_1960.jpg",
  "/trabajos/resultados/IMG_3239.jpg",
  "/trabajos/resultados/IMG_3664.jpg",
  "/trabajos/resultados/IMG_3724.jpg",
  "/trabajos/resultados/IMG_3999.jpg",
];

const TESTIMONIALS = [
  {
    name: "Roberto Muñoz",
    car: "Toyota RAV4 2022",
    text: "El brillo que quedó es simplemente increíble. Ahora todos me preguntan si el auto es nuevo. El lavado se hace en minutos, el agua resbala como nunca.",
    stars: 5,
    initials: "RM",
  },
  {
    name: "Claudia Fernández",
    car: "Mazda 3 2021",
    text: "Tenía miedo de pagar tanto, pero valió cada peso. Llevo 6 meses sin que se le noten marcas de lavado. El acabado sigue como el primer día.",
    stars: 5,
    initials: "CF",
  },
  {
    name: "Felipe Alarcón",
    car: "Chevrolet Tracker 2023",
    text: "Nicolás y su equipo son unos profesionales de verdad. Explicaron todo el proceso y el resultado superó mis expectativas. Lo recomiendo 100%.",
    stars: 5,
    initials: "FA",
  },
];

const FAQS = [
  {
    q: "¿El sellado cerámico evita los rayones profundos o piedras en carretera?",
    a: "No, el sellado cerámico protege contra microrayas de lavado y agentes químicos. Para impactos de piedras o arañazos profundos, se requiere PPF (Paint Protection Film).",
  },
  {
    q: "¿Cómo se debe lavar el auto después del sellado?",
    a: "Se recomiendan lavados con champú de pH neutro más finalizador de lavado (Quick Detail). Evita los rodillos mecánicos de lavados automáticos, ya que pueden generar microrayas en la capa cerámica.",
  },
  {
    q: "¿Cuánto tiempo demora el proceso de aplicación?",
    a: "Por la preparación exhaustiva que requiere el proceso, suele tomar entre 1 y 3 días de trabajo en taller. La corrección de pintura previa es lo que más tiempo demanda y es la clave del resultado final.",
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text, color = "rgba(139,92,246,0.7)" }: { text: string; color?: string }) {
  return (
    <p style={{
      fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 600,
      color, letterSpacing: "0.45em", textTransform: "uppercase",
      margin: "0 0 0.9rem",
    }}>
      {text}
    </p>
  );
}

// ─── Slider component ──────────────────────────────────────────────────────────

function SliderCard({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(2, Math.min(clientX - rect.left, rect.width - 2));
    setPos((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        ref={containerRef}
        onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
        onMouseMove={(e) => { if (dragging.current) move(e.clientX); }}
        onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX); }}
        onTouchMove={(e) => { if (dragging.current) move(e.touches[0].clientX); }}
        style={{
          position: "relative", aspectRatio: "4/3", borderRadius: 20, overflow: "hidden",
          cursor: "ew-resize", userSelect: "none",
          border: "1px solid rgba(139,92,246,0.2)",
          boxShadow: "0 0 40px rgba(139,92,246,0.1)",
        }}
      >
        <Image src={after} alt="Después" fill style={{ objectFit: "cover" }} sizes="(max-width:768px) 100vw, 45vw" />
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt="Antes" fill style={{ objectFit: "cover" }} sizes="(max-width:768px) 100vw, 45vw" />
        </div>

        {/* Divider */}
        <div style={{
          position: "absolute", top: 0, bottom: 0,
          left: `${pos}%`, transform: "translateX(-50%)",
          width: 2, background: "rgba(139,92,246,0.9)",
          boxShadow: "0 0 16px rgba(139,92,246,0.8)",
          pointerEvents: "none",
        }}>
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 40, height: 40, borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 2px 20px rgba(139,92,246,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4 7H1M1 7L3 5M1 7L3 9" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 7H13M13 7L11 5M13 7L11 9" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        <div style={{
          position: "absolute", top: 12, left: 14,
          fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 700,
          color: "#fff", letterSpacing: "0.15em",
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
          padding: "3px 10px", borderRadius: 999,
          opacity: pos > 15 ? 1 : 0, transition: "opacity 0.2s",
        }}>ANTES</div>

        <div style={{
          position: "absolute", top: 12, right: 14,
          fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 700,
          color: "#fff", letterSpacing: "0.15em",
          background: "rgba(139,92,246,0.6)", backdropFilter: "blur(8px)",
          padding: "3px 10px", borderRadius: 999,
          opacity: pos < 85 ? 1 : 0, transition: "opacity 0.2s",
        }}>DESPUÉS</div>
      </div>

      <p style={{ fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 600, color: "rgba(203,213,225,0.6)", margin: 0, textAlign: "center" }}>
        {label}
      </p>
    </div>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div style={{
      borderRadius: 16,
      border: `1px solid ${open ? "rgba(139,92,246,0.3)" : "rgba(255,255,255,0.07)"}`,
      background: open ? "rgba(139,92,246,0.06)" : "rgba(255,255,255,0.02)",
      overflow: "hidden",
      transition: "border-color 0.3s, background 0.3s",
    }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16, padding: "1.3rem 1.5rem",
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "var(--font-space)", fontSize: 15, fontWeight: 600, color: open ? "#fff" : "rgba(203,213,225,0.75)", lineHeight: 1.4 }}>
          {q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} style={{ flexShrink: 0 }}>
          <ChevronDown size={18} style={{ color: open ? "#8B5CF6" : "rgba(203,213,225,0.3)" }} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{
              fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.8,
              color: "rgba(203,213,225,0.6)", margin: 0,
              padding: "0 1.5rem 1.3rem",
            }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SelladoCeramicoPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* Background image */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/servicios/sellado-ceramico/foto.jpg"
            alt="Sellado Cerámico"
            fill
            style={{ objectFit: "cover", filter: "brightness(0.45) saturate(1.2)" }}
            priority
          />
          {/* Purple gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(4,4,18,0.96) 0%, rgba(88,28,135,0.4) 60%, rgba(4,4,18,0.88) 100%)",
          }} />
          {/* Bottom fade */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 300,
            background: "linear-gradient(0deg, #040412 0%, transparent 100%)",
          }} />
        </div>

        {/* Glow orb */}
        <div style={{
          position: "absolute", top: "20%", right: "15%",
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          filter: "blur(40px)", pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 10,
          maxWidth: "72rem", margin: "0 auto",
          padding: "10rem 1.5rem 6rem",
        }}>
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "2.5rem" }}
          >
            <Link href="/#servicios" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "var(--font-space)", fontSize: 12, color: "rgba(203,213,225,0.45)",
              textDecoration: "none", letterSpacing: "0.05em",
              transition: "color 0.3s",
            }}>
              <ArrowLeft size={14} />
              Volver a Servicios
            </Link>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1.5rem" }}
          >
            <span style={{
              fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 700,
              color: "#8B5CF6", letterSpacing: "0.4em", textTransform: "uppercase",
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)",
              padding: "5px 16px", borderRadius: 999,
            }}>
              Premium ✦ Nanotecnología
            </span>
          </motion.div>

          {/* Title */}
          <div style={{ margin: "0 0 1.5rem" }}>
            {/* Línea 1 — nombre del servicio */}
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                lineHeight: 0.92,
                margin: 0,
                color: "#fff",
                letterSpacing: "0.01em",
              }}
            >
              Sellado Cerámico
            </motion.h1>

            {/* Línea 2 — diferenciador en gradiente */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                lineHeight: 0.92,
                margin: "0 0 1.25rem",
                background: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 50%, #C4B5FD 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.01em",
              }}
            >
              de Alta Gama
            </motion.p>

            {/* Línea 3 — beneficios como subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(15px, 1.6vw, 18px)",
                lineHeight: 1.65,
                color: "rgba(203,213,225,0.6)",
                margin: 0,
                maxWidth: "520px",
              }}
            >
              Impecable · Protegido contra el clima · Brillo de exhibición por años.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 14 }}
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "relative",
                display: "inline-flex", alignItems: "center", gap: 12,
                padding: "1rem 2.5rem", borderRadius: 999,
                fontFamily: "var(--font-space)", fontWeight: 700, fontSize: 15,
                color: "#000",
                background: "linear-gradient(135deg, #A78BFA 0%, #8B5CF6 50%, #7C3AED 100%)",
                boxShadow: "0 0 50px rgba(139,92,246,0.5), 0 4px 24px rgba(0,0,0,0.3)",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              <MessageCircle size={18} />
              Cotizar Mi Vehículo
              <span style={{
                position: "absolute", inset: -3, borderRadius: 999,
                border: "1px solid rgba(167,139,250,0.4)",
                animation: "pulse-ring 2.5s ease-out infinite",
                pointerEvents: "none",
              }} />
            </a>
            <a
              href="#packs"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "1rem 2rem", borderRadius: 999,
                fontFamily: "var(--font-space)", fontSize: 14,
                color: "rgba(203,213,225,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                textDecoration: "none",
              }}
            >
              Ver Packs y Precios ↓
            </a>
          </motion.div>

          {/* Mini stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 32, marginTop: "3.5rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { num: "1–3 años", label: "Duración del sellado" },
              { num: "80%", label: "Más fácil de lavar" },
              { num: "9H+", label: "Dureza de la capa" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p style={{ fontFamily: "var(--font-bebas)", fontSize: "1.8rem", color: "#A78BFA", margin: 0, lineHeight: 1 }}>{num}</p>
                <p style={{ fontFamily: "var(--font-space)", fontSize: 10, color: "rgba(203,213,225,0.35)", letterSpacing: "0.15em", textTransform: "uppercase", margin: "4px 0 0" }}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <section style={{ position: "relative", background: "#030310", padding: "6rem 1.5rem", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 400,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <SectionLabel text="¿Te identificas?" color="rgba(139,92,246,0.7)" />
              <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "#fff", margin: 0, lineHeight: 1.05 }}>
                Los problemas del{" "}
                <span style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  día a día
                </span>
              </h2>
            </div>
          </FadeInSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PAIN_POINTS.map((p, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div style={{
                  padding: "2rem", borderRadius: 20,
                  background: p.bg, border: `1px solid ${p.border}`,
                  height: "100%",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: `${p.color}18`, border: `1px solid ${p.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "1.2rem",
                  }}>
                    <p.Icon size={22} style={{ color: p.color }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-space)", fontSize: 15, fontWeight: 600, color: "#fff", margin: "0 0 0.75rem", lineHeight: 1.4 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(203,213,225,0.5)", margin: 0, lineHeight: 1.7 }}>
                    {p.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS CERAMIC ── */}
      <section style={{ position: "relative", background: "#040412", padding: "7rem 1.5rem", overflow: "hidden" }}>
        {/* bg glow */}
        <div style={{
          position: "absolute", top: 0, right: 0,
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="rsp-2col">
            {/* Left: image */}
            <FadeInSection>
              <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "3/4" }}>
                <Image
                  src="/servicios/sellado-ceramico/WhatsApp Image 2026-06-07 at 21.01.04.jpeg"
                  alt="Sellado Cerámico aplicación"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(0deg, rgba(4,4,18,0.7) 0%, transparent 50%)",
                }} />
                {/* Badge */}
                <div style={{
                  position: "absolute", bottom: 20, left: 20, right: 20,
                  padding: "1rem 1.25rem", borderRadius: 16,
                  background: "rgba(4,4,18,0.8)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  display: "flex", alignItems: "center", gap: 12,
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#8B5CF6", boxShadow: "0 0 12px rgba(139,92,246,0.8)", flexShrink: 0 }} />
                  <p style={{ fontFamily: "var(--font-space)", fontSize: 12, color: "rgba(203,213,225,0.8)", margin: 0, lineHeight: 1.4 }}>
                    Fusión molecular con el barniz original
                  </p>
                </div>
              </div>
            </FadeInSection>

            {/* Right: content */}
            <div>
              <FadeInSection delay={0.1}>
                <SectionLabel text="La tecnología" color="rgba(139,92,246,0.7)" />
                <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.2rem,4.5vw,3.8rem)", color: "#fff", margin: "0 0 1.25rem", lineHeight: 1.02 }}>
                  ¿Qué es el{" "}
                  <span style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Sellado Cerámico?
                  </span>
                </h2>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 15, lineHeight: 1.85, color: "rgba(203,213,225,0.65)", margin: "0 0 2rem" }}>
                  A diferencia de las ceras convencionales que duran semanas, el sellado cerámico es una capa de
                  nanotecnología pura que se fusiona molecularmente con el barniz de tu auto. Actúa como un{" "}
                  <span style={{ color: "#A78BFA", fontWeight: 600 }}>segundo escudo transparente</span>, ofreciendo
                  una dureza y resistencia incomparables.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {BENEFITS.map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                        background: `${b.color}12`, border: `1px solid ${b.color}25`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: 2,
                      }}>
                        <b.Icon size={18} style={{ color: b.color }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 600, color: "#fff", margin: "0 0 4px" }}>
                          {b.title}
                        </p>
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(203,213,225,0.5)", margin: 0, lineHeight: 1.65 }}>
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ position: "relative", background: "#030310", padding: "7rem 1.5rem", overflow: "hidden" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionLabel text="Cómo lo hacemos" color="rgba(139,92,246,0.7)" />
              <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "#fff", margin: 0, lineHeight: 1.05 }}>
                El Proceso de{" "}
                <span style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Aplicación
                </span>
              </h2>
            </div>
          </FadeInSection>

          {/* Steps grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, position: "relative" }}>
            {/* Connecting line (desktop) */}
            <div style={{
              position: "absolute", top: 36, left: "12%", right: "12%", height: 1,
              background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.25), rgba(139,92,246,0.25), transparent)",
              pointerEvents: "none",
            }} className="rsp-process-line" />

            {PROCESS_STEPS.map((step, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div style={{
                  padding: "2rem 1.5rem",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                  position: "relative",
                  transition: "border-color 0.3s",
                }}>
                  {/* Step number circle */}
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: `${step.color}12`,
                    border: `2px solid ${step.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1.25rem",
                    position: "relative",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-bebas)", fontSize: "1.5rem", color: step.color,
                      filter: `drop-shadow(0 0 8px ${step.color}60)`,
                    }}>
                      {step.num}
                    </span>
                    {/* Pulse */}
                    <span style={{
                      position: "absolute", inset: -4, borderRadius: "50%",
                      border: `1px solid ${step.color}25`,
                    }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-space)", fontSize: 14, fontWeight: 700, color: "#fff", margin: "0 0 0.6rem", lineHeight: 1.3 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "rgba(203,213,225,0.45)", margin: 0, lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKS / PRICING ── */}
      <section id="packs" style={{ position: "relative", background: "#040412", padding: "7rem 1.5rem", overflow: "hidden" }}>
        <div style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: 800, height: 400,
          background: "radial-gradient(ellipse, rgba(234,179,8,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <SectionLabel text="Nuestros packs" color="rgba(234,179,8,0.7)" />
              <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "#fff", margin: 0, lineHeight: 1.05 }}>
                Elige el{" "}
                <span style={{ background: "linear-gradient(135deg, #A16207, #EAB308, #FDE047)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Pack ideal
                </span>{" "}
                para tu auto
              </h2>
            </div>
          </FadeInSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {PACKS.map((pack, i) => (
              <FadeInSection key={i} delay={i * 0.15}>
                <div style={{
                  borderRadius: 24,
                  border: `1px solid ${pack.highlight ? "rgba(234,179,8,0.35)" : "rgba(255,255,255,0.08)"}`,
                  background: pack.highlight ? "rgba(234,179,8,0.04)" : "rgba(255,255,255,0.025)",
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                  display: "flex", flexDirection: "column",
                }}>
                  {/* Recommended badge */}
                  {pack.highlight && (
                    <div style={{
                      position: "absolute", top: 18, right: 18,
                      fontFamily: "var(--font-space)", fontSize: 9, fontWeight: 700,
                      color: "#000", background: "#EAB308",
                      padding: "3px 12px", borderRadius: 999, letterSpacing: "0.1em",
                    }}>
                      RECOMENDADO
                    </div>
                  )}

                  {/* Top stripe */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${pack.color}, transparent)` }} />

                  {/* Header */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <span style={{
                      fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 700,
                      color: pack.color, letterSpacing: "0.3em", textTransform: "uppercase",
                    }}>
                      {pack.name}
                    </span>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(203,213,225,0.45)", margin: "6px 0 0" }}>
                      {pack.tagline}
                    </p>
                  </div>

                  {/* Items */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {pack.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <Check size={14} style={{ color: pack.color, flexShrink: 0, marginTop: 3 }} />
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(203,213,225,0.65)", lineHeight: 1.5 }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Prices */}
                  <div style={{ borderTop: `1px solid ${pack.color}20`, paddingTop: "1.25rem", marginBottom: "1.5rem" }}>
                    {pack.prices.map((p, j) => (
                      <div key={j} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "0.5rem 0",
                        borderBottom: j < pack.prices.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                      }}>
                        <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "rgba(203,213,225,0.45)" }}>
                          {p.label}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-space)", fontSize: 14, fontWeight: 700,
                          color: pack.color,
                        }}>
                          {p.price}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "0.85rem", borderRadius: 999,
                      fontFamily: "var(--font-space)", fontWeight: 700, fontSize: 13,
                      color: pack.highlight ? "#000" : pack.color,
                      background: pack.highlight
                        ? "linear-gradient(135deg, #EAB308, #FDE047)"
                        : `${pack.color}12`,
                      border: pack.highlight ? "none" : `1px solid ${pack.color}35`,
                      textDecoration: "none",
                      letterSpacing: "0.03em",
                    }}
                  >
                    <MessageCircle size={14} />
                    Cotizar este Pack
                  </a>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section style={{ position: "relative", background: "#030310", padding: "7rem 1.5rem", overflow: "hidden" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <SectionLabel text="Resultados reales" color="rgba(139,92,246,0.7)" />
              <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "#fff", margin: "0 0 0.75rem", lineHeight: 1.05 }}>
                Antes &amp;{" "}
                <span style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Después
                </span>
              </h2>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(203,213,225,0.35)", margin: 0 }}>
                Arrastra el divisor para comparar el resultado
              </p>
            </div>
          </FadeInSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
            {SLIDER_PAIRS.map((pair, i) => (
              <FadeInSection key={i} delay={i * 0.12}>
                <SliderCard before={pair.before} after={pair.after} label={pair.label} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section style={{ position: "relative", background: "#040412", padding: "7rem 1.5rem", overflow: "hidden" }}>
        <div style={{ maxWidth: "82rem", margin: "0 auto" }}>
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <SectionLabel text="Galería de trabajos" color="rgba(139,92,246,0.7)" />
              <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,4vw,3.5rem)", color: "#fff", margin: 0, lineHeight: 1.05 }}>
                Resultados de{" "}
                <span style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  primer nivel
                </span>
              </h2>
            </div>
          </FadeInSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
            {GALLERY_IMGS.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setLightbox(src)}
                style={{
                  position: "relative",
                  aspectRatio: i % 5 === 0 ? "4/5" : i % 3 === 0 ? "16/9" : "4/3",
                  borderRadius: 16, overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid rgba(139,92,246,0.12)",
                }}
              >
                <Image
                  src={src}
                  alt={`Trabajo ${i + 1}`}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(88,28,135,0.3)";
                    const img = e.currentTarget.previousSibling as HTMLImageElement;
                    if (img) img.style.transform = "scale(1.06)";
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
                  <div style={{ opacity: 0, transition: "opacity 0.3s", width: 44, height: 44, borderRadius: "50%", background: "rgba(139,92,246,0.25)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ZoomIn size={20} style={{ color: "#fff" }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.93)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(139,92,246,0.25)" }}
              >
                <img src={lightbox} alt="Resultado" style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", display: "block" }} />
                <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 12, right: 12, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
                  <X size={16} />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position: "relative", background: "#030310", padding: "7rem 1.5rem", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 700, height: 400,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <SectionLabel text="Clientes satisfechos" color="rgba(234,179,8,0.65)" />
              <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "#fff", margin: 0, lineHeight: 1.05 }}>
                Lo que dicen nuestros{" "}
                <span style={{ background: "linear-gradient(135deg, #A16207, #EAB308, #FDE047)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  clientes
                </span>
              </h2>
            </div>
          </FadeInSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div style={{
                  padding: "2rem", borderRadius: 20,
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  height: "100%", display: "flex", flexDirection: "column",
                  position: "relative",
                }}>
                  <div style={{ position: "absolute", top: 20, left: 24, fontFamily: "Georgia, serif", fontSize: "4rem", lineHeight: 1, color: "rgba(234,179,8,0.08)", userSelect: "none", pointerEvents: "none" }}>"</div>

                  <div style={{ display: "flex", gap: 2, marginBottom: "1.25rem" }}>
                    {Array.from({ length: t.stars }, (_, j) => (
                      <Star key={j} size={13} style={{ color: "#EAB308", fill: "#EAB308" }} />
                    ))}
                  </div>

                  <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.8, color: "rgba(203,213,225,0.7)", margin: "0 0 1.5rem", fontStyle: "italic", flex: 1 }}>
                    {t.text}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg, rgba(139,92,246,0.5), rgba(59,130,246,0.4))",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontFamily: "var(--font-space)", fontWeight: 700, fontSize: 12, color: "rgba(255,255,255,0.9)" }}>
                        {t.initials}
                      </span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-space)", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>{t.name}</p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>{t.car}</p>
                    </div>
                    <div style={{ marginLeft: "auto", padding: "3px 10px", borderRadius: 999, background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.18)", display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80" }} />
                      <span style={{ fontFamily: "var(--font-space)", fontSize: 9, color: "rgba(74,222,128,0.8)", fontWeight: 600, letterSpacing: "0.05em" }}>VERIFICADO</span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ position: "relative", background: "#040412", padding: "7rem 1.5rem", overflow: "hidden" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
          <FadeInSection>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <SectionLabel text="Preguntas frecuentes" color="rgba(139,92,246,0.7)" />
              <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,4.5vw,3.5rem)", color: "#fff", margin: 0, lineHeight: 1.05 }}>
                Todo lo que necesitas{" "}
                <span style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  saber
                </span>
              </h2>
            </div>
          </FadeInSection>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, i) => (
              <FadeInSection key={i} delay={i * 0.08}>
                <FAQItem
                  q={faq.q}
                  a={faq.a}
                  open={faqOpen === i}
                  onToggle={() => setFaqOpen(faqOpen === i ? null : i)}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position: "relative", background: "#030310", padding: "8rem 1.5rem", overflow: "hidden" }}>
        {/* Background */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(88,28,135,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.35) 50%, transparent)",
        }} />

        <div style={{ position: "relative", maxWidth: "52rem", margin: "0 auto", textAlign: "center" }}>
          <FadeInSection>
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-space)", fontSize: 10, fontWeight: 700,
              color: "#8B5CF6", letterSpacing: "0.4em", textTransform: "uppercase",
              background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)",
              padding: "5px 18px", borderRadius: 999, marginBottom: "1.5rem",
            }}>
              ¿Listo para proteger tu auto?
            </span>

            <h2 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.5rem,6vw,5rem)", color: "#fff", margin: "0 0 1rem", lineHeight: 1.0 }}>
              El brillo que siempre{" "}
              <span style={{ background: "linear-gradient(135deg, #7C3AED, #A78BFA, #C4B5FD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                mereciste
              </span>
            </h2>

            <p style={{ fontFamily: "var(--font-inter)", fontSize: 15, lineHeight: 1.8, color: "rgba(203,213,225,0.55)", margin: "0 0 2.5rem", maxWidth: 420, marginInline: "auto" }}>
              Contáctanos por WhatsApp y cotiza el pack ideal para tu vehículo. Respuesta inmediata.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: "relative",
                  display: "inline-flex", alignItems: "center", gap: 12,
                  padding: "1.15rem 2.5rem", borderRadius: 999,
                  fontFamily: "var(--font-space)", fontWeight: 700, fontSize: 15,
                  color: "#fff",
                  background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)",
                  boxShadow: "0 0 60px rgba(139,92,246,0.5), 0 4px 24px rgba(0,0,0,0.3)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                <MessageCircle size={18} />
                Cotizar Mi Vehículo
                <span style={{
                  position: "absolute", inset: -4, borderRadius: 999,
                  border: "1px solid rgba(139,92,246,0.4)",
                  animation: "pulse-ring 2.5s ease-out infinite",
                  pointerEvents: "none",
                }} />
              </a>

              <Link
                href="/"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "1.15rem 2rem", borderRadius: 999,
                  fontFamily: "var(--font-space)", fontSize: 14,
                  color: "rgba(203,213,225,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  textDecoration: "none",
                }}
              >
                Ver todos los servicios
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
