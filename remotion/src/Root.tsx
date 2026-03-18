import React from "react";
import { Composition, Series } from "remotion";
import { TraceWaterfall } from "./TraceWaterfall";
import { PipelineIntro } from "./PipelineIntro";
import { CourseIntro } from "./CourseIntro";
import { WideEvents } from "./WideEvents";

const W = 1280;
const H = 720;

const TraceExplainer: React.FC = () => (
  <Series>
    <Series.Sequence durationInFrames={118}>
      <PipelineIntro />
    </Series.Sequence>
    <Series.Sequence durationInFrames={162}>
      <TraceWaterfall />
    </Series.Sequence>
  </Series>
);

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="TraceExplainer" component={TraceExplainer} durationInFrames={280} fps={30} width={W} height={H} />
    <Composition id="PipelineIntro"  component={PipelineIntro}  durationInFrames={118} fps={30} width={W} height={H} />
    <Composition id="TraceWaterfall" component={TraceWaterfall} durationInFrames={162} fps={30} width={W} height={H} />
    <Composition id="WideEvents"     component={WideEvents}     durationInFrames={140} fps={30} width={W} height={H} />
    <Composition id="CourseIntro"    component={CourseIntro}    durationInFrames={105} fps={30} width={W} height={H}
      defaultProps={{ moduleTag: "Module 01", courseTitle: "Intro to\nObservability", subtitle: "Understanding traces, metrics, and logs with OpenTelemetry" }}
    />
  </>
);
