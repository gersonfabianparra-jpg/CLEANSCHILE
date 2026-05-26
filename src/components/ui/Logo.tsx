/**
 * CleanSchile logo — SVG recreation del logo oficial.
 * Colores de marca: cyan #06B6D4 (diamante) + naranja #F97316 (monograma CS)
 * Cuando el cliente entregue PNG con fondo transparente,
 * guardar en /public/logo.png y reemplazar LogoMark por <Image>.
 */

export function LogoMark({ size = 38 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Diamante */}
      <polygon points="19,1 37,19 19,37 1,19" fill="#06B6D4" />

      {/* Monograma CS — dos curvas entrelazadas en naranja */}
      {/* Curva superior-izquierda (C) */}
      <path
        d="M23,12 C17,12 11,15 11,19 C11,23 17,26 23,26"
        stroke="#F97316"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Curva inferior-derecha (S) */}
      <path
        d="M15,12 C21,12 27,15 27,19 C27,23 21,26 15,26"
        stroke="#F97316"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: compact ? 8 : 11 }}>
      <LogoMark size={compact ? 32 : 40} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: compact ? 18 : 22,
            letterSpacing: "0.12em",
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          CleanSchile
        </span>
        <span
          style={{
            fontFamily: "var(--font-space)",
            fontSize: compact ? 7 : 8,
            letterSpacing: "0.35em",
            color: "rgba(6,182,212,0.65)",
            textTransform: "uppercase" as const,
            lineHeight: 1,
          }}
        >
          Detailing Car
        </span>
      </div>
    </div>
  );
}

export function LogoFull() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <LogoMark size={48} />
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: 28,
            letterSpacing: "0.15em",
            color: "#ffffff",
            lineHeight: 1,
          }}
        >
          CleanSchile
        </span>
        <span
          style={{
            fontFamily: "var(--font-space)",
            fontSize: 9,
            letterSpacing: "0.4em",
            color: "rgba(6,182,212,0.55)",
            textTransform: "uppercase" as const,
            lineHeight: 1,
          }}
        >
          Detailing Car · Santiago
        </span>
      </div>
    </div>
  );
}
