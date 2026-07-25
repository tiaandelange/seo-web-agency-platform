/**
 * Fixed control — scrolls to #hero (homepage / page hero) via anchor.
 * Server component: plain anchor, no client JS.
 */
export function BackToTop() {
  return (
    <a href="#hero" className="back-to-top" aria-label="Back to top">
      <svg className="back-to-top-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
