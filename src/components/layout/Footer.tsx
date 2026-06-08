import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { LogoFull } from "@/components/ui/Logo";
import { prisma } from "@/lib/db";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" strokeWidth="3"/>
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
    </svg>
  );
}

export async function Footer() {
  let phone   = "+569 520 95 222";
  let address = "Uruguay #530, La Cisterna, RM";
  let email   = "contacto@cleanschile.cl";
  let whatsapp = "56952095222";
  try {
    const rows = await prisma.setting.findMany({ where: { key: { in: ["site_phone","site_address","site_email_public","site_whatsapp"] } } });
    for (const r of rows) {
      if (r.key === "site_phone")        phone   = r.value;
      if (r.key === "site_address")      address = r.value;
      if (r.key === "site_email_public") email   = r.value;
      if (r.key === "site_whatsapp")     whatsapp = r.value;
    }
  } catch {}

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
                { href: "https://instagram.com/cleanschile.detailingcar", icon: <InstagramIcon />, color: "#EC4899" },
                { href: "https://www.facebook.com/share/1B8W4cT7Ci/?mibextid=wwXIfr", icon: <FacebookIcon />, color: "#3B82F6" },
                { href: "https://www.tiktok.com/@cleanschile", icon: <TikTokIcon />, color: "#06B6D4" },
                { href: `tel:${phone.replace(/\s/g,"")}`, icon: <Phone size={15} />, color: "#06B6D4" },
                { href: `mailto:${email}`, icon: <Mail size={15} />, color: "#EAB308" },
              ].map(({ href, icon }, i) => (
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
                { label: "Detallado Exterior",    idx: 0 },
                { label: "Sellado Cerámico",      idx: 1 },
                { label: "Detallado Interior",    idx: 2 },
                { label: "Pulido de Focos",       idx: 3 },
                { label: "Tratamiento Pre-Venta", idx: 4 },
                { label: "Mantención Automotriz", idx: 5 },
              ].map(({ label, idx }) => (
                <li key={label}>
                  <Link
                    href={`/?s=${idx}#servicios`}
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
                    {label}
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
                { icon: <MapPin size={14} />, text: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` },
                { icon: <Phone size={14} />, text: phone, href: `tel:${phone.replace(/\s/g,"")}` },
                { icon: <Mail size={14} />, text: email, href: `mailto:${email}` },
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
            © {new Date().getFullYear()} Cleanschile. Todos los derechos reservados.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <a
              href="https://fixday.cl"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-space)", fontSize: 10,
                color: "rgba(203,213,225,0.25)",
                textDecoration: "none",
                letterSpacing: "0.08em",
                display: "flex", alignItems: "center", gap: 5,
                transition: "color 0.3s",
              }}
            >
              Diseñado y gestionado por
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginLeft: 4 }}>
                <img src="/fixday-icon.svg" alt="Fixday" style={{ width: 14, height: 14, opacity: 0.5 }} />
                <span style={{ color: "rgba(203,213,225,0.45)", fontWeight: 600 }}>Fixday.cl</span>
              </span>
            </a>
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
      </div>
    </footer>
  );
}
