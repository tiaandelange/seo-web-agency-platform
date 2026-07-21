# Homepage messaging options

Prepared 2026-07-21. Three complete homepage messaging sets, aligned to `docs/business/MESSAGING-FRAMEWORK.md` and the frozen homepage template (`docs/architecture/PAGE-TEMPLATES.md` — section order, H1/H2 hierarchy and internal links must not change; this document only proposes *copy* for existing slots). Name token `{Company}` — substitute after the name decision. **No copy ships until the owner picks a set and the name is final.**

## Set A — "Mechanism first" (recommended)

- **H1:** SEO-first websites that turn searches into enquiries
- **Supporting statement:** We design and build websites for contractors, engineering firms, manufacturers and service businesses across South Africa — structured around what your customers actually search for, and extendable into the quotation, catalogue and admin systems that run your day.
- **Primary CTA:** Request a quote · **Secondary:** See how we work
- **Section intro (services):** Every build starts with the searches your buyers make. These are the services that turn that demand into enquiries.
- **Section intro (packages):** Fixed-scope entry points with honest indicative ranges — see exactly what's included before you talk to us.
- **Section intro (trust/process):** No mystery process. We publish the method: research, architecture, build, measure. Inspect this site — it's built the same way we build yours.
- **Tone note:** leads with the differentiating mechanism; best fit with current architecture and the recommended tagline "Websites that win work."

## Set B — "Audience first"

- **H1:** Web development for technical, industrial and service businesses
- **Supporting statement:** {Company} builds SEO-first websites, product catalogues with RFQ workflows and custom business systems for South African companies whose buyers research before they buy.
- **Primary CTA:** Request a quote · **Secondary:** Explore solutions for your industry
- **Section intro (services):** From lead-generation websites to quotation systems — services shaped around how technical businesses actually sell.
- **Section intro (packages):** Productised packages for the common cases; custom scoping where your business doesn't fit a template.
- **Section intro (trust/process):** Founded by an engineer. Scoped and built by the same person you talk to.
- **Tone note:** strongest niche filter; sacrifices some general "business websites" demand on first read; pairs well with the solutions hub.

## Set C — "Problem first"

- **H1:** Your next customer is searching. Can they find you?
- **Supporting statement:** {Company} builds websites structured around real South African search demand — so technical and service businesses get found, get enquiries, and spend less time on the admin behind them.
- **Primary CTA:** Request a quote · **Secondary:** Get the free website cost guide
- **Section intro (services):** Whether the problem is invisibility, a site that doesn't convert, or quoting chaos — there's a defined service for it.
- **Section intro (packages):** Clear scope, clear indicative price, no "request a quote to see anything".
- **Section intro (trust/process):** We show our working: keyword map, architecture, performance budgets. You own everything we build.
- **Tone note:** most conversational; H1 carries no keyword — weakest SEO title alignment of the three (metadata title would carry the keywords instead). Question-form H1 is a deliberate pattern break; use only if the owner prefers a direct-response feel.

## Recommendation

**Set A.** It keeps the keyword-bearing H1 (protects current metadata/heading alignment), states the mechanism competitors can't honestly copy, and folds the audience into the supporting statement. Set B is the safe alternative if the owner wants the niche unmistakable above the fold.

## Guardrails for whichever set is chosen

- H1 replaces the current placeholder H1 only — one H1, same DOM position, server-rendered.
- Metadata title/description update through `buildMetadata()` with validator length rules (50–200 hard, 70–160 ideal).
- No new sections, no reordering, no carousel/hero-video (banned), internal links unchanged.
- Claims stay within the trust framework — nothing unverifiable.
