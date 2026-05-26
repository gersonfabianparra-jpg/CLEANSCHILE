"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <>
      <ScrollProgress />
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Animated backdrop on scroll */}
        <motion.div
          className="absolute inset-0 glass-strong"
          style={{ opacity: navOpacity }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue via-neon-violet to-neon-pink opacity-70 blur-sm group-hover:blur-md transition-all" />
              <div className="relative w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center">
                <span className="font-bebas text-lg text-gold-light tracking-wider">C</span>
              </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-bebas text-xl tracking-[0.15em] text-white leading-none">CLEANS</span>
              <span className="font-bebas text-xl tracking-[0.15em] gold-text leading-none">CHILE</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  href={link.href}
                  className="font-space text-sm text-chrome/60 hover:text-white transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-neon-blue to-neon-violet group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+56952095222"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-space text-chrome/70 hover:text-white transition-colors border border-white/10 hover:border-white/20"
            >
              <Phone size={14} />
              <span>+569 5209 5222</span>
            </a>
            <a
              href="#contacto"
              className="relative px-5 py-2 rounded-full font-space text-sm font-medium text-black overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-gold to-gold-light group-hover:brightness-110 transition-all" />
              <span className="relative">Cotizar Ahora</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-chrome/70 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass-strong border-t border-white/[0.05]"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      className="font-space text-base text-chrome/70 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <a
                  href="#contacto"
                  className="mt-2 text-center py-3 rounded-full bg-gradient-to-r from-gold to-gold-light font-space font-medium text-black text-sm"
                  onClick={() => setIsOpen(false)}
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
