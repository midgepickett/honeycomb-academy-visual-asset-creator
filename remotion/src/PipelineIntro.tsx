import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

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
};

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Roboto:wght@400;500&display=swap');`;
const BASE = "https://cdn.jsdelivr.net/gh/midgepickett/honeycomb-academy-visual-asset-creator@main/assets/";

const NODES = [
  { label: "Your App",       sub: "Instrumented service",      icon: "otel/HNY_Academy_App.svg",                  enterFrame: 15 },
  { label: "OTel SDK",       sub: "Capture & context prop.",   icon: "otel/HNY_Academy_SDK.svg",                  enterFrame: 33 },
  { label: "OTel Collector", sub: "Receive · Process · Export",icon: "otel/HNY_Academy_OTel_Collector_v2.svg",    enterFrame: 51 },
  { label: "Honeycomb",      sub: "Store · Query · Alert",     icon: "otel/HNY_Academy_HNY_Datastore.svg",        enterFrame: 69 },
];

const SIGNALS = [
  { icon: "icons/HNY_Academy_Logs.svg",    label: "Logs",    body: "Structured timestamped events",      dot: COLORS.white },
  { icon: "otel/HNY_Academy_Metrics.svg",  label: "Metrics", body: "Counters, gauges, histograms",       dot: COLORS.lightBlue },
  { icon: "otel/HNY_Academy_Traces.svg",   label: "Traces",  body: "Distributed request flows & spans", dot: COLORS.honey },
];

const Node: React.FC<{ node: typeof NODES[0]; frame: number; fps: number }> = ({ node, frame, fps }) => {
  const progress = spring({ frame: frame - node.enterFrame, fps, config: { damping: 18, stiffness: 130, mass: 0.7 }, durationInFrames: 25 });
  return (
    <div style={{ opacity: progress, transform: `scale(${0.75 + 0.25 * progress}) translateY(${(1 - progress) * 18}px)`, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, width: 200 }}>
      <div style={{ background: COLORS.royal, borderRadius: 22, width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center", border: `1.5px solid ${COLORS.pacific}55` }}>
        <img src={`${BASE}${node.icon}`} style={{ width: 70, height: 70, objectFit: "contain" }} alt="" />
      </div>
      <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 15, color: COLORS.white, textAlign: "center" }}>{node.label}</div>
      <div style={{ fontSize: 12, color: COLORS.lightBlue, textAlign: "center", lineHeight: 1.4 }}>{node.sub}</div>
    </div>
  );
};

const Connector: React.FC<{ enterFrame: number; frame: number }> = ({ enterFrame, frame }) => {
  const progress = interpolate(frame, [enterFrame, enterFrame + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const packetX = interpolate(frame, [enterFrame + 4, enterFrame + 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginTop: -36, position: "relative", height: 20 }}>
      <div style={{ height: 2, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${COLORS.pacific}44, ${COLORS.pacific})`, borderRadius: 2 }} />
      {progress > 0.3 && (
        <div style={{ position: "absolute", left: `${packetX * progress * 100}%`, width: 10, height: 10, borderRadius: "50%", background: COLORS.honey, boxShadow: `0 0 7px ${COLORS.honey}99`, transform: "translateY(-50%)", top: "50%" }} />
      )}
    </div>
  );
};

export const PipelineIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 14], [-12, 0], { extrapolateRight: "clamp" });

  const legendOpacity = interpolate(frame, [78, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const legendY = interpolate(frame, [78, 90], [8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const calloutOpacity = interpolate(frame, [95, 108], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const calloutY = interpolate(frame, [95, 108], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width, height, background: COLORS.cobalt, overflow: "hidden", padding: "20px 28px", fontFamily: "Roboto, sans-serif", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <style>{FONT}</style>
      <div>

        {/* Title */}
        <div style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "2.5px", color: COLORS.honey, marginBottom: 8 }}>OpenTelemetry</div>
          <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 32, color: COLORS.white }}>How telemetry reaches Honeycomb</div>
          <div style={{ fontSize: 14, color: COLORS.lightBlue, marginTop: 7 }}>From your application to observable data</div>
        </div>

        {/* Pipeline row */}
        <div style={{ background: COLORS.denim, borderRadius: 12, padding: "44px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {NODES.map((node, i) => (
            <React.Fragment key={node.label}>
              <Node node={node} frame={frame} fps={fps} />
              {i < NODES.length - 1 && <Connector enterFrame={node.enterFrame + 14} frame={frame} />}
            </React.Fragment>
          ))}
        </div>

        {/* Signal legend */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 20, opacity: legendOpacity, transform: `translateY(${legendY}px)` }}>
          {SIGNALS.map(s => (
            <div key={s.label} style={{ background: COLORS.royal, borderRadius: 10, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <img src={`${BASE}${s.icon}`} style={{ width: 46, height: 46, objectFit: "contain" }} alt="" />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: 13, color: COLORS.white }}>{s.label}</div>
                <div style={{ fontSize: 11, color: COLORS.lightBlue, marginTop: 2 }}>{s.body}</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* Callout */}
        <div style={{ opacity: calloutOpacity, transform: `translateY(${calloutY}px)`, background: COLORS.amber, borderRadius: 10, padding: "16px 20px", marginTop: 20, display: "flex", alignItems: "center", gap: 14 }}>
          <img src={`${BASE}characters/HNY_Academy-Person_02.png`} style={{ width: 52, height: 52, objectFit: "contain", flexShrink: 0 }} alt="" />
          <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.slate, lineHeight: 1.5 }}>
            <strong>Next:</strong> Let's look at a real trace to see what this data looks like once it arrives in Honeycomb.
          </div>
        </div>

      </div>
    </div>
  );
};
