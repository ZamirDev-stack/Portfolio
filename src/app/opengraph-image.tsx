import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Showket Farooq — Aspiring Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(16,185,129,0.18), transparent), radial-gradient(800px 500px at 80% 90%, rgba(13,148,136,0.16), transparent), #0a0c10",
          color: "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
          padding: "72px 88px",
          position: "relative",
        }}
      >
        {/* dotted grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            opacity: 0.6,
          }}
        />
        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #10b981, #0d9488)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0a0c10",
              fontSize: 26,
              fontWeight: 800,
              fontFamily: "ui-monospace, monospace",
            }}
          >
            SF
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
              Showket Farooq
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#94a3b8",
                fontFamily: "ui-monospace, monospace",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              portfolio · 2026
            </div>
          </div>
        </div>

        {/* main */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 16,
              color: "#10b981",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: 99, background: "#10b981" }} />
            Open to opportunities
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.02,
              maxWidth: 980,
            }}
          >
            Building Ideas Into{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #34d399, #5eead4)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Digital Experiences.
            </span>
          </div>
          <div style={{ fontSize: 22, color: "#cbd5e1", maxWidth: 880 }}>
            BCA student · Aspiring software developer · Python · Java · Data
            analysis
          </div>
        </div>

        {/* bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#64748b",
            fontSize: 14,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: 1,
          }}
        >
          <span>Srinagar, Jammu &amp; Kashmir, India</span>
          <span>github.com/showketfarooq</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
