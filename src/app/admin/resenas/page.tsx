"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Star, Trash2, Eye, EyeOff, Bookmark, BookmarkCheck, Loader2, X } from "lucide-react";
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
      if (res.ok) {
        toast.success("Reseña creada.");
        onSaved();
      } else {
        toast.error("Error al crear reseña.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-lg p-8 rounded-3xl bg-black-card border border-white/10 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <X size={20} />
        </button>
        <h2 className="font-space font-bold text-white text-lg mb-6">Nueva Reseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-space text-white/40 text-xs mb-1.5">Nombre *</label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter focus:border-electric-blue/50 transition-all"
                required
              />
            </div>
            <div>
              <label className="block font-space text-white/40 text-xs mb-1.5">Vehículo</label>
              <input
                value={form.carModel}
                onChange={(e) => setForm((p) => ({ ...p, carModel: e.target.value }))}
                placeholder="ej. Toyota Corolla"
                className="w-full px-3 py-2.5 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter focus:border-electric-blue/50 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block font-space text-white/40 text-xs mb-1.5">Rating</label>
            <select
              value={form.rating}
              onChange={(e) => setForm((p) => ({ ...p, rating: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter focus:border-electric-blue/50 transition-all"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n} className="bg-black-card">{n} estrellas</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-space text-white/40 text-xs mb-1.5">Texto *</label>
            <textarea
              value={form.text}
              onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-black-deep border border-white/8 text-white text-sm font-inter focus:border-electric-blue/50 transition-all resize-none"
              required
            />
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 font-space text-white/60 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))}
                className="rounded"
              />
              Destacada
            </label>
            <label className="flex items-center gap-2 font-space text-white/60 text-sm">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm((p) => ({ ...p, published: e.target.checked }))}
                className="rounded"
              />
              Publicada
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full relative py-3 rounded-xl font-space font-semibold text-sm overflow-hidden group disabled:opacity-70"
          >
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

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviews(data);
    setLoading(false);
  }, []);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  const toggle = async (id: string, field: "featured" | "published", value: boolean) => {
    await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
    toast.success("Reseña actualizada.");
  };

  const deleteReview = async (id: string) => {
    if (!confirm("¿Eliminar esta reseña?")) return;
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    setReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Reseña eliminada.");
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-bebas text-4xl text-white tracking-wider">RESEÑAS</h1>
          <p className="font-inter text-white/40 text-sm mt-1">{reviews.length} reseñas en total</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="relative px-5 py-2.5 rounded-xl font-space text-sm font-medium overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-electric-blue to-electric-purple" />
          <span className="relative flex items-center gap-2"><Plus size={15} />Nueva Reseña</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 size={24} className="animate-spin text-electric-blue" />
        </div>
      ) : (
        <div className="grid gap-3">
          {reviews.map((r) => (
            <motion.div
              key={r.id}
              layout
              className="p-5 rounded-2xl bg-black-card border border-white/5 flex items-start gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-space font-semibold text-white text-sm">{r.name}</span>
                  {r.carModel && (
                    <span className="text-white/30 text-xs font-inter">{r.carModel}</span>
                  )}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={11} className={i < r.rating ? "fill-gold text-gold" : "text-white/15"} />
                    ))}
                  </div>
                </div>
                <p className="font-inter text-white/45 text-sm leading-relaxed">{r.text}</p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => toggle(r.id, "featured", !r.featured)}
                  title={r.featured ? "Quitar destacado" : "Destacar"}
                  className={`p-2 rounded-lg transition-all ${r.featured ? "bg-gold/10 text-gold" : "text-white/25 hover:text-white/50"}`}
                >
                  {r.featured ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                </button>
                <button
                  onClick={() => toggle(r.id, "published", !r.published)}
                  title={r.published ? "Ocultar" : "Publicar"}
                  className={`p-2 rounded-lg transition-all ${r.published ? "text-green-400 bg-green-500/10" : "text-white/25 hover:text-white/50"}`}
                >
                  {r.published ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  onClick={() => deleteReview(r.id)}
                  className="p-2 rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </motion.div>
          ))}
          {reviews.length === 0 && (
            <div className="text-center py-12 text-white/25 font-inter text-sm">
              No hay reseñas. Crea la primera.
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <ReviewForm onSaved={() => { setShowForm(false); fetchReviews(); }} onClose={() => setShowForm(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
