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

type Props = {
  moduleTag?: string;
  courseTitle?: string;
  subtitle?: string;
};

export const CourseIntro: React.FC<Props> = ({
  moduleTag = "Module 01",
  courseTitle = "Intro to\nObservability",
  subtitle = "Understanding traces, metrics, and logs with OpenTelemetry",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Background
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Telemetry strips slide in from left and right
  const strip1X = interpolate(frame, [5, 30], [-300, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const strip2X = interpolate(frame, [10, 35], [300, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stripOpacity = interpolate(frame, [5, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Logo drops in
  const logoProgress = spring({ frame: frame - 12, fps, config: { damping: 16, stiffness: 120, mass: 0.9 }, durationInFrames: 30 });
  const logoY = (1 - logoProgress) * -30;

  // Bee scales up
  const beeProgress = spring({ frame: frame - 25, fps, config: { damping: 14, stiffness: 100, mass: 1.1 }, durationInFrames: 35 });

  // Module tag
  const tagOpacity = interpolate(frame, [38, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagX = interpolate(frame, [38, 50], [-16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Course title — each line staggers
  const title1Progress = spring({ frame: frame - 45, fps, config: { damping: 18, stiffness: 110, mass: 0.8 }, durationInFrames: 28 });
  const title2Progress = spring({ frame: frame - 54, fps, config: { damping: 18, stiffness: 110, mass: 0.8 }, durationInFrames: 28 });

  // Subtitle
  const subtitleOpacity = interpolate(frame, [68, 82], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [68, 82], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Divider line grows
  const lineWidth = interpolate(frame, [55, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Hex accent marks fade in
  const hexOpacity = interpolate(frame, [80, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const titleLines = courseTitle.split("\n");

  return (
    <div style={{ width, height, background: "#111820", overflow: "hidden", fontFamily: "Roboto, sans-serif", position: "relative" }}>
      <style>{FONT}</style>

      {/* Cobalt background fill */}
      <div style={{ position: "absolute", inset: 0, background: COLORS.cobalt, opacity: bgOpacity }} />

      {/* Telemetry strips — decorative horizontal bands */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 32, opacity: stripOpacity * 0.5, transform: `translateX(${strip1X}px)`, overflow: "hidden" }}>
        <img src={`${BASE}decorative/HNY_Telemetry_Data_v3.svg`} style={{ width: "100%", height: 32, objectFit: "cover" }} alt="" />
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 32, opacity: stripOpacity * 0.5, transform: `translateX(${strip2X}px)`, overflow: "hidden" }}>
        <img src={`${BASE}decorative/HNY_Telemetry_Data_v1.svg`} style={{ width: "100%", height: 32, objectFit: "cover" }} alt="" />
      </div>

      {/* Denim panel — left content area */}
      <div style={{
        position: "absolute",
        left: 0, top: 0, bottom: 0,
        width: 620,
        background: COLORS.denim,
        clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
        opacity: bgOpacity,
      }} />

      {/* Hex accent marks */}
      <div style={{ position: "absolute", top: 80, left: 520, opacity: hexOpacity * 0.4 }}>
        <svg viewBox="0 0 14 14" width="28" height="28"><polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill={COLORS.honey} /></svg>
      </div>
      <div style={{ position: "absolute", top: 120, left: 548, opacity: hexOpacity * 0.25 }}>
        <svg viewBox="0 0 14 14" width="16" height="16"><polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill={COLORS.honey} /></svg>
      </div>
      <div style={{ position: "absolute", bottom: 110, left: 500, opacity: hexOpacity * 0.3 }}>
        <svg viewBox="0 0 14 14" width="20" height="20"><polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill={COLORS.pacific} /></svg>
      </div>

      {/* Logo */}
      <div style={{ position: "absolute", top: 44, left: 52, opacity: logoProgress, transform: `translateY(${logoY}px)` }}>
        <img src={`${BASE}brand/HNY_ACDMY-Logo-Light-Small-NoPadding.png`} style={{ height: 28, objectFit: "contain" }} alt="Honeycomb Academy" />
      </div>

      {/* Big Bee — right side hero */}
      <div style={{
        position: "absolute",
        right: -20,
        bottom: 20,
        opacity: beeProgress,
        transform: `scale(${0.6 + 0.4 * beeProgress})`,
        transformOrigin: "bottom right",
      }}>
        <img src={`${BASE}characters/HNY_Academy-Big_Bee_Flower.png`} style={{ width: 380, objectFit: "contain" }} alt="" />
      </div>

      {/* Content — left panel */}
      <div style={{ position: "absolute", left: 52, top: 0, bottom: 0, width: 520, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>

        {/* Module tag */}
        <div style={{ opacity: tagOpacity, transform: `translateX(${tagX}px)`, marginBottom: 18 }}>
          <span style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "3px",
            color: COLORS.honey,
            background: `${COLORS.honey}18`,
            border: `1px solid ${COLORS.honey}44`,
            padding: "5px 12px",
            borderRadius: 6,
          }}>
            {moduleTag}
          </span>
        </div>

        {/* Course title — lines animate in separately */}
        <div style={{ overflow: "hidden" }}>
          <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 64, color: COLORS.white, lineHeight: 1.05, letterSpacing: "-1px" }}>
            {titleLines.map((line, i) => {
              const progress = i === 0 ? title1Progress : title2Progress;
              return (
                <div key={i} style={{ opacity: progress, transform: `translateY(${(1 - progress) * 24}px)` }}>
                  {line}
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={{ marginTop: 20, marginBottom: 20, height: 3, background: COLORS.honey, width: `${lineWidth * 200}px`, borderRadius: 2 }} />

        {/* Subtitle */}
        <div style={{ opacity: subtitleOpacity, transform: `translateY(${subtitleY}px)`, fontSize: 15, fontWeight: 400, color: COLORS.lightBlue, lineHeight: 1.6, maxWidth: 420 }}>
          {subtitle}
        </div>

      </div>

    </div>
  );
};
