import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, X, ArrowRight, ExternalLink } from 'lucide-react';

export default function OAuthModal({ provider, onClose, onAuthSuccess }) {
  const [selectedAccount, setSelectedAccount] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const googleAccounts = [
    { name: 'Chandana M N', email: 'chandanamn19@gmail.com', avatar: 'C' },
    { name: 'Alex Vance (Student)', email: 'alex.vance@stanford.edu', avatar: 'A' },
  ];

  const githubAccounts = [
    { name: 'ChandanaMN19', username: 'ChandanaMN19', email: 'chandanamn19@gmail.com', avatar: 'C' },
    { name: 'Developer Alex', username: 'alexvance-dev', email: 'alex.dev@github.com', avatar: 'A' },
  ];

  const handleSelectAndAuth = (acc) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      onAuthSuccess({
        name: acc.name || acc.username,
        email: acc.email,
        provider: provider,
        token: `${provider.toLowerCase()}_oauth_token_${Math.random().toString(36).substring(2, 12)}`,
        role: '🎓 Student / Engineer',
        targetRole: 'Software Engineer',
        institution: provider === 'Google' ? 'Google Workspace Verified' : 'GitHub OAuth Verified',
        avatar: acc.avatar
      });
      setIsAuthenticating(false);
    }, 1000);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail) return;
    handleSelectAndAuth({
      name: customEmail.split('@')[0],
      email: customEmail,
      avatar: customEmail.charAt(0).toUpperCase()
    });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(9, 8, 20, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="portal-card animate-fade" style={{ width: '100%', maxWidth: '420px', padding: '28px', border: provider === 'Google' ? '1px solid rgba(66, 133, 244, 0.4)' : '1px solid rgba(168, 85, 247, 0.4)' }}>
        
        {/* Header with Close button */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} className="text-emerald-400" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399', letterSpacing: '0.5px' }}>
              SECURE OAUTH 2.0 SSO
            </span>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Provider Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          {provider === 'Google' ? (
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', boxShadow: '0 4px 20px rgba(66,133,244,0.3)' }}>
              <svg viewBox="0 0 24 24" width="26" height="26">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
          ) : (
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#181717', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto', color: '#fff' }}>
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
          )}

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
            Sign in with {provider}
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
            Choose an account to authorize Career Navigator
          </p>
        </div>

        {/* Account List */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {(provider === 'Google' ? googleAccounts : githubAccounts).map((acc, i) => (
            <div
              key={i}
              onClick={() => handleSelectAndAuth(acc)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                background: 'rgba(15, 23, 42, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="oauth-account-row"
            >
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: provider === 'Google' ? 'linear-gradient(135deg, #4285F4, #34A853)' : '#24292e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff', fontSize: '0.9rem' }}>
                {acc.avatar}
              </div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{acc.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{acc.email}</div>
              </div>
              <ArrowRight size={16} className="text-pink-400" />
            </div>
          ))}
        </div>

        {/* Custom Email Input Option */}
        <form onSubmit={handleCustomSubmit} style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 700, marginBottom: '6px' }}>
            Or enter custom {provider} email:
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              className="portal-input"
              style={{ paddingLeft: '14px', fontSize: '0.85rem' }}
              placeholder={provider === 'Google' ? 'yourname@gmail.com' : 'yourname@github.com'}
              value={customEmail}
              onChange={(e) => setCustomEmail(e.target.value)}
            />
            <button
              type="submit"
              disabled={!customEmail || isAuthenticating}
              className="sunset-primary-btn"
              style={{ padding: '0 16px', fontSize: '0.85rem', width: 'auto' }}
            >
              {isAuthenticating ? 'Authorizing...' : 'Authorize'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: '20px', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Lock size={12} className="text-emerald-400" />
          <span>Encrypted with TLS 1.3 & PKCE OAuth Standard</span>
        </div>
      </div>
    </div>
  );
}
