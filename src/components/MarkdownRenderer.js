'use client';

import { useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const language = className ? className.replace('language-', '') : '';

  const handleCopy = useCallback(() => {
    const text = String(children).replace(/\n$/, '');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [children]);

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span>{language || 'code'}</span>
        <button
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          type="button"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code className={className}>
          {children}
        </code>
      </pre>
    </div>
  );
}

function TableWrapper({ children }) {
  return (
    <div className="table-wrapper">
      <table>{children}</table>
    </div>
  );
}

const components = {
  code({ children, className, ...props }) {
    const isInline = !className && typeof children === 'string' && !children.includes('\n');

    if (isInline) {
      return <code className={className} {...props}>{children}</code>;
    }

    return (
      <CodeBlock className={className}>
        {children}
      </CodeBlock>
    );
  },
  pre({ children }) {
    // react-markdown wraps code blocks in <pre><code>, so we need to extract the code
    if (children?.type === 'code') {
      const { className, children: codeChildren } = children.props;
      return (
        <CodeBlock className={className}>
          {codeChildren}
        </CodeBlock>
      );
    }
    return <pre>{children}</pre>;
  },
  table({ children }) {
    return <TableWrapper>{children}</TableWrapper>;
  },
  a({ href, children, ...props }) {
    // Open external links in new tab
    const isExternal = href?.startsWith('http');
    return (
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...props}
      >
        {children}
      </a>
    );
  },
  img({ src, alt, ...props }) {
    return (
      <img
        src={src}
        alt={alt || ''}
        loading="lazy"
        {...props}
      />
    );
  },
};

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
