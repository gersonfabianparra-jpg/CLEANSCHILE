import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { LogoFull } from "@/components/ui/Logo";

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
    <footer style={{ position: "relative", background: "#030310", borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
      {/* Subtle glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "20%",
        width: 600, height: 300,
        background: "radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", maxWidth: "82rem", margin: "0 auto", padding: "5rem 1.5rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 64 }}
          className="grid-cols-1 md:grid-cols-3">

          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <LogoFull />
            <p style={{
              fontFamily: "var(--font-inter)", fontSize: 13,
              color: "rgba(203,213,225,0.38)",
              lineHeight: 1.75, maxWidth: 280, margin: 0,
            }}>
              Detailing y mantención automotriz premium en La Cisterna, Santiago.
              Tratamos tu vehículo con el cuidado que merece.
            </p>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { href: "https://instagram.com/cleanschile.detailingcar", icon: <InstagramIcon />, hoverColor: "#EC4899" },
                { href: "tel:+56952095222", icon: <Phone size={15} />, hoverColor: "#06B6D4" },
                { href: "mailto:contacto@cleanschile.cl", icon: <Mail size={15} />, hoverColor: "#EAB308" },
              ].map(({ href, icon, hoverColor }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    width: 38, height: 38, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(203,213,225,0.4)",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    textDecoration: "none",
                    transition: "all 0.3s",
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{
              fontFamily: "var(--font-space)", fontSize: 11, fontWeight: 600,
              color: "rgba(255,255,255,0.85)", letterSpacing: "0.15em",
              textTransform: "uppercase", marginBottom: 20, margin: "0 0 20px",
            }}>
              Servicios
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
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
                    style={{
                      fontFamily: "var(--font-inter)", fontSize: 13,
                      color: "rgba(203,213,225,0.38)",
                      textDecoration: "none",
                      transition: "color 0.3s",
                      display: "flex", alignItems: "center", gap: 6,
                    }}
                  >
                    <span style={{ width: 0, height: 1, background: "#EAB308", display: "inline-block", transition: "width 0.3s" }}
                      className="group-hover:w-3" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{
              fontFamily: "var(--font-space)", fontSize: 11, fontWeight: 600,
              color: "rgba(255,255,255,0.85)", letterSpacing: "0.15em",
              textTransform: "uppercase", margin: "0 0 20px",
            }}>
              Contacto
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: <MapPin size={14} />, text: "Uruguay #530, La Cisterna, RM", href: "#" },
                { icon: <Phone size={14} />, text: "+569 520 95 222", href: "tel:+56952095222" },
                { icon: <Mail size={14} />, text: "contacto@cleanschile.cl", href: "mailto:contacto@cleanschile.cl" },
              ].map(({ icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    color: "rgba(203,213,225,0.38)",
                    textDecoration: "none",
                    fontFamily: "var(--font-inter)", fontSize: 13,
                    lineHeight: 1.55,
                    transition: "color 0.3s",
                  }}
                >
                  <span style={{ color: "#EAB308", flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "rgba(203,213,225,0.22)", margin: 0 }}>
            © {new Date().getFullYear()} CleanSchile. Todos los derechos reservados.
          </p>
          <Link
            href="/admin"
            style={{
              fontFamily: "var(--font-inter)", fontSize: 11,
              color: "rgba(203,213,225,0.18)",
              textDecoration: "none",
              display: "flex", alignItems: "center", gap: 4,
              transition: "color 0.3s",
            }}
          >
            Admin <ArrowUpRight size={10} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
