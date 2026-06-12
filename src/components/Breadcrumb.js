'use client';

import Link from 'next/link';

export default function Breadcrumb({ slug }) {
  if (!slug) return null;

  const parts = slug.split('/');
  const crumbs = parts.map((part, index) => {
    const path = parts.slice(0, index + 1).join('/');
    const label = part
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
    const isLast = index === parts.length - 1;

    return { label, path, isLast };
  });

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link href="/docs" className="breadcrumb-item">
        Docs
      </Link>
      {crumbs.map((crumb, index) => (
        <span key={index} style={{ display: 'contents' }}>
          <span className="breadcrumb-separator" aria-hidden="true">›</span>
          {crumb.isLast ? (
            <span className="breadcrumb-current">{crumb.label}</span>
          ) : (
            <Link href={`/docs/${crumb.path}`} className="breadcrumb-item">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
