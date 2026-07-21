import type { Testimonial } from '@/types/content';

/**
 * Testimonials — EMPTY by design until genuine, permissioned quotes exist
 * (blueprint rule 12; owner input #8). Components render nothing while empty
 * and only ever render entries with permissionConfirmed: true.
 */
export const testimonials: Testimonial[] = [];

export function getPublishableTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.permissionConfirmed);
}
