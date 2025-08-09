# Image Analysis Feature Documentation

## Overview

The Image Analysis feature provides professional-grade image quality assessment using a hybrid approach:

- Local, browser-based analysis (Canvas) with advanced, subject‑weighted metrics.
- Optional Google Vision API analysis for additional content signals.

It evaluates both technical quality (exposure, contrast, sharpness, color) and composition (Rule of Thirds, Golden Ratio, Symmetry, Leading Lines, Horizon) with a stock photography focus.

## Features

### Local Analysis (Free)

- Brightness (subject‑weighted, clipping‑aware)
- Contrast (subject‑weighted, robust dynamic range, clipping‑aware)
- Sharpness (subject‑weighted Laplacian variance + global sharpness)
- Color Balance (subject‑weighted, color cast and saturation aware)
- Advanced Composition:
  - Rule of Thirds
  - Golden Ratio
  - Symmetry
  - Leading Lines
  - Horizon placement
- UI enhancements:
  - Mini SVG illustrations for composition metrics
  - English hints under each basic metric explaining the score and how to improve
  - “Overall” shows a simple square frame icon
- Anonymous quota: up to 10 local analyses per browser (sign in for more)

### Google Vision API (Advanced)

- Safe Search
- Label Detection
- Face Detection
- Text Detection
- Image Properties
- Typed output with normalization to avoid null type issues

## Architecture

```
Client (Canvas, UI) ──▶ API (validation, rate limit, Vision) ──▶ Analysis
    ▲         │                  ▲                         │
    │         └──── echo imageData for local analysis ─────┘
    └──────────── Subject‑weighted metrics computed in browser
```

### Brightness (subject‑weighted, clipping‑aware)

- Global midtone score: best near mid‑tones; penalize clipped shadows/highlights.
- Subject score: same logic computed around focal points.
- Final: 0.6 × subject + 0.4 × global.

Pseudo:

```js
global = midtoneScore - clipPenalty;
subject = weightedLocalScoresAroundFocalPoints;
finalBrightness = 0.6 * subject + 0.4 * global;
```

### Contrast (subject‑weighted, robust DR, clipping‑aware)

- Global DR via percentiles: P95 − P5 (robust to outliers), minus clipping penalty.
- Subject DR: local P90 − P10 around focal points, minus local clipping penalty.
- Final: 0.6 × subject + 0.4 × global.

Pseudo:

```js
drGlobal = p95 - p5
drLocal  = p90 - p10 (around focal)
finalContrast = 0.6*subject + 0.4*global
```

### Sharpness (subject‑weighted Laplacian variance)

- Global sharpness via edge gradient magnitude.
- Subject sharpness via local Laplacian variance around focal points.
- Final: 0.7 × subject + 0.3 × global.

Pseudo:

```js
subjectSharpness = avg local Laplacian variance around top focal points
finalSharpness = 0.7*subjectSharpness + 0.3*globalSharpness
```

### Color Balance (subject‑weighted, cast/saturation aware)

- Gray‑world deviation (neutrality) and saturation penalties (too low/high).
- Compute globally and around focal points.
- Final: 0.6 × subject + 0.4 × global.

Pseudo:

```js
neutralScore = 100 - avgChannelDeviation
satPenalty = lowSaturation%*40 + highSaturation%*60
score = 0.7*neutralScore + 0.3*(100 - satPenalty)
finalColorBalance = 0.6*subject + 0.4*global
```

### Composition Analysis

Per‑metric scoring (0–100), then overall composition:

```
composition.overall =
  0.30*RuleOfThirds +
  0.25*GoldenRatio +
  0.20*Symmetry +
  0.15*LeadingLines +
  0.10*Horizon
```

UI adds small SVG illustrations:

- Overall: square frame
- Rule of Thirds: 3×3 grid
- Golden Ratio: φ grid + spiral hint
- Symmetry: central axis
- Leading Lines: converging lines
- Horizon: horizontal line near thirds

## Stock Photo Quality Judgment

- Stock Photo Quality: “Acceptable for Stock” if isGood; otherwise “Needs Improvement”.
- Professional Score: overall 0–100 score.
- Recommendations:
  - 80–100: Premium stock (Shutterstock, iStock, Adobe Stock)
  - 70–79: Standard stock (Shutterstock, Dreamstime)
  - 60–69: Microstock (Pixabay, Unsplash); minor improvements advised
  - <60: Below stock standards; improve technical quality

## UI Details

- Basic Metrics cards show a short English explanation under each value (what it means and how to improve).
- Composition cards show mini illustrations to help interpret scores.
- Anonymous users:
  - Local storage counter `anonImageAnalysisCount`
  - Free analyses left displayed in the analysis UI and in the sidebar
  - Limit: 10 analyses per browser session (sign in to continue)

## API

### POST /api/analyze-image

Request:

```json
{
  "image": "data:image/jpeg;base64,...",
  "method": "local" | "vision"
}
```

Behavior:

- local:
  - API validates and returns `imageData` back to the client and a zeroed placeholder analysis.
  - Client performs all local metric calculations with Canvas and renders real scores.
- vision:
  - Server calls Google Vision API and returns typed, normalized results with reasons and stock recommendations.

Response (Local outline):

```json
{
  "isGood": false,
  "score": 0,
  "method": "local",
  "analysis": { "metrics": { ...0s }, "reasons": [ "...context..." ] },
  "reasons": [ "...context..." ],
  "imageData": "data:image/jpeg;base64,..."
}
```

### Rate Limiting

- Per-IP: 100 requests/min (API level).
- Anonymous quota (client/UI): 10 analyses per browser; sign in to continue.

## Vision API Notes

- Safe Search likelihoods normalized to strings; nulls converted to undefined.
- Scoring adds points for safe content, labels, faces, and text.
- isGood (Vision): score > 70 and Safe Search adult/violence = VERY_UNLIKELY.

## Usage

1. Go to `/image-analysis`.
2. Upload an image and choose “Local Analysis (Canvas)” or “Google Vision API”.
3. View Summary, Stock Photo Assessment, Reasons, and Detailed Metrics.
4. For anonymous users, remaining free analyses are shown; sign in for more.

## Best Practices

- Ensure the subject is sharp (bokeh is fine; the subject must be crisp).
- Expose within 30–80 brightness; avoid clipped highlights/shadows.
- Maintain robust contrast without crushing shadows/clipping highlights.
- Keep colors neutral and natural; avoid heavy color casts/oversaturation.
- Compose intentionally: thirds, leading lines, symmetry, and well-placed horizon.

## Technical Requirements

- Client: Modern browser with Canvas API.
- Server: Next.js (Node.js), optional Google Vision setup.
- Env: `GOOGLE_APPLICATION_CREDENTIALS` for Vision.

## Error Handling

- Validations: base64, size ≤ 10MB.
- API rate limit responses (429).
- Client-side guards for anonymous quota.
- Clear UI error states.

## Future Enhancements

- Batch analysis, exportable reports, side-by-side comparisons.
- Web Workers/WASM for performance.
- Advanced subject detection for more precise subject weighting.

---

Last Updated: August 2025
Version: 1.1.0
Maintainer: Development Team
