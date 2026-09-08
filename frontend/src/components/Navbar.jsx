import React from 'react';
import { FileText, Hammer, Bot, Mic, Brain, Sparkles, LogOut, User } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, user, onSignOut }) {
  const navItems = [
    { id: 'analyzer', label: 'Resume Analyzer', icon: FileText },
    { id: 'builder', label: 'Resume Builder', icon: Hammer },
    { id: 'chatbot', label: 'AI Career Assistant', icon: Bot },
    { id: 'interview', label: 'Mock Interview', icon: Mic },
    { id: 'aptitude', label: 'Aptitude Test', icon: Brain },
  ];

  return (
    <header className="navbar glass-panel">
      <div className="brand-logo">
        <Sparkles className="w-6 h-6 text-pink-400" />
        <span>Career Navigator</span>
      </div>

      <nav className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1' }}>
            <div className="avatar-circle" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
              <User size={16} />
            </div>
            <span style={{ fontWeight: 600 }}>{user.name}</span>
          </div>

          <button
            onClick={onSignOut}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '4px' }}
            title="Return to Sunset Violet Portal"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </header>
  );
}
