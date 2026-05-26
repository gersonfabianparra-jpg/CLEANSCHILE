"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle2, Loader2, Clock, Car } from "lucide-react";
import toast from "react-hot-toast";

function InstagramIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3"/>
    </svg>
  );
}

function FacebookIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  );
}

const CONTACT_ITEMS = [
  { icon: Phone, label: "+569 520 95 222", href: "tel:+56952095222", color: "#3B82F6" },
  { icon: Mail, label: "contacto@cleanschile.cl", href: "mailto:contacto@cleanschile.cl", color: "#8B5CF6" },
  { icon: MapPin, label: "Uruguay #530, La Cisterna, RM", href: "https://maps.google.com/?q=Uruguay+530+La+Cisterna+Santiago", color: "#EAB308", external: true },
  { icon: InstagramIcon, label: "@cleanschile.detailingcar", href: "https://instagram.com/cleanschile.detailingcar", color: "#EC4899", external: true },
  { icon: FacebookIcon, label: "CleanSchile · Facebook", href: "https://www.facebook.com/share/1B8W4cT7Ci/?mibextid=wwXIfr", color: "#3B82F6", external: true },
  { icon: TikTokIcon, label: "@cleanschile · TikTok", href: "https://www.tiktok.com/@cleanschile", color: "#06B6D4", external: true },
];

const SERVICES = [
  "Detailing Exterior",
  "Recubrimiento Cerámico",
  "Detailing Interior",
  "Restauración de Faros",
  "Preparación Pre-Venta",
  "Mantención Automotriz",
  "Otro / Consulta General",
];

