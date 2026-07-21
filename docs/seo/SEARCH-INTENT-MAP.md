# Search intent map

How each intent stage maps to page types, content posture and conversion action. Every URL in the register carries exactly one primary intent; overlaps are resolved in the keyword map's cannibalisation column.

| Intent | Buyer state | Page types | Content posture | Primary CTA |
|---|---|---|---|---|
| Informational | “How much / how / what is” — researching, weeks from buying | Resource articles, `/process/`, `/faq/` | Teach honestly, cite real figures, zero hard-sell | Soft: guide-to-service link, “get a tailored estimate” |
| Comparison | Shortlisting approaches (“X vs Y”) | `/compare/…` | Fair criteria table, honest trade-offs, clear verdict with conditions | Medium: consultation |
| Commercial investigation | Evaluating providers/capabilities | Home, service pages, solution pages, `/about/`, `/projects/` | Capability + proof + scope clarity | Quote request / consultation |
| Local commercial | Provider near me | `/areas-we-serve/…` | Genuine local specifics, services truly offered there | Quote request |
| Transactional | Ready to buy/price | `/website-packages/…`, `/pricing/`, `/request-a-quote/` | Direct: what you get, indicative cost, next step | Quote submit |
| Navigational | Knows us | Home, `/contact/`, legal | Fast access to action | Contact |

## Buying-journey flow (canonical internal-link direction)

```
Article (informational)
   └─> Comparison ──> Service page (commercial) ──> Package/Pricing (transactional) ──> Request a quote
                          │                              ▲
                          ├─> Solution (industry proof) ─┘
                          └─> Project case study (evidence) ──> Request a quote
```

Rules:

1. Informational pages always link **forward** to exactly one primary commercial page (their “supported page” field in the content model) — never only sideways to other articles.
2. Commercial pages link forward to transactional pages and sideways to proof (projects/solutions); they link **back** to at most 2 supporting guides.
3. Transactional pages link only forward (quote) and to trust essentials (process, FAQ) — don’t leak price-ready visitors back into research content.
4. One primary intent per page; secondary phrases are answered in FAQ blocks on that page, not with new pages.

## Intent conflicts resolved (the three price pages)

| Query flavour | Intent | Page |
|---|---|---|
| “how much does a website cost in south africa” | Informational (market question) | `/resources/website-cost-south-africa/` |
| “website design prices south africa” | Commercial (show me your prices) | `/pricing/` |
| “business website packages” | Transactional (sell me a defined thing) | `/website-packages/` |

Each page states which question it answers in its intro and links to the other two — this is the documented defence against the closest cannibalisation risk in the architecture.
