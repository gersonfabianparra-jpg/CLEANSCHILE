"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, MessageSquarePlus } from "lucide-react";

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

function timeAgo(date: Date | string) {
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  if (days < 30) return `Hace ${Math.floor(days / 7)} semana${Math.floor(days / 7) > 1 ? "s" : ""}`;
  if (days < 365) return `Hace ${Math.floor(days / 30)} mes${Math.floor(days / 30) > 1 ? "es" : ""}`;
  return `Hace ${Math.floor(days / 365)} año${Math.floor(days / 365) > 1 ? "s" : ""}`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "fill-gold text-gold" : "text-white/20"}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="relative shrink-0 w-80 p-6 rounded-2xl bg-black-card border border-white/5 hover:border-white/10 transition-all duration-300 group mx-3">
      <Quote size={20} className="text-gold/20 mb-4" />
      <StarRating rating={review.rating} />
      <p className="font-inter text-white/55 text-sm leading-relaxed mt-3 mb-5">
        &quot;{review.text}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-blue to-electric-purple flex items-center justify-center shrink-0">
          <span className="font-space font-bold text-sm text-white">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-space font-semibold text-white text-sm">{review.name}</p>
          <p className="font-inter text-white/30 text-xs">
            {review.carModel && `${review.carModel} · `}{timeAgo(review.createdAt)}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 40px rgba(201,168,76,0.05)" }} />
    </div>
  );
}

function EmptyState() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-4 py-12 text-center max-w-sm mx-auto"
    >
      <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
        <MessageSquarePlus size={28} className="text-gold" />
      </div>
      <p className="font-space font-semibold text-white text-base">Las reseñas vienen en camino</p>
      <p className="font-inter text-white/35 text-sm leading-relaxed">
        Nuestros clientes pronto compartirán su experiencia. ¿Ya pasaste por el taller? Cuéntanos.
      </p>
      <a
        href="#contacto"
        className="px-5 py-2.5 rounded-full border border-gold/30 text-gold font-space text-sm hover:bg-gold/5 transition-all"
      >
        Cotizar ahora
      </a>
    </motion.div>
  );
}

export function Reviews({ dbReviews }: { dbReviews: Review[] }) {
  const doubled = [...dbReviews, ...dbReviews];
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });
  const hasReviews = dbReviews.length > 0;

  return (
    <section id="resenas" className="relative py-32 bg-black-deep overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-gold/3 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div ref={headRef} className="text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-block font-space text-xs text-gold tracking-[0.4em] uppercase mb-4"
          >
            Lo que dicen nuestros clientes
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: 60 }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-[clamp(3rem,8vw,7rem)] leading-none"
            >
              RESEÑAS{" "}
              <span className="gradient-text-gold">REALES</span>
            </motion.h2>
          </div>

          {hasReviews && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 mt-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              <span className="font-space text-white/50 text-sm">
                {dbReviews.length} reseña{dbReviews.length !== 1 ? "s" : ""} verificada{dbReviews.length !== 1 ? "s" : ""}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {!hasReviews ? (
        <EmptyState />
      ) : (
        <>
          {/* Marquee Row 1 */}
          <div className="relative">
            <div className="flex animate-marquee">
              {doubled.map((r, i) => (
                <ReviewCard key={`r1-${i}`} review={r} />
              ))}
            </div>
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black-deep to-transparent pointer-events-none z-10" />
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black-deep to-transparent pointer-events-none z-10" />
          </div>

          {/* Marquee Row 2 (reverse) — solo si hay suficientes */}
          {dbReviews.length >= 3 && (
            <div className="relative mt-5">
              <div className="flex animate-marquee-reverse">
                {[...doubled].reverse().map((r, i) => (
                  <ReviewCard key={`r2-${i}`} review={r} />
                ))}
              </div>
              <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black-deep to-transparent pointer-events-none z-10" />
              <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black-deep to-transparent pointer-events-none z-10" />
            </div>
          )}
        </>
      )}
    </section>
  );
}
