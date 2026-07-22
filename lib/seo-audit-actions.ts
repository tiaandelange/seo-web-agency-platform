'use server';

import { redirect } from 'next/navigation';
import { deliverLead } from '@/lib/lead-delivery';
import type { SeoAuditProductId } from '@/config/seo-audit-product';
import {
  SEO_AUDIT_CUSTOM_QUOTE_PATH,
  SEO_AUDIT_HUB_PATH,
  getSeoAuditProduct,
  isSeoAuditTierActive,
  seoAuditTierPriceZar,
} from '@/config/seo-audit-product';

const MAX_LEN = 5000;

function clean(value: FormDataEntryValue | null, max = 500): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function spamGate(formData: FormData, thankYouPath: string): void {
  const honeypot = clean(formData.get('company_website'));
  if (honeypot) redirect(thankYouPath);

  const renderedAt = clean(formData.get('rendered_at'), 50);
  if (renderedAt) {
    const renderedMs = Date.parse(renderedAt);
    if (!Number.isNaN(renderedMs) && Date.now() - renderedMs < 3000) {
      redirect(thankYouPath);
    }
  }
}

/**
 * Hub / advanced eligibility — routes to basic intake, advanced intake, or custom quote.
 */
export async function assessSeoAuditEligibility(formData: FormData): Promise<void> {
  const requested = clean(formData.get('requested_tier'), 30) || 'auto';
  const thankYou =
    requested === 'advanced'
      ? getSeoAuditProduct('advanced').thankYouPath
      : getSeoAuditProduct('priority-fix').thankYouPath;

  spamGate(formData, thankYou);

  const siteSize = clean(formData.get('site_size'), 50);
  const complexSite = clean(formData.get('complex_site'), 40);
  const canProvideAccess = clean(formData.get('can_provide_access'), 20);
  const compromised = clean(formData.get('compromised'), 20);
  const wantsRewrite = clean(formData.get('wants_rewrite'), 20);

  if (!siteSize || !complexSite || !canProvideAccess || !compromised || !wantsRewrite) {
    const returnPath =
      requested === 'advanced' ? getSeoAuditProduct('advanced').route : SEO_AUDIT_HUB_PATH;
    redirect(`${returnPath}?error=eligibility#eligibility`);
  }

  const needsCustom =
    siteSize === 'over_250' ||
    complexSite === 'multi' ||
    canProvideAccess === 'no' ||
    compromised === 'yes' ||
    wantsRewrite === 'yes';

  if (needsCustom) {
    redirect(`${SEO_AUDIT_CUSTOM_QUOTE_PATH}&reason=complexity-gate`);
  }

  // Ecommerce/catalogue or 11–250 URLs → advanced (if active)
  const needsAdvanced =
    siteSize === '11_to_250' ||
    complexSite === 'ecommerce_or_catalogue' ||
    requested === 'advanced';

  if (needsAdvanced) {
    if (!isSeoAuditTierActive('advanced')) {
      redirect(`${SEO_AUDIT_CUSTOM_QUOTE_PATH}&reason=advanced-inactive`);
    }
    // Small ecommerce still advanced; tiny brochure stays basic unless requested advanced
    if (siteSize === 'up_to_10' && complexSite === 'no' && requested !== 'advanced') {
      if (!isSeoAuditTierActive('priority-fix')) {
        redirect(`${SEO_AUDIT_CUSTOM_QUOTE_PATH}&reason=basic-inactive`);
      }
      redirect(`${getSeoAuditProduct('priority-fix').intakePath}?eligible=1`);
    }
    redirect(`${getSeoAuditProduct('advanced').intakePath}?eligible=1`);
  }

  // Default: Priority Fix Pack
  if (!isSeoAuditTierActive('priority-fix')) {
    redirect(`${SEO_AUDIT_CUSTOM_QUOTE_PATH}&reason=basic-inactive`);
  }
  redirect(`${getSeoAuditProduct('priority-fix').intakePath}?eligible=1`);
}

