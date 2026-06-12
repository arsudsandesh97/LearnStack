/**
 * Generate Content Manifest
 * 
 * Walks the content/ directory and generates a content-manifest.json
 * that drives the sidebar navigation and page ordering.
 * 
 * Usage: node scripts/generate-manifest.js
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'content-manifest.json');

function formatName(filename) {
  return filename
    .replace(/\.md$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function buildTree(dirPath, relativePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items = [];

  // Sort: folders first, then files, alphabetically
  const folders = entries.filter(e => e.isDirectory()).sort((a, b) => a.name.localeCompare(b.name));
  const files = entries.filter(e => e.isFile() && e.name.endsWith('.md')).sort((a, b) => a.name.localeCompare(b.name));

  for (const folder of folders) {
    const folderRelPath = relativePath ? `${relativePath}/${folder.name}` : folder.name;
    const children = buildTree(path.join(dirPath, folder.name), folderRelPath);

    if (children.length > 0) {
      items.push({
        type: 'folder',
        name: formatName(folder.name),
        slug: folderRelPath,
        children,
      });
    }
  }

  for (const file of files) {
    const slug = relativePath
      ? `${relativePath}/${file.name.replace(/\.md$/, '')}`
      : file.name.replace(/\.md$/, '');
    const filePath = relativePath
      ? `${relativePath}/${file.name}`
      : file.name;

    items.push({
      type: 'page',
      name: formatName(file.name),
      slug,
      file: filePath,
    });
  }

  return items;
}

function flattenPages(items) {
  const pages = [];
  for (const item of items) {
    if (item.type === 'page') {
      pages.push({ slug: item.slug, name: item.name });
    } else if (item.children) {
      pages.push(...flattenPages(item.children));
    }
  }
  return pages;
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const tree = buildTree(CONTENT_DIR);
  const pages = flattenPages(tree);

  const manifest = { tree, pages };

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2));

  console.log(`✓ Manifest generated: ${pages.length} pages in ${tree.length} sections`);
  console.log(`  Output: ${OUTPUT_FILE}`);
}

main();
