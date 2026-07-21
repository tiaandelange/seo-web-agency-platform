import Link from 'next/link';

/**
 * 404 — returns a real 404 status (no soft-404 redirects). Recovery links per
 * docs/architecture/PAGE-TEMPLATES.md spec 21.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Page not found</h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        The page you are looking for does not exist or has moved. If you followed a link here,
        it may be outdated — these are the quickest ways back to something useful:
      </p>
      <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-muted marker:text-accent">
        <li>
          <Link href="/services/" className="text-accent underline">
            Browse our web development services
          </Link>
        </li>
        <li>
          <Link href="/website-packages/" className="text-accent underline">
            See website packages and indicative pricing
          </Link>
        </li>
        <li>
          <Link href="/resources/" className="text-accent underline">
            Read our guides and resources
          </Link>
        </li>
        <li>
          <Link href="/contact/" className="text-accent underline">
            Contact us — we will point you in the right direction
          </Link>
        </li>
      </ul>
      <div className="mt-8">
        <Link
          href="/request-a-quote/"
          className="inline-block rounded-card bg-accent px-5 py-3 font-semibold text-accent-contrast hover:opacity-90"
        >
          Request a quote
        </Link>
      </div>
    </div>
  );
}
