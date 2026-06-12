'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import manifest from '@/data/content-manifest.json';

function TreeItem({ item, currentSlug }) {
  const [expanded, setExpanded] = useState(() => {
    if (item.type === 'folder') {
      return isChildActive(item, currentSlug);
    }
    return false;
  });

  if (item.type === 'page') {
    const isActive = currentSlug === item.slug;
    return (
      <div className="tree-item">
        <Link
          href={`/docs/${item.slug}`}
          className={`tree-item-header ${isActive ? 'active' : ''}`}
        >
          <span className="tree-icon">📄</span>
          <span className="tree-label">{item.name}</span>
        </Link>
      </div>
    );
  }

  if (item.type === 'folder') {
    return (
      <div className="tree-item">
        <button
          className={`tree-item-header ${isChildActive(item, currentSlug) ? 'active' : ''}`}
          onClick={() => setExpanded(!expanded)}
        >
          <span className={`tree-chevron ${expanded ? 'expanded' : ''}`}>▶</span>
          <span className="tree-icon">📁</span>
          <span className="tree-label">{item.name}</span>
        </button>
        {expanded && (
          <div className="tree-children">
            {item.children.map((child, index) => (
              <TreeItem
                key={child.slug || index}
                item={child}
                currentSlug={currentSlug}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

function isChildActive(folder, currentSlug) {
  if (!currentSlug || !folder.children) return false;
  return folder.children.some(child => {
    if (child.type === 'page' && child.slug === currentSlug) return true;
    if (child.type === 'folder') return isChildActive(child, currentSlug);
    return false;
  });
}

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const currentSlug = pathname.replace('/docs/', '').replace(/\/$/, '');

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link href="/" className="sidebar-logo" onClick={onClose}>
            Learning Docs
          </Link>
        </div>

        <nav className="sidebar-content">
          <div className="sidebar-section-label">Documentation</div>

          <div className="tree-item">
            <Link
              href="/docs"
              className={`tree-item-header ${pathname === '/docs' || pathname === '/docs/' ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="tree-icon">🏠</span>
              <span className="tree-label">Home</span>
            </Link>
          </div>

          {manifest.tree.map((item, index) => (
            <TreeItem
              key={item.slug || index}
              item={item}
              currentSlug={currentSlug}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
