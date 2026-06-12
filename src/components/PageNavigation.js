'use client';

import Link from 'next/link';
import manifest from '@/data/content-manifest.json';

export default function PageNavigation({ currentSlug }) {
  const { pages } = manifest;
  const currentIndex = pages.findIndex(p => p.slug === currentSlug);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const next = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="page-nav" aria-label="Page navigation">
      {prev ? (
        <Link href={`/docs/${prev.slug}`} className="page-nav-link prev">
          <span className="page-nav-direction">← Previous</span>
          <span className="page-nav-title">{prev.name}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/docs/${next.slug}`} className="page-nav-link next">
          <span className="page-nav-direction">Next →</span>
          <span className="page-nav-title">{next.name}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
