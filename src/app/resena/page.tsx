"use client";

import { useState } from "react";
import { Star, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ResenaPage() {
  const [form, setForm] = useState({ name: "", rating: 5, carModel: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setDone(true);
      } else {
        const data = await res.json();
        setError(data.error ?? "Error al enviar. Intenta de nuevo.");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050510", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1.25rem" }}>

      {/* Logo */}
      <Link href="/" style={{ marginBottom: "2.5rem", opacity: 0.8, display: "inline-block" }}>
        <Image src="/logo.png" width={160} height={53} alt="CleanSchile" style={{ objectFit: "contain", height: 44, width: "auto" }} />
      </Link>

      {done ? (
        /* Success state */
        <div style={{ maxWidth: 440, width: "100%", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CheckCircle size={32} style={{ color: "#4ADE80" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "2.2rem", color: "#fff", margin: 0, letterSpacing: "0.04em" }}>¡GRACIAS!</h1>
          <p style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.5)", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
            Tu reseña fue enviada y será revisada antes de publicarse.<br />Agradecemos tu confianza en CleanSchile.
          </p>
          <Link href="/" style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-space)", fontSize: 12, color: "rgba(203,213,225,0.35)", textDecoration: "none" }}>
            <ArrowLeft size={13} /> Volver al sitio
          </Link>
        </div>
      ) : (
        <div style={{ maxWidth: 480, width: "100%" }}>

          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2rem,8vw,3rem)", color: "#fff", margin: "0 0 8px", letterSpacing: "0.04em" }}>
              COMPARTE TU EXPERIENCIA
            </h1>
            <p style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.4)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              Tu opinión ayuda a otros clientes y nos motiva a seguir mejorando.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, padding: "2rem 1.75rem", display: "flex", flexDirection: "column", gap: 18 }}
          >
            {/* Star rating */}
            <div>
              <label style={{ display: "block", fontFamily: "var(--font-space)", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                ¿Cómo calificarías nuestro servicio?
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, rating: n }))}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  >
                    <Star
                      size={28}
                      style={{
                        color: n <= form.rating ? "#EAB308" : "rgba(255,255,255,0.15)",
                        fill: n <= form.rating ? "#EAB308" : "none",
                        transition: "all 0.15s",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label style={{ display: "block", fontFamily: "var(--font-space)", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Tu nombre *
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Ej. María González"
                required
                style={{ width: "100%", padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontFamily: "var(--font-inter)", fontSize: 14, boxSizing: "border-box" }}
              />
            </div>

            {/* Car model */}
            <div>
              <label style={{ display: "block", fontFamily: "var(--font-space)", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Vehículo (opcional)
              </label>
              <input
                value={form.carModel}
                onChange={(e) => setForm((p) => ({ ...p, carModel: e.target.value }))}
                placeholder="Ej. Toyota Corolla 2022"
                style={{ width: "100%", padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontFamily: "var(--font-inter)", fontSize: 14, boxSizing: "border-box" }}
              />
            </div>

            {/* Review text */}
            <div>
              <label style={{ display: "block", fontFamily: "var(--font-space)", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                Tu reseña *
              </label>
              <textarea
                value={form.text}
                onChange={(e) => setForm((p) => ({ ...p, text: e.target.value }))}
                placeholder="Cuéntanos tu experiencia con el servicio..."
                required
                rows={4}
                style={{ width: "100%", padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#fff", fontFamily: "var(--font-inter)", fontSize: 14, resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            {error && (
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "#F87171", margin: 0 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ position: "relative", padding: "13px", borderRadius: 14, border: "none", cursor: loading ? "not-allowed" : "pointer", overflow: "hidden", opacity: loading ? 0.7 : 1 }}
            >
              <span style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #3B82F6, #8B5CF6)" }} />
              <span style={{ position: "relative", fontFamily: "var(--font-space)", fontWeight: 600, fontSize: 14, color: "#fff" }}>
                {loading ? "Enviando..." : "Enviar reseña"}
              </span>
            </button>
          </form>

          <p style={{ textAlign: "center", fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 20, lineHeight: 1.6 }}>
            Tu reseña será revisada antes de publicarse en el sitio.<br />No compartimos tu información con terceros.
          </p>
        </div>
      )}
    </div>
  );
}
