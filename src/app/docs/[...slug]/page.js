import fs from 'fs';
import path from 'path';
import manifest from '@/data/content-manifest.json';
import DocPageClient from './DocPageClient';

function getAllPages(items) {
  const pages = [];
  for (const item of items) {
    if (item.type === 'page') {
      pages.push(item);
    } else if (item.children) {
      pages.push(...getAllPages(item.children));
    }
  }
  return pages;
}

export function generateStaticParams() {
  const pages = getAllPages(manifest.tree);
  return pages.map((page) => ({
    slug: page.slug.split('/'),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const slugStr = slug.join('/');
  const pages = getAllPages(manifest.tree);
  const page = pages.find(p => p.slug === slugStr);
  
  return {
    title: page ? `${page.name} — Learning Docs` : 'Learning Docs',
    description: `Documentation: ${page?.name || slugStr}`,
  };
}

export default async function DocPage({ params }) {
  const { slug } = await params;
  const slugStr = slug.join('/');
  const pages = getAllPages(manifest.tree);
  const pageInfo = pages.find(p => p.slug === slugStr);

  let content = '';
  if (pageInfo?.file) {
    const filePath = path.join(process.cwd(), 'content', pageInfo.file);
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch (e) {
      content = `# Page Not Found\n\nThe content for \`${slugStr}\` could not be loaded.`;
    }
  }

  return <DocPageClient slug={slugStr} content={content} />;
}
