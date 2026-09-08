import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ResumeAnalyzerView from './components/ResumeAnalyzerView';
import ResumeBuilderView from './components/ResumeBuilderView';
import ChatbotView from './components/ChatbotView';
import MockInterviewView from './components/MockInterviewView';
import AptitudeTestView from './components/AptitudeTestView';
import LandingPage from './components/LandingPage';
import { User, Bell, Sparkles, LogIn } from 'lucide-react';

export default function App() {
  // Default active user profile so dashboard opens directly without mandatory login
  const defaultUserProfile = {
    name: 'Student Learner',
    email: 'student.alex@stanford.edu',
    role: '🎓 Student',
    targetRole: 'Software Engineer',
    institution: 'Stanford University'
  };

  const [user, setUser] = useState(defaultUserProfile);
  const [activeTab, setActiveTab] = useState('analyzer');
  const [analyzedResumeData, setAnalyzedResumeData] = useState(null);
  const [showPortalModal, setShowPortalModal] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowPortalModal(false);
  };

  const handleSignOut = () => {
    // Reset to default active student candidate so access is never blocked
    setUser(defaultUserProfile);
  };

  const handleAnalyzeBuiltResume = (resultData) => {
    setAnalyzedResumeData(resultData);
    setActiveTab('analyzer');
  };

  return (
    <div className="groomed-dashboard-layout">
      {/* If portal modal is explicitly opened */}
      {showPortalModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(9, 8, 20, 0.95)', overflowY: 'auto' }}>
          <div style={{ position: 'absolute', top: '20px', right: '30px', zIndex: 1010 }}>
            <button
              onClick={() => setShowPortalModal(false)}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              ✕ Back to Direct Dashboard
            </button>
          </div>
          <LandingPage onLoginSuccess={handleLoginSuccess} />
        </div>
      )}

      {/* Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onSignOut={handleSignOut}
      />

      {/* Main Workspace Area (Right of Sidebar) */}
      <div className="groomed-main-content">
        {/* Top Groomed Header Bar */}
        <header className="dashboard-top-header glass-panel">
          <div className="header-breadcrumb">
            <span className="breadcrumb-root">Career Navigator</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">
              {activeTab === 'analyzer' && 'Module 1: Resume Analyzer & ATS Audit'}
              {activeTab === 'builder' && 'Module 2: Interactive Live Resume Builder'}
              {activeTab === 'chatbot' && 'Module 3: AI Career Assistant (LLM Chatbot)'}
              {activeTab === 'interview' && 'Module 4: Mock Interview Simulator'}
              {activeTab === 'aptitude' && 'Module 5: Aptitude & Technical Test Engine'}
            </span>
          </div>

          <div className="header-right-actions">
            <div className="header-badge-pill">
              <Sparkles size={14} className="text-pink-400" />
              <span>{user ? user.role : '🎓 Student'} Direct Access</span>
            </div>

            <button
              onClick={() => setShowPortalModal(true)}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.8rem', gap: '4px' }}
              title="Open Portal Settings"
            >
              <LogIn size={14} />
              <span>Switch Account</span>
            </button>

            <button className="header-icon-btn" title="Notifications">
              <Bell size={18} />
            </button>

            <div className="header-user-pill">
              <div className="avatar-circle" style={{ width: '28px', height: '28px', fontSize: '0.75rem' }}>
                <User size={14} />
              </div>
              <span className="user-pill-name">{user ? user.name : 'Student Candidate'}</span>
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
