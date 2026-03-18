import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const COLORS = {
  cobalt: "#0278CD",
  denim: "#01487B",
  royal: "#0160A4",
  slate: "#25303E",
  honey: "#FFB000",
  amber: "#F8AD00",
  lightBlue: "#93D1F2",
  pacific: "#0298EC",
  white: "#FFFFFF",
  slowBg: "#5A3A00",
};

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Roboto:wght@400;500&display=swap');`;

const SPANS = [
  { name: "POST /checkout",        service: "checkout-service",  left: 0,  width: 100, color: COLORS.cobalt,   labelColor: COLORS.white,     status: "212ms", statusType: "slow", indent: 0, dotColor: COLORS.honey,     enterFrame: 10 },
  { name: "validateToken",         service: "auth",              left: 0,  width: 12,  color: COLORS.pacific,  labelColor: COLORS.white,     status: "OK",    statusType: "ok",   indent: 1, dotColor: COLORS.pacific,   enterFrame: 20 },
  { name: "getCartItems",          service: "cart-service",      left: 12, width: 18,  color: COLORS.pacific,  labelColor: COLORS.white,     status: "OK",    statusType: "ok",   indent: 1, dotColor: COLORS.pacific,   enterFrame: 28 },
  { name: "db.query · carts",      service: "postgres",          left: 14, width: 13,  color: COLORS.denim,    labelColor: COLORS.lightBlue, status: "27ms",  statusType: "ok",   indent: 2, dotColor: COLORS.lightBlue, enterFrame: 34, border: COLORS.pacific, dotSmall: true },
  { name: "checkInventory",        service: "inventory-svc",     left: 30, width: 22,  color: COLORS.pacific,  labelColor: COLORS.white,     status: "OK",    statusType: "ok",   indent: 1, dotColor: COLORS.pacific,   enterFrame: 42 },
  { name: "cache.get · miss",      service: "redis",             left: 30, width: 4,   color: COLORS.slowBg,   labelColor: COLORS.honey,     status: "9ms",   statusType: "slow", indent: 2, dotColor: COLORS.honey,     enterFrame: 48, border: COLORS.honey, dotSmall: true },
  { name: "db.query · inventory",  service: "postgres",          left: 34, width: 16,  color: COLORS.denim,    labelColor: COLORS.lightBlue, status: "33ms",  statusType: "ok",   indent: 2, dotColor: COLORS.lightBlue, enterFrame: 54, border: COLORS.pacific, dotSmall: true },
  { name: "processPayment",        service: "payment-svc",       left: 52, width: 36,  color: COLORS.slowBg,   labelColor: COLORS.honey,     status: "slow",  statusType: "slow", indent: 1, dotColor: COLORS.honey,     enterFrame: 64, border: COLORS.honey },
  { name: "http.post · stripe.com",service: "external",          left: 54, width: 32,  color: COLORS.slowBg,   labelColor: COLORS.honey,     status: "68ms",  statusType: "slow", indent: 2, dotColor: COLORS.honey,     enterFrame: 72, border: COLORS.honey, dotSmall: true },
  { name: "sendConfirmation",      service: "notify",            left: 88, width: 10,  color: COLORS.pacific,  labelColor: COLORS.white,     status: "OK",    statusType: "ok",   indent: 1, dotColor: COLORS.pacific,   enterFrame: 110 },
];

const statusStyle = (type: string): React.CSSProperties => {
  if (type === "slow") return { background: COLORS.slowBg, color: COLORS.honey };
  return { background: COLORS.royal, color: COLORS.lightBlue };
};

const LABEL_COL = 300;
const ROW_PADDING = 20; // left+right padding on each row

