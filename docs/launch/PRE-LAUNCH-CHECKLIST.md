# Pre-launch checklist

Work top to bottom; every unchecked box blocks launch unless explicitly waived in the decision log.

## Domain, DNS, SSL

- [ ] Production domain purchased and in `NEXT_PUBLIC_SITE_URL`
- [ ] DNS: apex + www configured at host; propagation verified
- [ ] SSL active; `http://` → `https://` 301 verified (curl -I both)
- [ ] Preferred host chosen; alternate host 301s to it (test all 4 scheme/host combos)
- [ ] `NEXT_PUBLIC_SITE_ENV=production` set ONLY on the production deployment
- [ ] **Blocking (2026-07-23 crawl):** live www currently serves `robots.txt` `Disallow: /` and sitemap/canonicals on `http://localhost:3000` — set Production env + redeploy before GSC. See `docs/technical/PRODUCTION-CRAWL-AUDIT.md`.

## Configuration truth

- [ ] `config/brand.ts`: final name, legal name, contact details, hours, service areas — no placeholders remaining
- [ ] All `placeholder: true` content either replaced or verified as visibly labelled (pricing labels, template badges)
- [ ] Legal pages reviewed by a qualified person; effective dates set; POPIA officer named
- [ ] Cookie policy matches reality (zero cookies until analytics ships — verify in DevTools)

## Technical SEO verification (on the production URL)

- [ ] `robots.txt` reachable; allows crawling; sitemap line present and correct
- [ ] `/sitemap.xml` valid XML; spot-check 5 URLs resolve 200; no noindex URLs present
- [ ] Canonicals: view-source 5 sampled pages — absolute, self, trailing slash
- [ ] `npm run check` green (lint, types, tests, SEO validator)
- [ ] Crawl the live site (Screaming Frog free tier suffices at 50 URLs): zero 404s from internal links, zero redirect chains, one H1 per page, titles/descriptions unique
- [ ] Rich Results Test: home, one service, one package, one article, /faq/, one location — no critical errors
- [ ] 404 behaviour: random URL returns real 404 with the recovery page

## Forms and conversion

- [ ] Quote + contact forms submitted end-to-end on production; delivery received (webhook/email)
- [ ] Honeypot tested (fill hidden field → silent discard)
- [ ] Thank-you page reachable only post-submit; noindex tag verified
- [ ] `tel:`/`mailto:`/WhatsApp links correct on a real phone

## Quality gates

- [ ] Lighthouse mobile on home/service/article/pricing/quote: Perf ≥90, A11y ≥95, SEO ≥95; record scores in PROJECT-STATUS
- [ ] Mobile device pass: no horizontal scroll at 320px, tap targets, CTA visibility
- [ ] Keyboard-only pass per ACCESSIBILITY-STANDARDS
- [ ] Content pass: no lorem ipsum, no unlabelled placeholder, en-ZA spelling spot-check

## Search Console + analytics

- [ ] Domain property verified (DNS TXT) — see SEARCH-CONSOLE-SETUP.md
- [ ] Sitemap submitted; URL Inspection on home + 2 key pages → "URL is available to Google"
- [ ] GA4 (if going live now): events firing in DebugView; consent behaviour verified

## Safety nets

- [ ] Git tag `v1.0-launch`; hosting rollback tested (previous deployment restorable in one click)
- [ ] Backup of env vars + DNS records stored securely
- [ ] Post-launch monitoring owner + calendar reminders created (90-day plan)
