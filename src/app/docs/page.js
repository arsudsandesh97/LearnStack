'use client';

import Link from 'next/link';
import manifest from '@/data/content-manifest.json';

function countPages(item) {
  if (item.type === 'page') return 1;
  if (item.children) {
    return item.children.reduce((sum, child) => sum + countPages(child), 0);
  }
  return 0;
}

const folderDescriptions = {
  'getting-started': 'Get up and running with the platform',
  'javascript': 'Core JavaScript concepts and patterns',
  'css': 'CSS layout techniques and styling',
};

export default function DocsHomePage() {
  return (
    <div className="docs-home">
      <h1 className="docs-home-title">Documentation</h1>
      <p className="docs-home-subtitle">
        Browse the learning content organized by topic. 
        Select a section below to get started.
      </p>

      <div className="docs-home-grid">
        {manifest.tree.map((folder) => {
          const pageCount = countPages(folder);
          return (
            <Link
              key={folder.slug}
              href={`/docs/${folder.children?.[0]?.slug || folder.children?.[0]?.children?.[0]?.slug || ''}`}
              className="docs-folder-card"
            >
              <span className="docs-folder-icon">📂</span>
              <div className="docs-folder-info">
                <h3>{folder.name}</h3>
                <p>
                  {folderDescriptions[folder.slug] || `${pageCount} page${pageCount !== 1 ? 's' : ''}`}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
