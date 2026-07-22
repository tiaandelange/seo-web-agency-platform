# Resend integration

Last updated: 2026-07-22  
Related: `docs/technical/FORM-SUBMISSION-EMAIL-AUDIT.md`, `docs/technical/FORM-ARCHITECTURE.md`

## Overview

Contact (`/contact/`) and proposal (`/request-a-quote/`) submissions deliver through **published Resend hosted templates** when `LEAD_DELIVERY_PROVIDER=resend` (and `EMAIL_DELIVERY_MODE` is not `log`).

Sequence per submission:

1. Validate + spam gate in `lib/actions.ts` (unchanged).
2. `deliverLead()` routes `formType=contact|quote` to template orchestration.
3. **Primary:** internal notification template → Koppie mailbox (`replyTo` = customer email).
4. On internal failure → form `?error=1`, **no** customer confirmation, **no** thank-you.
5. On internal success → customer confirmation template (`replyTo` = Koppie public reply address).
6. Confirmation failure after internal success → still treat as lead received; log non-PII ops metadata.

SEO-audit intake continues on the **legacy raw-text** Resend path until dedicated templates exist. Payment webhook does **not** send email on browser thank-you views.

## Environment variables (names only)

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Server-only API key (also accepts legacy `LEAD_DELIVERY_API_KEY`) |
| `RESEND_FROM_EMAIL` | Verified domain From (fallback `LEAD_FROM_EMAIL`) |
| `RESEND_INTERNAL_TO_EMAIL` | Ops inbox (fallback `LEAD_TO_EMAIL`) |
| `RESEND_REPLY_TO_EMAIL` | Public reply address on customer confirmations |
| `RESEND_TEMPLATE_CONTACT_INTERNAL` | Published UUID or alias |
| `RESEND_TEMPLATE_CONTACT_CONFIRMATION` | Published UUID or alias |
| `RESEND_TEMPLATE_PROPOSAL_INTERNAL` | Published UUID or alias |
| `RESEND_TEMPLATE_PROPOSAL_CONFIRMATION` | Published UUID or alias |
| `LEAD_DELIVERY_PROVIDER` | `log` \| `webhook` \| `resend` |
| `EMAIL_DELIVERY_MODE` | Optional `log` override (never production) |

Never prefix these with `NEXT_PUBLIC_`.

Recommended aliases (only if created in Resend):

- `koppie-contact-internal`
- `koppie-contact-confirmation`
- `koppie-proposal-internal`
- `koppie-proposal-confirmation`

## Payload rules

Hosted-template sends use:

```ts
await resend.emails.send(
  {
    from,
    to: [recipient],
    replyTo,
    template: { id, variables },
  },
  { idempotencyKey }
);
```

Do **not** send `html`, `text`, or `react` with `template`.  
Do **not** use reserved variable `EMAIL` — use `CONTACT_EMAIL`.

Variable values are plain text, capped at 2,000 characters. Optional empties become `Not supplied` / `Not specified`.

## Idempotency

- `contact-internal/{submissionReference}`
- `contact-confirmation/{submissionReference}`
- `proposal-internal/{submissionReference}`
- `proposal-confirmation/{submissionReference}`

References look like `KS-CON-20260722-ABC123` / `KS-PRO-20260722-ABC123` (no PII).

## Module map

```text
lib/email/
  client.ts
  config.ts
  templates.ts
  types.ts
  variables.ts
  send-template.ts
  send-contact-emails.ts
  send-proposal-emails.ts
lib/lead-delivery.ts   # routes providers
lib/actions.ts         # form gate + deliverLead
```

## Production launch checklist

1. Publish all four templates in Resend.  
2. Set template IDs/aliases + From/To/Reply-To on Vercel.  
3. Set `LEAD_DELIVERY_PROVIDER=resend`.  
4. Send one controlled test to an approved inbox (not a real customer).  
5. Confirm Reply-To, variables, and mobile rendering.  

Until templates are published and env is complete: **DO NOT ENABLE FORM EMAIL DELIVERY** in production.
