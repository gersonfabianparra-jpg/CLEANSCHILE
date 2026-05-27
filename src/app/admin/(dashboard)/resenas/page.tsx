"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Star, Trash2, Loader2, X, Check, EyeOff, Copy, Link, Clock } from "lucide-react";
import toast from "react-hot-toast";

type Review = {
  id: string;
  name: string;
  rating: number;
  carModel: string | null;
  text: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
};

const REVIEW_LINK = "https://cleanschile.vercel.app/resena";

function ReviewForm({ onSaved, onClose }: { onSaved: () => void; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", rating: "5", carModel: "", text: "", featured: false, published: true });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { toast.success("Reseña creada."); onSaved(); }
      else toast.error("Error al crear reseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-lg p-8 rounded-3xl bg-black-card border border-white/10 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <X size={20} />
        </button>
        <h2 className="font-space font-bold text-white text-lg mb-6">Nueva Reseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-space text-white/40 text-xs mb-1.5">Nombre *</label>
              <input value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter" required />
            </div>
            <div>
              <label className="block font-space text-white/40 text-xs mb-1.5">Vehículo</label>
              <input value={form.carModel} onChange={(e) => setForm((p) => ({ ...p, carModel: e.target.value }))}
                placeholder="ej. Toyota Corolla" className="w-full px-3 py-2.5 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter" />
            </div>
          </div>
          <div>
            <label className="block font-space text-white/40 text-xs mb-1.5">Rating</label>
            <select value={form.rating} onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter">
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n} className="bg-black-card">{n} estrellas</option>)}
            </select>
          </div>
          <div>
            <label className="block font-space text-white/40 text-xs mb-1.5">Texto *</label>
            <textarea value={form.text} onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
              rows={3} className="w-full px-3 py-2.5 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter resize-none" required />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 font-space text-white/60 text-sm">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))} className="rounded" />
              Publicar inmediatamente
            </label>
          </div>
          <button type="submit" disabled={loading}
            className="w-full relative py-3 rounded-xl font-space font-semibold text-sm overflow-hidden group disabled:opacity-70">
            <span className="absolute inset-0 bg-gradient-to-r from-electric-blue to-electric-purple" />
            <span className="relative flex items-center justify-center gap-2">
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
              {loading ? "Guardando..." : "Crear Reseña"}
            </span>
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function AdminResenas() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "pending" | "published">("all");

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/reviews?all=true");
    const data = await res.json();
    setReviews(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const approve = async (id: string) => {
    await fetch(`/api/reviews/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: true }) });
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, published: true } : r));
    toast.success("Reseña aprobada — ya es visible en el sitio.");
  };

  const reject = async (id: string) => {
    await fetch(`/api/reviews/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ published: false }) });
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, published: false } : r));
    toast.success("Reseña ocultada.");
  };

  const deleteReview = async (id: string) => {
    if (!confirm("¿Eliminar esta reseña permanentemente?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Reseña eliminada.");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(REVIEW_LINK);
    toast.success("Enlace copiado.");
  };

  const pending = reviews.filter((r) => !r.published);
  const published = reviews.filter((r) => r.published);

  const visible = filter === "pending" ? pending : filter === "published" ? published : reviews;

  return (
    <div className="p-4 md:p-8">

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="font-bebas text-4xl text-white tracking-wider">RESEÑAS</h1>
          <p className="font-inter text-white/40 text-sm mt-1">
            {published.length} publicadas · <span className={pending.length > 0 ? "text-yellow-400" : "text-white/30"}>{pending.length} pendientes</span>
          </p>
        </div>
        <button onClick={() => setShowForm(true)} className="relative px-5 py-2.5 rounded-xl font-space text-sm font-medium overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-electric-blue to-electric-purple" />
          <span className="relative flex items-center gap-2"><Plus size={15} />Nueva</span>
        </button>
      </div>

      {/* Share link banner */}
      <div className="mb-5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <Link size={14} className="text-electric-blue shrink-0" />
          <div className="min-w-0">
            <p className="font-space text-white/70 text-xs font-medium mb-0.5">Enlace para clientes</p>
            <p className="font-inter text-white/30 text-xs truncate">{REVIEW_LINK}</p>
          </div>
        </div>
        <button
          onClick={copyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] font-space text-xs text-white/60 hover:text-white hover:bg-white/[0.09] transition-all shrink-0"
        >
          <Copy size={12} /> Copiar enlace
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {(["all", "pending", "published"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl font-space text-xs transition-all ${filter === f ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60"}`}
          >
            {f === "all" ? `Todas (${reviews.length})` : f === "pending" ? `Pendientes (${pending.length})` : `Publicadas (${published.length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 size={24} className="animate-spin text-electric-blue" />
        </div>
      ) : (
        <div className="grid gap-3">
          {visible.map((r) => (
            <motion.div key={r.id} layout
              className={`p-5 rounded-2xl border flex items-start gap-4 transition-colors ${r.published ? "bg-black-card border-white/5" : "bg-yellow-500/[0.03] border-yellow-500/[0.12]"}`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <span className="font-space font-semibold text-white text-sm">{r.name}</span>
                  {r.carModel && <span className="text-white/25 text-xs font-inter">{r.carModel}</span>}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={11} className={i < r.rating ? "fill-gold text-gold" : "text-white/15"} />
                    ))}
                  </div>
                  {!r.published && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-space font-semibold">
                      <Clock size={9} /> Pendiente
                    </span>
                  )}
                </div>
                <p className="font-inter text-white/40 text-sm leading-relaxed line-clamp-2">{r.text}</p>
                <p className="font-inter text-white/20 text-xs mt-1.5">
                  {new Date(r.createdAt).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                {r.published ? (
                  <button onClick={() => reject(r.id)} title="Ocultar del sitio"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/35 hover:text-white/60 hover:bg-white/[0.08] transition-all font-space text-xs">
                    <EyeOff size={12} /> Ocultar
                  </button>
                ) : (
                  <button onClick={() => approve(r.id)} title="Publicar en el sitio"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/15 transition-all font-space text-xs font-semibold">
                    <Check size={12} /> Aprobar
                  </button>
                )}
                <button onClick={() => deleteReview(r.id)}
                  className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
          {visible.length === 0 && (
            <div className="text-center py-12 text-white/20 font-inter text-sm">
              {filter === "pending" ? "No hay reseñas pendientes." : filter === "published" ? "No hay reseñas publicadas." : "No hay reseñas."}
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showForm && <ReviewForm onSaved={() => { setShowForm(false); fetchReviews(); }} onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </div>
  );
}
