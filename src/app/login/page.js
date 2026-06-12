'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithEmail, signInWithMagicLink } = useAuth();
  const router = useRouter();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signInWithEmail(email, password);
      router.push('/docs');
    } catch (err) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signInWithMagicLink(email);
      setSuccess('Check your email for the magic link!');
    } catch (err) {
      setError(err.message || 'Failed to send magic link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link href="/" className="auth-logo">
            Learning Docs
          </Link>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to access your documentation</p>
        </div>

        <div className="auth-card">
          {/* Tabs */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => { setActiveTab('password'); setError(''); setSuccess(''); }}
            >
              Email & Password
            </button>
            <button
              className={`auth-tab ${activeTab === 'magic' ? 'active' : ''}`}
              onClick={() => { setActiveTab('magic'); setError(''); setSuccess(''); }}
            >
              Magic Link
            </button>
          </div>

          {/* Error / Success Messages */}
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          {/* Password Form */}
          {activeTab === 'password' && (
            <form className="auth-form" onSubmit={handlePasswordLogin}>
              <div className="form-group">
                <label htmlFor="email-password" className="label">Email Address</label>
                <input
                  id="email-password"
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                    Signing in…
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          )}

          {/* Magic Link Form */}
          {activeTab === 'magic' && (
            <form className="auth-form" onSubmit={handleMagicLink}>
              <div className="form-group">
                <label htmlFor="email-magic" className="label">Email Address</label>
                <input
                  id="email-magic"
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                    Sending…
                  </>
                ) : (
                  'Send Magic Link'
                )}
              </button>
            </form>
          )}
        </div>

        <div className="auth-footer">
          <p>
            <Link href="/">← Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
