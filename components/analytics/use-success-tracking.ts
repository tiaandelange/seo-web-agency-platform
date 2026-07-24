'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { trackAnalyticsEvent, type AuditRoute, type LeadFormId } from '@/lib/analytics';

type LeadSuccessState = {
  status: 'success';
  track: boolean;
  formId: LeadFormId;
  redirectTo: string;
};

type EligibilitySuccessState = {
  status: 'success';
  track: boolean;
  auditRoute: AuditRoute;
  redirectTo: string;
};

/**
 * Fires generate_lead once on confirmed success, then navigates.
 */
export function useLeadSuccessTracking(state: { status: string } | LeadSuccessState) {
  const router = useRouter();
  const fired = useRef(false);

  useEffect(() => {
    if (state.status !== 'success' || fired.current) return;
    const success = state as LeadSuccessState;
    fired.current = true;
    if (success.track) {
      trackAnalyticsEvent('generate_lead', { form_id: success.formId });
    }
    router.replace(success.redirectTo);
  }, [state, router]);
}

/**
 * Fires seo_audit_eligibility_complete once (when track is true), then navigates.
 */
export function useEligibilitySuccessTracking(
  state: { status: string } | EligibilitySuccessState,
) {
  const router = useRouter();
  const fired = useRef(false);

  useEffect(() => {
    if (state.status !== 'success' || fired.current) return;
    const success = state as EligibilitySuccessState;
    fired.current = true;
    if (success.track) {
      trackAnalyticsEvent('seo_audit_eligibility_complete', {
        audit_route: success.auditRoute,
      });
    }
    router.replace(success.redirectTo);
  }, [state, router]);
}
