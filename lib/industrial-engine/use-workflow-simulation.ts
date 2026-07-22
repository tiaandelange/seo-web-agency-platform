'use client';

import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { WORKFLOW_STAGES } from './constants';
import { deriveCommercial } from './calculations';
import { auditEventsForRun } from './audit';
import { createInitialState, engineReducer } from './reducer';
import type { EngineInputs, WorkflowNodeId } from './types';

export function useWorkflowSimulation() {
  const [state, dispatch] = useReducer(engineReducer, undefined, createInitialState);
  const cancelRef = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const commercial = useMemo(
    () => deriveCommercial(state.inputs, state.runId || 1),
    [state.inputs, state.runId],
  );

  const clearTimers = useCallback(() => {
    for (const timer of timersRef.current) {
      clearTimeout(timer);
    }
    timersRef.current = [];
  }, []);

  const cancelRun = useCallback(() => {
    cancelRef.current = true;
    clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    return () => {
      cancelRun();
    };
  }, [cancelRun]);

  const runWorkflow = useCallback(() => {
    if (state.status === 'running') return;

    cancelRun();
    cancelRef.current = false;
    dispatch({ type: 'START_RUN' });

    const inputsSnapshot = state.inputs;
    const runId = state.runId + 1;
    const commercialSnapshot = deriveCommercial(inputsSnapshot, runId);
    const events = auditEventsForRun(inputsSnapshot, commercialSnapshot);

    let cumulativeMs = 0;

    for (let i = 0; i < WORKFLOW_STAGES.length; i++) {
      const stage = WORKFLOW_STAGES[i];
      const event = events[i];

      const activateTimer = setTimeout(() => {
        if (cancelRef.current) return;
        dispatch({ type: 'ACTIVATE_NODE', nodeId: stage.id });
      }, cumulativeMs);
      timersRef.current.push(activateTimer);

      cumulativeMs += stage.duration;

      const completeTimer = setTimeout(() => {
        if (cancelRef.current) return;
        dispatch({ type: 'COMPLETE_NODE', nodeId: stage.id, event });
        if (i === WORKFLOW_STAGES.length - 1) {
          dispatch({ type: 'COMPLETE_RUN' });
        }
      }, cumulativeMs);
      timersRef.current.push(completeTimer);
    }
  }, [cancelRun, state.inputs, state.runId, state.status]);

  const reset = useCallback(() => {
    cancelRun();
    dispatch({ type: 'RESET' });
  }, [cancelRun]);

  const setInput = useCallback(<K extends keyof EngineInputs>(field: K, value: EngineInputs[K]) => {
    dispatch({ type: 'SET_INPUT', field, value });
  }, []);

  const selectNode = useCallback((nodeId: WorkflowNodeId) => {
    dispatch({ type: 'SELECT_NODE', nodeId });
  }, []);

  const applyPreset = useCallback((presetId: EngineInputs['scenarioId']) => {
    dispatch({ type: 'APPLY_PRESET', presetId });
  }, []);

  return {
    state,
    commercial,
    runWorkflow,
    reset,
    setInput,
    selectNode,
    applyPreset,
  };
}
