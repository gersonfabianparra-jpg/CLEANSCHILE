"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Phone, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Logo } from "@/components/ui/Logo";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "/sellado-ceramico", label: "Sellado Cerámico", highlight: true },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lockGlow, setLockGlow] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const router = useRouter();
  const clickCount = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLockClick = useCallback(() => {
    clickCount.current += 1;
    setLockGlow(true);
    setTimeout(() => setLockGlow(false), 300);

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => { clickCount.current = 0; }, 3000);

    if (clickCount.current >= 5) {
      clickCount.current = 0;
      if (resetTimer.current) clearTimeout(resetTimer.current);
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <>
      <ScrollProgress />
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        {/* Backdrop on scroll */}
        <motion.div
          style={{
            position: "absolute", inset: 0, opacity: navOpacity,
            background: "rgba(4,4,18,0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        />

        <div style={{
          position: "relative",
          maxWidth: "82rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 84,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <Logo compact />
          </Link>

          {/* Desktop nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }} className="rsp-nav-desktop">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                {link.highlight ? (
                  <Link
                    href={link.href}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontFamily: "var(--font-space)", fontSize: 11, fontWeight: 700,
                      color: "#A78BFA",
                      textDecoration: "none",
                      padding: "4px 12px", borderRadius: 999,
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.28)",
                      letterSpacing: "0.02em",
                      transition: "all 0.3s",
                    }}
                  >
                    <span style={{ fontSize: 8, lineHeight: 1 }}>✦</span>
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-space)",
                      fontSize: 13,
                      color: "rgba(203,213,225,0.6)",
                      textDecoration: "none",
                      position: "relative",
                      transition: "color 0.3s",
                    }}
                    className="group hover:text-white"
                  >
                    {link.label}
                    <span style={{
                      position: "absolute",
                      bottom: -2, left: 0,
                      height: 1,
                      width: 0,
                      background: "linear-gradient(90deg, #06B6D4, #3B82F6)",
                      transition: "width 0.3s",
                    }}
                      className="group-hover:w-full"
                    />
                  </Link>
                )}
              </motion.div>
            ))}
          </nav>

          {/* CTA group */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="rsp-nav-desktop">
            <a
              href="tel:+56952095222"
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "0.5rem 1rem",
                borderRadius: 999,
                fontFamily: "var(--font-space)", fontSize: 12,
                color: "rgba(203,213,225,0.65)",
                border: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none",
                transition: "all 0.3s",
              }}
            >
              <Phone size={13} />
              +569 5209 5222
            </a>
            <a
              href="#contacto"
              style={{
                position: "relative",
                display: "inline-flex", alignItems: "center",
                padding: "0.55rem 1.25rem",
                borderRadius: 999,
                fontFamily: "var(--font-space)", fontSize: 12, fontWeight: 700,
                color: "#000",
                background: "linear-gradient(135deg, #EAB308, #FDE047)",
                textDecoration: "none",
                letterSpacing: "0.03em",
                transition: "filter 0.3s",
              }}
            >
              Cotizar
            </a>
          </div>

          {/* Hidden admin lock */}
          <button
            onClick={handleLockClick}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 6,
              color: lockGlow ? "rgba(6,182,212,0.5)" : "rgba(255,255,255,0.07)",
              transition: "color 0.2s",
              flexShrink: 0,
            }}
            title=""
            aria-hidden="true"
          >
            <Lock size={13} />
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(203,213,225,0.7)", padding: 4,
            }}
            className="rsp-nav-mobile"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "rgba(4,4,18,0.96)",
                backdropFilter: "blur(24px)",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: 20 }}>
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      style={{
                        fontFamily: "var(--font-space)", fontSize: 15,
                        color: link.highlight ? "#A78BFA" : "rgba(203,213,225,0.7)",
                        textDecoration: "none",
                        display: "flex", alignItems: "center", gap: 8,
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.highlight && (
                        <span style={{
                          fontSize: 9, color: "#8B5CF6",
                          background: "rgba(139,92,246,0.15)",
                          border: "1px solid rgba(139,92,246,0.3)",
                          padding: "1px 8px", borderRadius: 999,
                          fontWeight: 700, letterSpacing: "0.1em",
                        }}>NUEVO</span>
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <a
                  href="#contacto"
                  onClick={() => setIsOpen(false)}
                  style={{
                    textAlign: "center",
                    padding: "0.85rem",
                    borderRadius: 999,
                    fontFamily: "var(--font-space)", fontSize: 13, fontWeight: 700,
                    color: "#000",
                    background: "linear-gradient(135deg, #EAB308, #FDE047)",
                    textDecoration: "none",
                    marginTop: 4,
                  }}
                >
                  Cotizar Ahora
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
