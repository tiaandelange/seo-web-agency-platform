import Link from 'next/link';

export type HomeActionLedgerTone = 'sandstone' | 'ink';

export type HomeActionLedgerProps = {
  id?: string;
  tone: HomeActionLedgerTone;
  /** Optional — closing band only; rendered as H2 when set. */
  title?: string;
  copy: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref: string;
  secondaryLabel: string;
  secondaryExternal?: boolean;
};

/**
 * Narrow homepage conversion band — subordinate to the hero primary.
 * Sandstone or ink treatment; copper primary + teal/outlined secondary only.
 */
export function HomeActionLedger({
  id,
  tone,
  title,
  copy,
  primaryHref = '/request-a-quote/',
  primaryLabel = 'Request a proposal',
  secondaryHref,
  secondaryLabel,
  secondaryExternal = false,
}: HomeActionLedgerProps) {
  const isInk = tone === 'ink';
  const titleClass = isInk ? 'text-accent-contrast' : 'text-ink';
  const copyClass = isInk ? 'text-sandstone' : 'text-muted';

  const secondaryClass = isInk
    ? 'home-action-ledger__secondary home-action-ledger__secondary--ink'
    : 'home-action-ledger__secondary home-action-ledger__secondary--light';

  const secondaryInner = (
    <>
      {secondaryLabel}
      <span aria-hidden="true"> →</span>
    </>
  );

  return (
    <aside
      id={id}
      aria-label={title ?? 'Next step'}
      className={`home-action-ledger home-action-ledger--${tone}`}
    >
      <div className="home-container home-action-ledger__shell">
        <div className="home-action-ledger__inner">
          {title && (
            <h2 className={`home-action-ledger__title ${titleClass}`.trim()}>{title}</h2>
          )}
          <p className={`home-action-ledger__copy ${copyClass}`.trim()}>{copy}</p>
          <div className="home-action-ledger__actions">
            <Link href={primaryHref} className="home-action-ledger__primary">
              {primaryLabel}
            </Link>
            {secondaryExternal ? (
              <a
                href={secondaryHref}
                className={secondaryClass}
                rel="noopener noreferrer"
                target="_blank"
              >
                {secondaryInner}
              </a>
            ) : (
              <Link href={secondaryHref} className={secondaryClass}>
                {secondaryInner}
              </Link>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
