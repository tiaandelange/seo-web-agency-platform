'use client';

/**
 * Client component justification: live recommendation preview from three inputs
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
  const [websiteStatus, setWebsiteStatus] = useState('outdated');

  const recommendation = useMemo(
    () =>
      buildEnquiryRecommendation({
        businessType,
        primaryNeed,
        websiteStatus,
      }),
    [businessType, primaryNeed, websiteStatus],
  );

  const quoteHref = enquiryQuoteHref(recommendation);

  return (
    <section
      id="enquiry-system"
      className="home-enquiry relative z-10"
      aria-labelledby="enquiry-system-heading"
    >
      <div className="home-container">
        <div className="home-system-canvas home-enquiry-panel">
          <div className="home-enquiry-workflow band-ink">
            <div className="home-enquiry-panel-grid" aria-hidden="true" />
            <div className="home-enquiry-panel-inner">
              <p className="home-eyebrow home-enquiry-eyebrow">Enquiry system preview</p>
              <h2 id="enquiry-system-heading" className="home-enquiry-workflow-title">
                How traffic becomes a qualified commercial enquiry
              </h2>
              <ol className="home-enquiry-flow">
                {FLOW.map((node, i) => (
                  <li key={node.label} className="home-enquiry-flow-item">
                    <div className="home-enquiry-flow-marker" aria-hidden="true">
                      <span className="home-enquiry-flow-number">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {i < FLOW.length - 1 && <span className="home-enquiry-flow-connector" />}
                    </div>
                    <div className="home-enquiry-flow-content">
                      <p className="home-enquiry-flow-label">{node.label}</p>
                      <p className="home-enquiry-flow-detail">{node.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="home-enquiry-form">
            <div className="home-enquiry-panel-inner">
              <span className="home-enquiry-form-rule" aria-hidden="true" />
              <p className="home-heading-functional home-enquiry-form-title text-ink">
                See the system your business actually needs
              </p>
              <p className="home-enquiry-form-lead">
                Select your context — we suggest a system shape and an indicative project range.
                Your answers carry through to the proposal form.
              </p>

              <div className="home-enquiry-fields">
                <label className="home-enquiry-field">
                  <span className="home-enquiry-label">Business type</span>
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
                <label className="home-enquiry-field">
                  <span className="home-enquiry-label">Primary need</span>
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
                    <option value="seo-audit">SEO audit</option>
                  </select>
                </label>
                <div className="home-enquiry-field">
                  <span className="home-enquiry-label" id="enquiry-project-value-label">
                    Typical project cost
                  </span>
                  <p
                    className="home-enquiry-value"
                    aria-labelledby="enquiry-project-value-label"
                    aria-live="polite"
                  >
                    {recommendation.projectValueLabel}
                  </p>
                </div>
                <label className="home-enquiry-field">
                  <span className="home-enquiry-label">Current website</span>
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

              <div className="home-enquiry-result">
                <p className="home-enquiry-result-label">Recommended system</p>
                <p className="home-enquiry-result-title">{recommendation.headline}</p>
                <ul className="home-enquiry-result-list">
                  {recommendation.items.map((item) => (
                    <li key={item}>
                      <span className="home-enquiry-result-mark" aria-hidden="true">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="home-enquiry-actions">
                <Link href={quoteHref} className="home-enquiry-cta-primary">
                  Request this system
                </Link>
                <Link href="/process/" className="home-enquiry-cta-secondary">
                  How we deliver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
