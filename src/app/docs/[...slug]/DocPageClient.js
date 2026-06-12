'use client';

import Breadcrumb from '@/components/Breadcrumb';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import PageNavigation from '@/components/PageNavigation';

export default function DocPageClient({ slug, content }) {
  return (
    <article className="fade-in-up">
      <Breadcrumb slug={slug} />
      <MarkdownRenderer content={content} />
      <PageNavigation currentSlug={slug} />
    </article>
  );
}
