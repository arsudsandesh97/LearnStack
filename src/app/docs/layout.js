'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Sidebar from '@/components/Sidebar';

function DocsLayoutInner({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const userInitial = user?.email ? user.email[0].toUpperCase() : '?';

  return (
    <div className="docs-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <header className="docs-header">
        <div className="docs-header-left">
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
        </div>

        <div className="docs-header-right">
          <div className="user-info">
            <div className="user-avatar">{userInitial}</div>
            <span>{user?.email}</span>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="docs-content">
        <div className="docs-content-inner">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function DocsLayout({ children }) {
  return (
    <ProtectedRoute>
      <DocsLayoutInner>
        {children}
      </DocsLayoutInner>
    </ProtectedRoute>
  );
}
