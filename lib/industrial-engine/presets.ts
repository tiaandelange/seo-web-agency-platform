import type { EngineInputs, ScenarioId } from './types';

export type ScenarioPreset = {
  id: ScenarioId;
  label: string;
  unitLabel: string;
  quantityMin: number;
  quantityMax: number;
  defaultQuantity: number;
  materialRate: number;
  dailyCapacity: number;
  wastePercent: number;
  crewSize: number;
};

export const SCENARIO_PRESETS: Record<ScenarioId, ScenarioPreset> = {
  'liner-installation': {
    id: 'liner-installation',
    label: 'Liner installation',
    unitLabel: 'm²',
    quantityMin: 250,
    quantityMax: 5000,
    defaultQuantity: 1850,
    materialRate: 82,
    dailyCapacity: 220,
    wastePercent: 7,
    crewSize: 4,
  },
  'fabrication-rfq': {
    id: 'fabrication-rfq',
    label: 'Fabrication RFQ',
    unitLabel: 'units',
    quantityMin: 1,
    quantityMax: 40,
    defaultQuantity: 8,
    materialRate: 6800,
    dailyCapacity: 2,
    wastePercent: 5,
    crewSize: 3,
  },
  'field-service': {
    id: 'field-service',
    label: 'Field service',
    unitLabel: 'service visits',
    quantityMin: 1,
    quantityMax: 10,
    defaultQuantity: 1,
    materialRate: 8500,
    dailyCapacity: 1,
    wastePercent: 0,
    crewSize: 2,
  },
};

export function defaultInputs(): EngineInputs {
  const preset = SCENARIO_PRESETS['liner-installation'];
  return {
    scenarioId: preset.id,
    quantity: preset.defaultQuantity,
    distanceKm: 120,
    urgency: 'standard',
    complexity: 'moderate',
    requiresSiteInspection: false,
    supportingFiles: 3,
    dailyRfqVolume: 12,
  };
}

export function inputsFromPreset(presetId: ScenarioId): Partial<EngineInputs> {
  const preset = SCENARIO_PRESETS[presetId];
  return {
    scenarioId: presetId,
    quantity: preset.defaultQuantity,
  };
}

export function presetForInputs(inputs: EngineInputs): ScenarioPreset {
  return SCENARIO_PRESETS[inputs.scenarioId];
}
