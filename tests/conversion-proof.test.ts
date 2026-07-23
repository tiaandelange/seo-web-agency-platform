import { describe, expect, it } from 'vitest';
import { SERVICE_PROOF_MAP, getServiceProof } from '@/data/service-proof-map';
import { COMMERCE_MODELS } from '@/data/commerce-models';
import { WORKFLOW_DEMOS } from '@/data/workflow-demos';
import { PACKAGE_CLARITY } from '@/data/package-clarity';
import { packages } from '@/data/packages';
import { services } from '@/data/services';
import { getProject } from '@/data/projects';

describe('conversion proof mapping', () => {
  it('maps every live service exactly once', () => {
    const live = services.filter((s) => s.status === 'live').map((s) => s.slug);
    expect(SERVICE_PROOF_MAP.map((e) => e.serviceSlug).sort()).toEqual([...live].sort());
  });

  it('never references missing projects', () => {
    for (const entry of SERVICE_PROOF_MAP) {
      for (const item of entry.items) {
        if (item.kind === 'project') {
          expect(getProject(item.slug), item.slug).toBeTruthy();
        }
      }
    }
  });

  it('labels demo proof as illustrative in the map copy', () => {
    const demos = SERVICE_PROOF_MAP.flatMap((e) => e.items).filter((i) => i.kind === 'demo');
    expect(demos.length).toBeGreaterThan(0);
    for (const demo of demos) {
      if (demo.kind === 'demo') {
        expect(demo.label.toLowerCase()).toContain('illustrative');
      }
    }
  });

  it('keeps RFQ and portal workflows server-data complete', () => {
    expect(WORKFLOW_DEMOS['rfq-quotation'].steps.length).toBeGreaterThanOrEqual(6);
    expect(WORKFLOW_DEMOS['portal-admin'].steps.length).toBeGreaterThanOrEqual(6);
    expect(getServiceProof('rfq-and-quotation-systems')?.workflowId).toBe('rfq-quotation');
    expect(getServiceProof('customer-and-supplier-portals')?.workflowId).toBe('portal-admin');
  });

  it('defines five commerce models with scope labels', () => {
    expect(COMMERCE_MODELS).toHaveLength(5);
    for (const model of COMMERCE_MODELS) {
      expect(model.checkout.length).toBeGreaterThan(0);
      expect(['Standard', 'Custom', 'Hybrid']).toContain(model.scope);
    }
  });

  it('provides package clarity for every package slug', () => {
    for (const pkg of packages) {
      expect(PACKAGE_CLARITY[pkg.slug], pkg.slug).toBeTruthy();
    }
  });
});
