'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="landing-nav">
        <span className="landing-logo">Learning Docs</span>
        <div className="landing-nav-links">
          {user ? (
            <Link href="/docs" className="btn btn-primary btn-sm">
              Open Docs
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Sign In
              </Link>
              <Link href="/login" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <span>Private Knowledge Base</span>
        </div>

        <h1 className="hero-title">
          <span>Your learning,</span>
          <span>organized.</span>
        </h1>

        <p className="hero-description">
          A private documentation platform built for focused learning. 
          Clean navigation, beautiful reading experience, 
          and content that stays organized.
        </p>

        <div className="hero-actions">
          {user ? (
            <Link href="/docs" className="btn btn-primary btn-lg">
              Open Documentation →
            </Link>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary btn-lg">
                Sign In to Access →
              </Link>
              <Link href="#features" className="btn btn-secondary btn-lg">
                Learn More
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="features-header">
          <p className="features-label">Built for Learning</p>
          <h2 className="features-title">Everything you need. Nothing you don't.</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔒</span>
            <h3 className="feature-title">Private Access</h3>
            <p className="feature-description">
              All content requires authentication. Your learning materials stay secure and restricted to approved users only.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📂</span>
            <h3 className="feature-title">Organized Structure</h3>
            <p className="feature-description">
              Content is organized in an intuitive folder hierarchy with expandable navigation. Find what you need instantly.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3 className="feature-title">Fast & Focused</h3>
            <p className="feature-description">
              Static site architecture ensures blazing-fast page loads. No distractions, no bloat — just content.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📝</span>
            <h3 className="feature-title">Markdown Powered</h3>
            <p className="feature-description">
              Write content in familiar Markdown with full support for code blocks, tables, images, and more.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3 className="feature-title">Auto-Deploy</h3>
            <p className="feature-description">
              Push changes to GitHub and content updates automatically. No manual deployment steps required.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3 className="feature-title">Responsive Design</h3>
            <p className="feature-description">
              Beautiful reading experience on any device. Sidebar navigation on desktop, drawer navigation on mobile.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Private Learning Documentation Platform</p>
      </footer>
    </div>
  );
}
