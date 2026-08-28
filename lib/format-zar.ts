/**
 * Visible ZAR copy — Option A: R4 500, R4 500–R8 500.
 * Non-breaking thin spaces between digit groups; no space after R.
 * JSON-LD and form logic use raw numbers — never pass formatted strings to schema.
 */
const GROUP = '\u202f';

function groupDigits(amount: number): string {
  return Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, GROUP);
}

/** Single amount, e.g. R4 500 */
export function formatZar(amount: number): string {
  return `R${groupDigits(amount)}`;
}

/** Closed range with en dash, e.g. R4 500–R8 500 */
export function formatZarRange(min: number, max: number): string {
  return `${formatZar(min)}–${formatZar(max)}`;
}

/** Indicative package range, e.g. R4 500–R8 500 (indicative) */
export function formatZarIndicativeRange(min: number, max: number): string {
  return `${formatZarRange(min, max)} (indicative)`;
}

/** Monthly suffix, e.g. R3 950/mo */
export function formatZarMonthly(amount: number): string {
  return `${formatZar(amount)}/mo`;
}

/** Once-off suffix, e.g. R2 950 once-off */
export function formatZarOnceOff(amount: number): string {
  return `${formatZar(amount)} once-off`;
}

/** Under-band label for proposal forms, e.g. Under R5 000 */
export function formatZarUnder(amount: number): string {
  return `Under ${formatZar(amount)}`;
}

/** Open upper band, e.g. R75 000+ */
export function formatZarPlus(amount: number): string {
  return `${formatZar(amount)}+`;
}
