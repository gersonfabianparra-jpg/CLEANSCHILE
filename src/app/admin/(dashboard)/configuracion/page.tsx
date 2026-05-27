"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Mail, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

type Settings = {
  contact_email: string;
  review_email: string;
};

export default function AdminConfiguracion() {
  const [settings, setSettings] = useState<Settings>({ contact_email: "", review_email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => { setSettings(data); setLoading(false); });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast.success("Configuración guardada.");
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        toast.error("Error al guardar.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-xl">
      <div className="mb-8">
        <h1 className="font-bebas text-4xl text-white tracking-wider">CONFIGURACIÓN</h1>
        <p className="font-inter text-white/40 text-sm mt-1">Ajustes generales del sistema.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 size={24} className="animate-spin text-electric-blue" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">

          {/* Email section */}
          <div className="p-6 rounded-2xl border border-white/[0.07]" style={{ background: "rgba(255,255,255,0.025)" }}>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
                <Mail size={15} style={{ color: "#3B82F6" }} />
              </div>
              <div>
                <h2 className="font-space font-semibold text-white text-sm">Notificaciones por email</h2>
                <p className="font-inter text-white/30 text-xs">Destino de los correos automáticos del sistema.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-space text-white/40 text-xs mb-2 tracking-wide uppercase">
                  Email — formulario de contacto
                </label>
                <input
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => setSettings((p) => ({ ...p, contact_email: e.target.value }))}
                  placeholder="nicolas@cleanschile.cl"
                  required
                  className="w-full px-4 py-2.5 rounded-xl font-inter text-sm text-white"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <p className="font-inter text-white/20 text-xs mt-1.5">Cada vez que alguien envíe el formulario de contacto, el correo llega aquí.</p>
              </div>

              <div>
                <label className="block font-space text-white/40 text-xs mb-2 tracking-wide uppercase">
                  Email — nuevas reseñas
                </label>
                <input
                  type="email"
                  value={settings.review_email}
                  onChange={(e) => setSettings((p) => ({ ...p, review_email: e.target.value }))}
                  placeholder="nicolas@cleanschile.cl"
                  required
                  className="w-full px-4 py-2.5 rounded-xl font-inter text-sm text-white"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <p className="font-inter text-white/20 text-xs mt-1.5">Cuando un cliente envíe una reseña desde el enlace público, el aviso llega aquí.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="relative w-full py-3 rounded-xl font-space font-semibold text-sm overflow-hidden disabled:opacity-60"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-electric-blue to-electric-purple" />
            <span className="relative flex items-center justify-center gap-2">
              {saving ? (
                <><Loader2 size={14} className="animate-spin" /> Guardando...</>
              ) : saved ? (
                <><CheckCircle size={14} /> Guardado</>
              ) : (
                <><Save size={14} /> Guardar cambios</>
              )}
            </span>
          </button>
        </form>
      )}
    </div>
  );
}