const INPUT_STYLE = {
  width: "100%", padding: "12px 16px", borderRadius: 12,
  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
  color: "#fff", fontSize: 14, fontFamily: "var(--font-inter)",
  outline: "none", boxSizing: "border-box" as const,
};

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Por favor completa los campos requeridos.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        toast.success("¡Mensaje enviado! Te contactaremos pronto.");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        toast.error("Error al enviar. Intenta de nuevo.");
      }
    } catch {
      toast.error("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" style={{ position: "relative", background: "#07071A", overflow: "hidden" }}>
      {/* Background glows */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, right: 0, width: 400, height: 400, pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)",
      }} />

      <div ref={ref} style={{ position: "relative", maxWidth: "82rem", margin: "0 auto", padding: "8rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}
          className="grid-cols-1 lg:grid-cols-2">

          {/* Left — Info */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              style={{ display: "inline-block", fontFamily: "var(--font-space)", fontSize: 11, color: "#06B6D4", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}
            >
              Hablemos
            </motion.span>

            <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
              <motion.h2
                initial={{ y: 60 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(3rem,7vw,6rem)", lineHeight: 0.95, margin: 0, color: "#fff" }}
              >
                COTIZA<br />
                <span style={{
                  background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  GRATIS
                </span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: "rgba(203,213,225,0.5)", lineHeight: 1.8, marginBottom: "2rem" }}
            >
              Completa el formulario y te respondemos en menos de 24 horas. También puedes contactarnos directamente.
            </motion.p>

            {/* Hours card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              style={{
                marginBottom: "1.5rem", padding: "1rem 1.25rem", borderRadius: 14,
                background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.15)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Clock size={14} style={{ color: "#06B6D4" }} />
                <span style={{ fontFamily: "var(--font-space)", fontSize: 11, color: "#06B6D4", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Horario de Atención
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(203,213,225,0.55)" }}>Lunes – Viernes</span>
                  <span style={{ fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 600, color: "#fff" }}>9:00 – 19:00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(203,213,225,0.55)" }}>Sábado</span>
                  <span style={{ fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 600, color: "#fff" }}>10:00 – 15:00</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "rgba(203,213,225,0.55)" }}>Domingo</span>
                  <span style={{ fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 600, color: "rgba(203,213,225,0.3)" }}>Cerrado</span>
                </div>
              </div>
            </motion.div>

            {/* Parking note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: "1.75rem",
                padding: "0.7rem 1rem", borderRadius: 12,
                background: "rgba(234,179,8,0.05)", border: "1px solid rgba(234,179,8,0.12)",
              }}
            >
              <Car size={14} style={{ color: "#EAB308", flexShrink: 0 }} />
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "rgba(203,213,225,0.5)", margin: 0 }}>
                Estacionamiento disponible · Solo taller La Cisterna
              </p>
            </motion.div>

            {/* Contact links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {CONTACT_ITEMS.map(({ icon: Icon, label, href, color, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${color}10`, border: `1px solid ${color}22`,
                  }}>
                    <Icon size={16} style={{ color }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.5)", fontSize: 13 }}>
                    {label}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{
              position: "relative", padding: "2rem", borderRadius: 28,
              background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
            }}>
              {/* Top glow line */}
              <div style={{
                position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                width: 200, height: 1,
                background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
              }} />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 256, gap: 16, textAlign: "center" }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <CheckCircle2 size={32} style={{ color: "#4ADE80" }} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-space)", fontWeight: 700, color: "#fff", fontSize: "1.2rem", margin: 0 }}>¡Mensaje Enviado!</h3>
                  <p style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.5)", fontSize: 13, margin: 0 }}>Te contactaremos en menos de 24 horas.</p>
                  <button
                    onClick={() => setSent(false)}
                    style={{ fontFamily: "var(--font-space)", color: "#3B82F6", fontSize: 13, background: "none", border: "none", cursor: "pointer", marginTop: 8 }}
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-space)", color: "rgba(203,213,225,0.5)", fontSize: 11, marginBottom: 8, letterSpacing: "0.1em" }}>Nombre *</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" style={INPUT_STYLE} required />
                    </div>
                    <div>
                      <label style={{ display: "block", fontFamily: "var(--font-space)", color: "rgba(203,213,225,0.5)", fontSize: 11, marginBottom: 8, letterSpacing: "0.1em" }}>Teléfono</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+56 9 ..." style={INPUT_STYLE} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-space)", color: "rgba(203,213,225,0.5)", fontSize: 11, marginBottom: 8, letterSpacing: "0.1em" }}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" style={INPUT_STYLE} required />
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-space)", color: "rgba(203,213,225,0.5)", fontSize: 11, marginBottom: 8, letterSpacing: "0.1em" }}>Servicio de Interés</label>
                    <select name="service" value={form.service} onChange={handleChange} style={{ ...INPUT_STYLE, appearance: "none" as const }}>
                      <option value="" style={{ background: "#07071A" }}>Selecciona un servicio...</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} style={{ background: "#07071A" }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-space)", color: "rgba(203,213,225,0.5)", fontSize: 11, marginBottom: 8, letterSpacing: "0.1em" }}>Mensaje *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      placeholder="Cuéntanos sobre tu vehículo y qué necesitas..."
                      rows={4} style={{ ...INPUT_STYLE, resize: "none" }} required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      position: "relative", padding: "1rem", borderRadius: 14, border: "none", cursor: "pointer",
                      fontFamily: "var(--font-space)", fontWeight: 600, fontSize: 14,
                      background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #06B6D4 100%)",
                      color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    {loading ? (
                      <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Enviando...</>
                    ) : (
                      <><Send size={16} /> Enviar Mensaje</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Google Maps */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "82rem", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
          <div style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", position: "relative" }}>
            {/* Top accent */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #06B6D4, #F97316)", zIndex: 1 }} />
            {/* Info overlay */}
            <div style={{
              position: "absolute", bottom: 20, left: 20, zIndex: 1,
              background: "rgba(4,4,18,0.88)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14, padding: "12px 18px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#06B6D4", flexShrink: 0, boxShadow: "0 0 10px #06B6D4" }} />
              <div>
                <p style={{ fontFamily: "var(--font-space)", fontWeight: 600, fontSize: 12, color: "#fff", margin: 0 }}>CleanSchile Detailing Car</p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(203,213,225,0.45)", margin: 0 }}>Uruguay #530, La Cisterna · Santiago</p>
              </div>
            </div>
            <iframe
              src="https://maps.google.com/maps?q=Uruguay+530,+La+Cisterna,+Santiago,+Chile&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="380"
              style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CleanSchile ubicación"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
