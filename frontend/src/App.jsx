import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ResumeAnalyzerView from './components/ResumeAnalyzerView';
import ResumeBuilderView from './components/ResumeBuilderView';
import ChatbotView from './components/ChatbotView';
import MockInterviewView from './components/MockInterviewView';
import AptitudeTestView from './components/AptitudeTestView';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [analyzedResumeData, setAnalyzedResumeData] = useState(null);

  const handleAnalyzeBuiltResume = (resultData) => {
    setAnalyzedResumeData(resultData);
    setActiveTab('analyzer');
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

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
