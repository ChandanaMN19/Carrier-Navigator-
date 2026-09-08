import React from 'react';
import { FileText, Hammer, Bot, Mic, Brain, Sparkles, LogOut, User, Target, ChevronRight, Award, ShieldCheck } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, user, onSignOut }) {
  const navItems = [
    { id: 'analyzer', label: 'Resume Analyzer', icon: FileText, desc: 'ATS Score & Keyword Audit' },
    { id: 'builder', label: 'Resume Builder', icon: Hammer, desc: 'Live PDF Studio & Templates' },
    { id: 'chatbot', label: 'AI Career Assistant', icon: Bot, desc: 'Context-Aware Career Q&A' },
    { id: 'interview', label: 'Mock Interview', icon: Mic, desc: 'HR & Tech Voice Practice' },
    { id: 'aptitude', label: 'Aptitude Test', icon: Brain, desc: 'Timed Technical MCQs' },
  ];

  return (
    <aside className="sidebar-container glass-panel">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-icon-box">
          <Sparkles className="w-5 h-5 text-pink-400" size={20} />
        </div>
        <div className="brand-text">
          <span className="brand-title">Career Navigator</span>
          <span className="brand-subtitle">AI Studio & Career Hub</span>
        </div>
      </div>

      {/* User Profile Card */}
      {user && (
        <div className="sidebar-user-card">
          <div className="user-avatar-wrapper">
            <div className="avatar-circle" style={{ background: user.provider ? 'linear-gradient(135deg, #4285F4, #ec4899)' : 'var(--sunset-gradient)' }}>
              {user.avatar || (user.name ? user.name.charAt(0).toUpperCase() : 'U')}
            </div>
            <span className="online-indicator" />
          </div>
          <div className="user-details">
            <div className="user-name">{user.name || 'Candidate'}</div>
            <div className="user-role-badge">
              <span>{user.role || 'Student'}</span>
            </div>
            {user.provider && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#34d399', fontWeight: 700, marginTop: '2px' }}>
                <ShieldCheck size={12} />
                <span>{user.provider} Auth</span>
              </div>
            )}
            {user.targetRole && (
              <div className="user-target-role">
                <Target size={12} className="text-pink-400" />
                <span>{user.targetRole}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Vertical Navigation Menu */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">MAIN MODULES</div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
            >
              <div className="btn-icon-wrapper">
                <Icon size={18} />
              </div>
              <div className="btn-text-content">
                <span className="btn-label">{item.label}</span>
                <span className="btn-desc">{item.desc}</span>
              </div>
              <ChevronRight size={14} className="chevron-icon" />
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Widget & Sign Out */}
      <div className="sidebar-footer">
        <div className="target-metric-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a78bfa', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Award size={14} /> ATS GOAL
            </span>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399' }}>85%+ Target</span>
          </div>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '82%', height: '100%', background: 'linear-gradient(90deg, #ec4899, #a855f7)' }} />
          </div>
        </div>

        <button onClick={onSignOut} className="sidebar-signout-btn">
          <LogOut size={16} />
          <span>Sign Out / Switch Profile</span>
        </button>
      </div>
    </aside>
  );
}