export async function submitSeoAuditIntake(formData: FormData): Promise<void> {
  const tierRaw = clean(formData.get('product_tier'), 30);
  const tier: SeoAuditProductId = tierRaw === 'advanced' ? 'advanced' : 'priority-fix';
  const product = getSeoAuditProduct(tier);

  if (!isSeoAuditTierActive(tier)) {
    redirect(`${product.intakePath}?error=inactive`);
  }

  spamGate(formData, product.thankYouPath);

  const name = clean(formData.get('name'));
  const email = clean(formData.get('email'));
  const phone = clean(formData.get('phone'), 50);
  const company = clean(formData.get('company'));
  const websiteUrl = clean(formData.get('website_url'), 500);
  const primaryServices = clean(formData.get('primary_services'), 1000);
  const serviceAreas = clean(formData.get('service_areas'), 500);
  const platform = clean(formData.get('website_platform'), 200);
  const pageCount = clean(formData.get('page_count'), 50);
  const seoConcern = clean(formData.get('seo_concern'), MAX_LEN);
  const gscAvailable = clean(formData.get('gsc_available'), 20);
  const gbpUrl = clean(formData.get('gbp_url'), 500);
  const priorityPages = clean(formData.get('priority_pages'), 1000);
  const sitemapUrl = clean(formData.get('sitemap_url'), 500);
  const competitors = clean(formData.get('competitors'), 1000);
  const ga4Available = clean(formData.get('ga4_available'), 20);
  const permission = formData.get('change_permission') === 'on';
  const backupConfirmed = formData.get('backup_confirmed') === 'on';
  const consent = formData.get('consent') === 'on';
  const paymentRef = clean(formData.get('payment_reference'), 100);

  const emailShape = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlShape = /^https?:\/\/.+/i;

  const gscOk = tier === 'priority-fix' || gscAvailable === 'yes' || gscAvailable === 'invite_pending';

  const valid =
    name.length > 0 &&
    emailShape.test(email) &&
    urlShape.test(websiteUrl) &&
    primaryServices.length > 0 &&
    seoConcern.length > 0 &&
    permission &&
    backupConfirmed &&
    consent &&
    gscOk;

  if (!valid) {
    redirect(`${product.intakePath}?error=1`);
  }

  const price = seoAuditTierPriceZar(tier);
  const message = [
    `${product.name} intake (R${price})`,
    `Tier: ${tier}`,
    `Website: ${websiteUrl}`,
    `Sitemap: ${sitemapUrl || '(none)'}`,
    `Company: ${company || '(none)'}`,
    `Primary services: ${primaryServices}`,
    `Service areas: ${serviceAreas || '(none)'}`,
    `Platform: ${platform || '(none)'}`,
    `Approx. page/URL count: ${pageCount || '(none)'}`,
    `GSC available: ${gscAvailable || '(none)'}`,
    `GA4 available: ${ga4Available || '(none)'}`,
    `GBP URL: ${gbpUrl || '(none)'}`,
    `Competitors: ${competitors || '(none)'}`,
    `Preferred priority pages: ${priorityPages || '(none)'}`,
    `Payment / order reference: ${paymentRef || '(none — enquiry)'}`,
    `Change permission: yes`,
    `Backup confirmed: yes`,
    '',
    'Primary SEO concern:',
    seoConcern,
  ].join('\n');

  const result = await deliverLead({
    formType: tier === 'advanced' ? 'seo-audit-advanced-intake' : 'seo-audit-intake',
    name,
    email,
    phone,
    company,
    serviceInterest: product.sku,
    budgetBand: `R${price} once-off`,
    timeline: product.turnaround,
    message,
    consent: true,
    submittedAt: new Date().toISOString(),
  });

  if (!result.ok) {
    console.error('[seo-audit-intake] delivery failed', {
      submissionId: result.submissionId,
      provider: result.provider,
      reason: result.reason,
      tier,
    });
    redirect(`${product.intakePath}?error=1`);
  }

  console.log('[seo-audit-intake] delivery ok', {
    submissionId: result.submissionId,
    provider: result.provider,
    tier,
  });

  redirect(product.thankYouPath);
}
