import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Cleanschile Detailing Car — Detailing Automotriz Premium en Santiago";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#04040F",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blue atmospheric glow — top center */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: 200,
            width: 800,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(30,30,120,0.55) 0%, transparent 70%)",
          }}
        />

        {/* Violet glow — right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: -80,
            width: 500,
            height: 630,
            background:
              "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 65%)",
          }}
        />

        {/* Cyan glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 450,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(6,182,212,0.14) 0%, transparent 70%)",
          }}
        />

        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.025,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background:
              "linear-gradient(90deg, transparent 0%, #06B6D4 30%, #F97316 70%, transparent 100%)",
          }}
        />

        {/* Bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent 0%, #EAB308 50%, transparent 100%)",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* CLEANS */}
          <span
            style={{
              fontSize: 148,
              fontWeight: 900,
              color: "rgba(180,210,240,0.22)",
              lineHeight: 0.88,
              letterSpacing: "-6px",
              fontFamily: "serif",
            }}
          >
            CLEANS
          </span>

          {/* Separator bar */}
          <div
            style={{
              width: 560,
              height: 5,
              background:
                "linear-gradient(90deg, transparent, #06B6D4 35%, #F97316 65%, transparent)",
              borderRadius: 3,
              margin: "10px 0",
            }}
          />

          {/* CHILE */}
          <span
            style={{
              fontSize: 148,
              fontWeight: 900,
              color: "#EAB308",
              lineHeight: 0.88,
              letterSpacing: "-6px",
              fontFamily: "serif",
            }}
          >
            CHILE
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            marginTop: 36,
            position: "relative",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontSize: 26,
              color: "rgba(203,213,225,0.75)",
              fontFamily: "sans-serif",
              fontWeight: 400,
              letterSpacing: "1px",
            }}
          >
            Detailing &amp; Mantención Automotriz Premium
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#06B6D4",
              }}
            />
            <span
              style={{
                fontSize: 18,
                color: "rgba(6,182,212,0.85)",
                fontFamily: "sans-serif",
                fontWeight: 700,
                letterSpacing: "5px",
                textTransform: "uppercase",
              }}
            >
              La Cisterna · Santiago · Chile
            </span>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#EAB308",
              }}
            />
          </div>
        </div>

        {/* Bottom stats row */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 60,
            zIndex: 10,
          }}
        >
          {[
            { num: "400+", label: "Autos Detallados" },
            { num: "5★", label: "Valoración" },
            { num: "1 Día", label: "Entrega Express" },
          ].map(({ num, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#EAB308",
                  fontFamily: "sans-serif",
                }}
              >
                {num}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(203,213,225,0.38)",
                  fontFamily: "sans-serif",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
