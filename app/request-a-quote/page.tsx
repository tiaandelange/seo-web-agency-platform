import type { Metadata } from 'next';
import Link from 'next/link';
import { brand } from '@/config/brand';
import { buildMetadata } from '@/lib/seo';
import { formatPhoneDisplay } from '@/lib/phone';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PageHero } from '@/components/layout/page-hero';
import { QuoteForm } from '@/components/quote-form';
import { JsonLd } from '@/components/json-ld';
import { buildIndustrialEngineMessage } from '@/lib/industrial-engine/quote-prefill';
import { webPageSchema } from '@/lib/schema';
import { Container } from '@/components/layout/container';
import { InkBand } from '@/components/layout/ink-band';
import { ProposalExpectations } from '@/components/contact/proposal-expectations';

const PATH = '/request-a-quote/';
const TITLE = 'Request a Website Proposal';
const DESCRIPTION =
  'Tell Koppie Systems about your website, ecommerce or business-system project. Receive a clear, itemised proposal with scope, pricing and next steps.';

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: PATH });

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string;
    type?: string;
    service_interest?: string;
    budget_band?: string;
    message?: string;
    source?: string;
    scenario?: string;
    complexity?: string;
    approval?: string;
    problem?: string;
    step?: string | string[];
    products?: string;
    payments?: string;
    delivery?: string;
    model?: string;
  }>;
}) {
  const {
    error,
    type,
    service_interest,
    budget_band,
    message,
    source,
    scenario,
    complexity,
    approval,
    problem,
    step,
    products,
    payments,
    delivery,
    model,
  } = await searchParams;

  const engineMessage = buildIndustrialEngineMessage({ source, scenario, complexity, approval });

  const steps = step === undefined ? [] : Array.isArray(step) ? step : [step];
  const readinessBits = [
    products && `Products: ${products}`,
    payments && `Payments: ${payments}`,
    delivery && `Delivery: ${delivery}`,
    model && `Model: ${model}`,
  ].filter(Boolean);

  const workflowPreface =
    steps.length > 0
      ? `Workflow map (selected steps): ${steps.join(' → ')}.`
      : readinessBits.length > 0
        ? `Ecommerce readiness check — ${readinessBits.join('; ')}.`
        : problem
          ? `System-map problem: ${problem.replace(/-/g, ' ')}.`
          : '';

  const defaultMessage = [workflowPreface, message ?? engineMessage].filter(Boolean).join('\n\n') || undefined;

  const typeToInterest: Record<string, string> = {
    'custom-system': 'custom-web-applications',
    'lead-generation': 'lead-generation-websites',
    'seo-website': 'seo-website-development',
    ecommerce: 'ecommerce-websites',
    'custom-seo-audit': 'seo-audit-advanced',
    'analytics-setup': 'analytics-and-conversion-tracking',
  };
  const serviceAliases: Record<string, string> = {
    'business-websites': 'seo-website-development',
    'rfq-and-quotation-systems': 'admin-panel-development',
    'seo-website-development': 'seo-website-development',
  };
  const rawInterest =
    service_interest ?? (type ? typeToInterest[type] : undefined) ?? undefined;
  const resolvedInterest = rawInterest
    ? (serviceAliases[rawInterest] ?? rawInterest)
    : undefined;

  return (
    <>
      <Breadcrumbs path={PATH} />
      <PageHero
        variant="editorial"
        motif
        eyebrow="Proposal"
        title="Request a website proposal"
        description="Tell us what you need — rough details are completely fine. We will respond within one business day with any initial questions or a link to arrange a short scoping call. Once the requirements are clear, we will send an itemised proposal with the recommended scope, price and next steps."
        aside={
          <div className="rounded-card border border-line bg-surface p-5 shadow-card">
            <p className="text-label text-cta">Response</p>
            <p className="mt-2 text-sm text-muted">{brand.hours}</p>
          </div>
        }
      />

      <InkBand motif>
        <p className="max-w-2xl text-lg leading-relaxed text-sandstone">
          No-obligation proposal. Direct communication with the person scoping the work. Your
          information is used only to handle your enquiry.
        </p>
      </InkBand>

      {error && (
        <Container className="pb-2">
          <p
            role="alert"
            className="max-w-2xl rounded-card border border-error/40 bg-notice p-4 text-ink"
          >
            {error === 'delivery'
              ? 'We could not send your enquiry right now. Please try again shortly, or call or WhatsApp us using the details on this site.'
              : 'We could not complete that submission. Please check the required fields (name, email, service, project description and consent) and try again. If the problem continues, call or WhatsApp us.'}
          </p>
        </Container>
      )}

      <section className="proposal-form-section border-b border-line bg-surface pb-14 pt-6 md:pb-16 md:pt-8 lg:pb-20 lg:pt-12">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <div className="rounded-card border border-line bg-surface p-5 sm:p-8">
                <QuoteForm
                  defaults={{
                    serviceInterest: resolvedInterest,
                    budgetBand: budget_band,
                    message: defaultMessage,
                  }}
                />
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-6">
              <ProposalExpectations variant="quote" />
              <div className="proposal-aside proposal-aside-sticky rounded-card border border-line bg-canvas p-6 lg:p-8">
                <div className="proposal-aside-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="relative">
                  <p className="text-label text-cta">Process</p>
                  <h2 className="text-subsection-title mt-3 text-ink">What happens next</h2>
                  <ol className="mt-6 space-y-4">
                    {[
                      'We review your requirements.',
                      'We reply within one business day.',
                      'We clarify the scope where necessary.',
                      'You receive an itemised proposal.',
                    ].map((stepLabel, i) => (
                      <li key={stepLabel} className="flex gap-3 text-sm leading-relaxed text-ink">
                        <span
                          className="w-6 shrink-0 font-mono text-xs tabular-nums text-cta"
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{stepLabel}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-7 border-t border-line pt-6">
                    <ul className="space-y-3 text-sm text-muted">
                      <li>No-obligation proposal.</li>
                      <li>Direct communication with the person scoping the work.</li>
                      <li>
                        {brand.baseCity}-based, serving {brand.country} nationwide.
                      </li>
                      <li>Your information is used only to handle your enquiry.</li>
                    </ul>

                    <p className="mt-5 text-sm">
                      Prefer to browse first? See{' '}
                      <Link href="/pricing/" className="text-link underline">
                        pricing
                      </Link>{' '}
                      or{' '}
                      <Link href="/services/" className="text-link underline">
                        services
                      </Link>
                      .
                    </p>

                    {(brand.contact.phone || brand.contact.whatsapp) && (
                      <p className="mt-4 text-sm text-muted">
                        Alternative contact:{' '}
                        {brand.contact.phone && (
                          <a href={`tel:${brand.contact.phone}`} className="text-link underline">
                            {formatPhoneDisplay(brand.contact.phone)}
                          </a>
                        )}
                        {brand.contact.phone && brand.contact.whatsapp && ' · '}
                        {brand.contact.whatsapp && (
                          <a
                            href={`https://wa.me/${brand.contact.whatsapp}`}
                            className="text-link underline"
                          >
                            WhatsApp
                          </a>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <JsonLd
        data={webPageSchema({
          path: PATH,
          title: TITLE,
          description: DESCRIPTION,
          pageType: 'ContactPage',
        })}
      />
    </>
  );
}
