# Honeycomb Academy — Visual Asset Creator

## What this repo is
Brand assets, design guidelines, and a Claude Code skill for generating
on-brand content — comics, slides, diagrams, and Remotion animations.

## Setup
```bash
git clone https://github.com/midgepickett/honeycomb-academy-visual-asset-creator
cd honeycomb-academy-visual-asset-creator
bash scripts/setup.sh
```

## Structure
- `assets/` — brand assets organized by type (`characters/`, `icons/`, `otel/`, `brand/`, `decorative/`)
- `.claude/SKILL.md` — brand guidelines and behavioral instructions; Claude Code reads this automatically
- `output/` — generated content organized by type (`comics/`, `diagrams/`, `slides/`, `animations/`)
- `remotion/` — Remotion animation project (1280×720, 30fps)
- `scripts/` — utility scripts

## Using Claude Code
```bash
claude  # run from repo root — SKILL.md loads automatically
```

Describe what you want and Claude applies the full brand system. Example prompts:

```
Create a 3-panel comic explaining what a distributed trace is

Build a slide introducing OpenTelemetry — use the OTel Telescope icon

Make a diagram showing the OTel pipeline from app to Honeycomb

Create a Remotion animation showing how wide events work
```

## Exporting to PNG
```bash
node scripts/export_png.js output/diagrams/html/my-diagram.html
# saves to output/diagrams/png/my-diagram.png

node scripts/export_png.js output/comics/html/my-comic.html output/comics/png/my-comic.png
```

## Remotion animations
```bash
cd remotion
npm start        # dev server at http://localhost:3001
npm run render   # render a composition to output/animations/mp4/
```

After rendering, the MP4 is automatically added to your Camtasia library:
```bash
python3 scripts/add_to_camtasia.py output/animations/mp4/MyComposition.mp4
```
Assets land in the **HNY Academy Animations** folder. Restart Camtasia if it was open.

## Adding new assets
1. Drop the file into the appropriate subfolder under `assets/`
2. Add the filename and usage note to `.claude/SKILL.md`
