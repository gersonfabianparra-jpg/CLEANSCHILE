"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, MessageSquarePlus } from "lucide-react";

type Review = {
  id: string;
  name: string;
  rating: number;
  carModel: string | null;
  text: string;
  featured: boolean;
  published: boolean;
  createdAt: Date | string;
};

const INTERVAL = 5000;

function EmptyState() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "4rem 1.5rem", textAlign: "center", maxWidth: 360, margin: "0 auto" }}
    >
      <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <MessageSquarePlus size={24} style={{ color: "rgba(234,179,8,0.5)" }} />
      </div>
      <p style={{ fontFamily: "var(--font-inter)", color: "rgba(203,213,225,0.3)", fontSize: 14, lineHeight: 1.8, margin: 0 }}>
        Las reseñas de nuestros clientes aparecerán aquí pronto.
      </p>
    </motion.div>
  );
}

export function Reviews({ dbReviews }: { dbReviews: Review[] }) {
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true, margin: "-80px" });
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = dbReviews.length;
  const hasReviews = total > 0;
  const multiple = total > 1;

  const goTo = useCallback((n: number) => {
    setIdx(((n % total) + total) % total);
  }, [total]);

  const prev = useCallback(() => goTo(idx - 1), [idx, goTo]);
  const next = useCallback(() => goTo(idx + 1), [idx, goTo]);

  useEffect(() => {
    if (!multiple || paused) return;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [idx, paused, multiple, next]);

  const review = dbReviews[idx] ?? null;
  const avgRating = hasReviews
    ? (dbReviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
    : "5.0";
  const initials = review ? review.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() : "";

  return (
    <section
      id="resenas"
      style={{ position: "relative", background: "#050510", padding: "7rem 1.5rem", overflow: "hidden" }}
    >
      {/* Subtle glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 500, background: "radial-gradient(ellipse, rgba(59,130,246,0.035) 0%, transparent 65%)", pointerEvents: "none" }} />

      <div ref={headRef} style={{ maxWidth: "72rem", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <motion.span
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            style={{ display: "inline-block", fontFamily: "var(--font-space)", fontSize: 10, color: "rgba(234,179,8,0.65)", letterSpacing: "0.45em", textTransform: "uppercase", marginBottom: "0.9rem" }}
          >
            Clientes satisfechos
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(2.4rem,6vw,4.8rem)", lineHeight: 1, margin: "0 0 1rem", color: "#fff", letterSpacing: "0.02em" }}
          >
            Lo que dicen de nosotros
          </motion.h2>

          {hasReviews && (
            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <div style={{ display: "flex", gap: 2 }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={13} style={{ color: "#EAB308", fill: "#EAB308" }} />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-bebas)", fontSize: "1.1rem", color: "#EAB308" }}>{avgRating}</span>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "rgba(203,213,225,0.3)" }}>
                · {total} reseña{total !== 1 ? "s" : ""}
              </span>
            </motion.div>
          )}
        </div>

        {/* Slide */}
        {!hasReviews ? <EmptyState /> : (
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}
          >
            {/* Prev / Next — only if multiple */}
            {multiple && (
              <>
                <button
                  onClick={prev}
                  style={{ position: "absolute", left: -52, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.35)", transition: "all 0.2s" }}
                  className="rsp-arrow-hide"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  style={{ position: "absolute", right: -52, top: "50%", transform: "translateY(-50%)", zIndex: 10, width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.35)", transition: "all 0.2s" }}
                  className="rsp-arrow-hide"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Card */}
            <div style={{ position: "relative", minHeight: 260 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: "2.5rem 2.75rem",
                    borderRadius: 24,
                    background: "rgba(255,255,255,0.028)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    position: "relative",
                  }}
                >
                  {/* Large faded quote */}
                  <div style={{
                    position: "absolute", top: 24, left: 28,
                    fontFamily: "Georgia, serif", fontSize: "5rem", lineHeight: 1,
                    color: "rgba(234,179,8,0.1)", userSelect: "none", pointerEvents: "none",
                  }}>
                    "
                  </div>

                  {/* Stars */}
                  <div style={{ display: "flex", gap: 3, marginBottom: "1.25rem" }}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={14} style={{ color: i < review.rating ? "#EAB308" : "rgba(255,255,255,0.1)", fill: i < review.rating ? "#EAB308" : "none" }} />
                    ))}
                  </div>

                  {/* Review text */}
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(14px,2vw,16px)",
                    lineHeight: 1.85,
                    color: "rgba(203,213,225,0.72)",
                    margin: "0 0 2rem",
                    fontStyle: "italic",
                  }}>
                    {review.text}
                  </p>

                  {/* Author */}
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, rgba(59,130,246,0.4), rgba(139,92,246,0.4))", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "var(--font-space)", fontWeight: 700, fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{initials}</span>
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-space)", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>{review.name}</p>
                      {review.carModel && (
                        <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(255,255,255,0.25)", margin: 0 }}>{review.carModel}</p>
                      )}
                    </div>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 999, background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.15)" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80" }} />
                      <span style={{ fontFamily: "var(--font-space)", fontSize: 9, color: "rgba(74,222,128,0.8)", fontWeight: 600, letterSpacing: "0.05em" }}>VERIFICADO</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots — only if multiple */}
            {multiple && (
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 24 }}>
                {dbReviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      width: i === idx ? 24 : 6, height: 6,
                      borderRadius: 999, border: "none", padding: 0, cursor: "pointer",
                      background: i === idx ? "#EAB308" : "rgba(255,255,255,0.12)",
                      transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Bottom line */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05) 50%, transparent)", marginTop: "5rem" }} />
    </section>
  );
}
