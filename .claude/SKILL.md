# Honeycomb Academy — Brand & Design Guidelines

## When to use this file
Read this file before generating any visual output — comics, slides,
diagrams, layouts, UI mockups, or components. Apply everything below
automatically without prompting the user to confirm.

---

## Behavioral Instructions

Always:
- Load assets from the local `assets/` folder using relative paths (e.g. `../assets/filename.png` for files in `output/`)
- In Remotion components, use the CDN BASE URL — Vite cannot bundle files outside the `remotion/` directory
- Select character assets based on emotional context (see Asset Library)
- Build all layouts as self-contained HTML files
- Apply visual tone: flat, quiet, editorial
- To export an HTML file to PNG, run `node scripts/export_png.js output/<type>/html/<file>.html output/<type>/png/<file>.png`

Never:
- Use remote URLs for assets — always use local relative paths from the `assets/` folder
- Use pure black or near-black as a background
- Use gradients, drop shadows, or blur effects
- Use the default Claude diagram style (gray boxes, blue arrows)
- Leave assets out when contextually appropriate
- Truncate output — always write complete files
- Use CSS filters (brightness, invert, etc.) to recolor assets — use them as-is or omit them
- Place yellow-toned assets on Honey (#FFB000) or Amber (#F8AD00) backgrounds — they will blend in. Yellow-toned assets: Person 01 (blue/gold square head), Person 03 (gold/blue starburst), Person 04 (blue/gold hex head), Big Bee + Flower. On Honey/Amber backgrounds, use only Person 02 (all blue diamond head) or fully blue/white icons
- Use italic text anywhere — use Roboto 500 or Poppins 600 bold instead (including captions)
- Mix section widths within a single layout — all sections (tree, cards, strips) should share the same width
- Omit `align-items: flex-start` on the body flex container — without it, diagrams stretch to fill the viewport height and produce blank space at the bottom

---

## Brand Colors

Cobalt (primary background):   #0278CD
Denim (card background):        #01487B
Royal (nested card/input):      #0160A4
Slate (caption bars, text):     #25303E
Honey (numbers, accents):       #FFB000
Amber (callout background):     #F8AD00
Light Blue (secondary text):    #93D1F2
Pacific (borders, links):       #0298EC
White:                          #FFFFFF

Text on dark:   #FFFFFF (primary), #93D1F2 (secondary)
Text on Amber:  #25303E

---

## Typography

Always include this import at the top of every HTML file:
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Roboto:wght@400;500&display=swap');

Poppins 700:   Headlines, panel numbers, callout numbers
Poppins 600:   Card titles, labels, tags, wordmarks
Roboto 500:    UI labels, emphasized body
Roboto 400:    Captions, body copy, secondary text

Scale:
- Headline:       26-28px Poppins 700 #FFFFFF
- Card title:     12-13px Poppins 600 #FFFFFF
- Card body:      11-12px Roboto 400 #93D1F2
- Caption:        10-11px Roboto 500 #93D1F2
- Panel number:   13px Poppins 700 #FFB000
- Tag:            10px Poppins 600 uppercase letter-spacing 2.5px #FFB000

---

## Layout System

Outer container:
  background: #0278CD
  border-radius: 16px
  padding: 24-32px

Primary cards:
  background: #01487B
  border-radius: 12px
  overflow: hidden

Nested UI cards (screen mockups, inputs):
  background: #0160A4
  border-radius: 8-10px

Caption bars:
  background: #25303E
  padding: 8-10px 12-14px
  font: 10-11px Roboto 500
  color: #93D1F2

Callout bar:
  background: #F8AD00
  border-radius: 10px
  padding: 14px 18px
  display: flex, align-items: center, gap: 14px
  text: 12px Roboto 500 color #25303E

Card grid:
  display: grid
  grid-template-columns: repeat(3, 1fr) or repeat(2, 1fr)
  gap: 10-12px

Loading indicator:
  Three circles in #FFB000 at opacity 0.9 / 0.6 / 0.3

Canvas hex mark (always use this exact SVG):
  <svg viewBox="0 0 14 14" width="14" height="14">
    <polygon points="7,1 12,4 12,10 7,13 2,10 2,4" fill="#FFB000"/>
  </svg>

Canvas UI pattern:
  Top bar: #0160A4 bg + hex mark + "Canvas" Poppins 600 #93D1F2
  Input: #0160A4 bg, border 1.5px #0298EC, border-radius 8px,
         white text, #FFB000 send button

---

## Comic Format

Panel structure:
  .panel-scene   — colored bg (#01487B or #0160A4) + assets + UI mockups
  .panel-caption — #25303E bar, Roboto 500, #93D1F2 text

Grid: 3 columns default
Panel numbers: Poppins 700 13px #FFB000 top-left absolute

Character sizing:
  Hero:        72px
  Supporting:  52-64px
  Ambient:     36-44px
  Inactive:    opacity 0.4-0.5 + filter: brightness(0.5) saturate(0.3)

UI mockups inside panels: #0160A4 nested cards, #FFB000 accents
Stress is quiet — no fire, explosions, PANIC text, red alerts
Posture and composition carry emotion, not expressions

---

## Slide Format

Header: left = tag + title + subtitle, right = hero asset 100-120px
Cards: 2-3 col grid, #01487B bg, asset icon 44px + title + body
Callout: #F8AD00 bar, icon 38px + Roboto 500 text #25303E
People row: 2-4 person assets 52-64px, bottom-right, flex-end

---

## Asset Library

All assets live in the `assets/` folder, organized into subfolders: `characters/`, `icons/`, `otel/`, `brand/`, `decorative/`. Reference them as `../assets/<subfolder>/filename` from `output/`, or adjust the relative path based on the output file's location.

### Characters

Person 01 — square head, blue/gold:
characters/HNY_Academy-Person_01.png
Use for: neutral, default engineer state

Person 02 — diamond head, all blue:
characters/HNY_Academy-Person_02.png
Use for: focused, analytical, investigative

Person 03 — star-burst head, gold/blue:
characters/HNY_Academy-Person_03.png
Use for: energized, engaged, breakthrough moment

Person 04 — hex head, blue/gold:
characters/HNY_Academy-Person_04.png
Use for: alert, on-call, reactive

### Mascots

Small Bee:
characters/HNY_Academy-Small_Bee.png
Use for: ambient presence, waiting, quiet moments

Big Bee + Flower:
characters/HNY_Academy-Big_Bee_Flower.png
Use for: hero image, covers, feature slides

### Icons

Hive:
icons/HNY_Academy-Hive.png
Use for: team, collaboration, shared knowledge

Magnifying Glass:
icons/HNY_Academy-Magnifying_Glass.png
Use for: search, investigation, query context

Trace Waterfall:
icons/HNY_Academy-Trace_Waterfall.png
Use for: Canvas results, tracing, observability output

Thumbs Up:
icons/HNY_Academy-Thumbs_Up.png
Use for: success, resolution, pro tips

OTel Telescope:
icons/HNY_Academy-Otel_Telescope.png
Use for: observability, monitoring, looking deeper

Experiment (flask):
icons/HNY_Academy-Experiment.png
Use for: testing, iteration, hands-on activities

Autonomy:
icons/HNY_Academy-Autonomy.png
Use for: independence, self-service, empowerment

Handshake:
icons/HNY_Academy-Handshake.png
Use for: collaboration, partnership, onboarding

Mountain:
icons/HNY_Academy-Mountain.png
Use for: advanced topics, goals, aspirational content

Funnel:
icons/HNY_Academy-Funnel.png
Use for: filtering, narrowing, query refinement

Flower:
icons/HNY_Academy-Flower.png
Use for: growth, learning, positive outcomes

Sun:
icons/HNY_Academy-Sun.png
Use for: clarity, insight, illumination

Logs:
icons/HNY_Academy_Logs.svg
Use for: logs, log data, logging pipelines — use on light backgrounds only

### OTel & Pipeline Components

API:
otel/HNY_Academy_API.svg
Use for: APIs, integrations, service interfaces — two gears inside an interface frame

App:
otel/HNY_Academy_App.svg
Use for: applications, services, client software — computer monitor with blank screen

Datastore:
otel/HNY_Academy_HNY_Datastore.svg
Use for: databases, data storage, persistence layers

Library:
otel/HNY_Academy_Library.svg
Use for: SDKs, libraries, packages, instrumentation — open book

Metrics:
otel/HNY_Academy_Metrics.svg
Use for: metrics, performance data, measurement — speedometer

OTel Agent:
otel/HNY_Academy_OTel_Agent.svg
Use for: OpenTelemetry agent, collector agent, local telemetry forwarder — bee icon. Use on dark backgrounds only

OTel Collector v1:
otel/HNY_Academy_OTel_Collector_v1.svg
Use for: OpenTelemetry Collector, pipeline processing — computer chip

OTel Collector v2:
otel/HNY_Academy_OTel_Collector_v2.svg
Use for: OpenTelemetry Collector, filtering/routing — funnel

OTel Datastore:
otel/HNY_Academy_OTel_Datastore.svg
Use for: observability backends, telemetry storage with query capability — datastore with telescope

SDK:
otel/HNY_Academy_SDK.svg
Use for: SDKs, developer toolkits, instrumentation packages — briefcase with tools

Structured Event:
otel/HNY_Academy_Structured_Event.svg
Use for: wide events, structured data, telemetry events — interlocking lego pieces

Traces:
otel/HNY_Academy_Traces.svg
Use for: distributed tracing, trace data, Honeycomb traces — honeycomb trace visualization

### Logos

Logo — Light, Large, No Padding:
brand/HNY_ACDMY-Logo-Light-Large-NoPadding.png
Use for: full wordmark on dark/Cobalt backgrounds, slide headers, large placements

Logo — Light, Large, Padded:
brand/HNY_ACDMY-Logo-Light-Large-Padding.png
Use for: full wordmark on dark backgrounds where built-in spacing is needed

Logo — Light, Small, No Padding:
brand/HNY_ACDMY-Logo-Light-Small-NoPadding.png
Use for: compact white wordmark in nav bars, footers, tight layouts on dark backgrounds

Logo — Light, Small, Padded:
brand/HNY_ACDMY-Logo-Light-Small-Padding.png
Use for: small white wordmark with spacing, inline placements on dark backgrounds

Logo — Dark, Large, No Padding:
brand/HNY_ACDMY-Logo-Dark-Large-NoPadding.png
Use for: full wordmark on light backgrounds, print, co-branded layouts

Logo — Dark, Large, Padded:
brand/HNY_ACDMY-Logo-Dark-Large-Padding.png
Use for: full wordmark on light backgrounds with built-in padding

Logo — Dark, Small, No Padding:
brand/HNY_ACDMY-Logo-Dark-Small-NoPadding.png
Use for: compact dark wordmark in headers or footers on light backgrounds

Logo — Dark, Small, Padded:
brand/HNY_ACDMY-Logo-Dark-Small-Padding.png
Use for: small dark wordmark with spacing on light backgrounds

Logo — Light + Dark, Large, No Padding:
brand/HNY_ACDMY-Logo-Light_Dark-Large-NoPadding.png
Use for: full-color wordmark (light symbol + dark text), preferred for neutral/white backgrounds

Logo — Light + Dark, Large, Padded:
brand/HNY_ACDMY-Logo-Light_Dark-Large-Padding.png
Use for: full-color wordmark with built-in padding on neutral/white backgrounds

Favicon:
brand/HNY_ACDMY-Favicon.png
Use for: browser tab icons, app icons, small square logo placements

### Logomarks

Logomark — Light:
brand/HNY_ACDMY-Logomark-Light.svg
Use for: symbol-only white mark on dark backgrounds, watermarks, compact brand presence

Logomark — Dark:
brand/HNY_ACDMY-Logomark-Dark.svg
Use for: symbol-only dark mark on light backgrounds

Logomark — Grayscale:
brand/HNY_ACDMY-Logomark-Grayscale.svg
Use for: neutral/monochrome contexts, print, desaturated overlays

### Cover Slides

Cover — Google Slides 01:
brand/Cover-Gslides-01.png
Use for: slide deck cover variant 1

Cover — Google Slides 02:
brand/Cover-Gslides-02.png
Use for: slide deck cover variant 2

Cover — Google Slides 03:
brand/Cover-Gslides-03.png
Use for: slide deck cover variant 3

### Telemetry Data Patterns

These are wide horizontal decorators showing dashed rows with colored data blocks — use as
background texture, section dividers, or telemetry data visualization motifs.

Telemetry Data v1 — Pacific blue blocks, left-to-right, white dashed lines (dark bg):
decorative/HNY_Telemetry_Data_v1.svg
Use for: decorative telemetry rows on dark/Cobalt backgrounds

Telemetry Data v1 alt — Pacific blue blocks, dark dashed lines (light bg):
decorative/HNY_Telemetry_Data_v1_1.svg
Use for: same pattern adapted for lighter card or panel backgrounds

Telemetry Data v2 — Denim blue blocks, white dashed lines (dark bg):
decorative/HNY_Telemetry_Data_v2.svg
Use for: subtle, low-contrast telemetry texture on dark backgrounds

Telemetry Data v2 alt — Denim blue blocks, dark dashed lines (light bg):
decorative/HNY_Telemetry_Data_v2_1.svg
Use for: subtle telemetry texture on lighter backgrounds

Telemetry Data v3 — Honey/amber blocks, white dashed lines (dark bg):
decorative/HNY_Telemetry_Data_v3.svg
Use for: highlighted or accented telemetry pattern, callout sections, amber-themed content

Telemetry Data v3 alt — Honey/amber blocks, dark dashed lines (light bg):
decorative/HNY_Telemetry_Data_v3_1.svg
Use for: amber telemetry texture on lighter backgrounds

### Layout Connectors

These are thin horizontal or circular line elements for connecting diagram nodes,
separating sections, or indicating flow.

Arrow — white (dark bg):
decorative/HNY_Academy_Arrow.svg
Use for: directional flow between elements on dark/Cobalt backgrounds

Arrow — dark (light bg):
decorative/HNY_Academy_Arrow_1.svg
Use for: directional flow between elements on lighter card or panel backgrounds

Bee Line — dark dashed (dark bg):
decorative/HNY_Academy_Bee_Line.svg
Use for: dashed connector or divider line on dark backgrounds

Bee Line — light dashed (dark bg):
decorative/HNY_Academy_Bee_Line_1.svg
Use for: lighter dashed connector on dark backgrounds, secondary flow lines

Circular Arrow — white (dark bg):
decorative/HNY_Academy_Circular_Arrow.svg
Use for: feedback loops, iteration cycles, recurring processes on dark backgrounds

Circular Arrow — dark (light bg):
decorative/HNY_Academy_Circular_Arrow_1.svg
Use for: feedback loops, iteration cycles on lighter backgrounds

---

## Remotion

- Project lives in `remotion/` — start dev server with `npm start` (runs on `http://localhost:3001`)
- Compositions are registered in `remotion/src/Root.tsx`
- Output standard: 1280×720, 30fps
- Render a composition: `npm run render` from `remotion/`
- Workflow: Remotion renders MP4 scenes → imported into Camtasia for narration and UI walkthroughs

**Layout rules for Remotion compositions:**
- Never use `justifyContent: "center"` on the root container — content rarely fills 720px and it produces visible cobalt padding at top and bottom
- Use `justifyContent: "flex-start"` with an explicit `gap` (16–24px) between sections
- Give the primary card `flex: 1` so it absorbs remaining vertical space instead of leaving dead air
- Target: title + card + callout should together occupy at least 90% of the 720px height

**Available compositions:**

| ID | Description | Duration |
|----|-------------|----------|
| `PipelineIntro` | OTel pipeline: App → SDK → Collector → Honeycomb | ~4s |
| `TraceWaterfall` | Distributed trace waterfall for checkout-service | ~5.4s |
| `WideEvents` | Wide event model — fields bloom into a structured event card | ~4.7s |
| `CourseIntro` | Course intro title card | ~3.5s |
| `TraceExplainer` | PipelineIntro + TraceWaterfall combined | ~9s |

---

## Output Behavior

Output folder structure:
- `output/comics/html/` — comic HTML files
- `output/comics/png/` — comic PNG exports
- `output/diagrams/html/` — diagram and slide HTML files
- `output/diagrams/png/` — diagram PNG exports
- `output/slides/html/` — slide HTML files
- `output/slides/png/` — slide PNG exports
- `output/animations/mp4/` — rendered Remotion MP4s

After writing any `.html` file, save it to the appropriate subfolder above, then immediately run `open <path>` to preview it in the browser. Do this automatically without being asked.

After rendering any MP4 to `output/animations/mp4/`, automatically add it to the Camtasia library by running:
`python3 scripts/add_to_camtasia.py output/animations/mp4/<name>.mp4`
Assets land in the **HNY Academy Animations** folder inside the user's default Camtasia library. Tell the user to restart Camtasia if it was open.