import type { ScenarioPreset } from '@/lib/industrial-engine/presets';
import type { EngineInputs } from '@/lib/industrial-engine/types';

export function EngineControls({
  inputs,
  preset,
  runLabel,
  isRunning,
  onSetInput,
  onApplyPreset,
  onRun,
  onReset,
  presets,
}: {
  inputs: EngineInputs;
  preset: ScenarioPreset;
  runLabel: string;
  isRunning: boolean;
  onSetInput: <K extends keyof EngineInputs>(field: K, value: EngineInputs[K]) => void;
  onApplyPreset: (presetId: EngineInputs['scenarioId']) => void;
  onRun: () => void;
  onReset: () => void;
  presets: ScenarioPreset[];
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f2229] p-5">
      <fieldset>
        <legend className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
          Scenario preset
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onApplyPreset(p.id)}
              aria-pressed={inputs.scenarioId === p.id}
              className={`min-h-11 rounded border px-3 py-2 text-xs font-medium transition-colors ${
                inputs.scenarioId === p.id
                  ? 'border-cta bg-cta/20 text-white'
                  : 'border-white/15 text-white/70 hover:border-white/30'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 block" htmlFor="engine-quantity">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
          Quantity ({preset.unitLabel})
        </span>
        <div className="mt-2 flex gap-3">
          <input
            id="engine-quantity-range"
            type="range"
            min={preset.quantityMin}
            max={preset.quantityMax}
            value={inputs.quantity}
            onChange={(e) => onSetInput('quantity', Number(e.target.value))}
            className="min-h-11 flex-1 accent-cta"
            aria-describedby="engine-quantity"
          />
          <input
            id="engine-quantity"
            type="number"
            min={preset.quantityMin}
            max={preset.quantityMax}
            value={inputs.quantity}
            onChange={(e) => onSetInput('quantity', Number(e.target.value))}
            className="min-h-11 w-24 rounded border border-white/15 bg-white/5 px-2 py-1 text-sm text-white"
          />
        </div>
      </label>

      <label className="mt-4 block" htmlFor="engine-distance">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
          Travel distance (km)
        </span>
        <div className="mt-2 flex gap-3">
          <input
            id="engine-distance-range"
            type="range"
            min={0}
            max={800}
            value={inputs.distanceKm}
            onChange={(e) => onSetInput('distanceKm', Number(e.target.value))}
            className="min-h-11 flex-1 accent-cta"
            aria-describedby="engine-distance"
          />
          <input
            id="engine-distance"
            type="number"
            min={0}
            max={800}
            value={inputs.distanceKm}
            onChange={(e) => onSetInput('distanceKm', Number(e.target.value))}
            className="min-h-11 w-24 rounded border border-white/15 bg-white/5 px-2 py-1 text-sm text-white"
          />
        </div>
      </label>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label htmlFor="engine-urgency">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Urgency</span>
          <select
            id="engine-urgency"
            value={inputs.urgency}
            onChange={(e) => onSetInput('urgency', e.target.value as EngineInputs['urgency'])}
            className="mt-1 min-h-11 w-full rounded border border-white/15 bg-white/5 px-2 py-2 text-sm text-white"
          >
            <option value="standard">Standard</option>
            <option value="priority">Priority</option>
            <option value="shutdown">Shutdown-critical</option>
          </select>
        </label>
        <label htmlFor="engine-complexity">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Complexity</span>
          <select
            id="engine-complexity"
            value={inputs.complexity}
            onChange={(e) => onSetInput('complexity', e.target.value as EngineInputs['complexity'])}
            className="mt-1 min-h-11 w-full rounded border border-white/15 bg-white/5 px-2 py-2 text-sm text-white"
          >
            <option value="routine">Routine</option>
            <option value="moderate">Moderate</option>
            <option value="complex">Complex</option>
          </select>
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label htmlFor="engine-inspection">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Site inspection</span>
          <select
            id="engine-inspection"
            value={inputs.requiresSiteInspection ? 'yes' : 'no'}
            onChange={(e) => onSetInput('requiresSiteInspection', e.target.value === 'yes')}
            className="mt-1 min-h-11 w-full rounded border border-white/15 bg-white/5 px-2 py-2 text-sm text-white"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </label>
        <div>
          <label htmlFor="engine-files" className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">
            Supporting files
          </label>
          <div className="mt-2 flex gap-3">
            <input
              id="engine-files-range"
              type="range"
              min={0}
              max={10}
              value={inputs.supportingFiles}
              onChange={(e) => onSetInput('supportingFiles', Number(e.target.value))}
              className="min-h-11 flex-1 accent-cta"
              aria-describedby="engine-files"
            />
            <input
              id="engine-files"
              type="number"
              min={0}
              max={10}
              value={inputs.supportingFiles}
              onChange={(e) => onSetInput('supportingFiles', Number(e.target.value))}
              className="min-h-11 w-16 rounded border border-white/15 bg-white/5 px-2 py-1 text-sm text-white"
            />
          </div>
        </div>
      </div>

      <label className="mt-4 block" htmlFor="engine-rfq-volume">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Daily RFQ volume</span>
        <div className="mt-2 flex gap-3">
          <input
            id="engine-rfq-volume-range"
            type="range"
            min={1}
            max={50}
            value={inputs.dailyRfqVolume}
            onChange={(e) => onSetInput('dailyRfqVolume', Number(e.target.value))}
            className="min-h-11 flex-1 accent-cta"
            aria-describedby="engine-rfq-volume"
          />
          <input
            id="engine-rfq-volume"
            type="number"
            min={1}
            max={50}
            value={inputs.dailyRfqVolume}
            onChange={(e) => onSetInput('dailyRfqVolume', Number(e.target.value))}
            className="min-h-11 w-16 rounded border border-white/15 bg-white/5 px-2 py-1 text-sm text-white"
          />
        </div>
      </label>

      <p className="mt-4 text-xs text-white/45">
        All rates, quantities and outputs are simulated demonstration data — not live pricing.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRun}
          disabled={isRunning}
          className="min-h-11 flex-1 rounded-card bg-cta px-4 py-2 font-heading text-sm font-semibold text-cta-contrast disabled:opacity-50"
        >
          {runLabel}
        </button>
        <button
          type="button"
          onClick={onReset}
          className="min-h-11 rounded-card border border-white/20 px-4 py-2 text-sm font-medium text-white/80 hover:border-white/40"
        >
          Reset simulation
        </button>
      </div>
    </div>
  );
}
