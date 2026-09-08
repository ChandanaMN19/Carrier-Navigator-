import React, { useState } from 'react';
import { Bot, Send, User, Sparkles, FileText, HelpCircle } from 'lucide-react';
import { apiService } from '../services/api';

export default function ChatbotView() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "👋 Hi! I'm your **AI Career Assistant**. Ask me anything about CS concepts (DBMS, Data Structures, System Design), interview strategies, or how to optimize your resume!"
    }
  ]);
  const [input, setInput] = useState('');
  const [includeContext, setIncludeContext] = useState(true);
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "Explain DBMS concepts",
    "Give technical interview tips",
    "How to write bullet points for projects?",
    "Explain Java Spring Boot Dependency Injection"
  ];

  const handleSend = async (queryText) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const newMsgs = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMsgs);
    setInput('');
    setLoading(true);

    const resumeContext = includeContext ? { skills: ['Java', 'Spring Boot', 'React', 'SQL', 'MongoDB'] } : null;
    const botReply = await apiService.sendChatMessage(textToSend, includeContext, resumeContext);

    setMessages([...newMsgs, { sender: 'bot', text: botReply }]);
    setLoading(false);
  };

  return (
    <div className="animate-fade">
      <div className="module-header">
        <h2 className="module-title">
          <Bot className="text-cyan-400" />
          Module 3: AI Career Assistant (Context-Aware Chatbot)
        </h2>
        <p className="module-subtitle">
          Ask questions about software engineering concepts, DBMS, system design, or interview strategies tailored to your resume profile.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '24px' }}>
        {/* Context Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} className="text-indigo-400" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Attach Candidate Resume Profile Context</span>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
            <input
              type="checkbox"
              checked={includeContext}
              onChange={(e) => setIncludeContext(e.target.checked)}
              style={{ accentColor: 'var(--primary-accent)', width: '16px', height: '16px' }}
            />
            <span style={{ color: includeContext ? '#34d399' : 'var(--text-muted)', fontWeight: 600 }}>
              {includeContext ? 'Context Active (Skills Attached)' : 'Standard General Advice'}
            </span>
          </label>
        </div>

        {/* Chat Messages */}
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-bubble ${msg.sender}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.75rem', opacity: 0.8 }}>
                {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                <span>{msg.sender === 'user' ? 'You' : 'Career AI'}</span>
              </div>
              <div>{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-bubble bot" style={{ fontStyle: 'italic', opacity: 0.7 }}>
              AI Assistant is thinking...
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', margin: '16px 0 12px 0' }}>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '6px 12px', borderRadius: '20px' }}
            >
              <HelpCircle size={14} className="text-indigo-400" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            className="form-input"
            placeholder="Type your query (e.g. 'Explain DBMS normalization' or 'Give Java interview tips')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={() => handleSend()} disabled={!input.trim() || loading} className="btn-primary" style={{ padding: '0 24px' }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
