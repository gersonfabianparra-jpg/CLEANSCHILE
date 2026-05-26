"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle2, Loader2 } from "lucide-react";
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

const services = [
  "Detailing Exterior",
  "Recubrimiento Cerámico",
  "Detailing Interior",
  "Restauración de Faros",
  "Preparación Pre-Venta",
  "Mantención Automotriz",
  "Otro / Consulta General",
];

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
    <section id="contacto" className="relative py-32 overflow-hidden" style={{ background: "#07071A" }}>
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(59,130,246,0.04) 0%, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.05) 0%, transparent 70%)" }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Info */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="inline-block font-space text-xs text-neon-cyan tracking-[0.4em] uppercase mb-4"
            >
              Hablemos
            </motion.span>
            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: 60 }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-bebas text-[clamp(3rem,7vw,6rem)] leading-none"
              >
                COTIZA<br />
                <span className="gradient-text">GRATIS</span>
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="font-inter text-chrome/50 text-base leading-relaxed mb-10"
            >
              Completa el formulario y te respondemos en menos de 24 horas. También puedes contactarnos directamente.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-5"
            >
              {[
                { icon: Phone, label: "+569 520 95 222", href: "tel:+56952095222", color: "#3B82F6" },
                { icon: Mail, label: "contacto@cleanschile.cl", href: "mailto:contacto@cleanschile.cl", color: "#8B5CF6" },
                { icon: MapPin, label: "Uruguay #530, La Cisterna, RM", href: "#", color: "#EAB308" },
                { icon: InstagramIcon, label: "@cleanschile.detailingcar", href: "https://instagram.com/cleanschile.detailingcar", color: "#EC4899" },
              ].map(({ icon: Icon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${color}10`, border: `1px solid ${color}22` }}
                  >
                    <Icon size={17} style={{ color }} />
                  </div>
                  <span className="font-inter text-chrome/50 text-sm group-hover:text-white/80 transition-colors">
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
            <div className="relative p-8 rounded-3xl bg-surface border border-white/[0.06] overflow-hidden">
              {/* Top glow line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-neon-blue/60 to-transparent" />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-64 gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="font-space font-bold text-white text-xl">¡Mensaje Enviado!</h3>
                  <p className="font-inter text-chrome/50 text-sm">Te contactaremos en menos de 24 horas.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-neon-blue font-space text-sm hover:underline"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-space text-chrome/50 text-xs mb-2 tracking-wider">Nombre *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="w-full px-4 py-3 rounded-xl bg-midnight-2 border border-white/[0.07] text-white text-sm font-inter placeholder:text-chrome/20 hover:border-white/15 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-space text-chrome/50 text-xs mb-2 tracking-wider">Teléfono</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+56 9 ..."
                        className="w-full px-4 py-3 rounded-xl bg-midnight-2 border border-white/[0.07] text-white text-sm font-inter placeholder:text-chrome/20 hover:border-white/15 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-space text-chrome/50 text-xs mb-2 tracking-wider">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-midnight-2 border border-white/[0.07] text-white text-sm font-inter placeholder:text-chrome/20 hover:border-white/15 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-space text-chrome/50 text-xs mb-2 tracking-wider">Servicio de Interés</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-midnight-2 border border-white/[0.07] text-white text-sm font-inter hover:border-white/15 transition-all appearance-none"
                    >
                      <option value="" className="bg-surface">Selecciona un servicio...</option>
                      {services.map((s) => (
                        <option key={s} value={s} className="bg-surface">{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-space text-chrome/50 text-xs mb-2 tracking-wider">Mensaje *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos sobre tu vehículo y qué necesitas..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-midnight-2 border border-white/[0.07] text-white text-sm font-inter placeholder:text-chrome/20 hover:border-white/15 transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full relative py-4 rounded-xl font-space font-semibold text-sm overflow-hidden group disabled:opacity-70"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-neon-blue via-neon-violet to-neon-pink group-hover:opacity-90 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-2 text-white">
                      {loading ? (
                        <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                      ) : (
                        <><Send size={16} /> Enviar Mensaje</>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
