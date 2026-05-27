"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, CheckCircle, Sparkles, Shield, Sofa, TrendingUp, Wrench, Phone, MapPin, Mail, MessageCircle, Type } from "lucide-react";
import toast from "react-hot-toast";

type ServiceItem = { title: string; desc: string; price: string };

const SERVICE_META = [
  { num: "01", icon: Sparkles, color: "#3B82F6", tag: "Exterior" },
  { num: "02", icon: Shield,   color: "#8B5CF6", tag: "Premium ✦" },
  { num: "03", icon: Sofa,     color: "#EC4899", tag: "Interior" },
  { num: "04", icon: TrendingUp, color: "#EAB308", tag: "Valor" },
  { num: "05", icon: Wrench,   color: "#84CC16", tag: "Mantención" },
];

const DEFAULT_SERVICES: ServiceItem[] = [
  { title: "Pulido de Vehículos",   desc: "", price: "Desde $80.000" },
  { title: "Sellado Cerámico",      desc: "", price: "Desde $160.000" },
  { title: "Full Interior",         desc: "", price: "Desde $70.000" },
  { title: "Servicio Pre-Venta",    desc: "", price: "Desde $120.000" },
  { title: "Mantención Automotriz", desc: "", price: "Desde $120.000" },
];

type Tab = "servicios" | "contacto" | "hero";

const TABS: { id: Tab; label: string }[] = [
  { id: "servicios", label: "Servicios" },
  { id: "contacto",  label: "Contacto" },
  { id: "hero",      label: "Hero" },
];

const inputCls = "w-full px-3.5 py-2.5 rounded-xl font-inter text-sm text-white";
const inputStyle = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" } as const;
const labelCls = "block font-space text-white/35 text-[10px] uppercase tracking-widest mb-1.5";

