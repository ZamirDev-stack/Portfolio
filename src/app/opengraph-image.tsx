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
          backgroundColor: "#0a0c10",
          color: "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
          padding: "72px 88px",
          position: "relative",
        }}
      >
        {/* Decorative glow blobs (solid colors, Satori-safe) */}
        <div
          style={{
            position: "absolute",
            left: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            backgroundColor: "rgba(16,185,129,0.22)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -140,
            bottom: -140,
            width: 460,
            height: 460,
            borderRadius: 9999,
            backgroundColor: "rgba(13,148,136,0.18)",
            display: "flex",
          }}
        />

        {/* top row */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: "#10b981",
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
              }}
            >
              PORTFOLIO · 2026
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
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: "#10b981",
                display: "flex",
              }}
            />
            OPEN TO OPPORTUNITIES
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: -2,
              lineHeight: 1.05,
              maxWidth: 980,
              display: "flex",
            }}
          >
            Building Ideas Into Digital Experiences.
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#cbd5e1",
              maxWidth: 880,
              display: "flex",
            }}
          >
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
