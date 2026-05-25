"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const STATIC_REVIEWS = [
  { name: "Carlos M.", car: "Toyota Corolla", rating: 5, text: "Increíble trabajo. Entregaron el auto como nuevo, hasta mejor que cuando lo compré. El recubrimiento cerámico quedó espectacular.", date: "Hace 2 semanas" },
  { name: "Valentina R.", car: "Mazda CX-5", rating: 5, text: "Super profesionales y rápidos. Llevé el auto con manchas de agua imposibles y las sacaron todas. 100% recomendado.", date: "Hace 1 mes" },
  { name: "Ignacio F.", car: "BMW Serie 3", rating: 5, text: "Nicolás y su equipo son los mejores del sector. Trato el auto con mucho cuidado y el resultado fue increíble.", date: "Hace 3 semanas" },
  { name: "Sofía L.", car: "Kia Sportage", rating: 5, text: "Llevé el interior que estaba destruido con manchas de café. Lo dejaron impecable. Precio justo y atención perfecta.", date: "Hace 1 semana" },
  { name: "Andrés P.", car: "Ford Ranger", rating: 5, text: "Los faros del auto estaban amarillos y opacos. Los restauraron y quedaron como nuevos. Ahorro comparado a comprar nuevos.", date: "Hace 2 meses" },
  { name: "Camila T.", car: "Hyundai Tucson", rating: 5, text: "Preparación pre-venta excelente. Me ayudaron a aumentar el valor de mi auto. Se vendió en menos de una semana.", date: "Hace 5 días" },
];

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

function ReviewCard({ review }: { review: typeof STATIC_REVIEWS[0] }) {
  return (
    <div className="relative shrink-0 w-80 p-6 rounded-2xl bg-black-card border border-white/5 hover:border-white/10 transition-all duration-300 group mx-3">
      {/* Quote icon */}
      <Quote size={20} className="text-gold/20 mb-4" />

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Text */}
      <p className="font-inter text-white/55 text-sm leading-relaxed mt-3 mb-5">
        &quot;{review.text}&quot;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-electric-blue to-electric-purple flex items-center justify-center shrink-0">
          <span className="font-space font-bold text-sm text-white">
            {review.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-space font-semibold text-white text-sm">{review.name}</p>
          <p className="font-inter text-white/30 text-xs">{review.car} · {review.date}</p>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "inset 0 0 40px rgba(201,168,76,0.05)" }} />
    </div>
  );
}

export function Reviews({ dbReviews }: { dbReviews?: typeof STATIC_REVIEWS }) {
  const reviews = dbReviews && dbReviews.length > 0 ? dbReviews : STATIC_REVIEWS;
  const doubled = [...reviews, ...reviews];
  const headRef = useRef(null);
  const inView = useInView(headRef, { once: true });

  return (
    <section id="resenas" className="relative py-32 bg-black-deep overflow-hidden">
      {/* Background */}
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
          {/* Stars row */}
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
            <span className="font-space text-white/50 text-sm">5.0 promedio</span>
          </motion.div>
        </div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative">
        <div className="flex animate-marquee">
          {doubled.map((r, i) => (
            <ReviewCard key={`r1-${i}`} review={r} />
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black-deep to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black-deep to-transparent pointer-events-none z-10" />
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative mt-5">
        <div className="flex animate-marquee-reverse">
          {doubled.reverse().map((r, i) => (
            <ReviewCard key={`r2-${i}`} review={r} />
          ))}
        </div>
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black-deep to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black-deep to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
