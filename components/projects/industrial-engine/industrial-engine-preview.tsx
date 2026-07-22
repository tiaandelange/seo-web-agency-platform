'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { Container } from '@/components/layout/container';
import { useWorkflowSimulation } from '@/lib/industrial-engine/use-workflow-simulation';
import { SCENARIO_PRESETS } from '@/lib/industrial-engine/presets';
import { formatElapsed } from '@/lib/industrial-engine/calculations';
import { industrialEngineQuoteHref } from '@/lib/industrial-engine/audit';
import { buildInspector } from '@/lib/industrial-engine/inspector';
import { usePrefersReducedMotion } from '@/lib/hooks/use-prefers-reduced-motion';
import { EngineHeader } from './engine-header';
import { EngineControls } from './engine-controls';
import { WorkflowCanvas } from './workflow-canvas';
import { NodeInspector } from './node-inspector';
import { QuoteOutput } from './quote-output';
import { EngineTelemetry } from './engine-telemetry';
import { AuditLog } from './audit-log';

export function IndustrialEnginePreview() {
  const logRef = useRef<HTMLDivElement>(null);
  const userScrolledLog = useRef(false);
  const reducedMotion = usePrefersReducedMotion();
  const { state, commercial, runWorkflow, reset, setInput, selectNode, applyPreset } =
    useWorkflowSimulation();

  const preset = SCENARIO_PRESETS[state.inputs.scenarioId];
  const quoteHref = industrialEngineQuoteHref(state.inputs, commercial.approvalSlug);
  const presets = useMemo(() => Object.values(SCENARIO_PRESETS), []);

  const engineStatusLabel =
    state.status === 'running'
      ? 'PROCESSING'
      : state.status === 'complete'
        ? 'COMPLETE'
        : state.status === 'dirty'
          ? 'CONFIG CHANGED'
          : 'READY';

  const runLabel =
    state.status === 'dirty'
      ? 'Configuration changed · Run workflow again'
      : state.status === 'running'
        ? 'Running workflow…'
        : 'Run workflow';

  const stageAnnouncement =
    state.activeNodeId != null
      ? `Processing ${state.activeNodeId} stage`
      : state.status === 'complete'
        ? 'Workflow complete'
        : 'Workflow ready';

  useEffect(() => {
    const log = logRef.current;
    if (!log || userScrolledLog.current) return;
    log.scrollTop = log.scrollHeight;
  }, [state.auditEvents.length]);

  const inspectorContent = useMemo(
    () => buildInspector(state.selectedNodeId, state.inputs, commercial, preset.unitLabel),
    [state.selectedNodeId, state.inputs, commercial, preset.unitLabel],
  );

  return (
    <section
      id="industrial-engine"
      className="band-ink engine-section border-y border-white/10 bg-[#0b1f28] text-white"
      aria-labelledby="engine-heading"
    >
      <Container width="wide" className="py-16 lg:py-20">
        <EngineHeader engineStatusLabel={engineStatusLabel} />

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {stageAnnouncement}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <WorkflowCanvas
              nodeStatuses={state.nodeStatuses}
              activeNodeId={state.activeNodeId}
              selectedNodeId={state.selectedNodeId}
              isRunning={state.status === 'running'}
              reducedMotion={reducedMotion}
              commercial={commercial}
              onSelectNode={selectNode}
            />
          </div>

          <div className="order-1 space-y-6 lg:order-2 lg:col-span-5">
            <EngineControls
              inputs={state.inputs}
              preset={preset}
              presets={presets}
              runLabel={runLabel}
              isRunning={state.status === 'running'}
              onSetInput={setInput}
              onApplyPreset={applyPreset}
              onRun={runWorkflow}
              onReset={reset}
            />
            <NodeInspector content={inspectorContent} />
            {state.status === 'complete' && (
              <QuoteOutput commercial={commercial} unitLabel={preset.unitLabel} />
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6">
          <EngineTelemetry
            engineStatus={engineStatusLabel}
            processingTime={
              state.status === 'complete' || state.status === 'running'
                ? formatElapsed(commercial.processingTimeMs)
                : '—'
            }
            approvalRoute={commercial.approvalTier}
            rfqCapacity={`${commercial.simulatedRfqCapacity} / hour (simulated)`}
          />

          <details className="lg:hidden">
            <summary className="min-h-11 cursor-pointer py-2 font-mono text-xs uppercase tracking-[0.12em] text-white/60">
              Audit log
            </summary>
            <AuditLog
              containerRef={logRef}
              events={state.auditEvents}
              onUserScroll={() => {
                userScrolledLog.current = true;
              }}
            />
          </details>

          <div className="hidden lg:block">
            <AuditLog
              containerRef={logRef}
              events={state.auditEvents}
              onUserScroll={() => {
                userScrolledLog.current = true;
              }}
            />
          </div>
        </div>

        {state.status === 'complete' && (
          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="max-w-2xl text-sm leading-relaxed text-white/75">
              This is a demonstration. Your actual system would be designed around your commercial
              rules, approvals and operational process.
            </p>
            <Link
              href={quoteHref}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-card bg-cta px-6 py-3 font-heading text-sm font-semibold text-cta-contrast transition-opacity hover:opacity-90"
            >
              Map my workflow
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
