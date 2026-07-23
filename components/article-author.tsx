import Link from 'next/link';
import type { Author } from '@/types/content';

/**
 * Visible article authorship — must match Article schema author Person.
 */
export function ArticleAuthor({
  author,
  datePublished,
  dateUpdated,
}: {
  author: Author;
  datePublished: string;
  dateUpdated: string;
}) {
  const published = new Date(datePublished).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const updated = new Date(dateUpdated).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const showUpdated = dateUpdated !== datePublished;

  return (
    <aside className="mt-6 max-w-3xl rounded-card border border-line bg-surface p-5">
      <p className="text-label text-muted">Written by</p>
      <p className="mt-1 text-lg font-semibold text-ink">
        <Link href="/about/" className="hover:underline">
          {author.name}
        </Link>
        <span className="font-normal text-muted"> — {author.role}</span>
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{author.shortBio}</p>
      <p className="mt-3 text-sm text-muted">
        Published {published}
        {showUpdated ? ` · Updated ${updated}` : null}
      </p>
    </aside>
  );
}
