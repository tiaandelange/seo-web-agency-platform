/**
 * Shared form-action result types — not a "use server" module.
 * Initial idle states live here because Next forbids exporting non-async
 * values from files marked with "use server".
 */

import type { AuditRoute, LeadFormId } from '@/lib/analytics-types';

export type LeadActionState =
  | { status: 'idle' }
  | { status: 'error'; error: 'validation' | 'delivery' }
  | {
      status: 'success';
      track: boolean;
      formId: LeadFormId;
      redirectTo: string;
    };

export const initialLeadActionState: LeadActionState = { status: 'idle' };

export type EligibilityActionState =
  | { status: 'idle' }
  | { status: 'error' }
  | {
      status: 'success';
      track: boolean;
      auditRoute: AuditRoute;
      redirectTo: string;
    };

export const initialEligibilityActionState: EligibilityActionState = { status: 'idle' };

export type SeoAuditIntakeActionState =
  | { status: 'idle' }
  | { status: 'error'; error: 'validation' | 'delivery' | 'inactive' }
  | {
      status: 'success';
      track: boolean;
      formId: LeadFormId;
      redirectTo: string;
    };

export const initialSeoAuditIntakeActionState: SeoAuditIntakeActionState = { status: 'idle' };
