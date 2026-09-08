import React from 'react';
import { FileText, Hammer, Bot, Mic, Brain, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
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
        <Sparkles className="w-6 h-6 text-indigo-400" />
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
    </header>
  );
}
