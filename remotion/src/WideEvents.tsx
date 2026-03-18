import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

const COLORS = {
  cobalt:    "#0278CD",
  denim:     "#01487B",
  royal:     "#0160A4",
  slate:     "#25303E",
  honey:     "#FFB000",
  amber:     "#F8AD00",
  lightBlue: "#93D1F2",
  pacific:   "#0298EC",
  white:     "#FFFFFF",
  green:     "#1a5c2a",
  greenText: "#4ade80",
};

const BASE = "https://cdn.jsdelivr.net/gh/midgepickett/honeycomb-academy-visual-asset-creator@main/assets/";
const FONT = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Roboto:wght@400;500&display=swap');`;

// Fields staggered by 7 frames each, starting at frame 40
const FIELDS = [
  { key: "service",       value: "checkout-api",  enter: 40,  honey: false },
  { key: "trace_id",      value: "a3fb…c92e",     enter: 47,  honey: true  },
  { key: "user_id",       value: "usr_84721",      enter: 54,  honey: true  },
  { key: "duration_ms",   value: "342",            enter: 61,  honey: false },
  { key: "status_code",   value: "200",            enter: 68,  honey: false },
  { key: "region",        value: "us-east-1",      enter: 75,  honey: false },
  { key: "db.query_ms",   value: "89",             enter: 82,  honey: false },
  { key: "http.method",   value: "POST",           enter: 89,  honey: false },
  { key: "customer_tier", value: "enterprise",     enter: 96,  honey: true  },
  { key: "error",         value: "false",          enter: 103, honey: false },
];

const Field: React.FC<{ f: typeof FIELDS[0]; frame: number; fps: number }> = ({ f, frame, fps }) => {
  const p = spring({ frame: frame - f.enter, fps, config: { damping: 22, stiffness: 160, mass: 0.5 }, durationInFrames: 18 });
  return (
    <div style={{
      opacity: p,
      transform: `scale(${0.84 + 0.16 * p})`,
      background: COLORS.royal,
      borderRadius: 8,
      padding: "13px 16px",
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      border: `1px solid ${COLORS.pacific}33`,
      minWidth: 0,
    }}>
      <span style={{ fontFamily: "Roboto, sans-serif", fontSize: 13, color: COLORS.lightBlue, flexShrink: 0 }}>
        {f.key}
      </span>
      <span style={{ fontSize: 12, color: COLORS.pacific, opacity: 0.5, flexShrink: 0 }}>:</span>
      <span style={{
        fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: 14,
        color: f.honey ? COLORS.honey : COLORS.white,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}>
        {f.value}
      </span>
    </div>
  );
};

export const WideEvents: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleOp  = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const titleY   = interpolate(frame, [0, 14], [-10, 0], { extrapolateRight: "clamp" });

  const cardP    = spring({ frame: frame - 22, fps, config: { damping: 18, stiffness: 110 }, durationInFrames: 22 });

  // Count badge — shows running count of visible fields
  const visibleCount = FIELDS.filter(f => frame >= f.enter).length;

  const calloutOp = interpolate(frame, [112, 126], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const calloutY  = interpolate(frame, [112, 126], [8, 0],  { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      width, height, background: COLORS.cobalt, overflow: "hidden",
      padding: "18px 40px", display: "flex", flexDirection: "column",
      justifyContent: "center", fontFamily: "Roboto, sans-serif",
    }}>
      <style>{FONT}</style>

      {/* ── Title ── */}
      <div style={{
        opacity: titleOp, transform: `translateY(${titleY}px)`,
        textAlign: "center", marginBottom: 28,
      }}>
        <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "2.5px", color: COLORS.honey, marginBottom: 10 }}>
          Honeycomb
        </div>
        <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 44, color: COLORS.white }}>
          The Wide Event
        </div>
        <div style={{ fontSize: 17, color: COLORS.lightBlue, marginTop: 10 }}>
          Every request emits one structured event — with all the context
        </div>
      </div>

      {/* ── Event card ── */}
      <div style={{
        background: COLORS.denim, borderRadius: 12,
        padding: "32px 32px 28px", marginBottom: 22,
        opacity: cardP, transform: `scale(${0.97 + 0.03 * cardP})`,
      }}>

        {/* Header row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          marginBottom: 24, paddingBottom: 20,
          borderBottom: `1px solid ${COLORS.pacific}2a`,
        }}>
          <div style={{
            background: COLORS.pacific, borderRadius: 6,
            padding: "4px 11px", fontFamily: "Poppins, sans-serif",
            fontWeight: 600, fontSize: 13, color: COLORS.white,
          }}>POST</div>
          <div style={{ fontFamily: "Roboto, sans-serif", fontWeight: 500, fontSize: 17, color: COLORS.white }}>
            /api/checkout
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ fontSize: 14, color: COLORS.lightBlue }}>342 ms</span>
            <span style={{
              background: COLORS.green, color: COLORS.greenText,
              fontSize: 13, padding: "4px 14px", borderRadius: 20, fontWeight: 500,
            }}>200 OK</span>
            {/* Field count badge */}
            {visibleCount > 0 && (
              <span style={{
                background: COLORS.royal, border: `1px solid ${COLORS.pacific}55`,
                color: COLORS.honey, fontSize: 12, fontFamily: "Poppins, sans-serif",
                fontWeight: 600, padding: "4px 12px", borderRadius: 20,
              }}>
                {visibleCount} field{visibleCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Fields grid — 5 columns × 2 rows */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {FIELDS.map(f => <Field key={f.key} f={f} frame={frame} fps={fps} />)}
        </div>
      </div>

      {/* ── Callout ── */}
      <div style={{
        opacity: calloutOp, transform: `translateY(${calloutY}px)`,
        background: COLORS.amber, borderRadius: 10,
        padding: "20px 24px", display: "flex", alignItems: "center", gap: 16,
      }}>
        <img src={`${BASE}characters/HNY_Academy-Person_02.png`} style={{ width: 62, height: 62, objectFit: "contain", flexShrink: 0 }} alt="" />
        <div style={{ fontSize: 15, fontWeight: 500, color: COLORS.slate, lineHeight: 1.55 }}>
          <strong>Any field is queryable — instantly.</strong> No pre-aggregation, no cardinality limits, no schema to define first.
        </div>
      </div>

    </div>
  );
};
