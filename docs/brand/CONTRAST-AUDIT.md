# Colour contrast audit — Koppie Systems

Measured 2026-07-22 using WCAG 2.2 relative-luminance contrast. Target: normal text ≥ 4.5:1 (AA).

| Combination | Foreground | Background | Ratio | Result |
|---|---|---|---|---|
| White on Signal Copper (CTA text) | `#FFFFFF` | `#B85C24` | 4.57:1 | PASS AA |
| White on Mineral Teal | `#FFFFFF` | `#1E6F6D` | 5.92:1 | PASS AA |
| White on Koppie Slate | `#FFFFFF` | `#14242B` | 15.95:1 | PASS AA |
| Sandstone on Koppie Slate (hero support) | `#E8DFC9` | `#14242B` | 12.02:1 | PASS AA |
| Graphite on Cloud White | `#2C3338` | `#F6F7F4` | 11.92:1 | PASS AA |
| Graphite on Pure White | `#2C3338` | `#FFFFFF` | 12.82:1 | PASS AA |
| Koppie Slate on Sandstone | `#14242B` | `#E8DFC9` | 12.02:1 | PASS AA |
| Mineral Teal links on Cloud White | `#1E6F6D` | `#F6F7F4` | 5.50:1 | PASS AA |
| Muted body secondary on white | `#4A5560` | `#FFFFFF` | 7.61:1 | PASS AA |
| Slate headings on Cloud White | `#14242B` | `#F6F7F4` | 14.83:1 | PASS AA |

## Notes

- Signal Copper CTA text is **4.57:1** — passes AA for normal text with slim margin. CTA buttons use SemiBold ≥15px; do not reduce size or lighten Copper.
- Sandstone is **not** used for small text on white (fails by design).
- Error colour `#A8433F` is reserved for errors — never use Signal Copper as the error colour.
- Focus ring uses Mineral Teal on light surfaces (≥3:1 UI).
