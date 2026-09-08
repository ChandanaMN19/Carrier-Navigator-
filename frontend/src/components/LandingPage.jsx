import React, { useState } from 'react';
import { Sparkles, Globe, HelpCircle, User, Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LandingPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const demoEmail = 'alex.vance@stanford.edu';

  const handleAutoFill = () => {
    setEmail(demoEmail);
    setPassword('••••••••••••');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess({
      name: email ? email.split('@')[0] : 'Alex Vance',
      email: email || demoEmail,
      institution: 'Stanford University'
    });
  };

  return (
    <div className="sunset-portal-container">
      {/* Top Portal Header */}
      <header className="portal-header">
        <div className="portal-brand">
          <div className="brand-icon-box">
            <Sparkles className="w-5 h-5 text-violet-300" size={20} />
          </div>
          <span className="brand-title">Career Navigator</span>
        </div>

        <div className="portal-header-right">
          <div className="header-pill-btn">
            <Globe size={15} />
            <span>English (US)</span>
          </div>

          <a href="#support" onClick={(e) => e.preventDefault()} className="header-link">
            <HelpCircle size={15} />
            <span>Support</span>
          </a>

          <div className="avatar-circle">
            <User size={18} />
          </div>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="portal-main">
        {/* Floating Demo Account Pill */}
        <div className="demo-account-pill" onClick={handleAutoFill}>
          <span className="pill-dot">⚡</span>
          <span>Demo Account: <strong>{demoEmail}</strong></span>
          <span className="pill-action">Auto-fill →</span>
        </div>

        {/* Sunset Violet Login Card */}
        <div className="portal-card">
          <div className="card-avatar-badge">
            <span>A</span>
          </div>

          <h2 className="card-title">
            {isRegisterMode ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="card-subtitle">
            {isRegisterMode
              ? 'Join Career Navigator to unlock your AI resume studio, mock interview reps, and tailored career pathways.'
              : 'Sign in to access your resume studio, AI mock interview reps, and tailored career pathways.'}
          </p>

          {/* Social OAuth Buttons */}
          <div className="oauth-button-group">
            <button
              className="oauth-btn"
              onClick={() => onLoginSuccess({ name: 'Alex Vance', email: demoEmail, provider: 'Google' })}
            >
              <svg className="oauth-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              className="oauth-btn"
              onClick={() => onLoginSuccess({ name: 'Alex Vance', email: demoEmail, provider: 'GitHub' })}
            >
              <svg className="oauth-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="divider-row">
            <div className="divider-line" />
            <span className="divider-text">OR CONTINUE WITH EMAIL</span>
            <div className="divider-line" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Work or Academic Email</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={16} />
                <input
                  type="email"
                  className="portal-input"
                  placeholder="e.g. name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="label-with-link">
                <label className="input-label">Password</label>
                {!isRegisterMode && (
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="forgot-link">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="portal-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                />
                <span>Keep me signed in for 30 days</span>
              </label>
            </div>

            {/* Primary Sunset Gradient CTA */}
            <button type="submit" className="sunset-primary-btn">
              <span>{isRegisterMode ? 'Create Account & Access Studio' : 'Sign in to Dashboard'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Toggle Register / Login mode */}
          <div className="card-footer-switch">
            <span>
              {isRegisterMode ? 'Already have an account?' : "Don't have an account yet?"}
            </span>
            <button
              type="button"
              className="switch-mode-btn"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
            >
              {isRegisterMode ? 'Sign in' : 'Create an account'}
            </button>
          </div>
        </div>

        {/* Security & Compliance Badges */}
        <div className="compliance-row">
          <div className="compliance-item">
            <Lock size={14} className="text-amber-400" />
            <span>256–Bit SSL Encryption</span>
          </div>
          <span className="dot-separator">•</span>
          <div className="compliance-item">
            <ShieldCheck size={14} className="text-violet-400" />
            <span>FERPA Compliant</span>
          </div>
          <span className="dot-separator">•</span>
          <div className="compliance-item">
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>SOC2 Type II</span>
          </div>
        </div>

        <p className="compliance-caption">
          Protected by Career Navigator Zero–Trust verification. Single Sign-On available for affiliated colleges & universities.
        </p>
      </main>

      {/* Bottom Footer */}
      <footer className="portal-footer">
        <div className="footer-left">
          <span className="footer-badge">SOC2 TYPE II CERTIFIED</span>
          <span className="footer-badge">256–BIT SSL ENCRYPTION</span>
          <span className="copyright-text">
            © {new Date().getFullYear()} Career Navigator Technologies Inc. All rights reserved.
          </span>
        </div>

        <div className="footer-right">
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          <a href="#security" onClick={(e) => e.preventDefault()}>Security</a>
        </div>
      </footer>
    </div>
  );
}
