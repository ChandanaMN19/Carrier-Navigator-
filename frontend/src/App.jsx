import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import ResumeAnalyzerView from './components/ResumeAnalyzerView';
import ResumeBuilderView from './components/ResumeBuilderView';
import ChatbotView from './components/ChatbotView';
import MockInterviewView from './components/MockInterviewView';
import AptitudeTestView from './components/AptitudeTestView';

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

  // Dashboard view once signed in
  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onSignOut={handleSignOut}
      />

      <main>
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
  );
}
