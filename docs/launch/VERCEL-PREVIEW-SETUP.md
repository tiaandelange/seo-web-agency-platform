# Vercel private preview setup — Koppie Systems

Prepared 2026-07-22. Use this for a **protected private preview**. Do not enable production indexing from this checklist.

## 1. Link the project

1. Import `seo-web-agency-platform` from GitHub into Vercel.
2. Set the production branch to `main` (or leave unused until domain cutover).
3. Framework preset: Next.js. Build command: `npm run build`. Output: default `.next`.
4. Node version: 18.18+ (match `package.json` engines).

## 2. Environment variables (Preview + Development)

| Variable | Preview value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://<project>.vercel.app` (or the preview URL Vercel assigns) | Drives canonicals for that deployment only |
| `NEXT_PUBLIC_SITE_ENV` | `preview` | **Must not** be `production` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | unset | No production analytics on preview |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | unset | Do not verify Search Console on preview |
| `LEAD_DELIVERY_PROVIDER` | `resend` or `webhook` | Owner choice |
| `LEAD_TO_EMAIL` | monitored ops mailbox | Destination only — not committed |
| `LEAD_FROM_EMAIL` | verified domain sender | Required for Resend |
| `LEAD_DELIVERY_API_KEY` / `RESEND_API_KEY` | secret | Server-only |
| `LEAD_WEBHOOK_URL` | optional relay URL | If using webhook |
| `LEAD_WEBHOOK_SECRET` | optional | Bearer token |

Never commit `.env.local`. Never expose API keys to `NEXT_PUBLIC_*`.

## 3. Deployment protection

- Enable **Vercel Deployment Protection** (Password Protection or Vercel Authentication) on Preview deployments so the URL is not casually public.
- Prefer Vercel auth over HTTP Basic if the review workflow needs logged-in teammates.
- Do not submit the preview sitemap to Google Search Console.

## 4. Robots and canonicals (verify after deploy)

1. Open `https://<preview>/robots.txt` — must contain `Disallow: /`.
2. View-source a page — robots meta / headers must not invite indexing while `NEXT_PUBLIC_SITE_ENV≠production`.
3. Canonical tags must use `NEXT_PUBLIC_SITE_URL` (the preview origin), not `https://www.koppiesystems.co.za`, until production DNS is intentionally connected.
4. Structured data URLs must also resolve via `siteOrigin()` (env-driven).

## 5. Form testing on preview

1. Configure lead delivery env vars on the Preview environment.
2. Submit contact + quote forms after waiting ≥3 seconds (time trap).
3. Confirm thank-you redirect and mailbox/webhook receipt.
4. Force a bad API key once — confirm `?error=1` (no false thank-you).
5. Confirm honeypot field is not visible; filling it silently “succeeds” without delivery.

## 6. Domain handling

- Primary production origin (when authorised): `https://www.koppiesystems.co.za`
- Do **not** attach the production domain to a preview that still has `NEXT_PUBLIC_SITE_ENV=preview` without also planning robots/canonical cutover.
- Apex → www redirect should be configured only at production cutover.

## 7. Rollback

1. In Vercel → Deployments → promote the previous stable deployment, or redeploy the prior git SHA.
2. If a bad env var caused form failures, revert the Preview env and redeploy.
3. Keep `brand/koppie-systems` branch until the merged `main` preview is confirmed healthy.

## 8. Production cutover (separate gate)

Only when `docs/brand/KOPPIE-REMAINING-INPUTS.md` blocking items are clear:

1. Set `NEXT_PUBLIC_SITE_ENV=production`
2. Set `NEXT_PUBLIC_SITE_URL=https://www.koppiesystems.co.za`
3. Attach domain + TLS
4. Re-verify robots allow, sitemap, Search Console
5. Record the go-live decision in `docs/DECISION-LOG.md`
