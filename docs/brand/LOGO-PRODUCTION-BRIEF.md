# Logo production brief — Koppie Systems

Status: **Figma SVG mark live** (`public/brand/koppie-logo-symbol-nobg.svg`, no circular field) with stacked HTML “KOPPIE” / “SYSTEMS” in the header. Circled master retained at `koppie-logo-symbol.svg` for favicon/apple. PNG lockups removed.

## Concept (approved)

An abstract **K** constructed from contour lines and modular digital geometry suggesting:

1. A rising koppie / elevation.
2. A structured digital framework.
3. Forward commercial progress.

## Must not be

Literal cartoon hill; mountain landscape; tourism/farm logo; sun over a hill; SA flag; outline of Africa; circuit board; tree/farmhouse; shield badge; heavily detailed illustration.

## Construction

- Two or three ascending contour-like lines.
- Central angular structure suggesting a subtle K.
- Consistent line thickness; slightly rounded joins.
- Square or near-square silhouette.
- No gradients in the core logo.
- Strong one-colour reproduction.

## Wordmark

Primary stacked treatment:

> Koppie  
> SYSTEMS

- “Koppie” in Manrope SemiBold/Bold.
- “SYSTEMS” smaller, uppercase, moderate tracking.
- No italics or decorative fonts.

## Lockups required from designer

1. Primary horizontal: symbol left + stacked Koppie / SYSTEMS.
2. Secondary horizontal: symbol + “Koppie Systems”.
3. Stacked: symbol above wordmark.
4. Icon only (favicon / avatar).
5. Mono light and mono dark.
6. Clear-space and minimum-size specs.

## Colour treatments

| Background | Symbol | Wordmark | SYSTEMS |
|---|---|---|---|
| Light | Signal Copper `#B85C24` | Koppie Slate `#14242B` | Mineral Teal `#1E6F6D` or Slate |
| Dark | Signal Copper | White | Sandstone `#E8DFC9` |
| Mono | Slate on light / white on dark / black if production requires |

## Deliverables

- SVG masters (full colour, mono light, mono dark).
- Favicon set (SVG + 32/180 PNG).
- Social avatar 400×400.
- Usage rules PDF/one-pager.

## Replacement path in code

1. Drop final SVGs into `public/brand/`.
2. Update `BrandWordmark` to render the SVG.
3. Set `brand.verification.logoFinal = true`.
4. Remove the provisional inline SVG mark.
5. Re-run visual regression checklist.