export default function AdminContenido() {
  const [tab, setTab] = useState<Tab>("servicios");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [services, setServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
  const [phone, setPhone]       = useState("+569 520 95 222");
  const [whatsapp, setWhatsapp] = useState("56952095222");
  const [address, setAddress]   = useState("Uruguay #530, La Cisterna, RM");
  const [emailPub, setEmailPub] = useState("contacto@cleanschile.cl");
  const [tagline, setTagline]   = useState("Nanotecnología y precisión. Tu vehículo transformado al nivel que merece.");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.services) {
          try { setServices(JSON.parse(data.services)); } catch {}
        }
        if (data.site_phone)       setPhone(data.site_phone);
        if (data.site_whatsapp)    setWhatsapp(data.site_whatsapp);
        if (data.site_address)     setAddress(data.site_address);
        if (data.site_email_public) setEmailPub(data.site_email_public);
        if (data.hero_tagline)     setTagline(data.hero_tagline);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true); setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: JSON.stringify(services),
          site_phone: phone,
          site_whatsapp: whatsapp,
          site_address: address,
          site_email_public: emailPub,
          hero_tagline: tagline,
        }),
      });
      if (res.ok) {
        toast.success("Cambios guardados. Se verán en el sitio de inmediato.");
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        toast.error("Error al guardar.");
      }
    } finally {
      setSaving(false);
    }
  };

  const updateService = (i: number, field: keyof ServiceItem, val: string) =>
    setServices((prev) => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s));

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-7">
        <div>
          <h1 className="font-bebas text-4xl text-white tracking-wider">CONTENIDO</h1>
          <p className="font-inter text-white/40 text-sm mt-1">Edita textos y precios del sitio. Los cambios se publican al instante.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="relative px-5 py-2.5 rounded-xl font-space text-sm font-semibold overflow-hidden disabled:opacity-60 shrink-0"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-electric-blue to-electric-purple" />
          <span className="relative flex items-center gap-2">
            {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle size={14} /> : <Save size={14} />}
            {saving ? "Guardando..." : saved ? "Guardado" : "Guardar cambios"}
          </span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", width: "fit-content" }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-5 py-2 rounded-lg font-space text-sm transition-all"
            style={{
              background: tab === t.id ? "rgba(255,255,255,0.08)" : "transparent",
              color: tab === t.id ? "#fff" : "rgba(255,255,255,0.35)",
              border: tab === t.id ? "1px solid rgba(255,255,255,0.1)" : "1px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 size={24} className="animate-spin text-electric-blue" />
        </div>
      ) : (
        <>
          {/* ── TAB: SERVICIOS ── */}
          {tab === "servicios" && (
            <div className="space-y-4">
              {services.map((svc, i) => {
                const meta = SERVICE_META[i];
                const Icon = meta.icon;
                return (
                  <div key={i} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    {/* Service header */}
                    <div className="flex items-center gap-3 px-5 py-3.5" style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${meta.color}18`, border: `1px solid ${meta.color}35` }}>
                        <Icon size={13} style={{ color: meta.color }} />
                      </div>
                      <span className="font-bebas text-lg tracking-wider" style={{ color: meta.color }}>{meta.num}</span>
                      <span className="font-space text-xs text-white/40">{meta.tag}</span>
                    </div>

                    {/* Fields */}
                    <div className="p-5 space-y-4" style={{ background: "rgba(255,255,255,0.015)" }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className={labelCls}>Nombre del servicio</label>
                          <input value={svc.title} onChange={(e) => updateService(i, "title", e.target.value)}
                            className={inputCls} style={inputStyle} />
                        </div>
                        <div>
                          <label className={labelCls}>Precio</label>
                          <input value={svc.price} onChange={(e) => updateService(i, "price", e.target.value)}
                            placeholder="Desde $80.000" className={inputCls} style={inputStyle} />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Descripción</label>
                        <textarea value={svc.desc} onChange={(e) => updateService(i, "desc", e.target.value)}
                          rows={3} className={inputCls} style={{ ...inputStyle, resize: "vertical" }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── TAB: CONTACTO ── */}
          {tab === "contacto" && (
            <div className="max-w-lg space-y-5">
              {[
                { label: "Teléfono (con código de país)", value: phone, set: setPhone, icon: Phone, placeholder: "+569 520 95 222" },
                { label: "WhatsApp (solo números, sin +)", value: whatsapp, set: setWhatsapp, icon: MessageCircle, placeholder: "56952095222" },
                { label: "Dirección", value: address, set: setAddress, icon: MapPin, placeholder: "Uruguay #530, La Cisterna, RM" },
                { label: "Email público del sitio", value: emailPub, set: setEmailPub, icon: Mail, placeholder: "contacto@cleanschile.cl" },
              ].map(({ label, value, set, icon: Icon, placeholder }) => (
                <div key={label} className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <Icon size={14} style={{ color: "rgba(203,213,225,0.4)" }} />
                    <label className={labelCls} style={{ margin: 0 }}>{label}</label>
                  </div>
                  <input value={value} onChange={(e) => set(e.target.value)}
                    placeholder={placeholder} className={inputCls} style={inputStyle} />
                </div>
              ))}
              <p className="font-inter text-white/20 text-xs leading-relaxed">
                El teléfono y WhatsApp se usan en los botones de llamada y chat del sitio. El email público aparece en el footer y en la sección de contacto.
              </p>
            </div>
          )}

          {/* ── TAB: HERO ── */}
          {tab === "hero" && (
            <div className="max-w-lg">
              <div className="p-5 rounded-2xl" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-2.5 mb-3">
                  <Type size={14} style={{ color: "rgba(203,213,225,0.4)" }} />
                  <label className={labelCls} style={{ margin: 0 }}>Frase principal (debajo del título CLEANSCHILE)</label>
                </div>
                <textarea value={tagline} onChange={(e) => setTagline(e.target.value)}
                  rows={3} className={inputCls} style={{ ...inputStyle, resize: "vertical" }} />
                <p className="font-inter text-white/20 text-xs mt-2">Aparece en la sección de inicio, debajo del título en grande.</p>
              </div>

              {/* Preview */}
              <div className="mt-4 p-5 rounded-2xl" style={{ background: "#050510", border: "1px solid rgba(255,255,255,0.05)" }}>
                <p className="font-space text-white/20 text-[10px] uppercase tracking-widest mb-3">Vista previa</p>
                <p className="font-space text-[10px] text-yellow-500/60 uppercase tracking-widest mb-1">Protección Automotriz</p>
                <p className="font-inter text-white/50 text-sm leading-relaxed">{tagline || "—"}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