const SpanRow: React.FC<{ span: typeof SPANS[0]; frame: number; fps: number; trackWidth: number }> = ({ span, frame, fps, trackWidth }) => {
  const rowOpacity = interpolate(frame, [span.enterFrame, span.enterFrame + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rowY = interpolate(frame, [span.enterFrame, span.enterFrame + 8], [6, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const barProgress = spring({
    frame: frame - (span.enterFrame + 6),
    fps,
    config: { damping: 20, stiffness: 120, mass: 0.8 },
    durationInFrames: 30,
  });

  const barLeft = (span.left / 100) * trackWidth;
  const barWidth = (span.width / 100) * trackWidth * barProgress;

  return (
    <div style={{ opacity: rowOpacity, transform: `translateY(${rowY}px)`, display: "grid", gridTemplateColumns: `${LABEL_COL}px 1fr`, alignItems: "center", padding: `2px ${ROW_PADDING}px`, minHeight: 30 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ display: "inline-block", width: span.indent * 20 }} />
        <div style={{ width: span.dotSmall ? 5 : 6, height: span.dotSmall ? 5 : 6, borderRadius: "50%", background: span.dotColor, flexShrink: 0, marginRight: 7 }} />
        <span style={{ fontFamily: "Roboto, sans-serif", fontSize: span.indent === 2 ? 11 : 12, fontWeight: span.indent === 2 ? 400 : 500, color: span.indent === 2 ? COLORS.lightBlue : COLORS.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {span.name}
        </span>
        <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 9, textTransform: "uppercase" as const, letterSpacing: "1.5px", padding: "2px 6px", borderRadius: 4, marginLeft: 8, flexShrink: 0, ...statusStyle(span.statusType) }}>
          {span.status}
        </span>
      </div>
      <div style={{ position: "relative", height: 20 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", borderTop: `1px dashed ${COLORS.pacific}33` }} />
        <div style={{ position: "absolute", left: barLeft, width: barWidth, height: 14, top: "50%", transform: "translateY(-50%)", borderRadius: 3, background: span.color, border: span.border ? `1.5px solid ${span.border}` : undefined, overflow: "hidden", display: "flex", alignItems: "center", paddingLeft: 6 }}>
          <span style={{ fontFamily: "Roboto, sans-serif", fontSize: 9.5, fontWeight: 500, color: span.labelColor, opacity: 0.9, whiteSpace: "nowrap" }}>{span.service}</span>
        </div>
      </div>
    </div>
  );
};

export const TraceWaterfall: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // trackWidth = canvas - body padding - container padding - label col - row padding
  const trackWidth = width - 24 - 32 - LABEL_COL - ROW_PADDING * 2;

  const headerOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(frame, [0, 12], [-10, 0], { extrapolateRight: "clamp" });

  const lastSpanFrame = SPANS[SPANS.length - 1].enterFrame + 30;
  const calloutOpacity = interpolate(frame, [lastSpanFrame, lastSpanFrame + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const calloutY = interpolate(frame, [lastSpanFrame, lastSpanFrame + 12], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width, height, background: COLORS.cobalt, overflow: "hidden", padding: "18px 24px", fontFamily: "Roboto, sans-serif", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <style>{FONT}</style>
      <div>

        {/* Header */}
        <div style={{ opacity: headerOpacity, transform: `translateY(${headerY}px)`, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: "2.5px", color: COLORS.honey }}>Observability</div>
            <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 26, color: COLORS.white, marginTop: 2 }}>Trace Waterfall</div>
            <div style={{ fontSize: 11, color: COLORS.lightBlue, marginTop: 2 }}>Distributed request trace · checkout-service · 2026-03-17 14:32:07 UTC</div>
          </div>
          <img src="https://cdn.jsdelivr.net/gh/midgepickett/honeycomb-academy-visual-asset-creator@main/assets/icons/HNY_Academy-Trace_Waterfall.png" style={{ width: 64, height: 64, objectFit: "contain" }} alt="" />
        </div>

        {/* Waterfall card */}
        <div style={{ background: COLORS.denim, borderRadius: 12, overflow: "hidden" }}>
          {/* Column headers */}
          <div style={{ display: "grid", gridTemplateColumns: `${LABEL_COL}px 1fr`, background: COLORS.royal, padding: `7px ${ROW_PADDING}px`, borderBottom: `1px solid ${COLORS.pacific}33` }}>
            <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: "2px", color: COLORS.lightBlue }}>Span</span>
            <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 4 }}>
              {["0 ms", "50 ms", "100 ms", "150 ms", "212 ms"].map(t => (
                <span key={t} style={{ fontSize: 10, color: COLORS.lightBlue, opacity: 0.7 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Spans */}
          <div style={{ padding: "6px 0 10px" }}>
            {SPANS.map((span, i) => (
              <React.Fragment key={span.name}>
                {(i === 1 || i === 7 || i === 9) && <hr style={{ border: "none", borderTop: `1px solid ${COLORS.pacific}22`, margin: `3px ${ROW_PADDING}px` }} />}
                <SpanRow span={span} frame={frame} fps={fps} trackWidth={trackWidth} />
              </React.Fragment>
            ))}
          </div>

          {/* Caption */}
          <div style={{ background: COLORS.slate, padding: "7px 14px", fontSize: 10, color: COLORS.lightBlue, fontStyle: "italic" }}>
            Trace ID: 7f3a9c2e1b08d4f6 · 10 spans · 4 services · root duration 212 ms
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 10 }}>
          {[
            { label: "Total Spans",    value: "10",    sub: "across 4 services",   color: COLORS.honey },
            { label: "Root Duration",  value: "212ms", sub: "p95 baseline: 90ms",  color: COLORS.honey },
            { label: "Slowest Span",   value: "76ms",  sub: "processPayment",      color: COLORS.honey },
            { label: "Errors",         value: "0",     sub: "1 cache miss",        color: "#FF6B6B" },
          ].map(s => (
            <div key={s.label} style={{ background: COLORS.denim, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 10, fontWeight: 500, color: COLORS.lightBlue, textTransform: "uppercase", letterSpacing: "1.5px" }}>{s.label}</div>
              <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 20, color: s.color, lineHeight: 1.1, marginTop: 4 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: COLORS.lightBlue, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div style={{ opacity: calloutOpacity, transform: `translateY(${calloutY}px)`, background: COLORS.amber, borderRadius: 10, padding: "11px 16px", marginTop: 10, display: "flex", alignItems: "center", gap: 14 }}>
          <img src="https://cdn.jsdelivr.net/gh/midgepickett/honeycomb-academy-visual-asset-creator@main/assets/icons/HNY_Academy-Magnifying_Glass.png" style={{ width: 34, height: 34, objectFit: "contain", flexShrink: 0 }} alt="" />
          <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.slate, lineHeight: 1.5 }}>
            <strong>Latency bottleneck detected:</strong> The external <code>stripe.com</code> call inside <strong>processPayment</strong> accounts for 68 ms — 32% of total trace duration.
          </div>
        </div>

      </div>
    </div>
  );
};
