# Brand asset register — Koppie Systems

| Asset | Status | Path | Notes |
|---|---|---|---|
| Primary circular lockup (PNG) | **Active** | `public/brand/koppie-systems-logo.png` | Owner-supplied 2026-07-23; stacked K mark + KOPPIE / SYSTEMS on circular field |
| Site favicon / app icon | **Active** | `app/icon.png` | Same master as circular lockup (replaces provisional `icon.svg`) |
| Header brand mark | **Active** | `components/brand-wordmark.tsx` | Renders lockup when `brand.verification.logoFinal === true` |
| SVG masters (full / mono) | **Open** | — | Prefer vector masters for print and crisp scaling; PNG is live interim |
| Social share default (1200×630) | **Open** | — | Derive from approved lockup |
| Archived provisional sources | N/A | Keep git history | Former typographic wordmark + geometric K favicon |

## Policy

- Do not redraw or reinterpret the logo.
- Prefer owner-supplied masters only; derivatives must stay faithful to the circular lockup.
- When SVG masters arrive: add under `public/brand/`, prefer SVG in the header where practical, keep PNG fallback, update this register.
