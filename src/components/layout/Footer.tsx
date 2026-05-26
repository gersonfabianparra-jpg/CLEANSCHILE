import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-midnight-2 border-t border-white/[0.05] overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 20% 80%, rgba(59,130,246,0.04) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-violet flex items-center justify-center">
                <span className="font-bebas text-lg text-white">C</span>
              </div>
              <div>
                <span className="font-bebas text-2xl tracking-widest gold-text">CLEANS CHILE</span>
              </div>
            </div>
            <p className="font-inter text-chrome/40 text-sm leading-relaxed max-w-xs">
              Detailing y mantención automotriz premium. Tratamos tu vehículo con el cuidado que merece.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/cleanschile.detailingcar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-chrome/50 hover:text-white hover:border-neon-pink/40 hover:bg-neon-pink/5 transition-all"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href="tel:+56952095222"
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-chrome/50 hover:text-white hover:border-neon-blue/40 hover:bg-neon-blue/5 transition-all"
              >
                <Phone size={16} />
              </a>
              <a
                href="mailto:contacto@cleanschile.cl"
                className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-chrome/50 hover:text-white hover:border-gold/40 hover:bg-gold/5 transition-all"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="font-space font-semibold text-white/90 text-sm tracking-wider uppercase">Servicios</h3>
            <ul className="space-y-3">
              {[
                "Detailing Exterior",
                "Recubrimiento Cerámico",
                "Detailing Interior",
                "Restauración de Faros",
                "Preparación Pre-Venta",
                "Mantención Automotriz",
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="#servicios"
                    className="font-inter text-chrome/40 text-sm hover:text-chrome/70 transition-colors flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold transition-all duration-300 inline-block" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h3 className="font-space font-semibold text-white/90 text-sm tracking-wider uppercase">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                <span className="font-inter text-chrome/40 text-sm leading-relaxed">
                  Uruguay #530,<br />La Cisterna, RM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-gold shrink-0" />
                <a href="tel:+56952095222" className="font-inter text-chrome/40 text-sm hover:text-chrome/70 transition-colors">
                  +569 520 95 222
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-gold shrink-0" />
                <a href="mailto:contacto@cleanschile.cl" className="font-inter text-chrome/40 text-sm hover:text-chrome/70 transition-colors">
                  contacto@cleanschile.cl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-chrome/25 text-xs">
            © {new Date().getFullYear()} CleanSchile. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-inter text-chrome/20 text-xs hover:text-chrome/40 transition-colors flex items-center gap-1">
              Admin <ArrowUpRight size={10} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
