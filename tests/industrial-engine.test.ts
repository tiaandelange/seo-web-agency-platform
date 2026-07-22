import { describe, expect, it } from 'vitest';
import {
  deriveCommercial,
  deriveApprovalTier,
  formatQuoteReference,
  clamp,
  riskClassification,
} from '@/lib/industrial-engine/calculations';
import { defaultInputs, inputsFromPreset, SCENARIO_PRESETS } from '@/lib/industrial-engine/presets';
import { engineReducer, createInitialState } from '@/lib/industrial-engine/reducer';
import { industrialEngineQuoteHref } from '@/lib/industrial-engine/audit';
import { CREW_DAY_RATE, TRAVEL_RATE_PER_KM } from '@/lib/industrial-engine/constants';

describe('industrial engine calculations', () => {
  it('derives effective quantity with waste allowance', () => {
    const inputs = defaultInputs();
    const result = deriveCommercial(inputs, 1);
    expect(result.effectiveQuantity).toBeCloseTo(1850 * 1.07, 5);
  });

  it('calculates material cost from effective quantity and rate', () => {
    const inputs = defaultInputs();
    const result = deriveCommercial(inputs, 1);
    expect(result.materialCost).toBeCloseTo(result.effectiveQuantity * 82, 2);
  });

  it('calculates labour days and labour cost', () => {
    const inputs = defaultInputs();
    const result = deriveCommercial(inputs, 1);
    expect(result.labourDays).toBe(9);
    expect(result.labourCost).toBe(9 * 4 * CREW_DAY_RATE);
  });

  it('calculates travel cost with round trip rate', () => {
    const inputs = { ...defaultInputs(), distanceKm: 100, requiresSiteInspection: false };
    const result = deriveCommercial(inputs, 1);
    expect(result.travelCost).toBe(100 * 2 * TRAVEL_RATE_PER_KM);
  });

  it('adds site inspection fee when required', () => {
    const inputs = { ...defaultInputs(), distanceKm: 0, requiresSiteInspection: true };
    const result = deriveCommercial(inputs, 1);
    expect(result.travelCost).toBe(4500);
  });

  it('clamps risk score between 0 and 100', () => {
    const low = deriveCommercial(
      { ...defaultInputs(), distanceKm: 0, complexity: 'routine', urgency: 'standard', supportingFiles: 5 },
      1,
    );
    const high = deriveCommercial(
      {
        ...defaultInputs(),
        distanceKm: 800,
        complexity: 'complex',
        urgency: 'shutdown',
        supportingFiles: 0,
      },
      1,
    );
    expect(low.riskScore).toBeGreaterThanOrEqual(0);
    expect(low.riskScore).toBeLessThanOrEqual(100);
    expect(high.riskScore).toBe(100);
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it('classifies risk bands', () => {
    expect(riskClassification(25)).toBe('Low');
    expect(riskClassification(55)).toBe('Moderate');
    expect(riskClassification(80)).toBe('Elevated');
  });

  it('selects director approval for default liner scenario totals', () => {
    const result = deriveCommercial(defaultInputs(), 1);
    expect(result.approvalTier).toBe('Director approval');
    expect(result.approvalSlug).toBe('director');
  });

  it('routes low-value low-risk to automated review', () => {
    const tier = deriveApprovalTier(30_000, 25);
    expect(tier.tier).toBe('Automated commercial review');
    expect(tier.slug).toBe('automated');
  });

  it('routes mid-value to manager approval', () => {
    const tier = deriveApprovalTier(120_000, 50);
    expect(tier.tier).toBe('Manager approval');
    expect(tier.slug).toBe('manager');
  });

  it('reduces validation score when files missing', () => {
    const result = deriveCommercial({ ...defaultInputs(), supportingFiles: 0 }, 1);
    expect(result.validationScore).toBe(88);
  });

  it('increments quote reference by run id', () => {
    expect(formatQuoteReference(2)).toBe('KOP-DEMO-2026-0002');
  });
});

describe('industrial engine presets', () => {
  it('applies fabrication preset quantities', () => {
    const partial = inputsFromPreset('fabrication-rfq');
    expect(partial.quantity).toBe(SCENARIO_PRESETS['fabrication-rfq'].defaultQuantity);
    expect(partial.scenarioId).toBe('fabrication-rfq');
  });
});

describe('industrial engine reducer', () => {
  it('marks state dirty when inputs change after complete', () => {
    let state = createInitialState();
    state = engineReducer(state, { type: 'START_RUN' });
    state = engineReducer(state, { type: 'COMPLETE_RUN' });
    expect(state.status).toBe('complete');

    state = engineReducer(state, { type: 'SET_INPUT', field: 'quantity', value: 2000 });
    expect(state.status).toBe('dirty');
  });

  it('queues nodes on start run', () => {
    let state = createInitialState();
    state = engineReducer(state, { type: 'START_RUN' });
    expect(state.status).toBe('running');
    expect(state.nodeStatuses.capture).toBe('queued');
  });

  it('resets to initial state', () => {
    let state = createInitialState();
    state = engineReducer(state, { type: 'START_RUN' });
    state = engineReducer(state, { type: 'RESET' });
    expect(state.status).toBe('idle');
    expect(state.runId).toBe(0);
  });
});

describe('industrial engine quote href', () => {
  it('builds prefill URL without monetary values', () => {
    const href = industrialEngineQuoteHref(defaultInputs(), 'manager');
    expect(href).toContain('/request-a-quote/');
    expect(href).toContain('service_interest=custom-web-applications');
    expect(href).toContain('source=industrial-engine');
    expect(href).not.toMatch(/R\d/);
  });
});
