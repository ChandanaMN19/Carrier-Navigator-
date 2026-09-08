import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import ResumeAnalyzerView from './components/ResumeAnalyzerView';
import ResumeBuilderView from './components/ResumeBuilderView';
import ChatbotView from './components/ChatbotView';
import MockInterviewView from './components/MockInterviewView';
import AptitudeTestView from './components/AptitudeTestView';
import { User, Bell, Sparkles } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('analyzer');
  const [analyzedResumeData, setAnalyzedResumeData] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleAnalyzeBuiltResume = (resultData) => {
    setAnalyzedResumeData(resultData);
    setActiveTab('analyzer');
  };

  // If user is not signed in, show Sunset Violet Landing Portal
  if (!user) {
    return <LandingPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Dashboard view with Left Sidebar Navigation Layout
  return (
    <div className="groomed-dashboard-layout">
      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onSignOut={handleSignOut}
      />

      {/* Main Workspace Area (Right of Left Sidebar) */}
      <div className="groomed-main-content">
        {/* Top Groomed Header Bar */}
        <header className="dashboard-top-header glass-panel">
          <div className="header-breadcrumb">
            <span className="breadcrumb-root">Dashboard</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">
              {activeTab === 'analyzer' && 'Resume Analyzer & ATS Audit'}
              {activeTab === 'builder' && 'Interactive Live Resume Builder'}
              {activeTab === 'chatbot' && 'AI Career Assistant (LLM Chatbot)'}
              {activeTab === 'interview' && 'Mock Interview Simulator'}
              {activeTab === 'aptitude' && 'Aptitude & Technical Test Engine'}
            </span>
          </div>

          <div className="header-right-actions">
            <div className="header-badge-pill">
              <Sparkles size={14} className="text-pink-400" />
              <span>{user.role || 'Candidate'} Workspace</span>
            </div>

            <button className="header-icon-btn" title="Notifications">
              <Bell size={18} />
            </button>

            <div className="header-user-pill">
              <div className="avatar-circle" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>
                <User size={14} />
              </div>
              <span className="user-pill-name">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Active Module View */}
        <main className="module-view-viewport">
          {activeTab === 'analyzer' && (
            <ResumeAnalyzerView
              initialResult={analyzedResumeData}
              onTransferToBuilder={() => setActiveTab('builder')}
            />
          )}
          {activeTab === 'builder' && (
            <ResumeBuilderView onAnalyzeBuiltResume={handleAnalyzeBuiltResume} />
          )}
          {activeTab === 'chatbot' && <ChatbotView />}
          {activeTab === 'interview' && <MockInterviewView />}
          {activeTab === 'aptitude' && <AptitudeTestView />}
        </main>
      </div>
    </div>
  );
}
