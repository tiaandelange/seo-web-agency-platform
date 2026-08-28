import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { QuoteForm } from '@/components/quote-form';
import { JsonLd } from '@/components/json-ld';
import { buildIndustrialEngineMessage } from '@/lib/industrial-engine/quote-prefill';
import { webPageSchema } from '@/lib/schema';
import { Container } from '@/components/layout/container';
import {
  ProposalQuoteIntro,
  ProposalQuoteSupport,
} from '@/components/contact/proposal-quote-context';

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

  const fromConfigurator = Boolean(message?.includes('Enquiry via homepage system preview'));

  return (
    <>
      <Breadcrumbs path={PATH} />

      <section className="proposal-quote-page border-b border-line bg-surface">
        <Container className="py-8 md:py-10 lg:py-12">
          {error && (
            <p
              role="alert"
              className="proposal-quote-error mb-6 max-w-2xl rounded-card border border-error/40 bg-notice p-4 text-sm text-ink"
            >
              {error === 'delivery'
                ? 'We could not send your enquiry right now. Please try again shortly, or call or WhatsApp us using the details on this site.'
                : 'We could not complete that submission. Please check the required fields (name, email, service, project description and consent) and try again. If the problem continues, call or WhatsApp us.'}
            </p>
          )}

          <div className="proposal-quote-split">
            <ProposalQuoteIntro
              prefill={{
                serviceInterest: resolvedInterest,
                budgetBand: budget_band,
                fromConfigurator:
                  fromConfigurator && Boolean(resolvedInterest || budget_band || message),
              }}
            />

            <div className="proposal-quote-form">
              <div className="proposal-quote-form-shell rounded-card border border-line bg-canvas p-5 sm:p-7 lg:p-8">
                <QuoteForm
                  defaults={{
                    serviceInterest: resolvedInterest,
                    budgetBand: budget_band,
                    message: defaultMessage,
                  }}
                />
              </div>
            </div>

            <ProposalQuoteSupport />
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
