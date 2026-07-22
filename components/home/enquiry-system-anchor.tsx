'use client';

/**
 * Client component justification: live recommendation preview from four inputs
 * without a full page reload; CTA deep-links to quote form with context prefilled.
 * ~3 KB gzipped — within homepage JS budget.
 */
import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  buildEnquiryRecommendation,
  enquiryQuoteHref,
} from '@/lib/home-enquiry-recommendations';

const FLOW = [
  { label: 'Google search', detail: '“industrial tank repair Pretoria”' },
  { label: 'Service landing page', detail: 'Intent-matched page' },
  { label: 'Qualification form', detail: 'Scope & contact capture' },
  { label: 'RFQ enters admin', detail: 'Status: New RFQ' },
  { label: 'Quote prepared', detail: 'PDF + follow-up' },
];

export function EnquirySystemAnchor() {
  const [businessType, setBusinessType] = useState('contractor');
  const [primaryNeed, setPrimaryNeed] = useState('lead-gen');
  const [projectValue, setProjectValue] = useState('30-60k');
  const [websiteStatus, setWebsiteStatus] = useState('outdated');

  const recommendation = useMemo(
    () =>
      buildEnquiryRecommendation({
        businessType,
        primaryNeed,
        projectValue,
        websiteStatus,
      }),
    [businessType, primaryNeed, projectValue, websiteStatus],
  );

  const quoteHref = enquiryQuoteHref(recommendation);

  return (
    <section
      id="enquiry-system"
      className="relative z-10 -mt-20 md:-mt-28"
      aria-labelledby="enquiry-system-heading"
    >
      <div className="home-container">
        <div className="home-system-canvas grid gap-0 overflow-hidden border border-line lg:grid-cols-2">
          <div className="band-ink relative p-6 md:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 technical-grid opacity-30" aria-hidden="true" />
            <p className="home-eyebrow relative text-sandstone">Enquiry system preview</p>
            <h2 id="enquiry-system-heading" className="relative mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              How traffic becomes a qualified commercial enquiry
            </h2>
            <ol className="relative mt-8 space-y-0">
              {FLOW.map((node, i) => (
                <li key={node.label} className="home-flow-node flex gap-4 pb-6 last:pb-0">
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-xs text-cta">{String(i + 1).padStart(2, '0')}</span>
                    {i < FLOW.length - 1 && (
                      <span className="home-flow-line mt-1 flex-1" aria-hidden="true" />
                    )}
                  </div>
                  <div className="pb-1">
                    <p className="font-medium text-accent-contrast">{node.label}</p>
                    <p className="mt-0.5 font-mono text-xs text-sandstone/90">{node.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-canvas p-6 md:p-8 lg:p-10">
            <p className="home-heading-functional text-ink">See the system your business actually needs</p>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
              Select your context — we suggest a system shape, not a public price. Your answers
              carry through to the proposal form.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink">Business type</span>
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="home-select"
                >
                  <option value="contractor">Contractor / trade</option>
                  <option value="manufacturer">Manufacturer / supplier</option>
                  <option value="professional">Professional practice</option>
                  <option value="other">Other B2B service</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink">Primary need</span>
                <select
                  value={primaryNeed}
                  onChange={(e) => setPrimaryNeed(e.target.value)}
                  className="home-select"
                >
                  <option value="lead-gen">Lead-generation website</option>
                  <option value="catalogue">Product catalogue / RFQ</option>
                  <option value="ecommerce">Ecommerce</option>
                  <option value="portal">Portal / quotation system</option>
                  <option value="systems">Custom workflow</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink">Typical project value</span>
                <select
                  value={projectValue}
                  onChange={(e) => setProjectValue(e.target.value)}
                  className="home-select"
                >
                  <option value="under-30k">Under R30,000</option>
                  <option value="30-60k">R30,000 – R60,000</option>
                  <option value="60-120k">R60,000 – R120,000</option>
                  <option value="over-120k">Over R120,000</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-ink">Current website</span>
                <select
                  value={websiteStatus}
                  onChange={(e) => setWebsiteStatus(e.target.value)}
                  className="home-select"
                >
                  <option value="none">No site yet</option>
                  <option value="diy">DIY / template site</option>
                  <option value="outdated">Established but underperforming</option>
                  <option value="redesign">Ready for redesign</option>
                </select>
              </label>
            </div>

            <div className="mt-8 border border-line bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-widest text-cta">Recommended system</p>
              <p className="mt-2 text-lg font-semibold text-ink">{recommendation.headline}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {recommendation.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-cta" aria-hidden="true">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={quoteHref}
                className="rounded-sm bg-cta px-5 py-3 text-sm font-semibold text-cta-contrast hover:opacity-90"
              >
                Request this system
              </Link>
              <Link
                href="/process/"
                className="rounded-sm border border-line px-5 py-3 text-sm font-semibold text-ink hover:bg-surface"
              >
                How we deliver
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
