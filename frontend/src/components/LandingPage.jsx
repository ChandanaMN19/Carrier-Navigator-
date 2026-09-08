import React, { useState } from 'react';
import { Sparkles, Globe, HelpCircle, User, Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, GraduationCap, Briefcase, Rocket, UserCheck, ShieldAlert } from 'lucide-react';
import OAuthModal from './OAuthModal';

export default function LandingPage({ onLoginSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userRole, setUserRole] = useState('Student'); // "Student", "Job Seeker", "Professional"
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeOAuthProvider, setActiveOAuthProvider] = useState(null); // "Google" or "GitHub"

  const demoEmail = 'alex.vance@stanford.edu';

  const checkPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { score: 30, label: 'Weak (Add numbers & special chars)', color: '#f43f5e' };
    if (score <= 4) return { score: 70, label: 'Medium (Good password)', color: '#fbbf24' };
    return { score: 100, label: 'Strong & Secure ✓', color: '#10b981' };
  };

  const passwordStrength = checkPasswordStrength(password);

  const handleAutoFillDemo = () => {
    setErrorMessage('');
    if (isRegisterMode) {
      setFullName('Alex Vance');
      setUserRole('Student');
      setTargetRole('Software Engineer');
      setEmail('student.alex@stanford.edu');
      setPassword('Stanford2026!Secured');
    } else {
      setEmail(demoEmail);
      setPassword('Stanford2026!Secured');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Password Security Enforcement for Account Creation
    if (isRegisterMode && passwordStrength.score < 60) {
      setErrorMessage('Please create a stronger password (at least 8 characters with numbers or special symbols like !@#$) for account safety.');
      return;
    }

    if (isRegisterMode) {
      onLoginSuccess({
        name: fullName.trim() || `${userRole} Candidate`,
        email: email || 'student@university.edu',
        role: userRole,
        targetRole: targetRole || 'Software Engineer',
        institution: userRole === 'Student' ? 'Stanford University' : 'Career Professional',
        provider: 'Email & Password (Encrypted)',
        isNewUser: true
      });
    } else {
      onLoginSuccess({
        name: email ? email.split('@')[0] : 'Alex Vance',
        email: email || demoEmail,
        role: 'Student / Candidate',
        targetRole: 'Software Engineer',
        institution: 'Stanford University',
        provider: 'Email & Password (Encrypted)',
        isNewUser: false
      });
    }
  };

  return (
    <div className="sunset-portal-container">
      {/* OAuth 2.0 Authorization Modal */}
      {activeOAuthProvider && (
        <OAuthModal
          provider={activeOAuthProvider}
          onClose={() => setActiveOAuthProvider(null)}
          onAuthSuccess={(authData) => {
            setActiveOAuthProvider(null);
            onLoginSuccess(authData);
          }}
        />
      )}

      {/* Top Portal Header */}
      <header className="portal-header">
        <div className="portal-brand">
          <div className="brand-icon-box">
            <Sparkles className="w-5 h-5 text-pink-400" size={20} />
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
        <div className="demo-account-pill" onClick={handleAutoFillDemo}>
          <span className="pill-dot">⚡</span>
          <span>
            {isRegisterMode ? 'Auto-fill Demo Secure Registration' : `Demo Account: ${demoEmail}`}
          </span>
          <span className="pill-action">Auto-fill →</span>
        </div>

        {/* Sunset Violet Login / Registration Card */}
        <div className="portal-card">
          <div className="card-avatar-badge">
            {isRegisterMode ? <UserCheck size={26} /> : <span>A</span>}
          </div>

          <h2 className="card-title">
            {isRegisterMode ? 'Create New Account' : 'Welcome back'}
          </h2>
          <p className="card-subtitle">
            {isRegisterMode
              ? 'Create a secure student or candidate profile using Google, GitHub, or Email to start practicing mock interviews & building ATS resumes.'
              : 'Sign in with your Google, GitHub, or academic account to access your studio.'}
          </p>

          {errorMessage && (
            <div style={{ width: '100%', background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.4)', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.82rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Social OAuth Buttons */}
          <div className="oauth-button-group">
            <button
              type="button"
              className="oauth-btn"
              onClick={() => setActiveOAuthProvider('Google')}
            >
              <svg className="oauth-icon" viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isRegisterMode ? 'Register with Google' : 'Continue with Google'}</span>
            </button>

            <button
              type="button"
              className="oauth-btn"
              onClick={() => setActiveOAuthProvider('GitHub')}
            >
              <svg className="oauth-icon" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>{isRegisterMode ? 'Register with GitHub' : 'Continue with GitHub'}</span>
            </button>
          </div>

          <div className="divider-row">
            <div className="divider-line" />
            <span className="divider-text">
              {isRegisterMode ? 'OR REGISTRATION FORM' : 'OR CONTINUE WITH EMAIL'}
            </span>
            <div className="divider-line" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Differentiated Registration Fields for New Users */}
            {isRegisterMode && (
              <>
                {/* Role Selector Pills */}
                <div className="input-group">
                  <label className="input-label">Select Your Account Profile Type</label>
                  <div className="role-selector-grid">
                    <button
                      type="button"
                      className={`role-btn ${userRole === 'Student' ? 'active' : ''}`}
                      onClick={() => setUserRole('Student')}
                    >
                      <GraduationCap size={16} />
                      <span>🎓 Student</span>
                    </button>
                    <button
                      type="button"
                      className={`role-btn ${userRole === 'Job Seeker' ? 'active' : ''}`}
                      onClick={() => setUserRole('Job Seeker')}
                    >
                      <Briefcase size={16} />
                      <span>💼 Job Seeker</span>
                    </button>
                    <button
                      type="button"
                      className={`role-btn ${userRole === 'Professional' ? 'active' : ''}`}
                      onClick={() => setUserRole('Professional')}
                    >
                      <Rocket size={16} />
                      <span>🚀 Professional</span>
                    </button>
                  </div>
                </div>

                {/* Full Name Field */}
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={16} />
                    <input
                      type="text"
                      className="portal-input"
                      placeholder="e.g. Student Learner or John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                {/* Target Career Field / Role */}
                <div className="input-group">
                  <label className="input-label">Target Career Role / Field</label>
                  <div className="input-wrapper">
                    <Rocket className="input-icon" size={16} />
                    <input
                      type="text"
                      className="portal-input"
                      placeholder="e.g. Software Engineer, Data Analyst, Web Developer"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="input-group">
              <label className="input-label">
                {isRegisterMode ? 'Academic or Personal Email' : 'Work or Academic Email'}
              </label>
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

            {/* Password Field */}
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

              {/* Password Strength Indicator Meter */}
              {password && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span style={{ color: '#94a3b8' }}>Password Safety</span>
                    <span style={{ color: passwordStrength.color, fontWeight: 700 }}>{passwordStrength.label}</span>
                  </div>
                  <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${passwordStrength.score}%`,
                        background: passwordStrength.color,
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              )}
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

            {/* Dynamic Primary CTA Button */}
            <button type="submit" className="sunset-primary-btn">
              <span>
                {isRegisterMode
                  ? `Create ${userRole} Account & Launch Studio`
                  : 'Sign in to Dashboard'}
              </span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Toggle Register / Sign in */}
          <div className="card-footer-switch">
            <span>
              {isRegisterMode ? 'Already have an account?' : "Don't have an account yet?"}
            </span>
            <button
              type="button"
              className="switch-mode-btn"
              onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setErrorMessage('');
              }}
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
